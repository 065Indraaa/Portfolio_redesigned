export default function AndroidMockup({ title, accent, imageSrc }) {
  const accentRgb = accent || "rgba(20,18,14";
  return (
    <div style={{
      width: "200px",
      margin: "0 auto",
      position: "relative",
    }}>
      {/* Phone body */}
      <div style={{
        background: "#e8e3d9",
        borderRadius: "30px",
        padding: "10px",
        border: "1px solid rgba(20,18,14,0.12)",
        boxShadow: "0 30px 60px rgba(20,18,14,0.14), inset 0 1px 0 rgba(20,18,14,0.05)",
        position: "relative",
      }}>
        {/* Status bar */}
        <div style={{
          background: "#f0ece4",
          borderRadius: "22px 22px 0 0",
          padding: "8px 14px 4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.5rem", color: "rgba(20,18,14,0.5)" }}>9:41</span>
          {/* Notch */}
          <div style={{ width: "50px", height: "16px", background: "#e8e3d9", borderRadius: "0 0 10px 10px", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }} />
          <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: "4px", height: `${4 + i * 1.5}px`, background: "rgba(20,18,14,0.5)", borderRadius: "1px" }} />
            ))}
            <div style={{ width: "8px", height: "5px", border: "1px solid rgba(20,18,14,0.5)", borderRadius: "1.5px", marginLeft: "2px", marginTop: "1px", position: "relative" }}>
              <div style={{ width: "60%", height: "100%", background: "rgba(40,200,64,0.7)", borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        {/* App screen */}
        <div style={{
          background: "#f0ece4",
          borderRadius: "0 0 22px 22px",
          overflow: "hidden",
          paddingBottom: imageSrc ? "0" : "16px",
          position: "relative",
          minHeight: "360px",
          display: "flex",
          flexDirection: "column",
        }}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title || "Mobile App"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", marginTop: "-20px", paddingTop: "20px" }}
            />
          ) : (
            <>
              {/* App header */}
              <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid rgba(20,18,14,0.05)" }}>
                <div style={{ width: "50%", height: "8px", background: "rgba(20,18,14,0.2)", borderRadius: "3px", marginBottom: "4px" }} />
                <div style={{ width: "35%", height: "6px", background: "rgba(20,18,14,0.08)", borderRadius: "3px" }} />
              </div>

              {/* Hero card */}
              <div style={{ margin: "10px", background: accent ? `linear-gradient(135deg, ${accent}22, ${accent}0a)` : "linear-gradient(135deg, rgba(20,18,14,0.1), rgba(20,18,14,0.04))", borderRadius: "12px", padding: "12px", border: `1px solid ${accent ? accent + "44" : "rgba(20,18,14,0.07)"}` }}>
                <div style={{ width: "40%", height: "6px", background: "rgba(20,18,14,0.15)", borderRadius: "3px", marginBottom: "6px" }} />
                <div style={{ width: "65%", height: "14px", background: "rgba(20,18,14,0.25)", borderRadius: "3px", marginBottom: "8px" }} />
                <div style={{ display: "flex", gap: "6px" }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ width: "30px", height: "30px", background: `rgba(20,18,14,${i === 1 ? 0.15 : 0.06})`, borderRadius: "8px" }} />
                  ))}
                </div>
              </div>

              {/* List items */}
              <div style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {[0.7, 0.5, 0.6].map((op, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px", background: "rgba(20,18,14,0.03)", borderRadius: "8px" }}>
                    <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: `rgba(20,18,14,${op * 0.15})` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ width: "70%", height: "5px", background: `rgba(20,18,14,${op * 0.15})`, borderRadius: "3px", marginBottom: "3px" }} />
                      <div style={{ width: "45%", height: "4px", background: `rgba(20,18,14,${op * 0.08})`, borderRadius: "3px" }} />
                    </div>
                    <div style={{ width: "24px", height: "12px", background: "rgba(20,18,14,0.1)", borderRadius: "4px" }} />
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div style={{ display: "flex", justifyContent: "space-around", padding: "10px 14px 0", borderTop: "1px solid rgba(20,18,14,0.05)", marginTop: "auto" }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                    <div style={{ width: "16px", height: "16px", background: i === 0 ? (accent || "rgba(20,18,14,0.5)") : "rgba(20,18,14,0.15)", borderRadius: "4px", opacity: i === 0 ? 1 : 0.5 }} />
                    <div style={{ width: "20px", height: "3px", background: i === 0 ? (accent || "rgba(20,18,14,0.3)") : "rgba(20,18,14,0.07)", borderRadius: "2px", opacity: i === 0 ? 0.8 : 1 }} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Side buttons */}
      <div style={{ position: "absolute", right: "-3px", top: "80px", width: "3px", height: "30px", background: "#ddd7ca", borderRadius: "0 3px 3px 0" }} />
      <div style={{ position: "absolute", left: "-3px", top: "70px", width: "3px", height: "22px", background: "#ddd7ca", borderRadius: "3px 0 0 3px" }} />
      <div style={{ position: "absolute", left: "-3px", top: "100px", width: "3px", height: "22px", background: "#ddd7ca", borderRadius: "3px 0 0 3px" }} />
    </div>
  );
}
