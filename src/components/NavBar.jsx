import logo from "../assets/logoweb.png";

export default function Navbar({ currentPage, navigate }) {
  const links = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "hire", label: "Hire Developers" },
    { key: "technologies", label: "Technologies" },
    { key: "how", label: "How It Works" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <button
        className="nav-logo"
        onClick={() => navigate("home")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img
          src={logo}
          alt="HourlyRecruit"
          style={{
            height: "44px",
            width: "auto",
            display: "block",
          }}
        />
      </button>

      {/* Navigation Links */}
      <div className="nav-links">
        {links.map(({ key, label }) => (
          <button
            key={key}
            className={`nav-link ${currentPage === key ? "active" : ""}`}
            onClick={() => navigate(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CTA Button */}
      <button
        className="nav-cta"
        onClick={() => navigate("contact")}
      >
        Get Started
      </button>
    </nav>
  );
}