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
  initTraceRail();
});

/* Fix for content looking broken/blank after using the browser Back button:
   when a page is restored from the back/forward cache (or reloaded at a
   scroll position other than the top), ScrollTrigger's cached element
   positions can be stale, leaving sections stuck mid-animation or hidden.
   Recalculating on every "pageshow" (which also fires on normal loads) is
   the standard fix. */
window.addEventListener("pageshow", () => {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
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

/* ---------------- Hero particle constellation (Three.js) ----------------
   Signature visual: a dense cloud of tiny triangular glyphs in a full
   chromatic spectrum, arranged into an organic blob/brain-like shape with
   a lighter ambient field scattered around it — "knowledge as distributed
   intelligence" rendered on the white canvas instead of a black void. */
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 11);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  // Shift the constellation toward the right column of the two-col hero.
  group.position.x = 2.4;
  scene.add(group);

  // A small triangle sprite texture, drawn once on a canvas — this is what
  // lets THREE.Points render actual outlined triangles instead of dots.
  function makeTriangleTexture() {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.moveTo(size / 2, size * 0.08);
    ctx.lineTo(size * 0.92, size * 0.88);
    ctx.lineTo(size * 0.08, size * 0.88);
    ctx.closePath();
    ctx.lineWidth = size * 0.09;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }
  const triangleTexture = makeTriangleTexture();

  // Brand-spectrum palette: violet + amber (primary system accents), the
  // real logo's wine-red, plus teal/magenta/blue for chromatic range.
  const palette = [
    0x8052ff, 0x8052ff, 0x8052ff, // violet dominates, as the primary accent
    0xffb829, 0xffb829, // amber
    0x681523, // real brand wine-red
    0x15846e, // teal
    0xc23fb0, // magenta
    0x3f7dc2, // blue
  ];

  function buildParticleField(count, shapeFn, avgSize, opacity) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const p = shapeFn(i);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      color.setHex(palette[Math.floor(Math.random() * palette.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: avgSize,
      map: triangleTexture,
      alphaTest: 0.2,
      transparent: true,
      opacity,
      vertexColors: true,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }

  // Organic "brain-like" blob: two overlapping lobes with noisy radius.
  function brainShape(seed) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const lobe = Math.random() < 0.5 ? -1 : 1;
    const base = 2.1;
    const noise = 0.35 * Math.sin(seed * 12.9) * Math.cos(seed * 7.3);
    const r = base + noise + Math.random() * 0.5;
    const x = r * Math.sin(phi) * Math.cos(theta) * 0.85 + lobe * 0.55;
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.72;
    const z = r * Math.cos(phi) * 0.85;
    return { x, y, z };
  }

  // Sparse ambient field drifting further out, lower density.
  function ambientShape() {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 3.4 + Math.random() * 3.2;
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta) * 0.8,
      z: r * Math.cos(phi) * 0.6,
    };
  }

  const brainCount = window.innerWidth < 700 ? 900 : 1800;
  const ambientCount = window.innerWidth < 700 ? 220 : 420;
  const brainPoints = buildParticleField(brainCount, brainShape, 0.075, 0.95);
  const ambientPoints = buildParticleField(ambientCount, ambientShape, 0.045, 0.4);
  group.add(brainPoints);
  group.add(ambientPoints);

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
      group.rotation.y = t * 0.06;
      brainPoints.rotation.z = Math.sin(t * 0.15) * 0.05;
      ambientPoints.rotation.y = -t * 0.03;
    }

    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(group.position.x * 0.3, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // Drift the constellation back and fade slightly as the user scrolls
  // past the hero, matching the rest of the scroll-fade choreography.
  if (window.gsap && window.ScrollTrigger) {
    gsap.to(group.position, {
      z: -3,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(canvas, {
      opacity: 0.2,
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
  if (!window.gsap || !window.ScrollTrigger) {
    // GSAP failed to load (e.g. CDN blocked) — .reveal elements are hidden
    // by default in CSS, so un-hide them directly instead of leaving the
    // page permanently blank.
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

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
    .from(".hero-meta > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");

  /* --- Hero scroll animation: headline scales/tilts away, cards drift in 3D ---
     Uses fromTo with an explicit, pinned start state (opacity: 1, y: 0)
     instead of gsap.to(), which only captures its "from" value implicitly
     from whatever the element's current style happens to be. That implicit
     capture could be thrown off by web fonts loading late and reflowing the
     hero (changing its height after ScrollTrigger first measured it), which
     left the text stuck partly faded even after scrolling back to the top.
     invalidateOnRefresh + the fonts.ready refresh below keep it correct. */
  gsap.fromTo(
    ".hero-title, .hero-sub, .hero-actions, .hero-meta",
    { opacity: 1, y: 0 },
    {
      y: -80,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "60% top",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    }
  );

  // Web fonts can finish loading after ScrollTrigger's initial measurement,
  // subtly changing the hero's height/line-heights; re-measure once they're
  // ready so scroll-tied animations line up correctly at the very top.
  if (window.document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  /* --- Generic reveal-on-scroll for sections ---
     Excludes .service-card/.team-card: those get their own tween below
     (with a rotateX/Y flourish) — giving one element two competing
     opacity/y tweens is what caused the flash-then-disappear bug.
     `once: true` is essential here: without it, ScrollTrigger's default
     behavior REVERSES the reveal when you scroll back up past the trigger
     point, and stopping mid-reverse is exactly what left text looking
     half-faded/"greyed out" when scrolling up and down. */
  gsap.utils.toArray(".reveal:not(.service-card):not(.team-card)").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });
  });

  /* --- Staggered groups ---
     Same exclusion as above: service/team cards get their own tween. */
  gsap.utils.toArray("[data-stagger]").forEach((group) => {
    const items = group.querySelectorAll(".reveal:not(.service-card):not(.team-card)");
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: group,
        start: "top 85%",
        once: true,
      },
    });
  });

  /* --- 3D tilt drift for service/team cards on scroll ---
     These also carry the .reveal class, so give them their rotateX/Y
     flourish on the SAME tween as the generic reveal above instead of a
     second competing tween — two GSAP tweens fighting over the same
     opacity/y on one element causes a visible flash/snap. `once: true`
     for the same reason as above: never reverse/re-fade on scroll-up. */
  gsap.utils.toArray(".service-card.reveal, .team-card.reveal").forEach((card, i) => {
    gsap.fromTo(
      card,
      { rotateY: i % 2 === 0 ? -10 : 10, rotateX: 8 },
      {
        rotateY: 0,
        rotateX: 0,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true,
        },
      }
    );
  });

  /* --- Timeline items --- */
  gsap.utils.toArray(".timeline-item").forEach((item) => {
    gsap.from(item, {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: item, start: "top 92%", once: true },
    });
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

/* ---------------- Direktverbindung trace (signature scroll move) ----------------
   A literal "direct line" drawn by the scroll itself: independent of GSAP so
   it keeps working even if that CDN is unavailable. Fills a fixed rail with
   the brand violet in step with page progress and lights up each section's
   stop as it is reached; clicking a stop jumps straight to that section. */
function initTraceRail() {
  const rail = document.getElementById("traceRail");
  const fill = document.getElementById("traceFill");
  if (!rail || !fill) return;

  const dots = Array.from(rail.querySelectorAll(".trace-dot"));
  const sections = dots
    .map((dot) => ({ dot, el: document.getElementById(dot.dataset.target) }))
    .filter((s) => s.el);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  let ticking = false;
  function update() {
    ticking = false;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    fill.style.width = progress * 100 + "%";

    // Stay hidden over the hero itself so the rail never competes with (or
    // gets covered by) the hero's own last row of content; it fades in once
    // the visitor actually starts scrolling through the page.
    rail.classList.toggle("visible", scrollTop > 80);

    const activationLine = scrollTop + window.innerHeight * 0.5;
    let activeIndex = 0;
    sections.forEach((s, i) => {
      if (s.el.offsetTop <= activationLine) activeIndex = i;
    });
    sections.forEach((s, i) => s.dot.classList.toggle("active", i === activeIndex));
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update);
  update();
}
