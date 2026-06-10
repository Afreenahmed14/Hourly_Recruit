export default function About({ navigate, siteData }) {
  const ab    = siteData?.about      ?? {};
  const hero  = ab.hero              ?? { heading: "", subtext: "" };
  const stats = ab.stats             ?? [];
  const team  = ab.team              ?? [];
  const mission = ab.content?.mission ?? "";

  return (
    <>
      {/* ── HERO ── */}
      <section className="about-hero">
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="sec-label sec-label-light">About Us</span>
          <h1>{hero.heading || "We Connect Great Companies With World-Class Developers"}</h1>
          <p>{hero.subtext || ""}</p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="about-stats">
        <div className="about-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTENT ── */}
      {/* <section className="about-content">
        <div className="about-grid">
          <div className="about-text">
            <span className="sec-label">Our Mission</span>
            <h2>Why We Built HourlyRecruit</h2>
            <p>{mission}</p>
            <p style={{ marginTop: 14 }}>
              We believe every company — from a two-person startup to a Fortune 500 — deserves access
              to world-class engineering talent. Our platform removes the friction, cost, and risk from
              technical hiring so you can focus on building great products.
            </p>
          </div>
          <div className="about-features">
            {[
              { emoji: "🎯", title: "Precision Matching",    desc: "We hand-pick developers based on your exact stack, timezone, and team culture." },
              { emoji: "🔒", title: "Vetted Talent Only",    desc: "Every developer passes a rigorous multi-stage technical and communication assessment." },
              { emoji: "⚡", title: "Speed to Hire",         desc: "From requirement to first commit in 48 hours — not weeks." },
              { emoji: "🤝", title: "Ongoing Partnership",   desc: "A dedicated account manager supports you throughout the entire engagement." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="about-feat">
                <div className="about-feat-icon">{emoji}</div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section
  className="about-content"
  style={{
    padding: "100px 20px",
    background: "#f8fbff"
  }}
>
  <div
    className="about-grid"
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "60px",
      alignItems: "center"
    }}
  >
    <div className="about-text">
      <span
        className="sec-label"
        style={{
          color: "#2563eb",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}
      >
        Our Mission
      </span>

      <h2
        style={{
          fontSize: "42px",
          fontWeight: "800",
          margin: "15px 0 20px",
          color: "#0f172a",
          lineHeight: "1.2"
        }}
      >
        Why We Built HourlyRecruit
      </h2>

      <p
        style={{
          color: "#64748b",
          lineHeight: "1.9",
          fontSize: "16px"
        }}
      >
        {mission}
      </p>

      <p
        style={{
          marginTop: "18px",
          color: "#64748b",
          lineHeight: "1.9",
          fontSize: "16px"
        }}
      >
        We believe every company — from a two-person startup to a Fortune 500 —
        deserves access to world-class engineering talent. Our platform removes
        the friction, cost, and risk from technical hiring so you can focus on
        building great products.
      </p>
    </div>

    <div
      className="about-features"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "20px"
      }}
    >
      {[
        {
          emoji: "🎯",
          title: "Precision Matching",
          desc: "We hand-pick developers based on your exact stack, timezone, and team culture."
        },
        {
          emoji: "🔒",
          title: "Vetted Talent Only",
          desc: "Every developer passes a rigorous multi-stage technical and communication assessment."
        },
        {
          emoji: "⚡",
          title: "Speed to Hire",
          desc: "From requirement to first commit in 48 hours — not weeks."
        },
        {
          emoji: "🤝",
          title: "Ongoing Partnership",
          desc: "A dedicated account manager supports you throughout the entire engagement."
        }
      ].map(({ emoji, title, desc }) => (
        <div
          key={title}
          style={{
            display: "flex",
            gap: "18px",
            background: "#ffffff",
            padding: "22px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
          }}
        >
          <div
            style={{
              minWidth: "60px",
              width: "60px",
              height: "60px",
              background: "#f8fbff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px"
            }}
          >
            {emoji}
          </div>

          <div>
            <h4
              style={{
                margin: "0 0 8px",
                color: "#0f172a",
                fontSize: "18px",
                fontWeight: "700"
              }}
            >
              {title}
            </h4>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                lineHeight: "1.7"
              }}
            >
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── TEAM ── */}
      {team.length > 0 && (
        <section style={{ padding: "72px 5%", background: "white" }}>
          <div className="sec-head" style={{ marginBottom: 44 }}>
            <span className="sec-label">Our Team</span>
            <h2 className="sec-title">The People Behind HourlyRecruit</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
            {team.map((m) => (
              <div key={m.name} style={{ background: "var(--off)", border: "1px solid var(--gray-100)", borderRadius: "var(--radius-xl)", padding: "28px 20px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 auto 14px", boxShadow: "0 4px 16px rgba(0,0,0,.15)" }}>
                  {m.initials}
                </div>
                <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 15, color: "var(--navy)", marginBottom: 4 }}>{m.name}</h4>
                <span style={{ fontSize: 12, color: "var(--gray-400)" }}>{m.role}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cta">
        <div className="cta-inner">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="sec-label" style={{ color: "#38bdf8" }}>Join Our Clients</span>
            <h2>Ready to Build With<br />World-Class Talent?</h2>
            <p>Hire developers on flexible hourly terms and scale your product faster than ever.</p>
          </div>
          <div className="cta-btns" style={{ position: "relative", zIndex: 1 }}>
            {/* <button className="btn-white"         onClick={() => navigate("contact")}>Get Started</button> */}
            <button
  className="btn-white"
  onClick={() =>
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdJleRoQ4AtK_GARvDOV39sfBGv9Zk2VDYqiKF8TgwVMBIeTg/viewform?usp=publish-editor",
      "_blank"
    )
  }
>
  Get Started
</button>
            <button className="btn-outline-white"  onClick={() => navigate("how")}>How It Works</button>
          </div>
        </div>
      </section>
    </>
  );
}
