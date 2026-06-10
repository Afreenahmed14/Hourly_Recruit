import logoWeb from "../assets/logoweb.png";
export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          {/* <button className="nav-logo" onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div className="nav-logo-icon" style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#1a56db,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "white" }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 800, color: "white" }}>
              Hourly<span style={{ color: "#38bdf8" }}>Recruit</span>
            </span>
          </button> */}
          <button
  className="nav-logo"
  onClick={() => navigate("home")}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  }}
>
  <img
    src={logoWeb}
    alt="Hourly Recruit Logo"
    style={{
      height: "50px",
      width: "auto",
      objectFit: "contain"
    }}
  />
</button>
          <p className="footer-brand-desc">Hire skilled developers on hourly basis and scale your projects faster without long-term commitments.</p>
          <div className="footer-socials">
            {/* LinkedIn */}
            <div className="footer-social">
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            {/* Twitter */}
            <div className="footer-social">
              <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </div>
            {/* YouTube */}
            <div className="footer-social">
              <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          {[["home","Home"],["about","About"],["technologies","Technologies"],["how","How It Works"],["contact","Contact"]].map(([id,label]) => (
            <button key={id} className="footer-col-link" onClick={() => navigate(id)}>{label}</button>
          ))}
        </div>

        {/* <div className="footer-col">
          <h4>Services</h4>
          {["Hourly Developers","Dedicated Developers","MVP Development","Remote Developers","Project Teams"].map(s => (
            <button key={s} className="footer-col-link" onClick={() => navigate("hire")}>{s}</button>
          ))}
        </div> */}
        <div className="footer-col">
  <h4>Services</h4>

  {[
    "Hourly Developers",
    "Dedicated Developers",
    "MVP Development",
    "Remote Developers",
    "Project Teams"
  ].map((s) => (
    <span
      key={s}
      className="footer-col-link"
      style={{
        display: "block",
        marginBottom: "10px",
        cursor: "default"
      }}
    >
      {s}
    </span>
  ))}
</div>

        {/* <div className="footer-col">
          <h4>Contact Us</h4>
          <button className="footer-col-link" onClick={() => navigate("contact")}>Bangalore, India</button>
          <button className="footer-col-link" onClick={() => navigate("contact")}>hr@hourlyrecruit.com</button>
          <button className="footer-col-link" onClick={() => navigate("contact")}>+91 888 444 6677</button>
          <button className="footer-col-link" onClick={() => navigate("contact")}>www.hourlyrecruit.com</button>
        </div> */}
        <div className="footer-col">
  <h4>Contact Us</h4>

  <a
    className="footer-col-link"
    href="https://maps.google.com/?q=Bangalore,India"
    target="_blank"
    rel="noopener noreferrer"
  >
    📍 Bangalore, Karnataka, India
  </a>

  <a
    className="footer-col-link"
    href="mailto:hr@hourlyrecruit.com"
  >
    📧 hr@hourlyrecruit.com
  </a>

  <a
    className="footer-col-link"
    href="tel:+918884446677"
  >
    📞 +91 888 444 6677
  </a>

  <a
    className="footer-col-link"
    href="https://www.hourlyrecruit.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    🌐 www.hourlyrecruit.com
  </a>
</div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 HourlyRecruit. All Rights Reserved.</p>
        <p>Privacy Policy · Terms of Service</p>
      </div>
    </footer>
  );
}