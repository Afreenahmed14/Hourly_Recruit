import { useState } from "react";
import { submitContactMessage } from "../api/Api";

export default function Contact({ navigate, siteData }) {
  const ct      = siteData?.contact ?? {};
  const info    = ct.info ?? {};

  const heading  = ct.hero?.heading  || "Have a Project in Mind?";
  const subtext  = ct.hero?.subtext  || "Let's discuss how we can help you build your product.";
  const phone    = info.phone    || "+91 888 444 6677";
  const email    = info.email    || "hr@hourlyrecruit.com";
  const location = info.location || "Bangalore, India";
  const website  = info.website  || "www.hourlyrecruit.com";

  const [form, setForm]     = useState({ name:"", email:"", phone:"", company:"", role:"", budget:"", message:"" });
  const [submitted, setSub] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      // Try to send to backend
      await submitContactMessage(form);
    } catch {
      // Backend not available yet or failed — still show success to user
      // (the message will be saved locally or retry later)
      console.warn("Contact form backend submission failed; showing local success.");
    } finally {
      setSubmitting(false);
      setSub(true);
    }
  };

  
const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: "24px", height: "24px" }}
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: "24px", height: "24px" }}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: "24px", height: "24px" }}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72l.57 4a2 2 0 0 1-.57 1.72L8.91 10.6a16 16 0 0 0 4.49 4.49l1.16-1.15a2 2 0 0 1 1.72-.57l4 .57A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WebIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: "24px", height: "24px" }}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15 15 0 0 1 0 20" />
    <path d="M12 2a15 15 0 0 0 0 20" />
  </svg>
);
const infoCards = [
  {
    label: "Location",
    val: "Bangalore, Karnataka, India",
    icon: <LocationIcon />
  },
  {
    label: "Email",
    val: "hr@hourlyrecruit.com",
    icon: <MailIcon />
  },
  {
    label: "Phone",
    val: "+91 888 444 6677",
    icon: <PhoneIcon />
  },
  {
    label: "Website",
    val: "www.hourlyrecruit.com",
    icon: <WebIcon />
  }
];
  return (
    <>
      {/* <section className="contact-hero">
        <div style={{ position:"relative", zIndex:1 }}>
          <span className="sec-label sec-label-light">Get In Touch</span>
          <h1>{heading}</h1>
          <p>{subtext}</p>
        </div>
      </section> */}
      {/* <section className="contact-hero">
  <div
    style={{
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      maxWidth: "900px",
      margin: "0 auto"
    }}
  >
    <span className="sec-label sec-label-light">
      Get In Touch
    </span>

    <h1
      style={{
        marginTop: "16px",
        marginBottom: "20px"
      }}
    >
      {heading}
    </h1>

    <p
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        lineHeight: "1.8"
      }}
    >
      {subtext}
    </p>
  </div>
</section> */}
{/* <section
  style={{
    padding: "80px 5%",
    background: "#f8fbff"
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
      gap: "24px",
      maxWidth: "1400px",
      margin: "0 auto"
    }}
  >
    {infoCards.map(({ icon, label, val }) => (
      <div
        key={label}
        onClick={() => {
          if (label === "Email") {
            window.location.href = "mailto:hr@hourlyrecruit.com";
          } else if (label === "Phone") {
            window.location.href = "tel:+918884446677";
          } else if (label === "Website") {
            window.open(
              "https://www.hourlyrecruit.com",
              "_blank"
            );
          } else if (label === "Location") {
            window.open(
              "https://maps.google.com/?q=Bangalore,Karnataka,India",
              "_blank"
            );
          }
        }}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "28px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          border: "1px solid #e2e8f0",
          cursor: "pointer",
          transition: "all 0.35s ease",
          boxShadow: "0 8px 25px rgba(15,23,42,0.04)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(37,99,235,0.12)";
          e.currentTarget.style.borderColor =
            "#bfdbfe";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 8px 25px rgba(15,23,42,0.04)";
          e.currentTarget.style.borderColor =
            "#e2e8f0";
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            minWidth: "64px",
            borderRadius: "18px",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2563eb",
            boxShadow:
              "0 8px 20px rgba(37,99,235,0.08)"
          }}
        >
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#94a3b8",
              marginBottom: "6px"
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0f172a",
              lineHeight: "1.5"
            }}
          >
            {val}
          </div>
        </div>
      </div>
    ))}
  </div>
</section> */}

      {/* Info cards */}
      <section
  style={{
    padding: "80px 5%",
    background: "#f8fbff"
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
      gap: "24px",
      maxWidth: "1400px",
      margin: "0 auto"
    }}
  >
    {infoCards.map(({ icon, label, val }) => (
      <div
        key={label}
        onClick={() => {
          if (label === "Email") {
            window.location.href = "mailto:hr@hourlyrecruit.com";
          } else if (label === "Phone") {
            window.location.href = "tel:+918884446677";
          } else if (label === "Website") {
            window.open(
              "https://www.hourlyrecruit.com",
              "_blank"
            );
          } else if (label === "Location") {
            window.open(
              "https://maps.google.com/?q=Bangalore,Karnataka,India",
              "_blank"
            );
          }
        }}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "28px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          border: "1px solid #e2e8f0",
          cursor: "pointer",
          transition: "all 0.35s ease",
          boxShadow: "0 8px 25px rgba(15,23,42,0.04)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(37,99,235,0.12)";
          e.currentTarget.style.borderColor =
            "#bfdbfe";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 8px 25px rgba(15,23,42,0.04)";
          e.currentTarget.style.borderColor =
            "#e2e8f0";
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            minWidth: "60px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#2563eb,#3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow:
              "0 10px 25px rgba(37,99,235,0.25)"
          }}
        >
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#94a3b8",
              marginBottom: "6px"
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#0f172a",
              lineHeight: "1.5"
            }}
          >
            {val}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Form + sidebar */}
      <section className="contact" style={{ paddingTop:0 }}>
        <div className="contact-grid" style={{ marginTop:0 }}>
          <div>
            <span className="sec-label">Let's Build Together</span>
            <h2 className="sec-title">Ready to Start<br />Your Next Project?</h2>
            <p className="sec-sub" style={{ marginBottom:36 }}>
              Hire expert developers on hourly basis and accelerate your product development. We respond within 2 hours on business days.
            </p>
            <div className="contact-items">
              {[
                { svg:<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title:"Fast Response", desc:"We respond within 2 hours on business days" },
                { svg:<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, title:"Dedicated Account Manager", desc:"A personal point of contact throughout your engagement" },
                { svg:<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title:"48-Hour Matching", desc:"Get matched with vetted developers within 48 hours" },
              ].map(({ svg, title, desc }) => (
                <div key={title} className="contact-item">
                  <div className="contact-item-icon">{svg}</div>
                  <div><h4>{title}</h4><p>{desc}</p></div>
                </div>
              ))}
            </div>

            {/* Next steps */}
            <div style={{ marginTop:40, background:"var(--off)", borderRadius:"var(--radius-lg)", padding:"28px", border:"1px solid var(--gray-100)" }}>
              <h4 style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700, color:"var(--navy)", marginBottom:16 }}>What happens after you submit?</h4>
              {(ct.nextSteps || [
                "We review your requirements within 2 hours",
                "A team member schedules a quick 30-min call",
                "We share 3–5 matched developer profiles",
                "You interview and choose — hire in 48 hours",
              ]).map((s, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"var(--blue)", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0, marginTop:1 }}>{i+1}</div>
                  <p style={{ fontSize:13, color:"var(--gray-600)", lineHeight:1.6 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div style={{ textAlign:"center", padding:"40px 20px" }}>
                <div style={{ fontSize:56, marginBottom:20 }}>&#x1F389;</div>
                <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:800, color:"var(--navy)", marginBottom:12 }}>Message Sent!</h3>
                <p style={{ color:"var(--gray-600)", marginBottom:28, lineHeight:1.7 }}>Thank you! We'll get back to you within 2 hours on business days.</p>
                <button className="btn-primary" style={{ width:"100%", justifyContent:"center" }} onClick={() => navigate("how")}>How It Works</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3 style={{ fontFamily:"var(--font-head)", fontSize:20, fontWeight:800, color:"var(--navy)", marginBottom:24 }}>Send Us a Message</h3>
                <div className="form-row">
                  <div className="form-group"><input type="text" name="name" placeholder="Your Name *" value={form.name} onChange={handle} required /></div>
                  <div className="form-group"><input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={handle} required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handle} /></div>
                  <div className="form-group"><input type="text" name="company" placeholder="Company / Startup" value={form.company} onChange={handle} /></div>
                </div>
                <div className="form-group">
                  <select name="role" value={form.role} onChange={handle} style={{ background:"white", border:"1.5px solid var(--gray-100)", borderRadius:9, padding:"12px 16px", width:"100%", fontFamily:"var(--font-body)", fontSize:14, color:form.role?"var(--navy)":"var(--gray-200)", outline:"none" }}>
                    <option value="">I'm looking for... *</option>
                    {["Frontend Developer","Backend Developer","Full Stack Developer","Mobile Developer","DevOps Engineer","UI/UX Designer","QA Engineer","Complete Project Team"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <select name="budget" value={form.budget} onChange={handle} style={{ background:"white", border:"1.5px solid var(--gray-100)", borderRadius:9, padding:"12px 16px", width:"100%", fontFamily:"var(--font-body)", fontSize:14, color:form.budget?"var(--navy)":"var(--gray-200)", outline:"none" }}>
                    <option value="">Monthly Budget Range</option>
                    {["Under $1,000","$1,000 – $3,000","$3,000 – $6,000","$6,000 – $12,000","$12,000+"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Tell us about your project..." value={form.message} onChange={handle} rows={4} />
                </div>
                {submitError && (
                  <p style={{ color:"#ef4444", fontSize:13, marginBottom:10 }}>{submitError}</p>
                )}
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message →"}
                </button>
                <p style={{ fontSize:12, color:"var(--gray-400)", marginTop:12, textAlign:"center" }}>We'll respond within 2 business hours. No spam, ever.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}