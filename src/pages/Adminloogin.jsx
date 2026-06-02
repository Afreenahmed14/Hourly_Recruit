import { useState } from "react";

const ADMIN_USER = "Admin";
const ADMIN_PASS = "12345";

export default function AdminLogin({ onLogin, onBack }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
        sessionStorage.setItem("hr_admin_auth", "1");
        onLogin();
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {/* Back button */}
        {onBack && (
          <button onClick={onBack} style={styles.backBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15 }}>
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to site
          </button>
        )}

        {/* Logo area */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <svg viewBox="0 0 24 24" style={{ width: 28, height: 28, fill: "white" }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={styles.logoText}>HourlyRecruit</div>
            <div style={styles.logoSub}>Admin Portal</div>
          </div>
        </div>

        <h2 style={styles.heading}>Welcome back</h2>
        <p style={styles.sub}>Sign in to manage your website content</p>

        <form onSubmit={submit} style={styles.form}>
          <div style={styles.group}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handle}
                placeholder="Enter username"
                style={styles.input}
                required
                autoFocus
              />
            </div>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handle}
                placeholder="Enter password"
                style={{ ...styles.input, paddingRight: 44 }}
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                {showPass ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.error}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 15, height: 15, flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                <span style={styles.spinner} />
                Signing in...
              </span>
            ) : "Sign In to Dashboard"}
          </button>
        </form>

        <div style={styles.hint}>
          <span style={{ opacity: 0.5 }}>Hint: </span>
          <span style={{ color: "#6366f1", fontFamily: "monospace" }}>Admin</span>
          <span style={{ opacity: 0.5 }}> / </span>
          <span style={{ color: "#6366f1", fontFamily: "monospace" }}>12345</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 24,
    padding: "44px 40px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    position: "relative",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    padding: "6px 12px",
    marginBottom: 28,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "all .18s",
    letterSpacing: ".02em",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  logoIcon: {
    width: 48, height: 48,
    borderRadius: 14,
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
  },
  logoText: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: 18, fontWeight: 800,
    color: "white", letterSpacing: "-0.3px",
  },
  logoSub: {
    fontSize: 11, color: "rgba(255,255,255,0.4)",
    fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: 28, fontWeight: 800,
    color: "white", margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  sub: { fontSize: 14, color: "rgba(255,255,255,0.45)", margin: "0 0 32px" },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  group: { display: "flex", flexDirection: "column", gap: 8 },
  label: {
    fontSize: 12, fontWeight: 700,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.05em", textTransform: "uppercase",
  },
  inputWrap: { position: "relative" },
  inputIcon: {
    position: "absolute", left: 14, top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.3)", display: "flex",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1.5px solid rgba(255,255,255,0.12)",
    borderRadius: 10, padding: "12px 14px 12px 42px",
    fontSize: 14, color: "white", outline: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: "border-box", transition: "border-color 0.2s",
  },
  eyeBtn: {
    position: "absolute", right: 14, top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer",
    color: "rgba(255,255,255,0.35)", display: "flex", padding: 0,
  },
  error: {
    display: "flex", alignItems: "center", gap: 8,
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 8, padding: "10px 14px",
    fontSize: 13, color: "#fca5a5",
  },
  btn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white", border: "none", borderRadius: 10,
    padding: "14px", fontSize: 15, fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.2s",
    boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
    marginTop: 4,
  },
  hint: {
    marginTop: 24, textAlign: "center",
    fontSize: 12, color: "rgba(255,255,255,0.4)",
  },
  spinner: {
    width: 16, height: 16,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
};