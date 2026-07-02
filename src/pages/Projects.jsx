import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, AnimatedHeading, Magnetic } from "../components/Motion";
import BrowserMockup from "../components/BrowserMockup";
import AndroidMockup from "../components/AndroidMockup";

import lumiImg from "../assets/Lumi.png";
import ponyinImg from "../assets/Ponyin.png";
import mobileImg from "../assets/Mobile.png";
import desktopImg from "../assets/Dekstop.png";
import hackatonImg from "../assets/Hackaton.jpg";
import stumbleImg from "../assets/stumble.jpg";

const imgMap = { WENWORK: lumiImg, PONYIN: ponyinImg, AORA: mobileImg, "Q-HADIRIN": desktopImg, "STUMBLE PUMP": stumbleImg };

function localized(p, key, lang) {
  return lang === "en" && p[key + "_en"] ? p[key + "_en"] : p[key];
}

/* ── PROJECT CARD ── */
function ProjectCard({ p, index, onOpen, lang }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 0.98]);
  const isMobile = p.mockupType === "android";

  return (
    <motion.article
      ref={ref}
      data-cursor data-cursor-label="View"
      onClick={() => onOpen(p)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      style={{ cursor: "pointer", borderRadius: 22, overflow: "hidden", background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", background: "var(--paper-2)", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "26px 0 0" : 26 }}>
        <motion.div style={{ scale: imgScale, width: "100%", maxWidth: isMobile ? 150 : 340, display: "flex", justifyContent: "center" }}>
          {isMobile
            ? <AndroidMockup title={p.title} accent={p.mockupAccent} imageSrc={imgMap[p.title]} />
            : <BrowserMockup title={p.title} imageSrc={imgMap[p.title]} url={p.link?.replace(/^https?:\/\//, "").replace(/\/$/, "")} />}
        </motion.div>
        <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-mono)", fontSize: "0.64rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-mute)", background: "rgba(251,249,244,0.85)", padding: "5px 10px", borderRadius: 100, border: "1px solid var(--line)" }}>{p.year}</span>
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>{localized(p, "category", lang)}</div>
        <h3 className="display" style={{ fontSize: "1.6rem", marginBottom: 8 }}>{p.title}</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: 16 }}>{localized(p, "subtitle", lang)}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tech.slice(0, 3).map((tch) => <span key={tch} className="chip" style={{ fontSize: "0.64rem", padding: "4px 10px" }}>{tch}</span>)}
          {p.tech.length > 3 && <span className="chip" style={{ fontSize: "0.64rem", padding: "4px 10px" }}>+{p.tech.length - 3}</span>}
        </div>
      </div>
    </motion.article>
  );
}

