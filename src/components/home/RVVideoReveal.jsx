"use client"; // needed in the Next.js App Router; harmless elsewhere

import { useEffect, useRef } from "react";
import { buildMatteData } from "./rvMatte";


const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t);

// The crane / board slide in from just outside the 700x500 comp. The comp is only as wide as the
// fitted animation frame, which can be much narrower than the screen, so push the start (and the
// exit) point further left by `extra` comp units: the crane then enters from the screen's left edge.
function shiftEntry(data, extra) {
  if (!(extra > 0)) return data;
  const comp = data.assets.find((a) => a.layers);
  for (const layer of comp.layers) {
    const p = layer.ks && layer.ks.p;
    if (!p || p.a !== 1 || !Array.isArray(p.k) || p.k[0].t !== 0) continue;
    const kfs = p.k;
    const startX = kfs[0].s[0];
    const last = kfs[kfs.length - 1];
    kfs[0].s[0] -= extra;
    if (kfs.length > 2 && Math.abs(last.s[0] - startX) < 0.01) last.s[0] -= extra; // exit back to the left
    for (let i = 0; i < kfs.length - 1; i++) {
      if (kfs[i].to) {
        kfs[i].to = kfs[i + 1].s.map((v, j) => (v - kfs[i].s[j]) / 6);
        kfs[i].ti = kfs[i].to.map((v) => -v);
      }
    }
  }
  return data;
}

