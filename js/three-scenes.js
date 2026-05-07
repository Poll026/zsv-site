/* ══════════════════════════════════
   Three.js Scenes
══════════════════════════════════ */

(function () {
  if (typeof THREE === 'undefined') return;

  // ─── HERO SCENE ───────────────────────────────────────────

  var heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    var hScene    = new THREE.Scene();
    var hCamera   = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    hCamera.position.z = 5;

    var hRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
    hRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Wireframe icosahedron
    var icoGeo = new THREE.IcosahedronGeometry(2, 2);
    var icoMat = new THREE.MeshBasicMaterial({ color: 0x0A0AFF, wireframe: true, transparent: true, opacity: 0.28 });
    var ico    = new THREE.Mesh(icoGeo, icoMat);
    hScene.add(ico);

    // Inner icosahedron (detail 1, slightly smaller)
    var ico2Geo = new THREE.IcosahedronGeometry(1.3, 1);
    var ico2Mat = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true, transparent: true, opacity: 0.18 });
    var ico2    = new THREE.Mesh(ico2Geo, ico2Mat);
    hScene.add(ico2);

    // Particles
    var N    = 220;
    var pos  = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    var pGeo  = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var pMat  = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.6 });
    var pts   = new THREE.Points(pGeo, pMat);
    hScene.add(pts);

    // Mouse parallax
    var mx = 0, my = 0;
    document.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    function resizeHero() {
      var wrap = heroCanvas.parentElement;
      var w = wrap.offsetWidth, h = wrap.offsetHeight;
      if (!w || !h) return;
      hCamera.aspect = w / h;
      hCamera.updateProjectionMatrix();
      hRenderer.setSize(w, h);
    }
    resizeHero();

    var ht = 0;
    function animateHero() {
      requestAnimationFrame(animateHero);
      ht += 0.004;
      ico.rotation.y  = ht * 0.28 + mx * 0.22;
      ico.rotation.x  = ht * 0.14 + my * 0.16;
      ico2.rotation.y = -ht * 0.35 + mx * 0.18;
      ico2.rotation.x = -ht * 0.18 + my * 0.12;
      pts.rotation.y  = ht * 0.04;
      pts.rotation.x  = ht * 0.02;
      hRenderer.render(hScene, hCamera);
    }
    animateHero();
    window.addEventListener('resize', resizeHero);
  }

  // ─── BLOB SCENE (What We Do background) ───────────────────

  var blobCanvas = document.getElementById('blob-canvas');
  if (blobCanvas) {
    var bScene    = new THREE.Scene();
    var bCamera   = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    bCamera.position.z = 6;

    var bRenderer = new THREE.WebGLRenderer({ canvas: blobCanvas, alpha: true, antialias: true });
    bRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Primary blob sphere
    var bGeo = new THREE.SphereGeometry(3, 72, 72);
    var bMat = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: false, transparent: true, opacity: 0.035 });
    var bMesh = new THREE.Mesh(bGeo, bMat);
    bScene.add(bMesh);

    // Secondary accent sphere
    var b2Geo  = new THREE.SphereGeometry(2.2, 56, 56);
    var b2Mat  = new THREE.MeshBasicMaterial({ color: 0x0A0AFF, wireframe: false, transparent: true, opacity: 0.04 });
    var b2Mesh = new THREE.Mesh(b2Geo, b2Mat);
    b2Mesh.position.set(2, -1, 0);
    bScene.add(b2Mesh);

    // Store original positions for deformation
    var bPos      = bGeo.attributes.position;
    var bOriginal = new Float32Array(bPos.array);

    function resizeBlob() {
      var section = blobCanvas.closest('section') || blobCanvas.parentElement;
      var w = section.offsetWidth, h = section.offsetHeight;
      if (!w || !h) return;
      bCamera.aspect = w / h;
      bCamera.updateProjectionMatrix();
      bRenderer.setSize(w, h);
    }
    resizeBlob();

    var bt = 0;
    function animateBlob() {
      requestAnimationFrame(animateBlob);
      bt += 0.007;

      // Vertex displacement
      for (var i = 0; i < bPos.count; i++) {
        var ox = bOriginal[i * 3];
        var oy = bOriginal[i * 3 + 1];
        var oz = bOriginal[i * 3 + 2];
        var len = Math.sqrt(ox*ox + oy*oy + oz*oz);
        var noise = Math.sin(ox * 1.2 + bt) * Math.cos(oy * 1.2 + bt * 0.8) * Math.sin(oz * 0.8 + bt * 0.6) * 0.5;
        bPos.setXYZ(i, ox + (ox/len)*noise, oy + (oy/len)*noise, oz + (oz/len)*noise);
      }
      bPos.needsUpdate = true;

      bMesh.rotation.y  = bt * 0.08;
      bMesh.rotation.z  = bt * 0.04;
      b2Mesh.rotation.y = -bt * 0.06;
      b2Mesh.position.x = Math.sin(bt * 0.5) * 2.5;
      b2Mesh.position.y = Math.cos(bt * 0.4) * 1.5;

      bRenderer.render(bScene, bCamera);
    }
    animateBlob();
    window.addEventListener('resize', resizeBlob);
  }

  // ─── ABOUT SCENE ──────────────────────────────────────────

  var aboutCanvas = document.getElementById('about-canvas');
  if (aboutCanvas) {
    var aScene    = new THREE.Scene();
    var aCamera   = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    aCamera.position.z = 4.5;

    var aRenderer = new THREE.WebGLRenderer({ canvas: aboutCanvas, alpha: true, antialias: true });
    aRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    var ambient = new THREE.AmbientLight(0xffffff, 0.25);
    aScene.add(ambient);

    var pLight1 = new THREE.PointLight(0x0A0AFF, 3, 20);
    pLight1.position.set(4, 4, 4);
    aScene.add(pLight1);

    var pLight2 = new THREE.PointLight(0x7C3AED, 2, 20);
    pLight2.position.set(-4, -2, 2);
    aScene.add(pLight2);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight.position.set(1, 2, 3);
    aScene.add(dirLight);

    // Dodecahedron — solid
    var dGeo  = new THREE.DodecahedronGeometry(1.85, 0);
    var dMat  = new THREE.MeshPhongMaterial({
      color:             0x1a1aee,
      emissive:          0x0A0AFF,
      emissiveIntensity: 0.08,
      shininess:         90,
      transparent:       true,
      opacity:           0.88
    });
    var dMesh = new THREE.Mesh(dGeo, dMat);
    aScene.add(dMesh);

    // Wireframe overlay
    var dWireMat  = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true, transparent: true, opacity: 0.18 });
    var dWireMesh = new THREE.Mesh(dGeo, dWireMat);
    aScene.add(dWireMesh);

    function resizeAbout() {
      var wrap = aboutCanvas.parentElement;
      var w = wrap.offsetWidth, h = wrap.offsetHeight;
      if (!w || !h) return;
      aCamera.aspect = w / h;
      aCamera.updateProjectionMatrix();
      aRenderer.setSize(w, h);
    }
    resizeAbout();

    var at = 0;
    function animateAbout() {
      requestAnimationFrame(animateAbout);
      at += 0.005;
      dMesh.rotation.x     = at * 0.32;
      dMesh.rotation.y     = at * 0.42;
      dWireMesh.rotation.x = at * 0.32;
      dWireMesh.rotation.y = at * 0.42;
      pLight1.position.x   = Math.cos(at * 0.7) * 5;
      pLight1.position.y   = Math.sin(at * 0.5) * 5;
      pLight2.position.x   = Math.cos(at * 0.9 + 2) * -4;
      pLight2.position.y   = Math.sin(at * 0.6 + 1) * -3;
      aRenderer.render(aScene, aCamera);
    }
    animateAbout();
    window.addEventListener('resize', resizeAbout);
  }

})();
