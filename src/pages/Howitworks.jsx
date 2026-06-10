import { useState } from "react";

export default function HowItWorks({ navigate, siteData }) {
  const [openFaq, setOpenFaq] = useState(null);
  const hw    = siteData?.howItWorks ?? {};
  const hero  = hw.hero  ?? { heading: "From Brief to Build in 4 Simple Steps", subtext: "" };
  const steps = hw.steps ?? [];
  const faqs  = hw.faqs  ?? [];

  return (
    <>
      <section className="how-hero">
        <div style={{ position:"relative", zIndex:1 }}>
          <span className="sec-label sec-label-light"> Hiring Process</span>
          <h1>{hero.heading}</h1>
          <p>{hero.subtext}</p>
        </div>
      </section>

      <section className="how-page">
        {/* <div className="sec-head" style={{ marginBottom:48 }}>
          <span className="sec-label">The Process</span>
          <h2 className="sec-title">How HourlyRecruit Works</h2>
          <p className="sec-sub">Everything is handled for you — from matching to contracts to payments.</p>
        </div> */}
        {/* <div className="how-steps-full">
          {steps.map(({ n, title, desc, tips }) => (
            <div key={n} className="how-step-row">
              <div className="how-step-num-wrap"><div className="how-step-num">{n}</div></div>
              <div className="how-step-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                {tips && tips.length > 0 && (
                  <div className="how-step-tips">
                    {tips.map(t => <div key={t} className="how-tip">✓ {t}</div>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div> */}

        <div
  style={{
    maxWidth: "900px",
    margin: "60px auto",
    padding: "20px"
  }}
>
  <div
    style={{
      textAlign: "center",
      marginBottom: "60px"
    }}
  >
    <span
      style={{
        color: "#2563eb",
        fontSize: "14px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "1px"
      }}
    >
      Hiring Process
    </span>

    <h2
      style={{
        fontSize: "42px",
        fontWeight: "800",
        color: "#0f172a",
        margin: "12px 0"
      }}
    >
      Hire Top Developers in 48 Hours
    </h2>

    <p
      style={{
        color: "#64748b",
        lineHeight: "1.8",
        maxWidth: "700px",
        margin: "0 auto"
      }}
    >
      Our streamlined hiring process ensures you get access to highly skilled
      developers quickly, efficiently, and without unnecessary delays.
    </p>
  </div>

  <div style={{ position: "relative" }}>
    {/* Vertical Line */}
    <div
      style={{
        position: "absolute",
        left: "30px",
        top: "0",
        bottom: "0",
        width: "3px",
        background: "linear-gradient(#2563eb,#60a5fa)"
      }}
    />

    {[
      {
        step: "1",
        title: "Requirement Review",
        desc: "We review your requirements and project needs within 2 hours."
      },
      {
        step: "2",
        title: "Discovery Call",
        desc: "A dedicated consultant schedules a quick 30-minute discussion to understand your goals."
      },
      {
        step: "3",
        title: "Talent Matching",
        desc: "Receive 3–5 carefully selected developer profiles tailored to your requirements."
      },
      {
        step: "4",
        title: "Interview & Hire",
        desc: "Interview your preferred candidates and onboard the right developer within 48 hours."
      }
    ].map((item, index) => (
      <div
        key={item.step}
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "40px",
          position: "relative",
          alignItems: "flex-start"
        }}
      >
        {/* Circle */}
        <div
          style={{
            minWidth: "60px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "800",
            zIndex: 2,
            boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
          }}
        >
          {item.step}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(10px)";
            e.currentTarget.style.boxShadow =
              "0 15px 35px rgba(37,99,235,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(0,0,0,0.05)";
          }}
        >
          <h3
            style={{
              margin: "0 0 10px",
              color: "#0f172a",
              fontSize: "22px",
              fontWeight: "700"
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              lineHeight: "1.8"
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
      </section>

      {/* Engagement Models */}
      <section style={{ padding:"80px 5%", background:"var(--off)" }}>
        <div className="sec-head" style={{ marginBottom:48 }}>
          <span className="sec-label">Engagement Models</span>
          <h2 className="sec-title">Choose How You Work With Us</h2>
        </div>
        <div className="engage-grid">
          {[
            { title:"Hourly Hiring", featured:false, desc:"Pay only for productive hours logged. Ideal for ongoing feature development, bug fixes, or ad-hoc technical support.", perks:["Pay for actual hours logged","Weekly billing & timesheets","Start & pause anytime","No minimum commitment"] },
            { title:"Dedicated Developer", featured:true, desc:"A full-time developer embedded into your team — attending standups, working your timezone, and owning deliverables just like an in-house hire.", perks:["Exclusive to your project","Full timezone alignment","Monthly fixed pricing","7-day replacement guarantee"] },
            { title:"Project-Based Team", featured:false, desc:"Assemble a complete team scoped to deliver a defined product milestone from design to deployment.", perks:["Fixed scope & deliverables","Dedicated project manager","Milestone-based billing","End-to-end ownership"] },
          ].map((m) => (
            <div key={m.title} className={`eng-card${m.featured ? " featured" : ""}`}>
              {m.featured && <span className="eng-badge">Popular</span>}
              <div className={`eng-icon${m.featured ? " inv" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
  <circle cx="9" cy="7" r="4"/>
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
</svg>
                {/* <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> */}
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <div className="eng-perks">
                {m.perks.map(p => <div key={p} className="eng-perk">{p}</div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="faq">
          <div className="sec-head" style={{ marginBottom:0 }}>
            <span className="sec-label">FAQ</span>
            <h2 className="sec-title">Frequently Asked Questions</h2>
            <p className="sec-sub">Everything you need to know about working with HourlyRecruit.</p>
          </div>
          <div className="faq-list">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="faq-item">
                <button className={`faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q}
                  <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {openFaq === i && <div className="faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <div style={{ position:"relative", zIndex:1 }}>
            <span className="sec-label" style={{ color:"#38bdf8" }}>Ready?</span>
            <h2>Start Your Project<br />in 48 Hours</h2>
            <p>Share your requirements today. We'll have matched candidates in your inbox by tomorrow.</p>
          </div>
          <div className="cta-btns" style={{ position:"relative", zIndex:1 }}>
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
       {/* <button className="btn-white"        onClick={() => navigate("contact")}>Get Started</button> */}
            <button className="btn-outline-white" onClick={() => navigate("contact")}>Book Free Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}
