import { useState, useEffect } from "react";
import { getData, setData, resetData } from "../api/Datastore";

// ── UI Primitives ─────────────────────────────────────────────────────────────

function Btn({ children, onClick, variant = "primary", size = "md", style: s, disabled }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    borderRadius: 8, fontFamily: "var(--font-body)", fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    border: "none", transition: "all .18s",
    fontSize: size === "sm" ? 12 : 14,
    padding: size === "sm" ? "6px 12px" : "10px 18px",
    letterSpacing: ".01em",
  };
  const variants = {
    primary: { background: "var(--blue,#1a56db)", color: "#fff", boxShadow: "0 3px 12px rgba(37,99,235,.3)" },
    danger:  { background: "#ef4444", color: "#fff", boxShadow: "0 3px 12px rgba(239,68,68,.25)" },
    ghost:   { background: "var(--off,#f0f4ff)", color: "var(--gray-600,#4b5a7a)", border: "1.5px solid var(--gray-100,#e8eef8)" },
    success: { background: "#22c55e", color: "#fff", boxShadow: "0 3px 12px rgba(34,197,94,.25)" },
    purple:  { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 3px 12px rgba(99,102,241,.35)" },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...s }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Field({ label, value, onChange, multiline, rows = 3, type = "text", hint }) {
  const shared = {
    width: "100%", boxSizing: "border-box",
    background: "#fff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8, padding: "10px 13px",
    fontFamily: "var(--font-body,'Plus Jakarta Sans',sans-serif)", fontSize: 14,
    color: "var(--navy,#050d1f)", outline: "none",
    transition: "border-color .18s, box-shadow .18s",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>
          {label}
        </label>
      )}
      {multiline
        ? <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...shared, resize: "vertical" }} />
        : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={shared} />
      }
      {hint && <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{hint}</p>}
    </div>
  );
}

function Card({ children, style: s }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8eef8", borderRadius: 16, padding: "24px 26px", marginBottom: 20, ...s }}>
      {children}
    </div>
  );
}

function STitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ fontFamily: "var(--font-head,'Bricolage Grotesque',sans-serif)", fontSize: 16, fontWeight: 800, color: "var(--navy,#050d1f)", margin: 0, letterSpacing: "-.2px" }}>{children}</h3>
      {sub && <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{sub}</p>}
    </div>
  );
}

function Toast({ msg, type = "success", onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  const colors = { success: { bg: "#22c55e", shadow: "rgba(34,197,94,.35)" }, error: { bg: "#ef4444", shadow: "rgba(239,68,68,.35)" } };
  const c = colors[type] || colors.success;
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9999,
      background: c.bg, color: "#fff",
      padding: "13px 20px", borderRadius: 12,
      fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14,
      boxShadow: `0 8px 28px ${c.shadow}`,
      display: "flex", alignItems: "center", gap: 10,
      animation: "toastIn .28s cubic-bezier(.4,0,.2,1)",
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 18, height: 18 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {msg}
    </div>
  );
}

// ── Tab Panels ────────────────────────────────────────────────────────────────

