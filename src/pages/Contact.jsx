import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, AnimatedHeading, Magnetic } from "../components/Motion";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "62859106854914";
    const textMessage = `${t("waGreeting")}%0A%0A*${t("waName")}:* ${form.name}%0A*${t("waEmail")}:* ${form.email}%0A*${t("waProject")}:* ${form.project}%0A*${t("waMessage")}:* ${form.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank");
    setSent(true);
  };

  const field = (name) => ({
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1px solid ${focused === name ? "var(--accent)" : "var(--line)"}`,
    color: "var(--ink)", fontSize: "1rem", padding: "14px 0", outline: "none", transition: "border-color .3s",
  });

  const info = [
    { label: t("contactEmail"), value: "indrabchtr06@gmail.com", href: "mailto:indrabchtr06@gmail.com" },
    { label: t("contactLocation"), value: t("contactLocationVal") },
    { label: t("contactAvailability"), value: t("contactAvailabilityVal"), dot: true },
  ];

  return (
    <section id="contact" className="section" style={{ background: "var(--paper)", position: "relative" }}>
      <div className="container">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,90px)", alignItems: "start" }}>
          {/* left */}
          <div>
            <Reveal><div className="eyebrow" style={{ marginBottom: 18 }}>{t("contactLabel")}</div></Reveal>
            <h2 className="section-head" style={{ marginBottom: 26 }}>
              <AnimatedHeading lines={[
                <span key="1">{t("contactTitle1")}</span>,
                <span key="2" className="serif-it" style={{ color: "var(--accent)" }}>{t("contactTitle2")}</span>,
              ]} />
            </h2>
            <Reveal delay={0.1}><p style={{ color: "var(--ink-soft)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 420, marginBottom: 40 }}>{t("contactDesc")}</p></Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {info.map((it, i) => (
                <Reveal key={it.label} delay={0.15 + i * 0.07}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 16 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)" }}>{it.label}</span>
                    {it.href
                      ? <a href={it.href} data-hover style={{ fontWeight: 600 }}>{it.value}</a>
                      : <span style={{ fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>{it.dot && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />}{it.value}</span>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* right — form */}
          <Reveal delay={0.15}>
            <div className="card" style={{ padding: "clamp(24px,3vw,40px)", boxShadow: "var(--shadow-md)" }}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "40px 10px" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 22px" }}>✓</div>
                    <div className="display" style={{ fontSize: "1.6rem", marginBottom: 10 }}>{t("contactSuccess")}</div>
                    <p style={{ color: "var(--ink-soft)" }}>{t("contactSuccessMsg")}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                      <div>
                        <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-mute)" }}>{t("formName")}</label>
                        <input required value={form.name} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, name: e.target.value })} style={field("name")} placeholder="John Doe" />
                      </div>
                      <div>
                        <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-mute)" }}>{t("formEmail")}</label>
                        <input required type="email" value={form.email} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, email: e.target.value })} style={field("email")} placeholder="john@mail.com" />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-mute)" }}>{t("formProject")}</label>
                      <select required value={form.project} onFocus={() => setFocused("project")} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, project: e.target.value })} style={{ ...field("project"), cursor: "pointer" }}>
                        <option value="">{t("formSelect")}</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Desktop App">Desktop App</option>
                        <option value={t("formOther")}>{t("formOther")}</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-mute)" }}>{t("formMessage")}</label>
                      <textarea required rows={4} value={form.message} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...field("message"), resize: "vertical" }} placeholder={t("formMessagePlaceholder")} />
                    </div>
                    <Magnetic strength={0.2}>
                      <button type="submit" className="btn btn-fill" data-hover style={{ width: "100%", justifyContent: "center", padding: "18px" }}>{t("formSubmit")} <span>→</span></button>
                    </Magnetic>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px){ .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px){ .form-row { grid-template-columns: 1fr !important; } }
        select option { color: var(--ink); background: var(--card); }
      `}</style>
    </section>
  );
}
