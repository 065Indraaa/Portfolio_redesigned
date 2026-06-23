import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { Magnetic } from "./Motion";

export default function Navbar({ activeSection }) {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#projects", label: t("navProjects"), id: "projects" },
    { href: "#about", label: t("navAbout"), id: "about" },
    { href: "#process", label: t("navProcess"), id: "process" },
    { href: "#contact", label: t("navContact"), id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, display: "flex", justifyContent: "center", padding: scrolled ? "14px var(--gutter)" : "22px var(--gutter)", transition: "padding .4s var(--ease-out-expo)" }}
    >
      <nav style={{
        width: "100%", maxWidth: "var(--maxw)", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "10px 14px 10px 22px" : "4px 4px 4px 4px",
        borderRadius: 100,
        background: scrolled ? "rgba(251,249,244,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        border: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "all .45s var(--ease-out-expo)",
      }}>
        <a href="#hero" data-hover style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em", paddingLeft: scrolled ? 0 : 8 }}>
          Indra<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* center links */}
        <div className="nav-links" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {links.map((l) => {
            const active = activeSection === l.id;
            return (
              <a key={l.href} href={l.href} data-hover style={{ position: "relative", fontFamily: "var(--font-mono)", fontSize: "0.74rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 14px", color: active ? "var(--ink)" : "var(--ink-mute)", transition: "color .3s" }}>
                {l.label}
                {active && (
                  <motion.span layoutId="nav-pill" style={{ position: "absolute", inset: 0, borderRadius: 100, background: "var(--accent-soft)", zIndex: -1 }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </a>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={toggleLang} data-hover style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.06em", color: "var(--ink-soft)", padding: "8px 6px" }}>
            <span style={{ color: lang === "id" ? "var(--ink)" : "var(--ink-mute)", fontWeight: lang === "id" ? 500 : 400 }}>ID</span>
            <span style={{ opacity: 0.4, margin: "0 4px" }}>/</span>
            <span style={{ color: lang === "en" ? "var(--ink)" : "var(--ink-mute)", fontWeight: lang === "en" ? 500 : 400 }}>EN</span>
          </button>
          <Magnetic strength={0.4}>
            <a href="#contact" className="btn btn-fill" data-hover style={{ padding: "13px 22px", fontSize: "0.72rem" }}>{t("navHireMe")}</a>
          </Magnetic>
        </div>
      </nav>

      <style>{`
        @media (max-width: 860px) { .nav-links { display: none !important; } }
      `}</style>
    </motion.header>
  );
}
