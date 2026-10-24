"use client"; // needed in the Next.js App Router; harmless elsewhere

import { useEffect, useRef } from "react";
import { buildMatteData } from "./rvMatte";


const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

export default function RVVideoReveal({
  animationData,
  videoSrc,
  poster,
  lastFrame = 178,      // frames 176+ are pure "inside the R" = video only
  zoomEnd = 0.8,        // share of the scroll used by the animation; the rest shrinks the video card
  coverFrom = 168,      // frame range in which the card grows to fill the screen
  coverTo = 177,
  easing = 0.15,
  scrollHeight,         // how long the pinned section lasts, e.g. "300vh" (default "330vh")
  hint = "Scroll",
  className,
  style,
}) {
  const container = useRef(null);
  const card = useRef(null);
  const artHost = useRef(null);
  const matteHost = useRef(null);
  const hintEl = useRef(null);

  useEffect(() => {
    let destroyed = false;
    let rafId = 0;
    let eased = 0;
    let artAnim;
    let matteAnim;
    let loaded = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduceMotion ? 1 : easing;

    const scrollProgress = () => {
      const el = container.current;
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total > 0 ? clamp(-r.top / total) : 0;
    };

    const render = () => {
      rafId = 0;
      if (destroyed || loaded < 2 || !card.current) return;

      const target = scrollProgress();
      eased += (target - eased) * k;
      if (Math.abs(target - eased) < 0.0003) eased = target;

      // phase 1: animation frame follows scroll
      const frame = clamp(eased / zoomEnd) * lastFrame;
      artAnim.goToAndStop(frame, true);
      matteAnim.goToAndStop(frame, true);

      // the card grows from "fits the screen" to "covers the screen" while the zoom ends
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cw = card.current.offsetWidth;
      const ch = card.current.offsetHeight;
      const cover = Math.max(vw / cw, vh / ch) * 1.002;
      const grow = smooth(clamp((frame - coverFrom) / (coverTo - coverFrom)));
      let scale = 1 + (cover - 1) * grow;

      // phase 2: video card settles (slight shrink, rounded corners), like the reference
      const settle = clamp((eased - zoomEnd) / (1 - zoomEnd));
      const mobile = vw < 640;
      scale *= 1 - settle * (mobile ? 0.035 : 0.055);
      const ty = settle * (mobile ? 10 : 18);
      const radius = settle * (mobile ? 14 : 20);

      card.current.style.transform = `translateY(${ty}px) scale(${scale})`;
      card.current.style.borderRadius = `${radius / scale}px`;
      if (hintEl.current) hintEl.current.style.opacity = String(clamp(1 - eased * 14));

      if (eased !== target) rafId = requestAnimationFrame(render);
    };

    const kick = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    (async () => {
      const lottie = (await import("lottie-web")).default; // dynamic: keeps it out of SSR
      if (destroyed) return;
      const common = {
        renderer: "svg",
        loop: false,
        autoplay: false,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      };
      // lottie-web modifies the data it is given, so each instance gets its own copy
      const matteData = buildMatteData(animationData);
      const artData = JSON.parse(JSON.stringify(animationData));
      artAnim = lottie.loadAnimation({ ...common, container: artHost.current, animationData: artData });
      matteAnim = lottie.loadAnimation({ ...common, container: matteHost.current, animationData: matteData });
      const ready = () => {
        loaded += 1;
        if (loaded === 2) {
          eased = scrollProgress();
          render();
          window.addEventListener("scroll", kick, { passive: true });
          window.addEventListener("resize", kick);
        }
      };
      artAnim.addEventListener("DOMLoaded", ready);
      matteAnim.addEventListener("DOMLoaded", ready);
    })();

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      artAnim?.destroy();
      matteAnim?.destroy();
    };
  }, [animationData, lastFrame, zoomEnd, coverFrom, coverTo, easing]);

  const layer = { position: "absolute", inset: 0 };

  return (
    <section
      ref={container}
      className={className}
      style={{ position: "relative", height: scrollHeight || "330vh", background: "#fff", ...style }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          width: "100%",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
          background: "#fff",
        }}
      >
       <div
  ref={card}
  style={{
    position: "relative",
    width: "90%",                 // full width of the sticky container
    maxWidth: "100vw",
    aspectRatio: "700 / 500",
    overflow: "hidden",
    isolation: "isolate",
    background: "#fff",
    transformOrigin: "50% 50%",
  }}
>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            src={videoSrc}
            style={{ ...layer, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div ref={matteHost} aria-hidden="true" style={layer} />
          <div
            ref={artHost}
            role="img"
            aria-label="RV Infrastructural Pvt. Ltd. sign being lifted by a crane"
            style={{ ...layer, mixBlendMode: "multiply" }}
          />
        </div>

        {hint ? (
          <p
            ref={hintEl}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "8%",
              margin: 0,
              textAlign: "center",
              font: "600 12px/1.4 system-ui, sans-serif",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#26323a",
              pointerEvents: "none",
            }}
          >
            {hint}
          </p>
        ) : null}
      </div>
    </section>
  );
}