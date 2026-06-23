import { useLanguage } from "../context/LanguageContext";
import { Marquee, Magnetic } from "./Motion";

export default function Footer() {
  const { t } = useLanguage();
  const socials = ["GitHub", "LinkedIn", "Twitter", "Dribbble"];
  return (
    <footer className="on-dark" style={{ background: "var(--ink)", color: "var(--paper)", paddingTop: 60, overflow: "hidden" }}>
      {/* big marquee CTA */}
      <a href="#contact" data-hover style={{ display: "block", borderTop: "1px solid rgba(241,237,228,0.14)", borderBottom: "1px solid rgba(241,237,228,0.14)", padding: "26px 0" }}>
        <Marquee speed={22}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="display" style={{ fontSize: "clamp(2.4rem,6vw,5rem)", paddingRight: 50, display: "inline-flex", alignItems: "center", gap: 40 }}>
              Let's work together <span style={{ color: "var(--accent)" }}>✦</span>
            </span>
          ))}
        </Marquee>
      </a>

      <div className="container" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30, marginBottom: 50 }}>
          <div style={{ maxWidth: 320 }}>
            <div className="display" style={{ fontSize: "1.6rem", marginBottom: 14 }}>Indra<span style={{ color: "var(--accent)" }}>.</span></div>
            <p style={{ color: "rgba(241,237,228,0.6)", fontSize: "0.92rem", lineHeight: 1.6 }}>
              {t("aboutRole")} · {t("contactLocationVal")}
            </p>
            <Magnetic strength={0.2}>
              <a href="mailto:indrabchtr06@gmail.com" data-hover style={{ display: "inline-block", marginTop: 16, fontFamily: "var(--font-mono)", fontSize: "0.85rem", borderBottom: "1px solid var(--accent)", paddingBottom: 3 }}>indrabchtr06@gmail.com</a>
            </Magnetic>
          </div>
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(241,237,228,0.4)", marginBottom: 16 }}>Menu</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["#projects", t("navProjects")], ["#about", t("navAbout")], ["#process", t("navProcess")], ["#contact", t("navContact")]].map(([h, l]) => (
                  <a key={h} href={h} data-hover style={{ color: "rgba(241,237,228,0.8)", fontSize: "0.92rem" }}>{l}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(241,237,228,0.4)", marginBottom: 16 }}>Social</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {socials.map((s) => <a key={s} href="#" data-hover style={{ color: "rgba(241,237,228,0.8)", fontSize: "0.92rem" }}>{s} ↗</a>)}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, paddingTop: 26, borderTop: "1px solid rgba(241,237,228,0.14)", fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "rgba(241,237,228,0.5)" }}>
          <span>© 2026 Indra Bachtiar Zakaria — {t("footerCrafted")}</span>
          <a href="#hero" data-hover style={{ color: "rgba(241,237,228,0.8)" }}>{t("footerBack")}</a>
        </div>
      </div>
    </footer>
  );
}
