/* ============================================================
   Direct Line Marketing – site interactions
   Three.js hero (3D "network of connections") + GSAP/ScrollTrigger
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeroCanvas();
  initScrollAnimations();
  initCounters();
  initTiltCards();
  initYear();
});

/* ---------------- Navigation ---------------- */
function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }
}

function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------- 3D Hero (Three.js) ---------------- */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  // Node points forming a "direct line" network
  const NODE_COUNT = 90;
  const nodePositions = [];
  const nodeGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    const radius = 3.6 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    const z = radius * Math.cos(phi);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    nodePositions.push(new THREE.Vector3(x, y, z));
  }
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const nodeMat = new THREE.PointsMaterial({
    color: 0x4f8cff,
    size: 0.07,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(nodeGeo, nodeMat);
  group.add(points);

  // Connecting "direct lines" between nearby nodes
  const lineVerts = [];
  const MAX_DIST = 2.1;
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      if (nodePositions[i].distanceTo(nodePositions[j]) < MAX_DIST) {
        lineVerts.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
        lineVerts.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x2f6fed,
    transparent: true,
    opacity: 0.18,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // A glowing orange "signal" core
  const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xff6a3d,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  const coreGlowGeo = new THREE.IcosahedronGeometry(0.9, 1);
  const coreGlowMat = new THREE.MeshBasicMaterial({
    color: 0xff8a5c,
    transparent: true,
    opacity: 0.12,
  });
  group.add(new THREE.Mesh(coreGlowGeo, coreGlowMat));

  group.rotation.x = 0.15;

  function resize() {
    const { clientWidth, clientHeight } = canvas;
    if (clientWidth === 0 || clientHeight === 0) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
  }
  resize();
  window.addEventListener("resize", resize);

  let mouseX = 0, mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      group.rotation.y = t * 0.08;
      core.rotation.y = -t * 0.35;
      core.rotation.x = t * 0.2;
      const pulse = 1 + Math.sin(t * 1.6) * 0.06;
      core.scale.setScalar(pulse);
    }

    camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.7 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // Push the whole network back / fade as the user scrolls past the hero
  if (window.gsap && window.ScrollTrigger) {
    gsap.to(group.position, {
      z: -4,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(canvas, {
      opacity: 0.15,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

/* ---------------- Scroll-driven animation (GSAP + ScrollTrigger) ---------------- */
function initScrollAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Only now opt into the CSS hidden starting state for .reveal elements —
  // keeps content visible by default if this script never runs.
  document.documentElement.classList.add("js-anim");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    gsap.set(".reveal", { opacity: 1, y: 0 });
    return;
  }

  /* --- Hero entrance --- */
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.7 })
    .from(".hero-title .line", { y: 60, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.4")
    .from(".hero-sub", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
    .from(".hero-actions > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
    .from(".hero-meta > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
    .from(
      ".hero-card",
      { y: 50, opacity: 0, rotateX: 20, duration: 1, stagger: 0.15, transformOrigin: "center" },
      "-=0.9"
    );

  /* --- Hero scroll animation: headline scales/tilts away, cards drift in 3D --- */
  gsap.to(".hero-title, .hero-sub, .hero-actions, .hero-meta", {
    y: -80,
    opacity: 0,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "60% top",
      scrub: 0.6,
    },
  });

  gsap.utils.toArray(".hero-card").forEach((card, i) => {
    gsap.to(card, {
      z: -120 - i * 40,
      rotateX: 12,
      y: (i % 2 === 0 ? -1 : 1) * 60,
      opacity: 0.15,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });

  /* --- Generic reveal-on-scroll for sections --- */
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
      },
    });
  });

  /* --- Staggered groups --- */
  gsap.utils.toArray("[data-stagger]").forEach((group) => {
    const items = group.querySelectorAll(".reveal");
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
      },
    });
  });

  /* --- 3D tilt drift for service/team cards on scroll --- */
  gsap.utils.toArray(".service-card, .team-card").forEach((card, i) => {
    gsap.from(card, {
      rotateY: i % 2 === 0 ? -10 : 10,
      rotateX: 8,
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
      },
    });
  });

  /* --- Timeline items --- */
  gsap.utils.toArray(".timeline-item").forEach((item) => {
    gsap.from(item, {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: item, start: "top 92%" },
    });
  });

  /* --- Page hero (subpages) fade/slide in --- */
  gsap.from(".page-hero .reveal", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  });
}

/* ---------------- Animated counters ---------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const obj = { val: 0 };
    if (window.gsap) {
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    } else {
      el.textContent = target + suffix;
    }
  };

  if (window.ScrollTrigger) {
    counters.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => animate(el),
      });
    });
  } else {
    counters.forEach(animate);
  }
}

/* ---------------- Mouse-based 3D tilt for cards ---------------- */
function initTiltCards() {
  const cards = document.querySelectorAll(".team-card, .hero-card, .service-card");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  cards.forEach((card) => {
    card.style.transformStyle = "preserve-3d";
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      if (window.gsap) {
        gsap.to(card, {
          rotateY: px * 14,
          rotateX: -py * 14,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      }
    });
    card.addEventListener("mouseleave", () => {
      if (window.gsap) {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
      }
    });
  });
}
