import { motion } from "framer-motion";
import { skills } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, AnimatedHeading, Parallax } from "../components/Motion";
import ProfilImg from "../assets/Profil.jpg";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section" style={{ background: "var(--paper-2)", position: "relative" }}>
      <div className="container">
        <Reveal><div className="eyebrow" style={{ marginBottom: 18 }}>{t("aboutLabel")}</div></Reveal>
        <h2 className="section-head" style={{ marginBottom: 64 }}>
          <AnimatedHeading lines={[
            <span key="1">{t("aboutTitle1")}</span>,
            <span key="2" className="serif-it" style={{ color: "var(--accent)" }}>{t("aboutTitle2")}</span>,
          ]} />
        </h2>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px,5vw,80px)", alignItems: "start" }}>
          {/* bio + portrait */}
          <div>
            <Reveal>
              <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 28 }}>
                <div style={{ width: 84, height: 84, borderRadius: 18, overflow: "hidden", flexShrink: 0, border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                  <img src={ProfilImg} alt="Indra" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div className="display" style={{ fontSize: "1.25rem" }}>Indra Bachtiar Zakaria</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "var(--accent)", marginTop: 4 }}>{t("aboutRole")}</div>
                </div>
              </div>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, color: "var(--ink-soft)", fontSize: "1.02rem", lineHeight: 1.75 }}>
              {["aboutP1", "aboutP2", "aboutP3"].map((k, i) => (
                <Reveal key={k} delay={i * 0.08}><p dangerouslySetInnerHTML={{ __html: t(k) }} /></Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 28, padding: "10px 18px", borderRadius: 100, border: "1px solid var(--line)", background: "var(--card)" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--accent)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", letterSpacing: "0.06em" }}>{t("aboutAvailable")}</span>
              </div>
            </Reveal>
          </div>

          {/* skills */}
          <div>
            <Reveal><div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 28 }}>{t("aboutSkills")}</div></Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {skills.map((s, i) => {
                const isAI = s.cat === "AI";
                return (
                <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, delay: i * 0.06 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: "0.98rem" }}>{s.name}
                      <span className={`skill-cat${isAI ? " skill-cat-ai" : ""}`} style={{ color: "var(--ink-mute)", fontFamily: "var(--font-mono)", fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.08em", marginLeft: 6 }}>{isAI ? "✦ " : ""}{s.cat}</span>
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--ink-soft)" }}>{s.level}%</span>
                  </div>
                  {s.desc && (
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "var(--ink-mute)", marginBottom: 8, lineHeight: 1.5, letterSpacing: "0.01em" }}>{s.desc}</div>
                  )}
                  <div style={{ height: 6, borderRadius: 6, background: "var(--line)", overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.1, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: "100%", borderRadius: 6, background: isAI
                        ? "repeating-linear-gradient(90deg, var(--accent) 0 8px, var(--accent-deep) 8px 16px)"
                        : "linear-gradient(90deg, var(--accent), var(--accent-deep))" }} />
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 880px){ .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