function HomeEditor({ data, onChange }) {
  const h = data.home.hero;
  const upd = (key, val) => onChange({ ...data, home: { ...data.home, hero: { ...h, [key]: val } } });

  return (
    <>
      <Card>
        <STitle sub="Edit the main hero banner text and stats">Hero Section</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Field label="Badge Text" value={h.badge} onChange={(v) => upd("badge", v)} />
          <Field label="Accent / Highlight Word" value={h.accent} onChange={(v) => upd("accent", v)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Field label="Heading Line 1" value={h.heading1} onChange={(v) => upd("heading1", v)} />
          <Field label="Heading Line 2" value={h.heading2} onChange={(v) => upd("heading2", v)} />
        </div>
        <Field label="Subtext / Description" value={h.subtext} onChange={(v) => upd("subtext", v)} multiline rows={3} />

        <div style={{ marginBottom: 6 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>Checklist Items</label>
          {h.checks.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--blue-glow,rgba(26,86,219,.1))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, color: "var(--blue,#1a56db)" }}>{i+1}</div>
              <input value={c} onChange={(e) => { const a = [...h.checks]; a[i] = e.target.value; upd("checks", a); }}
                style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--navy)", outline: "none" }} />
              <Btn variant="danger" size="sm" onClick={() => upd("checks", h.checks.filter((_, j) => j !== i))}>✕</Btn>
            </div>
          ))}
          <Btn variant="ghost" size="sm" onClick={() => upd("checks", [...h.checks, "New item"])}>+ Add Item</Btn>
        </div>

        <div style={{ marginTop: 22 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Hero Card Stats</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {h.cardStats.map((s, i) => (
              <div key={i} style={{ background: "#f8faff", borderRadius: 10, padding: 14, border: "1px solid #e8eef8" }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Stat {i+1}</label>
                <input value={s.value} onChange={(e) => { const a = [...h.cardStats]; a[i] = { ...a[i], value: e.target.value }; upd("cardStats", a); }}
                  placeholder="500+" style={{ width: "100%", marginBottom: 6, border: "1.5px solid #e2e8f0", borderRadius: 6, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box", fontWeight: 700 }} />
                <input value={s.label} onChange={(e) => { const a = [...h.cardStats]; a[i] = { ...a[i], label: e.target.value }; upd("cardStats", a); }}
                  placeholder="Label" style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 6, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <TestimonialsEditor data={data} onChange={onChange} />
    </>
  );
}

function TestimonialsEditor({ data, onChange }) {
  const ts = data.home.testimonials;
  const upd = (newTs) => onChange({ ...data, home: { ...data.home, testimonials: newTs } });

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <STitle sub="Manage client testimonials shown on the home page">Testimonials</STitle>
        <Btn variant="primary" size="sm" onClick={() => upd([...ts, { initials: "AB", name: "New Client", role: "Title, Company", color: "linear-gradient(135deg,#1a56db,#3b82f6)", quote: "Great experience working with HourlyRecruit!" }])}>
          + Add
        </Btn>
      </div>
      {ts.map((t, i) => (
        <div key={i} style={{ border: "1px solid #e8eef8", borderRadius: 12, padding: "16px 18px", marginBottom: 12, background: "#fafbff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: t.color || "linear-gradient(135deg,#1a56db,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>{t.initials || "?"}</div>
              <span style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{t.name || `Testimonial ${i+1}`}</span>
            </div>
            <Btn variant="danger" size="sm" onClick={() => upd(ts.filter((_, j) => j !== i))}>Remove</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[["initials","Initials"],["name","Name"],["role","Role, Company"]].map(([k, lbl]) => (
              <div key={k}>
                <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>{lbl}</label>
                <input value={t[k] || ""} onChange={(e) => { const a = [...ts]; a[i] = { ...a[i], [k]: e.target.value }; upd(a); }}
                  style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 11px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <textarea placeholder="Client quote…" rows={3} value={t.quote || ""} onChange={(e) => { const a = [...ts]; a[i] = { ...a[i], quote: e.target.value }; upd(a); }}
            style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 11px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        </div>
      ))}
    </Card>
  );
}

function DevelopersEditor({ data, onChange }) {
  const devs = data.developers;
  const upd = (newDevs) => onChange({ ...data, developers: newDevs });
  const [expand, setExpand] = useState(null);
  const categories = ["Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Design"];

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <STitle sub="Manage developer profiles (shown in Hire Developers page — admin only)">Developer Profiles</STitle>
        <Btn variant="primary" size="sm" onClick={() => {
          const nd = { initials: "NW", name: "New Developer", role: "Role Title", exp: "3 yrs", rate: "$30/hr", rating: "4.8", projects: 10, color: "linear-gradient(135deg,#1a56db,#3b82f6)", skills: ["React","Node.js"], category: "Frontend" };
          upd([...devs, nd]);
          setExpand(devs.length);
        }}>+ Add Developer</Btn>
      </div>

      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 8 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" style={{ width: 16, height: 16, flexShrink: 0, marginTop: 1 }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <p style={{ fontSize: 12, color: "#92400e", margin: 0, lineHeight: 1.5 }}>
          <strong>Admin-only section.</strong> Developer profiles are not shown in the public website navigation. They are only visible after admin login in the Hire Developers management page.
        </p>
      </div>

      {devs.map((d, i) => (
        <div key={i} style={{ border: "1px solid #e8eef8", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", cursor: "pointer", background: expand === i ? "#f8faff" : "#fff", transition: "background .15s" }}
            onClick={() => setExpand(expand === i ? null : i)}
          >
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: d.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 13, color: "#fff", flexShrink: 0 }}>{d.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--navy)" }}>{d.name}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{d.role} · {d.rate}</div>
            </div>
            <span style={{ fontSize: 11, background: "rgba(26,86,219,.08)", color: "var(--blue,#1a56db)", padding: "3px 10px", borderRadius: 99, fontWeight: 700 }}>{d.category}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ width: 16, height: 16, transform: expand === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
            <Btn variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); upd(devs.filter((_, j) => j !== i)); }} style={{ marginLeft: 4 }}>✕</Btn>
          </div>

          {expand === i && (
            <div style={{ padding: "16px 18px 20px", borderTop: "1px solid #e8eef8", background: "#fafbff" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["initials","Initials"],["name","Full Name"],["role","Role Title"],["exp","Experience"],["rate","Hourly Rate"],["rating","Rating (e.g. 4.9)"],["projects","Projects Count"]].map(([k, lbl]) => (
                  <div key={k}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>{lbl}</label>
                    <input value={d[k] || ""} onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], [k]: e.target.value }; upd(a); }}
                      style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Category</label>
                <select value={d.category} onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], category: e.target.value }; upd(a); }}
                  style={{ border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 12px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", background: "#fff" }}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Skills (comma-separated)</label>
                <input value={(d.skills || []).join(", ")} onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }; upd(a); }}
                  style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Avatar Gradient CSS</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input value={d.color || ""} onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], color: e.target.value }; upd(a); }}
                    style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: d.color, flexShrink: 0, border: "2px solid #e8eef8" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}

function PricingEditor({ data, onChange }) {
  const plans = data.pricing;
  const upd = (newPlans) => onChange({ ...data, pricing: newPlans });

  return (
    <Card>
      <STitle sub="Edit pricing plan names, amounts, and features">Pricing Plans</STitle>
      {plans.map((p, i) => (
        <div key={i} style={{ border: "1px solid #e8eef8", borderRadius: 12, padding: "18px 20px", marginBottom: 16, background: p.popular ? "linear-gradient(135deg,#f0f4ff,#e8eef8)" : "#fafbff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 15, color: "var(--navy)" }}>{p.name}</span>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#64748b", cursor: "pointer" }}>
              <input type="checkbox" checked={!!p.popular} onChange={(e) => { const a = [...plans]; a[i] = { ...a[i], popular: e.target.checked }; upd(a); }} />
              Mark as Popular
            </label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[["name","Plan Name"],["amount","Price"],["period","Period (e.g. /mo)"]].map(([k,lbl]) => (
              <div key={k}>
                <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>{lbl}</label>
                <input value={p[k] || ""} onChange={(e) => { const a = [...plans]; a[i] = { ...a[i], [k]: e.target.value }; upd(a); }}
                  style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>Subtext</label>
            <input value={p.subtext || ""} onChange={(e) => { const a = [...plans]; a[i] = { ...a[i], subtext: e.target.value }; upd(a); }}
              style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
          </div>
          <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 8 }}>Features</label>
          {(p.features || []).map((f, j) => (
            <div key={j} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <input value={f} onChange={(e) => { const a = [...plans]; const feats = [...a[i].features]; feats[j] = e.target.value; a[i] = { ...a[i], features: feats }; upd(a); }}
                style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none" }} />
              <Btn variant="danger" size="sm" onClick={() => { const a = [...plans]; a[i] = { ...a[i], features: a[i].features.filter((_, k) => k !== j) }; upd(a); }}>✕</Btn>
            </div>
          ))}
          <Btn variant="ghost" size="sm" onClick={() => { const a = [...plans]; a[i] = { ...a[i], features: [...(a[i].features||[]), "New feature"] }; upd(a); }}>+ Feature</Btn>
        </div>
      ))}
    </Card>
  );
}

function AboutEditor({ data, onChange }) {
  const ab = data.about;

  return (
    <>
      <Card>
        <STitle sub="Hero banner text for the About page">Hero Section</STitle>
        <Field label="Heading" value={ab.hero.heading} onChange={(v) => onChange({ ...data, about: { ...ab, hero: { ...ab.hero, heading: v } } })} />
        <Field label="Subtext" value={ab.hero.subtext} onChange={(v) => onChange({ ...data, about: { ...ab, hero: { ...ab.hero, subtext: v } } })} multiline rows={3} />
      </Card>

      <Card>
        <STitle sub="Key numbers shown on the About page">Stats & Numbers</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {(ab.stats || []).map((s, i) => (
            <div key={i} style={{ background: "#f8faff", borderRadius: 10, padding: 14, border: "1px solid #e8eef8" }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Stat {i+1}</label>
              <input value={s.value} onChange={(e) => { const a = [...ab.stats]; a[i] = { ...a[i], value: e.target.value }; onChange({ ...data, about: { ...ab, stats: a } }); }}
                placeholder="500+" style={{ width: "100%", marginBottom: 6, border: "1.5px solid #e2e8f0", borderRadius: 6, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
              <input value={s.label} onChange={(e) => { const a = [...ab.stats]; a[i] = { ...a[i], label: e.target.value }; onChange({ ...data, about: { ...ab, stats: a } }); }}
                placeholder="Label" style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 6, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <STitle sub="Team members listed on the About page">Team Members</STitle>
          <Btn variant="primary" size="sm" onClick={() => {
            const nm = { initials: "NM", name: "New Member", role: "Role Title", color: "linear-gradient(135deg,#1a56db,#3b82f6)" };
            onChange({ ...data, about: { ...ab, team: [...(ab.team||[]), nm] } });
          }}>+ Add Member</Btn>
        </div>
        {(ab.team || []).map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", border: "1px solid #e8eef8", borderRadius: 10, padding: "12px 14px", marginBottom: 8, background: "#fafbff" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{m.initials}</div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[["initials","Initials"],["name","Name"],["role","Role"]].map(([k,lbl]) => (
                <div key={k}>
                  <label style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 3 }}>{lbl}</label>
                  <input value={m[k]||""} onChange={(e) => { const a = [...ab.team]; a[i] = { ...a[i], [k]: e.target.value }; onChange({ ...data, about: { ...ab, team: a } }); }}
                    style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 6, padding: "6px 9px", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            <Btn variant="danger" size="sm" onClick={() => onChange({ ...data, about: { ...ab, team: ab.team.filter((_, j) => j !== i) } })}>✕</Btn>
          </div>
        ))}
      </Card>

      <Card>
        <STitle sub="Mission statement text">Mission Statement</STitle>
        <Field label="Mission" value={ab.content?.mission || ""} onChange={(v) => onChange({ ...data, about: { ...ab, content: { ...(ab.content||{}), mission: v } } })} multiline rows={3} />
      </Card>
    </>
  );
}

function ContactEditor({ data, onChange }) {
  const ct = data.contact;
  const upd = (k, v) => onChange({ ...data, contact: { ...ct, [k]: v } });

  return (
    <Card>
      <STitle sub="Contact page header and company information">Contact Info</STitle>
      <Field label="Page Heading" value={ct.heading} onChange={(v) => upd("heading", v)} />
      <Field label="Subtext" value={ct.subtext} onChange={(v) => upd("subtext", v)} multiline rows={2} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Field label="Phone" value={ct.phone} onChange={(v) => upd("phone", v)} />
        <Field label="Email" value={ct.email} onChange={(v) => upd("email", v)} />
        <Field label="Location" value={ct.location} onChange={(v) => upd("location", v)} />
        <Field label="Website" value={ct.website} onChange={(v) => upd("website", v)} />
      </div>
    </Card>
  );
}

function FAQEditor({ data, onChange }) {
  const faqs = data.howItWorks.faqs;
  const upd = (newFaqs) => onChange({ ...data, howItWorks: { ...data.howItWorks, faqs: newFaqs } });

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <STitle sub="Manage FAQ items on the How It Works page">FAQs</STitle>
        <Btn variant="primary" size="sm" onClick={() => upd([...faqs, { q: "New question?", a: "Answer here." }])}>+ Add FAQ</Btn>
      </div>
      {faqs.map((f, i) => (
        <div key={i} style={{ border: "1px solid #e8eef8", borderRadius: 10, padding: "14px 16px", marginBottom: 10, background: "#fafbff" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
            <Btn variant="danger" size="sm" onClick={() => upd(faqs.filter((_, j) => j !== i))}>Remove</Btn>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>Question</label>
            <input value={f.q} onChange={(e) => { const a = [...faqs]; a[i] = { ...a[i], q: e.target.value }; upd(a); }}
              style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>Answer</label>
            <textarea rows={3} value={f.a} onChange={(e) => { const a = [...faqs]; a[i] = { ...a[i], a: e.target.value }; upd(a); }}
              style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
        </div>
      ))}
    </Card>
  );
}

function FooterEditor({ data, onChange }) {
  const ft = data.footer;
  return (
    <Card>
      <STitle sub="Footer brand description and copyright text">Footer</STitle>
      <Field label="Brand Description" value={ft.desc} onChange={(v) => onChange({ ...data, footer: { ...ft, desc: v } })} multiline rows={3} />
      <Field label="Copyright Text" value={ft.copyright} onChange={(v) => onChange({ ...data, footer: { ...ft, copyright: v } })} />
    </Card>
  );
}

// ── Overview Panel ─────────────────────────────────────────────────────────────

function Overview({ data, setTab, onNavigateSite }) {
  const sections = [
    { id: "home",       label: "Home Hero",       icon: "🏠", desc: "Badge, heading, checks, stats" },
    { id: "testimonials",label:"Testimonials",    icon: "💬", desc: "Client quotes & info" },
    { id: "developers", label: "Developers 🔒",   icon: "👥", desc: "Admin-only profiles & hire page" },
    { id: "pricing",    label: "Pricing",         icon: "💰", desc: "Plan names, prices, features" },
    { id: "about",      label: "About Page",      icon: "ℹ️", desc: "Hero, stats, team, mission" },
    { id: "contact",    label: "Contact",         icon: "📩", desc: "Heading, phone, email, location" },
    { id: "faq",        label: "FAQs",            icon: "❓", desc: "How It Works questions & answers" },
    { id: "footer",     label: "Footer",          icon: "📋", desc: "Description & copyright" },
  ];

  return (
    <>
      <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 16, padding: "28px 30px", marginBottom: 24, color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
        <div style={{ position: "absolute", right: 40, bottom: -30, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>👋</div>
          <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 22, margin: "0 0 8px", letterSpacing: "-.3px" }}>Welcome, Admin</h2>
          <p style={{ fontSize: 14, opacity: .8, lineHeight: 1.6, margin: 0 }}>
            Edit any section below and click <strong>Save Changes</strong> to instantly update the live website.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Developers", value: data.developers.length, color: "#6366f1", icon: "👥" },
          { label: "Testimonials", value: data.home.testimonials.length, color: "#22c55e", icon: "💬" },
          { label: "Pricing Plans", value: data.pricing.length, color: "#f59e0b", icon: "💰" },
          { label: "FAQs", value: data.howItWorks.faqs.length, color: "#ec4899", icon: "❓" },
        ].map(({ label, value, color, icon }) => (
          <div key={label} style={{ background: "#fff", border: "1px solid #e8eef8", borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 22, color: "var(--navy)", lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <Card style={{ marginBottom: 0 }}>
        <STitle sub="Click any section to edit its content">All Editable Sections</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => setTab(s.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 10, border: "1.5px solid #e8eef8", background: "#fafbff", cursor: "pointer", textAlign: "left", transition: "all .15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,.4)"; e.currentTarget.style.background = "#f0f4ff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8eef8"; e.currentTarget.style.background = "#fafbff"; }}
            >
              <div style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 13, color: "var(--navy)" }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{s.desc}</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" style={{ width: 14, height: 14, flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </Card>
    </>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────────

const TABS = [
  { id: "overview",     label: "Overview",        icon: "📊" },
  { id: "home",         label: "Home Hero",       icon: "🏠" },
  { id: "testimonials", label: "Testimonials",    icon: "💬" },
  { id: "developers",   label: "Developers 🔒",   icon: "👥" },
  { id: "pricing",      label: "Pricing",         icon: "💰" },
  { id: "about",        label: "About Page",      icon: "ℹ️" },
  { id: "contact",      label: "Contact",         icon: "📩" },
  { id: "faq",          label: "FAQs",            icon: "❓" },
  { id: "footer",       label: "Footer",          icon: "📋" },
];

export default function AdminDashboard({ onLogout, onNavigateSite }) {
  const [tab, setTab]          = useState("overview");
  const [data, setDataState]   = useState(getData);
  const [saved, setSaved]      = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  const save = () => {
    setData(data);
    setSaved(true);
  };

  const reset = () => {
    if (!window.confirm("Reset ALL content to defaults? This cannot be undone.")) return;
    resetData();
    setDataState(getData());
    setSaved(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("hr_admin_auth");
    onLogout();
  };

  const renderPanel = () => {
    switch (tab) {
      case "overview":      return <Overview data={data} setTab={setTab} onNavigateSite={onNavigateSite} />;
      case "home":          return <HomeEditor data={data} onChange={setDataState} />;
      case "testimonials":  return <TestimonialsEditor data={data} onChange={setDataState} />;
      case "developers":    return <DevelopersEditor data={data} onChange={setDataState} />;
      case "pricing":       return <PricingEditor data={data} onChange={setDataState} />;
      case "about":         return <AboutEditor data={data} onChange={setDataState} />;
      case "contact":       return <ContactEditor data={data} onChange={setDataState} />;
      case "faq":           return <FAQEditor data={data} onChange={setDataState} />;
      case "footer":        return <FooterEditor data={data} onChange={setDataState} />;
      default:              return null;
    }
  };

  const currentTab = TABS.find((t) => t.id === tab);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "var(--font-body,'Plus Jakarta Sans',sans-serif)" }}>

      {/* ── Top Bar ── */}
      <div style={{
        height: 62, background: "#fff",
        borderBottom: "1px solid #e8eef8",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 16px rgba(26,86,219,.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setSideOpen(v => !v)}
            style={{ display: "none", width: 36, height: 36, border: "1.5px solid #e8eef8", borderRadius: 8, background: "#f8faff", cursor: "pointer", alignItems: "center", justifyContent: "center" }}
            className="admin-hamburger">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy,#050d1f)" strokeWidth="2.2" style={{ width: 18, height: 18 }}>
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,.35)" }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "white" }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-head,'Bricolage Grotesque',sans-serif)", fontWeight: 800, fontSize: 15, color: "var(--navy,#050d1f)", letterSpacing: "-.2px", lineHeight: 1 }}>HourlyRecruit</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".1em" }}>Admin Portal</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {onNavigateSite && (
            <Btn variant="ghost" size="sm" onClick={() => onNavigateSite("home")} style={{ gap: 6 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Site
            </Btn>
          )}
          <Btn variant="ghost" size="sm" onClick={reset}>Reset</Btn>
          <Btn variant="success" size="sm" onClick={save}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 14, height: 14 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Save Changes
          </Btn>
          <button onClick={handleLogout}
            style={{ width: 34, height: 34, border: "1.5px solid #e8eef8", borderRadius: 8, background: "#f8faff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            title="Logout">
            <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 62px)" }}>

        {/* ── Sidebar ── */}
        <div className={`admin-sidebar-backdrop${sideOpen ? " open" : ""}`} onClick={() => setSideOpen(false)} />
        <aside className={`admin-sidebar${sideOpen ? " mobile-open" : ""}`}>
          <div style={{ padding: "18px 14px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 10, paddingLeft: 4 }}>Navigation</div>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setSideOpen(false); }}
                style={{
                  width: "100%", textAlign: "left",
                  display: "flex", alignItems: "center", gap: 11,
                  padding: "10px 13px", borderRadius: 10,
                  background: tab === t.id ? "linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.08))" : "transparent",
                  color: tab === t.id ? "#6366f1" : "#64748b",
                  border: tab === t.id ? "1px solid rgba(99,102,241,.15)" : "1px solid transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: tab === t.id ? 700 : 500,
                  transition: "all .15s", marginBottom: 3,
                }}
              >
                <span style={{ fontSize: 15 }}>{t.icon}</span>
                <span style={{ flex: 1 }}>{t.label}</span>
                {tab === t.id && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" style={{ width: 13, height: 13 }}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <div style={{ padding: "14px", borderTop: "1px solid #e8eef8", marginTop: "auto" }}>
            <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,.1),rgba(139,92,246,.06))", borderRadius: 12, padding: "14px", border: "1px solid rgba(99,102,241,.15)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", marginBottom: 5 }}>💡 How it works</div>
              <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.55 }}>
                Edit any content → click <strong style={{ color: "var(--navy,#050d1f)" }}>Save Changes</strong> → live site updates instantly.
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Panel ── */}
        <main style={{ flex: 1, padding: "28px 32px", maxWidth: "900px", overflowX: "hidden", boxSizing: "border-box" }}>
          {tab !== "overview" && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <button onClick={() => setTab("overview")}
                  style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#94a3b8", padding: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Overview
                </button>
                <span style={{ fontSize: 12, color: "#cbd5e1" }}>›</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6366f1" }}>{currentTab?.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>{currentTab?.icon}</span>
                <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 22, color: "var(--navy,#050d1f)", letterSpacing: "-.4px", margin: 0 }}>{currentTab?.label}</h2>
              </div>
              <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
                Edit content below — click <strong style={{ color: "var(--navy,#050d1f)" }}>Save Changes</strong> in the top bar to publish to the live site.
              </p>
            </div>
          )}

          {renderPanel()}

          {tab !== "overview" && (
            <div style={{ marginTop: 28, display: "flex", gap: 12, paddingBottom: 40 }}>
              <Btn variant="success" onClick={save}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 14, height: 14 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save Changes
              </Btn>
              <Btn variant="ghost" onClick={() => setDataState(getData())}>Discard Changes</Btn>
            </div>
          )}
        </main>
      </div>

      {saved && <Toast msg="Changes saved! Live site updated." onClose={() => setSaved(false)} />}

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px) scale(.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .admin-sidebar {
          width: 228px;
          min-height: calc(100vh - 62px);
          background: #fff;
          border-right: 1px solid #e8eef8;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }
        .admin-sidebar-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(5,13,31,.4);
          z-index: 200;
          opacity: 0;
          transition: opacity .25s;
        }
        @media (max-width: 768px) {
          .admin-hamburger { display: flex !important; }
          .admin-sidebar {
            position: fixed;
            top: 62px; left: 0; bottom: 0;
            z-index: 201;
            transform: translateX(-100%);
            transition: transform .3s cubic-bezier(.4,0,.2,1);
            box-shadow: 4px 0 24px rgba(5,13,31,.15);
          }
          .admin-sidebar.mobile-open { transform: translateX(0); }
          .admin-sidebar-backdrop { display: block; }
          .admin-sidebar-backdrop.open { opacity: 1; pointer-events: all; }
          main { padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  );
}