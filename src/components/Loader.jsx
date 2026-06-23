import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 8) + 3;
      if (n >= 100) { n = 100; clearInterval(id); }
      setCount(n);
      if (n === 100) {
        setTimeout(() => { setGone(true); }, 450);
        setTimeout(() => { onDone && onDone(); }, 1250);
      }
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 10000, background: "var(--paper)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "clamp(24px,5vw,64px)",
          }}
        >
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
              Indra Bachtiar Zakaria
            </div>
            <div className="display" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", lineHeight: 1 }}>
              Portfolio<span style={{ color: "var(--accent)" }}>.</span>
            </div>
          </div>

          {/* bottom progress */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div className="display" style={{ fontSize: "clamp(3rem,12vw,9rem)", lineHeight: 0.85 }}>
              {count}<span style={{ color: "var(--accent)" }}>%</span>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mute)", paddingBottom: 8 }}>
              Loading
            </div>
          </div>
          <div style={{ height: 3, background: "var(--line)", marginTop: 18, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${count}%`, background: "var(--accent)", transition: "width 0.2s linear" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
