"use client";
import { useEffect, useRef, useState } from "react";

export default function LottieIcon({
  src,
  fallback = null,
  loop = true,
  speed = 1,
  className = "",
  style,
}) {
  const host = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let dead = false;
    let anim = null;

    setFailed(false);

    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // deep clone – lottie-web mutates the object and this prevents
        // shared/mutated data issues across multiple instances
        const animationData = JSON.parse(JSON.stringify(data));

        const lottie = (await import("lottie-web")).default;
        if (dead || !host.current) return;

        // clear previous content (important with Fast Refresh / Strict Mode)
        host.current.innerHTML = "";

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        anim = lottie.loadAnimation({
          container: host.current,
          renderer: "svg",
          loop,
          autoplay: !reduce,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: true,
          },
        });

        if (speed !== 1) anim.setSpeed(speed);
      } catch (err) {
        console.warn("Could not load Lottie:", src, err);
        if (!dead) setFailed(true);
      }
    })();

    return () => {
      dead = true;
      if (anim) {
        try {
          anim.dest
        } catch (_) {}
      }
      if (host.current) host.current.innerHTML = "";
    };
  }, [src, loop, speed]);

  if (failed) return fallback;
  return <div ref={host} aria-hidden="true" className={className} style={style} />;
}