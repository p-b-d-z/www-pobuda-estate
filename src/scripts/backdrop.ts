type Orb = {
  x: number;
  y: number;
  r: number;
  color: string;
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  phase: number;
};

type Mote = {
  x: number;
  y: number;
  z: number;
  size: number;
  drift: number;
  speed: number;
  alpha: number;
};

const COPPER = "184, 115, 51";
const PATINA = "78, 110, 90";

export function initBackdrop(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-backdrop-canvas]");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let orbs: Orb[] = [];
  let motes: Mote[] = [];
  let raf = 0;
  let running = true;
  let t = 0;

  let pointerX = 0;
  let pointerY = 0;
  let parallaxX = 0;
  let parallaxY = 0;
  let scrollParallax = 0;

  const build = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const small = width < 720;
    const orbCount = small ? 3 : 4;
    const moteCount = small ? 34 : 82;

    orbs = Array.from({ length: orbCount }, (_, i) => ({
      x: width * (0.18 + 0.64 * ((i + 0.5) / orbCount)),
      y: height * (0.2 + 0.6 * Math.random()),
      r: Math.max(width, height) * (small ? 0.34 : 0.3) * (0.8 + Math.random() * 0.5),
      color: i % 3 === 1 ? PATINA : COPPER,
      ax: 40 + Math.random() * 90,
      ay: 30 + Math.random() * 70,
      sx: 0.00005 + Math.random() * 0.00009,
      sy: 0.00006 + Math.random() * 0.0001,
      phase: Math.random() * Math.PI * 2,
    }));

    motes = Array.from({ length: moteCount }, () => {
      const z = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: 0.4 + z * 1.5,
        drift: (Math.random() - 0.5) * 0.16,
        speed: 0.08 + z * 0.22,
        alpha: 0.05 + z * 0.28,
      };
    });
  };

  const drawOrbs = () => {
    ctx.globalCompositeOperation = "lighter";
    for (const orb of orbs) {
      const ox = Math.sin(t * orb.sx + orb.phase) * orb.ax;
      const oy = Math.cos(t * orb.sy + orb.phase) * orb.ay;
      const x = orb.x + ox + parallaxX * (1 + orb.r / width) * 0.35;
      const y = orb.y + oy + parallaxY * 0.4 - scrollParallax * 0.04;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
      grad.addColorStop(0, `rgba(${orb.color}, 0.11)`);
      grad.addColorStop(0.45, `rgba(${orb.color}, 0.045)`);
      grad.addColorStop(1, `rgba(${orb.color}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, orb.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  };

  const drawMotes = () => {
    for (const mote of motes) {
      mote.y -= mote.speed;
      mote.x += Math.sin(t * 0.0004 + mote.y * 0.004) * 0.12 + mote.drift;
      if (mote.y < -10) {
        mote.y = height + 10;
        mote.x = Math.random() * width;
      }
      if (mote.x < -10) mote.x = width + 10;
      if (mote.x > width + 10) mote.x = -10;

      const px = mote.x + parallaxX * mote.z * 0.6;
      const py = mote.y + parallaxY * mote.z * 0.4 - scrollParallax * mote.z * 0.02;

      ctx.fillStyle = `rgba(${COPPER}, ${mote.alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, mote.size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const frame = () => {
    if (!running) return;
    t += 16;
    parallaxX += (pointerX - parallaxX) * 0.035;
    parallaxY += (pointerY - parallaxY) * 0.035;
    scrollParallax += (window.scrollY - scrollParallax) * 0.08;

    ctx.clearRect(0, 0, width, height);
    drawOrbs();
    drawMotes();
    raf = requestAnimationFrame(frame);
  };

  const onResize = () => {
    build();
    if (reduce) {
      ctx.clearRect(0, 0, width, height);
      drawOrbs();
      drawMotes();
    }
  };

  const onPointer = (event: PointerEvent) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 60;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 40;
  };

  const onVisibility = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!reduce && !running) {
      running = true;
      raf = requestAnimationFrame(frame);
    }
  };

  build();

  if (reduce) {
    drawOrbs();
    drawMotes();
    window.addEventListener("resize", onResize, { passive: true });
    return;
  }

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  raf = requestAnimationFrame(frame);
}
