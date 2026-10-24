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
    let anim;
    setFailed(false);
    (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("lottie file not found");
        const data = await res.json();
        const lottie = (await import("lottie-web")).default; // dynamic: keeps it out of SSR
        if (dead || !host.current) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        anim = lottie.loadAnimation({
          container: host.current,
          renderer: "svg",
          loop,
          autoplay: !reduce,
          animationData: data,
          rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
        });
        anim.setSpeed(speed);
      } catch {
        if (!dead) setFailed(true);
      }
    })();
    return () => {
      dead = true;
      anim?.destroy();
    };
  }, [src, loop, speed]);

  if (failed) return fallback;
  return <div ref={host} aria-hidden="true" className={className} style={style} />;
}