export default function RVVideoReveal({
  animationData,
  videoSrc,
  poster,
  lastFrame = 178,      // frames 176+ are pure "inside the R" = video only
  zoomEnd = 0.75,       // share of the scroll used by the animation; the rest expands the video
  easing = 0.15,
  topOffset = 80,       // px reserved for the sticky navbar so nothing hides underneath it
  bottomOffset = 24,    // px kept free at the bottom of the screen
  fit = 0.96,           // how much of the free area the animation / video may use (1 = edge to edge)
  scrollHeight,         // how long the pinned section lasts, e.g. "300vh" (default "330vh")
  hint = "Scroll",
  className,
  style,
}) {
  const container = useRef(null);
  const stage = useRef(null);
  const box = useRef(null);       // the 700x500 animation frame
  const clip = useRef(null);      // clips the video (animation frame -> full video)
  const videoEl = useRef(null);
  const videoRatio = useRef(16 / 9);
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

    // Size everything from the space that is really free on screen (below the navbar),
    // so the animation and the video can never be taller / wider than the viewport.
    const geometry = () => {
      const vw = stage.current.clientWidth;
      const vh = stage.current.clientHeight;
      const availH = Math.max(120, vh - topOffset - bottomOffset);
      const availW = vw;
      const cy = topOffset + availH / 2;
      const compRatio = (animationData && animationData.w && animationData.h)
        ? animationData.w / animationData.h
        : 700 / 500;
      const vr = videoRatio.current;

      // animation frame: largest box of the comp's aspect ratio that fits (contain)
      const aw = Math.min(availW * fit, availH * fit * compRatio);
      const ah = aw / compRatio;
      // final video: largest box of the video's aspect ratio that fits (contain, no crop)
      const vfh = Math.min(availH * fit, (availW * fit) / vr);
      const vfw = vfh * vr;
      return { vw, vh, cy, aw, ah, vr, vfw, vfh };
    };

    const layout = (g) => {
      if (!box.current || !videoEl.current) return;
      const b = box.current.style;
      b.width = `${g.vw}px`; // full screen width: the crane may travel outside the 700x500 comp area
      b.height = `${g.ah}px`;
      b.transform = "none"; // CSS fallback centering is no longer needed once px are set
      b.left = "0px";
      b.top = `${g.cy - g.ah / 2}px`;
      // the video element starts as a "cover" of the animation frame and is scaled up later
      const v = videoEl.current.style;
      const w0 = g.ah * g.vr;
      v.width = `${w0}px`;
      v.height = `${g.ah}px`;
      v.left = `${(g.vw - w0) / 2}px`;
      v.top = `${g.cy - g.ah / 2}px`;
    };

    const render = () => {
      rafId = 0;
      if (destroyed || loaded < 2 || !stage.current) return;

      const target = scrollProgress();
      eased += (target - eased) * k;
      if (Math.abs(target - eased) < 0.0003) eased = target;

      const g = geometry();
      layout(g);

      // phase 1: animation frame follows scroll (animation stays fully inside its frame)
      const frame = clamp(eased / zoomEnd) * lastFrame;
      artAnim.goToAndStop(frame, true);
      matteAnim.goToAndStop(frame, true);

      // phase 2: after the zoom into the "R", the video opens up from the animation
      // frame to the whole screen
      const t = smooth(clamp((eased - zoomEnd) / (1 - zoomEnd)));
      const clipW = g.aw + (g.vw - g.aw) * t;
      const clipH = g.ah + (g.vh - g.ah) * t;
      const cyT = g.cy + (g.vh / 2 - g.cy) * t;
      const left = (g.vw - clipW) / 2;
      clip.current.style.clipPath =
        `inset(${cyT - clipH / 2}px ${left}px ${g.vh - (cyT + clipH / 2)}px ${left}px)`;

      // the video starts as a "cover" of the animation frame and ends as a "cover" of the screen
      const w0 = g.ah * g.vr;
      const sEnd = Math.max(g.vw / w0, g.vh / g.ah);
      const sc = 1 + (sEnd - 1) * t;
      videoEl.current.style.transform = `translateY(${cyT - g.cy}px) scale(${sc})`;

      // the animation layers fade out once the video takes over
      const layerOpacity = String(1 - clamp(t * 5));
      matteHost.current.style.opacity = layerOpacity;
      artHost.current.style.opacity = layerOpacity;

      if (hintEl.current) hintEl.current.style.opacity = String(clamp(1 - eased * 14));

      if (eased !== target) rafId = requestAnimationFrame(render);
    };

    const kick = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    const vEl = videoEl.current;
    const onMeta = () => {
      if (vEl && vEl.videoWidth && vEl.videoHeight) {
        videoRatio.current = vEl.videoWidth / vEl.videoHeight;
        kick();
      }
    };
    vEl?.addEventListener("loadedmetadata", onMeta);
    onMeta();
    if (stage.current) layout(geometry());

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
      const g0 = geometry();
      const extra = ((g0.vw - g0.aw) / 2) / (g0.aw / (animationData.w || 700));
      const shifted = shiftEntry(JSON.parse(JSON.stringify(animationData)), extra);
      const matteData = buildMatteData(shifted);
      const artData = JSON.parse(JSON.stringify(shifted));
      artAnim = lottie.loadAnimation({ ...common, container: artHost.current, animationData: artData });
      matteAnim = lottie.loadAnimation({ ...common, container: matteHost.current, animationData: matteData });
      const ready = () => {
        loaded += 1;
        // lottie clips the drawing to the comp rectangle; remove it so the scene can use the full width
        [artAnim, matteAnim].forEach((a) => a?.renderer?.layerElement?.removeAttribute("clip-path"));
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
      vEl?.removeEventListener("loadedmetadata", onMeta);
      artAnim?.destroy();
      matteAnim?.destroy();
    };
  }, [animationData, lastFrame, zoomEnd, easing, topOffset, bottomOffset, fit]);

  const layer = { position: "absolute", inset: 0 };

  return (
    <section
      ref={container}
      className={className}
      style={{ position: "relative", height: scrollHeight || "330vh", background: "#fff", ...style }}
    >
      <div
        ref={stage}
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          width: "100%",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* one isolated group: video + matte + art, so the multiply blend still works */}
        <div style={{ ...layer, isolation: "isolate", background: "#fff" }}>
          {/* video: clipped to the animation frame first, then opened up to the full video */}
          <div ref={clip} style={{ ...layer, overflow: "hidden" }}>
            <video
              ref={videoEl}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={poster}
              src={videoSrc}
              style={{
                position: "absolute",
                // sizes are set from JS; this is only the pre-hydration fallback
                width: "min(96vw, 160vh)",
                aspectRatio: "16 / 9",
                left: 0,
                top: 0,
                objectFit: "contain", // box already has the video's ratio, so nothing is cropped
                transformOrigin: "50% 50%",
                willChange: "transform",
              }}
            />
          </div>

          {/* animation frame: always fully visible (contain), never larger than the free screen area */}
          <div
            ref={box}
            style={{
              position: "absolute",
              // fallback until JS measures: fit below the navbar, keep 700:500 ratio
              width: "100%",
              height: `min(calc(96vw / 1.4), calc((100svh - ${topOffset + bottomOffset}px) * 0.96))`,
              left: 0,
              top: `${topOffset}px`,
            }}
          >
            <div ref={matteHost} aria-hidden="true" style={layer} />
            <div
              ref={artHost}
              role="img"
              aria-label="RV Infrastructural Pvt. Ltd. sign being lifted by a crane"
              style={{ ...layer, mixBlendMode: "multiply" }}
            />
          </div>
        </div>

        {hint ? (
          <p
            ref={hintEl}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 6,
              margin: 0,
              textAlign: "center",
              font: "600 11px/1.4 system-ui, sans-serif",
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