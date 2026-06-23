import { useEffect, useState, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    document.body.classList.add("cursor-active");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      const t = e.target.closest("[data-cursor]");
      if (t) { setHover(true); setLabel(t.getAttribute("data-cursor-label") || ""); }
      else {
        const i = e.target.closest("a,button,input,textarea,select,[data-hover]");
        setHover(!!i); setLabel("");
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); document.body.classList.remove("cursor-active"); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{
        position: "fixed", top: 0, left: 0, width: 7, height: 7, borderRadius: "50%",
        background: "#ffffff", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference",
        transition: "width .25s, height .25s, opacity .25s", opacity: hover ? 0 : 1,
      }} />
      <div ref={ring} className="cursor-ring" style={{
        position: "fixed", top: 0, left: 0,
        width: hover ? 64 : 34, height: hover ? 64 : 34, borderRadius: "50%",
        border: "1.5px solid #ffffff", background: "transparent",
        pointerEvents: "none", zIndex: 9998, mixBlendMode: "difference",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "width .35s var(--ease-out-expo), height .35s var(--ease-out-expo)",
        color: "#ffffff", fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {hover && label ? label : ""}
      </div>
    </>
  );
}
