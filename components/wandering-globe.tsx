"use client";

import { useEffect, useRef, useState } from "react";

type GlobePosition = {
  top: number; // vh
  left: number; // vw
  scale: number;
};

const DEFAULT_POSITION: GlobePosition = { top: 46, left: 74, scale: 1.15 };

function parseGlobeAttr(value: string | null): GlobePosition | null {
  if (!value) return null;
  const parts = value.split(",").map((v) => parseFloat(v.trim()));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [top, left, scale] = parts;
  return { top, left, scale };
}

/**
 * The site's signature scroll device: a fixed, pure-CSS rotating globe that
 * migrates between sections as the visitor scrolls. Each section declares
 * its target position via `data-globe="top,left,scale"` (vh/vw/factor); the
 * active section is whichever one's center is closest to the viewport
 * center. See claude-code-prompt.md, "Globus", for the full spec this
 * implements.
 */
export function WanderingGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const hasPositionedOnce = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 1100px)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    const updateWidth = () => setNarrow(widthQuery.matches);
    updateMotion();
    updateWidth();
    motionQuery.addEventListener("change", updateMotion);
    widthQuery.addEventListener("change", updateWidth);
    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      widthQuery.removeEventListener("change", updateWidth);
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    function applyPosition(pos: GlobePosition, isDark: boolean) {
      if (!el) return;
      el.style.setProperty("--dl-globe-top", `${pos.top}vh`);
      el.style.setProperty("--dl-globe-left", `${pos.left}vw`);
      el.style.setProperty("--dl-globe-scale", String(pos.scale));
      el.dataset.onDark = isDark ? "true" : "false";
    }

    function findActiveSection() {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-globe]")
      );
      if (sections.length === 0) return null;

      const viewportCenter = window.innerHeight / 2;
      let closest: HTMLElement | null = null;
      let closestDistance = Infinity;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = section;
        }
      }
      return closest;
    }

    function update() {
      const active = findActiveSection();
      const parsed = active
        ? parseGlobeAttr(active.getAttribute("data-globe"))
        : null;
      const pos = parsed ?? DEFAULT_POSITION;
      const isDark = active?.getAttribute("data-globe-dark") === "true";
      applyPosition(pos, Boolean(isDark));
    }

    // First paint: apply the starting position with transitions disabled,
    // then re-enable on the next frame — otherwise the globe visibly flies
    // in from a default spot and crosses the headline.
    if (!hasPositionedOnce.current) {
      el.classList.add("dl-globe-no-transition");
      update();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.remove("dl-globe-no-transition");
          setReady(true);
        });
      });
      hasPositionedOnce.current = true;
    }

    if (reducedMotion) {
      // Wandering disabled: position once, never track scroll again.
      return;
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="dl-globe-wrap dl-globe-no-transition"
      data-narrow={narrow}
      data-reduced-motion={reducedMotion}
      style={{ opacity: ready ? undefined : 0 }}
    >
      <div className="dl-globe-ring dl-globe-ring--outer" />
      <div className="dl-globe-ring dl-globe-ring--inner" />
      <div className="dl-globe-sphere">
        <div className="dl-globe-texture" />
      </div>
    </div>
  );
}
