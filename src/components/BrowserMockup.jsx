export default function BrowserMockup({ src, title, color = "#ebe7de", imageSrc, url }) {
  const displayUrl = url || (title ? title.toLowerCase().replace(/\s+/g, "") + ".app" : "app");

  return (
    <div style={{
      width: "100%",
      borderRadius: "10px",
      overflow: "hidden",
      background: "#e5e0d5",
      border: "1px solid rgba(20,18,14,0.1)",
      boxShadow: "0 24px 70px rgba(20,18,14,0.13)",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#ddd7ca",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid rgba(20,18,14,0.06)",
      }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {["#cdc7b8", "#bdb6a6", "#a9a293"].map((c, i) => (
            <div key={i} style={{ width: "11px", height: "11px", borderRadius: "50%", background: c, opacity: 0.85 }} />
          ))}
        </div>
        {/* URL bar */}
        <div style={{
          flex: 1,
          background: "#e5e0d5",
          borderRadius: "5px",
          padding: "4px 12px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.62rem",
          color: "rgba(20,18,14,0.35)",
          letterSpacing: "0.02em",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}>
          <span style={{ color: "rgba(40,200,64,0.7)", fontSize: "0.58rem", flexShrink: 0 }}>🔒</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{displayUrl}</span>
        </div>
      </div>

      {/* Screen content */}
      <div style={{ width: "100%", aspectRatio: "16/10", background: color, position: "relative", overflow: "hidden" }}>
        {imageSrc ? (
          /* Real screenshot */
          <img
            src={imageSrc}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
            }}
          />
        ) : (
          /* Simulated UI — dark dashboard */
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #ebe7de 0%, #e8e3d9 50%, #f0ece4 100%)", display: "flex" }}>
            {/* Sidebar */}
            <div style={{ width: "18%", borderRight: "1px solid rgba(20,18,14,0.05)", padding: "16px 10px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ width: "60%", height: "10px", background: "rgba(20,18,14,0.15)", borderRadius: "3px", marginBottom: "16px" }} />
              {[0.7, 0.5, 0.6, 0.4, 0.55].map((op, i) => (
                <div key={i} style={{ width: "100%", height: "7px", background: `rgba(20,18,14,${op * 0.12})`, borderRadius: "3px" }} />
              ))}
            </div>
            {/* Main content */}
            <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
                <div style={{ flex: 1, height: "8px", background: "rgba(20,18,14,0.08)", borderRadius: "3px" }} />
                <div style={{ width: "60px", height: "8px", background: "rgba(20,18,14,0.2)", borderRadius: "3px" }} />
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ flex: 1, height: "40px", background: `rgba(20,18,14,${i === 1 ? "0.08" : "0.04"})`, borderRadius: "5px", border: "1px solid rgba(20,18,14,0.05)" }} />
                ))}
              </div>
              <div style={{ flex: 1, background: "rgba(20,18,14,0.03)", borderRadius: "5px", border: "1px solid rgba(20,18,14,0.05)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: "0 10px 8px" }}>
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                  <div key={i} style={{ flex: 1, marginRight: "3px", height: h + "%", background: `rgba(20,18,14,${i === 11 ? "0.3" : "0.08"})`, borderRadius: "2px 2px 0 0" }} />
                ))}
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(20,18,14,0.1)" }} />
                  <div style={{ flex: 1, height: "7px", background: "rgba(20,18,14,0.07)", borderRadius: "3px" }} />
                  <div style={{ width: "50px", height: "7px", background: "rgba(20,18,14,0.1)", borderRadius: "3px" }} />
                  <div style={{ width: "35px", height: "18px", background: "rgba(20,18,14,0.15)", borderRadius: "3px" }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
