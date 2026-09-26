import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initMotion(): void {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateConduit = () => {
    const max = root.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    root.style.setProperty("--conduit-progress", progress.toFixed(4));
  };

  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const setNav = (scrolled: boolean) => {
    if (nav) nav.dataset.scrolled = String(scrolled);
  };

  updateConduit();
  window.addEventListener("resize", updateConduit, { passive: true });

  if (reduce) {
    const onScroll = () => {
      updateConduit();
      setNav(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return;
  }

  const lenis = new Lenis({
    duration: 1.25,
    easing: (x: number) => 1 - Math.pow(1 - x, 4),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on("scroll", () => {
    ScrollTrigger.update();
    updateConduit();
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  setNav(window.scrollY > 24);
  ScrollTrigger.create({
    start: 24,
    end: "max",
    onUpdate: (self) => setNav(self.scroll() > 24),
  });

  const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

  intro
    .to("[data-hero='eyebrow']", { opacity: 1, y: 0, duration: 1 }, 0.1)
    .fromTo(
      "[data-hero='lines'] .line-mask > span",
      { yPercent: 108, y: 0 },
      { yPercent: 0, y: 0, duration: 1.4, stagger: 0.12 },
      0.2,
    )
    .to("[data-hero='standfirst']", { opacity: 1, y: 0, duration: 1.2 }, 0.7)
    .to("[data-hero='actions'] > *", { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.9)
    .fromTo(
      "[data-wire]",
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.12 },
      0.5,
    )
    .fromTo(
      "[data-wire-label]",
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.1 },
      0.9,
    )
    .to("[data-hero='meta']", { opacity: 1, duration: 1.2 }, 1.3)
    .to("[data-conduit-pulse]", { opacity: 0.9, duration: 1.2 }, 1.4);

  document.querySelectorAll<HTMLElement>("[data-reveal-mask]").forEach((el) => {
    const lines = el.querySelectorAll(".line-mask > span");
    if (!lines.length) return;
    gsap.fromTo(
      lines,
      { yPercent: 108, y: 0 },
      {
        yPercent: 0,
        y: 0,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 86%" },
      },
    );
  });

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.25,
        ease: "power4.out",
        stagger: 0.12,
        overwrite: true,
      }),
  });

  ScrollTrigger.batch("[data-reveal-fast]", {
    start: "top 92%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        overwrite: true,
      }),
  });

  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const depth = Number(el.dataset.parallax || "0.12");
    gsap.to(el, {
      yPercent: depth * 100,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const strength = 6;
      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        gsap.to(el, {
          x: x * strength,
          y: y * strength,
          duration: 0.6,
          ease: "power3.out",
        });
      };
      const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
    });
  }
}
