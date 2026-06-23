import { useLanguage } from "../context/LanguageContext";
import { Reveal, AnimatedHeading, Parallax } from "../components/Motion";
import BrowserMockup from "../components/BrowserMockup";
import ponyinImg from "../assets/Ponyin.png";

export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="section on-dark" style={{ background: "var(--ink)", color: "var(--paper)", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 56 }}>
          <Reveal><div className="eyebrow" style={{ marginBottom: 18 }}>{t("testiLabel")}</div></Reveal>
          <h2 className="section-head" style={{ color: "var(--paper)" }}>
            <AnimatedHeading lines={[
              <span key="1">{t("testiTitle1")}</span>,
              <span key="2" className="serif-it" style={{ color: "var(--accent)" }}>{t("testiTitle2")}</span>,
            ]} />
          </h2>
        </div>

        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Reveal>
              <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.5rem,3vw,2.3rem)", lineHeight: 1.4, marginBottom: 32 }}>
                <span style={{ color: "var(--accent)", fontSize: "1.4em", verticalAlign: "-0.2em", marginRight: 6 }}>“</span>
                {t("testiClientQuote")}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 24, borderTop: "1px solid rgba(241,237,228,0.16)" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--ink)" }}>P</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>{t("testiClientName")}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "rgba(241,237,228,0.6)", marginTop: 2 }}>{t("testiClientRole")}</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Parallax distance={40}>
            <div style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))" }}>
              <BrowserMockup title="PONYIN" imageSrc={ponyinImg} url="ponyin.id" />
            </div>
          </Parallax>
        </div>
      </div>
      <style>{`@media (max-width: 880px){ .testi-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
