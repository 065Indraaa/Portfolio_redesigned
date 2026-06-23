import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProfilImg from "../assets/Profil.jpg";
import { useLanguage } from "../context/LanguageContext";
import { AnimatedHeading, Magnetic, Marquee } from "../components/Motion";

const tech = ["React", "Next.js", "TypeScript", "React Native", "Node.js", "Flutter", "Solana", "Supabase", "Firebase", "TailwindCSS", "Figma", "Java"];

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const txtY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { n: "1", s: t("heroStat1") },
    { n: "4", s: t("heroStat2") },
    { n: "5+", s: t("heroStat3") },
  ];

  return (
    <section id="hero" ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 140, paddingBottom: 40, overflow: "hidden" }}>
      <div className="grid-bg" />

      {/* big watermark */}
      <motion.div aria-hidden style={{ y: imgY, position: "absolute", right: "-2%", bottom: "10%", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(8rem,26vw,24rem)", color: "var(--line-soft)", lineHeight: 0.8, pointerEvents: "none", zIndex: 0, userSelect: "none" }}>
        2026
      </motion.div>

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <motion.div style={{ y: txtY }}>
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} style={{ marginBottom: 24 }}>
            {t("heroEyebrow")}
          </motion.div>

          {/* GIANT full-width headline */}
          <h1 className="display" style={{ fontSize: "clamp(2.9rem, 8vw, 7rem)", margin: 0 }}>
            <AnimatedHeading
              delay={0.3}
              lines={[
                <span key="1">{t("heroTitle1")}</span>,
                <span key="2" className="serif-it" style={{ color: "var(--accent)", fontWeight: 500 }}>{t("heroTitle2")}</span>,
                <span key="3">{t("heroTitle3")}</span>,
              ]}
            />
          </h1>
        </motion.div>

        {/* row: text left, portrait right */}
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "clamp(30px,5vw,64px)", alignItems: "flex-end", marginTop: "clamp(32px,5vh,56px)" }}>
          <div style={{ minWidth: 0 }}>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }}
              style={{ maxWidth: 460, color: "var(--ink-soft)", fontSize: "1.02rem", lineHeight: 1.7 }}>
              {t("heroDesc")}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9 }}
              style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
              <Magnetic strength={0.3}><a href="#projects" className="btn btn-fill" data-hover>{t("heroCtaProj")} <span>→</span></a></Magnetic>
              <Magnetic strength={0.3}><a href="#contact" className="btn btn-ghost" data-hover>{t("heroCtaContact")}</a></Magnetic>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.9 }}
              style={{ display: "flex", gap: "clamp(24px,4vw,48px)", marginTop: 44, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
              {stats.map((st) => (
                <div key={st.s}>
                  <div className="display" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}>{st.n}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-mute)", marginTop: 4 }}>{st.s}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* portrait */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} style={{ position: "relative", minWidth: 0 }}>
            <div className="hero-portrait" style={{ position: "relative", borderRadius: 22, overflow: "hidden", aspectRatio: "4/5", boxShadow: "var(--shadow-lg)", border: "1px solid var(--line)" }}>
              <motion.img src={ProfilImg} alt="Indra Bachtiar Zakaria" style={{ width: "100%", height: "112%", objectFit: "cover", objectPosition: "center top", y: imgY }} />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
                style={{ position: "absolute", left: 14, bottom: 14, display: "flex", alignItems: "center", gap: 9, padding: "10px 16px", borderRadius: 100, background: "rgba(251,249,244,0.82)", backdropFilter: "blur(10px)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 4px var(--accent-soft)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("heroBadge")}</span>
              </motion.div>
            </div>
            <motion.div initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: -8, opacity: 1 }} transition={{ delay: 1.2, duration: 0.7 }}
              style={{ position: "absolute", top: -16, right: -8, background: "var(--accent)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "7px 13px", borderRadius: 8, boxShadow: "var(--shadow-md)" }}>
              Web · Mobile · Web3
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* marquee bottom */}
      <motion.div style={{ opacity: fade, marginTop: "clamp(40px,7vh,90px)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "20px 0", position: "relative", zIndex: 2 }}>
        <Marquee speed={32}>
          {tech.map((x, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 28, paddingRight: 28, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--ink-2)" }}>
              {x} <span style={{ color: "var(--accent)" }}>✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-portrait { max-width: 360px; margin: 8px auto 0; }
        }
      `}</style>
    </section>
  );
}
