# Vels Industries — Website Project

## Overview
Лендинг для **Vels Industries** — компания, создающая и внедряющая AI-агентов для автоматизации бизнеса. Минималистичный современный дизайн, светлая тема, акцент на 3D анимацию. Весь контент сайта — на **русском языке**.

---

## Tech Stack
- **HTML5 / CSS3 / Vanilla JS** — no framework, clean and fast
- **Three.js** (CDN) — 3D animations
- **GSAP** (CDN) — scroll animations and transitions
- **Google Fonts** — Geist + Inter

---

## Brand Identity

### Company
- **Name:** Vels Industries
- **Tagline:** *«Интеллект, внедрённый в бизнес.»*
- **Industry:** AI-агенты для автоматизации бизнеса

### Colors
| Role | Value |
|------|-------|
| Background | `#F8F8F6` (warm white) |
| Surface | `#FFFFFF` |
| Primary accent | `#0A0AFF` (electric blue) |
| Secondary accent | `#7C3AED` (deep violet) |
| Text primary | `#0D0D0D` |
| Text secondary | `#6B6B6B` |
| Border | `#E5E5E5` |

### Typography
- **Headings:** `Geist` — ultra-modern, tech feel
- **Body:** `Inter` — clean, readable
- **Hero title size:** 96px desktop / 48px mobile
- **Section titles:** 56px desktop / 32px mobile
- **Font weight strategy:** Heavy (700–900) for hero/section titles, Regular (400) for body

---

## Site Structure (7 screens)

### 1. Шапка (fixed, прозрачная → frosted glass при скролле)
- Лого: «Vels» (жирный) + «Industries» (тонкий) — слева
- Навигация: Что мы делаем · Решения · Кейсы · Клиенты · Контакт
- CTA кнопка: «Получить демо» — заливка электрик-синим
- Mobile: бургер-меню

### 2. Hero-секция
- **Слева:** крупный жирный заголовок (2–3 строки), подзаголовок, две кнопки CTA
- **Справа:** Three.js 3D сцена — wireframe икосаэдр + летящие частицы
- Заголовок: *«Мы создаём AI-агентов,\nкоторые работают\nза вас.»*
- Подзаголовок: *«Автоматизируйте бизнес-процессы с помощью интеллектуальных агентов — разработанных и внедрённых командой Vels Industries.»*
- CTA: «Начать проект» (primary) + «Смотреть кейсы» (ghost)

### 3. Секция «Что мы делаем» (hero-секция с жирным шрифтом)
- Центрированный макет, огромный жирный заголовок чуть выше центра экрана
- Заголовок: *«Мы не пишем код.\nМы создаём интеллект.»*
- Подзаголовок (мелкий, приглушённый): *«От поддержки клиентов до управления продажами — наши AI-агенты заменяют рутину и масштабируются вместе с вашим бизнесом.»*
- 3 карточки ниже: Автоматизация · Интеграция · Оптимизация
- Фон: тонкий анимированный градиентный blob

### 4. Секция «Решения»
- Сетка 3 колонки с карточками решений
- Каждая карточка: иконка, заголовок, короткое описание, ссылка «Подробнее →»
  1. **AI-агент для продаж** — квалифицирует лиды, бронирует встречи, ведёт автоматические follow-up
  2. **AI-агент поддержки** — закрывает 80% обращений без участия человека
  3. **AI-агент операций** — мониторит процессы, выявляет аномалии, запускает действия
- Hover у карточек: подъём + синее свечение

### 5. Секция «Кейсы»
- Заголовок: *«Реальные результаты.»*
- 3 карточки кейсов:
  1. **ТехРетейл** — снижение затрат на поддержку на 68% с AI-агентом
  2. **ФинФлоу Групп** — автоматизация воронки продаж, +41% конверсия
  3. **МедБейс** — онбординг пациентов ускорен в 3 раза
- Каждая карточка: название компании, ключевая метрика (крупно), описание, теги

### 6. Секция «Клиенты»
- Заголовок: *«Нам доверяют компании, которые смотрят в будущее.»*
- Бегущая строка (marquee) с 8 вымышленными логотипами клиентов (SVG-текст):
  CoreLabs · NexaGroup · Stackify · Orbital Systems · PulseAI · Dendro · Vantara · Helixon

### 7. Секция «О нас»
- Разбивка: текст слева, 3D визуал справа
- 3D визуал: медленно вращающийся додекаэдр
- Текст: история компании, миссия, год основания (2022), команда (24 специалиста)
- 3 счётчика: **50+** агентов внедрено · **12** отраслей · **98%** клиентов возвращаются

### 8. Секция «Контакт / CTA»
- Тёмный полноширинный блок (navy `#0D0D0D`) — контрастный разрыв
- Заголовок: *«Готовы автоматизировать бизнес?»*
- Поля формы: Имя · Email · Компания · Сообщение
- Кнопка отправки: электрик-синий
- Под формой: email + telegram (вымышленные)

### 9. Подвал
- Лого + слоган
- Колонки навигации: Компания · Решения · Правовая информация
- Иконки соцсетей: LinkedIn · GitHub · Twitter/X
- Копирайт: © 2025 Vels Industries. Все права защищены.

---

## 3D Animation Specs (Three.js)

### Hero Scene
- Background: transparent (overlaid on page)
- Object: IcosahedronGeometry (wireframe) + 200 floating particles
- Animation: slow Y-rotation + particles drifting + mouse parallax on mousemove
- Color: `#0A0AFF` wireframe, white particles, subtle glow

### "What We Do" Background
- Soft animated blob: ShaderMaterial with sin/cos wave displacement
- Color gradient: blue → violet, very low opacity (0.08)

### "About Us" Visual
- DodecahedronGeometry, solid with phong shading
- Color: electric blue with rim light in violet
- Animation: continuous slow rotation on all axes

---

## Scroll & Interaction Animations (GSAP)
- Elements fade up on scroll enter (opacity 0→1, y +40→0)
- Section titles: staggered character reveal
- Stat counters: count up when in viewport
- Cards: stagger entrance left-to-right
- Header: background blur appears after 80px scroll

---

## Responsive Breakpoints
- Desktop: 1280px+
- Tablet: 768–1279px (2-col grids, reduced font sizes)
- Mobile: <768px (1-col, 3D canvas hidden or simplified, hamburger nav)

---

## File Structure
```
NV test 1/
├── index.html
├── styles/
│   ├── main.css
│   ├── components.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── three-scenes.js
│   └── gsap-animations.js
├── assets/
│   └── (no external images needed — all SVG/CSS/3D)
└── CLAUDE.md
```

---

## Implementation Order
1. HTML structure (all sections, semantic markup)
2. CSS: variables, typography, layout grid
3. CSS: component styles (cards, buttons, nav, form)
4. CSS: responsive breakpoints
5. Three.js: hero scene
6. Three.js: about section scene + what-we-do blob
7. GSAP: scroll animations
8. Final polish: hover states, transitions, details
