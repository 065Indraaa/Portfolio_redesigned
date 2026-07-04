import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

/* Reveal: fade + rise when entering viewport */
export function Reveal({ children, delay = 0, y = 28, className, style, once = true, amount = 0.3 }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* AnimatedHeading: per-line clip-mask reveal. Pass lines as array of nodes. */
export function AnimatedHeading({ lines, className, style, delay = 0, lineStyle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -10% 0px" });
  return (
    <span ref={ref} className={className} style={style}>
      {lines.map((ln, i) => (
        <span key={i} className="line-mask">
          <motion.span
            style={{ display: "block", ...lineStyle }}
            initial={{ y: "115%" }}
            animate={inView ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.09 }}
          >
            {ln}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Magnetic: element gently follows the cursor */
export function Magnetic({ children, strength = 0.35, className, style, ...rest }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ ...style, x, y, display: "inline-flex" }} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

/* Parallax: translateY based on scroll progress through viewport */
export function Parallax({ children, distance = 60, className, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yv = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: yv }}>
      {children}
    </motion.div>
  );
}

/* Marquee: infinite horizontal loop */
export function Marquee({ children, speed = 26, reverse = false, className, style }) {
  return (
    <div className={className} style={{ overflow: "hidden", width: "100%", ...style }}>
      <motion.div
        className="marquee"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="marquee-track">{children}</div>
        <div className="marquee-track" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}

/* Tilt3D: element leans toward the cursor in 3D space — pairs with .tilt-3d.
   Uses spring rotation; restores flat on leave. strength = max degrees. */
export function Tilt3D({ children, strength = 8, className, style, ...rest }) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });
  const ry = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });
  const tx = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const ty = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * strength * 2);
    rx.set(-py * strength * 2);
    tx.set(px * 6);
    ty.set(py * 6);
  };
  const onLeave = () => { rx.set(0); ry.set(0); tx.set(0); ty.set(0); };

  return (
    <motion.div
      ref={ref}
      className={`tilt-3d${className ? " " + className : ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, x: tx, y: ty, ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
