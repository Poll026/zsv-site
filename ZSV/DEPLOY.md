# DEPLOY — как обновлять сайт zaharovsv.ru

> Для AI-ассистента и владельца. Сайт уже задеплоен 2026-05-07. Этот документ — про **последующие** обновления.

---

## TL;DR — типовой цикл обновления

```
# 1. Локально (в этой папке)
git add ZSV/<изменённые-файлы>
git commit -m "<описание>"
git push

# 2. На сервере, в открытой ssh-сессии leshik@85.209.154.225
sudo -u bot-zaharov -H git -C /opt/zaharov/app pull
```

Всё. Браузерный кэш — Ctrl+F5 / инкогнито.

Никаких рестартов nginx **не нужно**, если поменялись только `ZSV/index.html`, картинки или другие файлы сайта. Они отдаются как статика.

---

## Что где живёт

### Локально (Windows)
- **Репо:** `C:\Users\user\VS Code\ZSV mvp site\` (ветка `main`, ремоут `https://github.com/Poll026/zsv-site`)
- **Сайт:** `ZSV/index.html` + фото `ZSV/*.png`
- **Nginx-конфиг (версионируется):** `ZSV/deploy/zaharovsv.ru.conf`

### На VDS (Ubuntu 24.04, `85.209.154.225`)
- **Системный пользователь сайта:** `bot-zaharov` (UID 996, без shell-входа)
- **Репо на сервере:** `/opt/zaharov/app/` (полный клон `Poll026/zsv-site`)
- **Корень сайта (root для nginx):** `/opt/zaharov/app/ZSV/`
- **Активный nginx-конфиг:** `/etc/nginx/sites-available/zaharovsv.ru`, симлинк в `/etc/nginx/sites-enabled/zaharovsv.ru`
- **Логи nginx нашего сайта:** `/var/log/nginx/zaharovsv.ru.{access,error}.log`
- **SSL-сертификат (Let's Encrypt, авто-обновление):** `/etc/letsencrypt/live/zaharovsv.ru/`
- **Бот Лёшик** (на этом же VDS, не трогаем): `/opt/leshik/`, `bot-leshik`, `leshik.service`
- **ISPmanager** (стоит, активен — но мы добавляем сайты руками, в обход панели — этот домен через панель **никогда** не добавлять, иначе конфликт)

### Доступы
- SSH к серверу: `ssh leshik@85.209.154.225` (по ключу из `~/.ssh/`, без пароля)
- `sudo` для `leshik` — **с паролем** (хранится в `C:\Users\user\Documents\vds-secrets\SERVER_ACCESS.local.md`)

---

## Развёрнутый workflow обновлений

### 1. Локально внести изменения
Правишь `ZSV/index.html` или другие файлы как обычно. Проверяешь локально открытием в браузере.

### 2. Закоммитить и запушить
```
git add ZSV/<файлы>          # или git add ZSV/ для всего сразу
git commit -m "<описание>"
git push
```

### 3. На сервере подтянуть изменения
В открытой ssh-сессии `leshik@85.209.154.225`:
```
sudo -u bot-zaharov -H git -C /opt/zaharov/app pull
```

`-H` обязательно — без него git ищет конфиг в неправильном HOME.

### 4. Проверить
Открой в инкогнито:
- `https://zaharovsv.ru/` — главная
- `https://www.zaharovsv.ru/` — с www тоже работает

### Когда нужен reload nginx
**Только если** поменялся файл `ZSV/deploy/zaharovsv.ru.conf` (nginx-конфиг). Тогда:
```
sudo cp /opt/zaharov/app/ZSV/deploy/zaharovsv.ru.conf /etc/nginx/sites-available/zaharovsv.ru
sudo nginx -t              # проверить синтаксис
sudo systemctl reload nginx
```

Для правок в HTML/CSS/JS/картинках reload **не нужен**.

---

## Если что-то сломалось

### Сайт не открывается
1. Проверь снаружи: `curl -I https://zaharovsv.ru/`
2. Проверь nginx-статус: `sudo systemctl status nginx`
3. Глянь error-лог: `sudo tail -50 /var/log/nginx/zaharovsv.ru.error.log`

### Сертификат истекает / не обновляется
- Проверка: `sudo certbot certificates`
- Тест обновления: `sudo certbot renew --dry-run`
- Авто-обновление через `certbot.timer` (раз в день проверяет; обновляет за 30 дней до истечения)

### Случайно сломал nginx-конфиг
`sudo nginx -t` покажет в какой строке ошибка. Если `systemctl reload nginx` отказался применять — старый конфиг остался работать, сайт не упал. Откати правку, повтори.

### Если надо снять сайт совсем (на время)
```
sudo rm /etc/nginx/sites-enabled/zaharovsv.ru
sudo systemctl reload nginx
```
Сайт исчезнет, всё остальное на сервере не пострадает. Чтобы вернуть — `ln -sf` обратно.

---

## Что НЕ делать

- ❌ Не редактировать файлы напрямую на сервере в `/opt/zaharov/app/ZSV/` — потеряешь при следующем `git pull`. Все правки — локально, через git.
- ❌ Не добавлять `zaharovsv.ru` через веб-морду ISPmanager (`https://85.209.154.225:1500`). Она перезапишет наш nginx-конфиг.
- ❌ Не использовать `git pull` от leshik или root — только `sudo -u bot-zaharov -H git ... pull`. Иначе сменятся owner-ы файлов.
- ❌ Не делать `git push --force` в `main` без явной необходимости.
- ❌ Не сносить ISPmanager и сопутствующий стек (`apache2`, `mysql`, `dovecot`, `exim4`, `named`, `proftpd`, `php-fpm`) без согласования с Денисом — даже если они «не используются», они работают.

---

## Связанные документы

- `CLAUDE.md` (корень репо) — это спека Vels Industries, **не** ZSV (старый проект-референс)
- `ZSV/NEXT-SESSION.md` — handoff на момент начала деплоя (исторический)
- `vds-playbook/PLAYBOOK.md` — общие правила работы с этим VDS
- `SERVER_ACCESS.local.md` (локально, не в git) — секреты доступа

---

**Дата создания:** 2026-05-07.
