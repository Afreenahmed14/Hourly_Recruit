import { useState, useEffect } from "react";

export default function Navbar({ currentPage, navigate, isAdminLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest(".navbar")) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // "Hire Developers" is REMOVED from public nav — admin-only via dashboard
  const links = [
    { id: "home",         label: "Home" },
    { id: "about",        label: "About" },
    { id: "technologies", label: "Technologies" },
    { id: "how",          label: "How It Works" },
    { id: "contact",      label: "Contact" },
  ];

  const go = (id) => {
    navigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="navbar"
        style={{
          boxShadow: scrolled ? "0 2px 24px rgba(26,86,219,.10)" : undefined,
          transition: "box-shadow .22s",
        }}
      >
        {/* Logo */}
        <button className="nav-logo" onClick={() => go("home")}>
          <div className="nav-logo-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="nav-logo-text">
            Hourly<em>Recruit</em>
          </span>
        </button>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map((l) => (
            <button
              key={l.id}
              className={`nav-link${currentPage === l.id ? " active" : ""}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="nav-cta nav-cta-desktop" onClick={() => go("contact")}>
            Get Started
          </button>

          {/* Admin Profile Icon — always visible, goes to admin login/dashboard */}
          <button
            className={`nav-admin-avatar${isAdminLoggedIn ? " logged-in" : ""}`}
            onClick={() => go("admin")}
            title={isAdminLoggedIn ? "Admin Dashboard" : "Admin Login"}
            aria-label={isAdminLoggedIn ? "Admin Dashboard" : "Admin Login"}
          >
            {isAdminLoggedIn ? (
              // Filled avatar when logged in
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 17, height: 17 }}>
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            ) : (
              // Shield/lock icon when not logged in
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            )}
            {isAdminLoggedIn && <span className="admin-active-dot" />}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`ham-bar bar1${menuOpen ? " open" : ""}`} />
          <span className={`ham-bar bar2${menuOpen ? " open" : ""}`} />
          <span className={`ham-bar bar3${menuOpen ? " open" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={`mobile-backdrop${menuOpen ? " visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <div className="drawer-logo">
            <div className="nav-logo-icon" style={{ width: 32, height: 32, borderRadius: 9 }}>
              <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: "white" }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 17, color: "var(--navy)", letterSpacing: "-.2px" }}>
              Hourly<span style={{ color: "var(--blue)" }}>Recruit</span>
            </span>
          </div>
          <button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: 20, height: 20 }}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="drawer-links">
          {links.map((l, i) => (
            <button
              key={l.id}
              className={`drawer-link${currentPage === l.id ? " active" : ""}`}
              onClick={() => go(l.id)}
              style={{ animationDelay: menuOpen ? `${i * 0.05 + 0.05}s` : "0s" }}
            >
              <span className="drawer-link-label">{l.label}</span>
              {currentPage === l.id && <span className="drawer-active-dot" />}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, opacity: 0.35, marginLeft: "auto", flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        <div className="drawer-cta-wrap">
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", borderRadius: 12, padding: "14px 20px", fontSize: 15 }}
            onClick={() => go("contact")}
          >
            Get Started — It's Free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: 16, height: 16 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--gray-400)", marginTop: 10 }}>
            No contracts · Start in 48 hours
          </p>
          {/* Admin access in mobile drawer */}
          <button
            onClick={() => go("admin")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              width: "100%", marginTop: 14, background: isAdminLoggedIn ? "rgba(99,102,241,.08)" : "none",
              border: isAdminLoggedIn ? "1px solid rgba(99,102,241,.2)" : "none",
              borderRadius: 8,
              fontSize: 11, fontWeight: 700, color: isAdminLoggedIn ? "#6366f1" : "var(--gray-400)",
              cursor: "pointer", letterSpacing: ".04em", textTransform: "uppercase",
              padding: "8px 0",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {isAdminLoggedIn ? "Admin Dashboard" : "Admin Portal"}
          </button>
        </div>
      </div>

      <style>{`
        /* ── Admin avatar button ── */
        .nav-admin-avatar {
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--off, #f0f4ff);
          border: 1.5px solid var(--gray-100, #e8eef8);
          border-radius: 50%;
          cursor: pointer;
          color: var(--gray-400, #8899bb);
          transition: all .18s;
          flex-shrink: 0;
        }
        .nav-admin-avatar:hover {
          background: var(--blue-glow, rgba(37,99,235,.12));
          border-color: rgba(37,99,235,.3);
          color: var(--blue, #1a56db);
          transform: scale(1.05);
        }
        .nav-admin-avatar.logged-in {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: rgba(99,102,241,.4);
          color: white;
          box-shadow: 0 4px 12px rgba(99,102,241,.35);
        }
        .nav-admin-avatar.logged-in:hover {
          opacity: .9;
          transform: scale(1.05);
          color: white;
        }
        .admin-active-dot {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 9px;
          height: 9px;
          background: #22c55e;
          border: 2px solid white;
          border-radius: 50%;
        }

        /* ── Hamburger button ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          background: var(--off, #f0f4ff);
          border: 1.5px solid var(--gray-100, #e8eef8);
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
          transition: background .18s, border-color .18s;
          flex-shrink: 0;
        }
        .nav-hamburger:hover {
          background: var(--blue-glow, rgba(37,99,235,.12));
          border-color: rgba(37,99,235,.25);
        }
        .ham-bar {
          display: block;
          width: 19px;
          height: 2px;
          background: var(--navy, #050d1f);
          border-radius: 2px;
          transition: transform .28s cubic-bezier(.4,0,.2,1), opacity .2s, width .2s;
          transform-origin: center;
        }
        .bar1.open { transform: translateY(7px) rotate(45deg); }
        .bar2.open { opacity: 0; width: 0; }
        .bar3.open { transform: translateY(-7px) rotate(-45deg); }

        /* ── Backdrop ── */
        .mobile-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(5,13,31,.45);
          z-index: 998;
          opacity: 0;
          transition: opacity .28s;
          backdrop-filter: blur(3px);
        }
        .mobile-backdrop.visible { opacity: 1; }

        /* ── Drawer ── */
        .mobile-drawer {
          display: none;
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: min(340px, 88vw);
          background: white;
          z-index: 999;
          flex-direction: column;
          box-shadow: -8px 0 48px rgba(5,13,31,.18);
          transform: translateX(100%);
          transition: transform .32s cubic-bezier(.4,0,.2,1);
          overflow-y: auto;
          border-left: 1px solid var(--gray-100, #e8eef8);
        }
        .mobile-drawer.open { transform: translateX(0); }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px 16px;
          border-bottom: 1px solid var(--gray-100, #e8eef8);
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;
        }
        .drawer-logo { display: flex; align-items: center; gap: 10px; }
        .drawer-close {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: var(--off, #f0f4ff);
          border: 1px solid var(--gray-100, #e8eef8);
          border-radius: 9px; cursor: pointer;
          color: var(--navy, #050d1f);
          transition: background .18s, color .18s;
        }
        .drawer-close:hover { background: #fee2e2; color: #dc2626; border-color: #fecaca; }

        .drawer-links {
          flex: 1;
          display: flex; flex-direction: column;
          padding: 12px 14px; gap: 4px;
        }
        .drawer-link {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; border-radius: 12px;
          font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
          font-size: 15px; font-weight: 600;
          color: var(--gray-800, #1e2a4a);
          background: none; border: none; cursor: pointer;
          text-align: left;
          transition: background .16s, color .16s;
          animation: drawerLinkIn .3s cubic-bezier(.4,0,.2,1) both;
          letter-spacing: -.1px;
          width: 100%;
        }
        .drawer-link:hover { background: var(--off, #f0f4ff); color: var(--blue, #1a56db); }
        .drawer-link.active { background: var(--blue-glow, rgba(37,99,235,.1)); color: var(--blue, #1a56db); }
        .drawer-link-label { flex: 1; }
        .drawer-active-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--blue, #1a56db); flex-shrink: 0;
        }

        .drawer-cta-wrap {
          padding: 16px 20px 28px;
          border-top: 1px solid var(--gray-100, #e8eef8);
        }

        @keyframes drawerLinkIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-admin-avatar { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .mobile-backdrop { display: block; }
          .mobile-drawer { display: flex; }
        }

        @media (min-width: 769px) and (max-width: 1000px) {
          .nav-links { display: flex !important; gap: 0; }
          .nav-link { padding: 6px 10px; font-size: 13px; }
          .nav-cta-desktop { display: flex !important; padding: 9px 16px; font-size: 13px; }
          .nav-hamburger { display: none !important; }
          .mobile-backdrop { display: none; }
          .mobile-drawer { display: none; }
        }
      `}</style>
    </>
  );
}