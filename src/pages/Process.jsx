import { motion } from "framer-motion";
import { processSteps } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, AnimatedHeading } from "../components/Motion";

export default function Process() {
  const { t, lang } = useLanguage();
  const L = (s, k) => (lang === "en" && s[k + "_en"] ? s[k + "_en"] : s[k]);

  return (
    <section id="process" className="section" style={{ background: "var(--paper)", position: "relative" }}>
      <div className="grid-bg" style={{ opacity: 0.6 }} />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 64 }}>
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 18 }}>{t("processLabel")}</div></Reveal>
            <h2 className="section-head">
              <AnimatedHeading lines={[
                <span key="1">{t("processTitle1")}</span>,
                <span key="2" className="serif-it" style={{ color: "var(--accent)" }}>{t("processTitle2")}</span>,
              ]} />
            </h2>
          </div>
          <Reveal delay={0.1}><p style={{ maxWidth: 360, color: "var(--ink-soft)", fontSize: "0.98rem", lineHeight: 1.7 }}>{t("processDesc")}</p></Reveal>
        </div>

        <div style={{ position: "relative" }}>
          {/* connector line */}
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="proc-line" style={{ position: "absolute", top: 32, left: "6%", right: "6%", height: 2, background: "var(--line)", transformOrigin: "left", zIndex: 0 }} />
          <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28, position: "relative", zIndex: 1 }}>
            {processSteps.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, boxShadow: "var(--shadow-md)" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </div>
                <div className="display" style={{ fontSize: "2.4rem", color: "var(--accent)", lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
                <h3 className="display" style={{ fontSize: "1.2rem", marginBottom: 10 }}>{L(s, "title")}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: 1.6 }}>{L(s, "desc")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px){ .proc-grid { grid-template-columns: 1fr 1fr !important; gap: 36px 28px !important; } .proc-line { display: none; } }
        @media (max-width: 520px){ .proc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