/* ── FEATURED ── */
function Featured({ p, onOpen, lang }) {
  const { t } = useLanguage();
  return (
    <Reveal>
      <div className="feat" onClick={() => onOpen(p)} data-cursor data-cursor-label="Case Study"
        style={{ cursor: "pointer", display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 0, borderRadius: 26, overflow: "hidden", background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)", marginBottom: 28 }}>
        <div style={{ padding: "clamp(28px,4vw,52px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {p.achievement && (
            <div style={{ display: "inline-flex", alignSelf: "flex-start", gap: 8, alignItems: "center", padding: "7px 14px", borderRadius: 100, background: "var(--accent-soft)", color: "var(--accent-deep)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", marginBottom: 22 }}>
              {localized(p, "achievement", lang)}
            </div>
          )}
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{localized(p, "category", lang)}</div>
          <h3 className="display" style={{ fontSize: "clamp(2.4rem,4vw,3.4rem)", marginBottom: 14 }}>{p.title}</h3>
          <p style={{ color: "var(--ink-soft)", fontSize: "1rem", lineHeight: 1.65, marginBottom: 24, maxWidth: 480 }}>{localized(p, "desc", lang)}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
            {p.tech.map((tch) => <span key={tch} className="chip">{tch}</span>)}
          </div>
          <span className="btn btn-fill" data-hover style={{ alignSelf: "flex-start" }}>{t("caseStudy")} <span>→</span></span>
        </div>
        <div style={{ background: "var(--paper-2)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(28px,4vw,56px)", position: "relative" }}>
          <div style={{ width: "100%", maxWidth: 560 }}>
            <BrowserMockup title={p.title} imageSrc={imgMap[p.title]} url={p.link?.replace(/^https?:\/\//, "").replace(/\/$/, "")} />
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 880px){ .feat { grid-template-columns: 1fr !important; } .feat > div:last-child { order: -1; } }`}</style>
    </Reveal>
  );
}

/* ── MODAL ── */
function ProjectModal({ p, onClose, lang }) {
  const { t } = useLanguage();
  if (!p) return null;
  const isMobile = p.mockupType === "android";
  const paras = [localized(p, "modalP1", lang), localized(p, "modalP2", lang), localized(p, "modalP3", lang)].filter(Boolean);
  return (
    <motion.div data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(22,20,15,0.5)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "clamp(16px,4vh,60px) 16px", overflowY: "auto" }}>
      <motion.div initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 880, background: "var(--paper)", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)" }}>
        {/* header media */}
        <div style={{ position: "relative", background: "var(--paper-2)", padding: "44px 44px 0", display: "flex", justifyContent: "center" }}>
          <button onClick={onClose} data-hover style={{ position: "absolute", top: 18, right: 18, width: 42, height: 42, borderRadius: "50%", background: "var(--card)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", zIndex: 3, boxShadow: "var(--shadow-sm)" }}>✕</button>
          <div style={{ width: "100%", maxWidth: isMobile ? 220 : 560 }}>
            {isMobile
              ? <AndroidMockup title={p.title} accent={p.mockupAccent} imageSrc={imgMap[p.title]} />
              : <BrowserMockup title={p.title} imageSrc={imgMap[p.title]} url={p.link?.replace(/^https?:\/\//, "").replace(/\/$/, "")} />}
          </div>
        </div>
        <div style={{ padding: "clamp(28px,4vw,48px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 8 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>{localized(p, "category", lang)}</div>
              <h2 className="display" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>{p.title}</h2>
            </div>
            <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--ink-soft)" }}>
              <div>{p.client}</div><div style={{ color: "var(--ink-mute)" }}>{p.year}</div>
            </div>
          </div>
          {p.achievement && <div style={{ display: "inline-block", padding: "8px 14px", borderRadius: 100, background: "var(--accent-soft)", color: "var(--accent-deep)", fontFamily: "var(--font-mono)", fontSize: "0.72rem", margin: "10px 0 22px" }}>{localized(p, "achievement", lang)}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "var(--ink-soft)", fontSize: "1rem", lineHeight: 1.7 }}>
            {paras.map((x, i) => <p key={i}>{x}</p>)}
          </div>

          {p.metrics && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, margin: "28px 0" }}>
              {p.metrics.map((m) => (
                <div key={m} className="card" style={{ padding: "16px 18px", boxShadow: "none" }}>
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>◆</span>
                  <span style={{ fontSize: "0.84rem" }}>{m}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: 12 }}>{t("techStack")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
            {p.tech.map((tch) => <span key={tch} className="chip">{tch}</span>)}
          </div>

          {p.link && p.link !== "#" && (
            <Magnetic strength={0.25}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-fill" data-hover>
                {p.type === "web" ? (p.title === "PONYIN" ? t("visitPonyin") : t("visitApp")) : t("visitGithub")} <span>↗</span>
              </a>
            </Magnetic>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── MAIN ── */
export default function Projects() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);

  const filters = [
    { id: "all", label: t("filterAll") },
    { id: "web", label: t("filterWeb") },
    { id: "mobile", label: t("filterMobile") },
    { id: "desktop", label: t("filterDesktop") },
  ];

  const featured = projects.find((p) => p.featured);
  const list = projects.filter((p) => (filter === "all" ? true : p.type === filter));
  const gridList = list.filter((p) => p !== featured || filter !== "all");

  return (
    <section id="projects" className="section" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 18 }}>{t("projectsLabel")}</div></Reveal>
            <h2 className="section-head">
              <AnimatedHeading lines={[<span key="a">{t("projectsTitle1")} <span className="serif-it" style={{ color: "var(--accent)" }}>{t("projectsTitle2")}</span></span>]} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filters.map((f) => (
                <button key={f.id} data-hover onClick={() => setFilter(f.id)}
                  style={{ position: "relative", fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 18px", borderRadius: 100, border: "1px solid var(--line)", color: filter === f.id ? "var(--paper)" : "var(--ink-soft)", transition: "color .3s" }}>
                  {filter === f.id && <motion.span layoutId="filter-pill" style={{ position: "absolute", inset: 0, background: "var(--ink)", borderRadius: 100, zIndex: -1 }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {filter === "all" && featured && <Featured p={featured} onOpen={setActive} lang={lang} />}

        <motion.div layout className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          <AnimatePresence mode="popLayout">
            {gridList.map((p, i) => (
              <motion.div key={p.title} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                <ProjectCard p={p} index={i} onOpen={setActive} lang={lang} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{active && <ProjectModal p={active} onClose={() => setActive(null)} lang={lang} />}</AnimatePresence>
    </section>
  );
}
