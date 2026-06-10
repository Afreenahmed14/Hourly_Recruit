import { useState, useEffect } from "react";
import { getData, setData, resetData } from "../api/Datastore";
import {
  withTokenRefresh,
  adminGetSiteSettings,
  adminCreateSiteSettings,
  adminUpdateSiteSettings,
  adminGetDevelopers,
  adminGetTestimonials,
  adminGetFAQs,
  adminGetContactInfo,
  adminGetFooter,
  clearTokens,
} from "../api/Api";

// ── Small UI primitives ────────────────────────────────────────────────────────

function Btn({ children, onClick, variant = "primary", size = "md", style: s, disabled }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    borderRadius: 8, fontFamily: "var(--font-body)", fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    border: "none", transition: "all .18s",
    fontSize: size === "sm" ? 12 : 14,
    padding: size === "sm" ? "6px 12px" : "10px 18px",
  };
  const variants = {
    primary: { background: "var(--blue)", color: "#fff", boxShadow: "0 3px 12px rgba(37,99,235,.3)" },
    danger:  { background: "#ef4444", color: "#fff", boxShadow: "0 3px 12px rgba(239,68,68,.25)" },
    ghost:   { background: "var(--off)", color: "var(--gray-600)", border: "1.5px solid var(--gray-100)" },
    success: { background: "#22c55e", color: "#fff", boxShadow: "0 3px 12px rgba(34,197,94,.25)" },
    warning: { background: "#f59e0b", color: "#fff", boxShadow: "0 3px 12px rgba(245,158,11,.25)" },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...s }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, multiline, rows = 3, type = "text" }) {
  const sharedStyle = {
    width: "100%", boxSizing: "border-box", background: "#fff",
    border: "1.5px solid var(--gray-100)", borderRadius: 8, padding: "10px 13px",
    fontFamily: "var(--font-body)", fontSize: 14, color: "var(--navy)", outline: "none",
    transition: "border-color .18s, box-shadow .18s",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{label}</label>}
      {multiline
        ? <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} style={{ ...sharedStyle, resize: "vertical" }} />
        : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={sharedStyle} />
      }
    </div>
  );
}

function Card({ children, style: s }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--gray-100)", borderRadius: 16, padding: "24px 26px", ...s }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800, color: "var(--navy)", margin: "0 0 18px", letterSpacing: "-.2px" }}>{children}</h3>;
}

function Toast({ msg, type = "success", onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  const bg = type === "success" ? "#22c55e" : type === "error" ? "#ef4444" : "#f59e0b";
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9999,
      background: bg, color: "#fff",
      padding: "12px 20px", borderRadius: 10,
      fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14,
      boxShadow: `0 8px 28px ${bg}55`,
      display: "flex", alignItems: "center", gap: 10,
      animation: "toastIn .28s cubic-bezier(.4,0,.2,1)",
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 18, height: 18 }}>
        {type === "success" ? <polyline points="20 6 9 17 4 12" /> : <line x1="18" y1="6" x2="6" y2="18" />}
      </svg>
      {msg}
    </div>
  );
}

// ── API sync banner ────────────────────────────────────────────────────────────

function SyncBanner({ status, onSync }) {
  if (status === "synced") return null;
  return (
    <div style={{
      background: status === "error" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
      border: `1px solid ${status === "error" ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)"}`,
      borderRadius: 10, padding: "10px 16px", marginBottom: 20,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
    }}>
      <span style={{ fontSize: 13, color: status === "error" ? "#dc2626" : "#92400e" }}>
        {status === "error"
          ? "⚠️ Could not sync with backend — showing local data. Check that Spring Boot is running on port 8080."
          : "⏳ Syncing with backend…"
        }
      </span>
      {status === "error" && (
        <Btn variant="warning" size="sm" onClick={onSync}>Retry Sync</Btn>
      )}
    </div>
  );
}

// ── Tab editor components ──────────────────────────────────────────────────────

function HeroEditor({ data, onChange }) {
  const h = data.home.hero;
  const upd = (key, val) => onChange({ ...data, home: { ...data.home, hero: { ...h, [key]: val } } });
  return (
    <Card>
      <SectionTitle>Hero Section</SectionTitle>
      <Input label="Badge Text" value={h.badge} onChange={(v) => upd("badge", v)} />
      <Input label="Heading Line 1" value={h.heading1} onChange={(v) => upd("heading1", v)} />
      <Input label="Heading Line 2" value={h.heading2} onChange={(v) => upd("heading2", v)} />
      <Input label="Subtext" value={h.subtext} onChange={(v) => upd("subtext", v)} multiline rows={3} />

      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Checklist Items</label>
      {h.checks.map((c, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={c} onChange={(e) => { const a = [...h.checks]; a[i] = e.target.value; upd("checks", a); }}
            style={{ flex: 1, border: "1.5px solid var(--gray-100)", borderRadius: 8, padding: "8px 12px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--navy)", outline: "none" }} />
          <Btn variant="danger" size="sm" onClick={() => { const a = h.checks.filter((_, j) => j !== i); upd("checks", a); }}>&#x2715;</Btn>
        </div>
      ))}
      <Btn variant="ghost" size="sm" onClick={() => upd("checks", [...h.checks, "New item"])}>+ Add Item</Btn>

      <div style={{ marginTop: 22 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Card Stats</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {h.cardStats.map((s, i) => (
            <div key={i} style={{ background: "var(--off)", borderRadius: 10, padding: 12 }}>
              <input value={s.value} onChange={(e) => { const a = [...h.cardStats]; a[i] = { ...a[i], value: e.target.value }; upd("cardStats", a); }}
                placeholder="Value"
                style={{ width: "100%", marginBottom: 6, border: "1.5px solid var(--gray-100)", borderRadius: 6, padding: "6px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
              <input value={s.label} onChange={(e) => { const a = [...h.cardStats]; a[i] = { ...a[i], label: e.target.value }; upd("cardStats", a); }}
                placeholder="Label"
                style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 6, padding: "6px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function TestimonialsEditor({ data, onChange }) {
  const ts = data.home.testimonials;
  const upd = (newTs) => onChange({ ...data, home: { ...data.home, testimonials: newTs } });
  return (
    <Card>
      <SectionTitle>Testimonials</SectionTitle>
      {ts.map((t, i) => (
        <div key={i} style={{ background: "var(--off)", borderRadius: 12, padding: 18, marginBottom: 14, border: "1px solid var(--gray-100)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--navy)" }}>{t.name || `Testimonial ${i + 1}`}</span>
            <Btn variant="danger" size="sm" onClick={() => upd(ts.filter((_, j) => j !== i))}>Remove</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <input placeholder="Initials" value={t.initials} onChange={(e) => { const a = [...ts]; a[i] = { ...a[i], initials: e.target.value }; upd(a); }}
              style={{ border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 11px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none" }} />
            <input placeholder="Name" value={t.name} onChange={(e) => { const a = [...ts]; a[i] = { ...a[i], name: e.target.value }; upd(a); }}
              style={{ border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 11px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none" }} />
          </div>
          <input placeholder="Role, Company" value={t.role} onChange={(e) => { const a = [...ts]; a[i] = { ...a[i], role: e.target.value }; upd(a); }}
            style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 11px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", marginBottom: 8, boxSizing: "border-box" }} />
          <textarea placeholder="Quote" rows={3} value={t.quote} onChange={(e) => { const a = [...ts]; a[i] = { ...a[i], quote: e.target.value }; upd(a); }}
            style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 11px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        </div>
      ))}
      <Btn variant="ghost" size="sm" onClick={() => upd([...ts, { initials: "AB", name: "New Person", role: "Title, Company", color: "linear-gradient(135deg,#1a56db,#3b82f6)", quote: "Great experience!" }])}>
        + Add Testimonial
      </Btn>
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
        <SectionTitle style={{ margin: 0 }}>Developer Profiles</SectionTitle>
        <Btn variant="primary" size="sm" onClick={() => {
          const nd = { initials: "NW", name: "New Developer", role: "Role", exp: "3 yrs", rate: "$30/hr", rating: "4.8", projects: 10, color: "linear-gradient(135deg,#1a56db,#3b82f6)", skills: ["React", "Node.js"], category: "Frontend" };
          upd([...devs, nd]);
          setExpand(devs.length);
        }}>+ Add Developer</Btn>
      </div>
      {devs.map((d, i) => (
        <div key={i} style={{ border: "1px solid var(--gray-100)", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", cursor: "pointer", background: expand === i ? "var(--off)" : "#fff" }}
            onClick={() => setExpand(expand === i ? null : i)}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: d.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 13, color: "#fff", flexShrink: 0 }}>{d.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--navy)" }}>{d.name}</div>
              <div style={{ fontSize: 12, color: "var(--gray-400)" }}>{d.role} &middot; {d.rate}</div>
            </div>
            <span style={{ fontSize: 12, background: "var(--blue-glow)", color: "var(--blue)", padding: "3px 10px", borderRadius: 99, fontWeight: 700 }}>{d.category}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" style={{ width: 16, height: 16, transform: expand === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
            <Btn variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); upd(devs.filter((_, j) => j !== i)); }} style={{ marginLeft: 4 }}>&#x2715;</Btn>
          </div>
          {expand === i && (
            <div style={{ padding: "16px 18px 20px", borderTop: "1px solid var(--gray-100)", background: "#fafbff" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["initials","Initials"],["name","Name"],["role","Role"],["exp","Experience"],["rate","Rate"],["rating","Rating"]].map(([k, label]) => (
                  <div key={k}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>{label}</label>
                    <input value={d[k]} onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], [k]: e.target.value }; upd(a); }}
                      style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Category</label>
                <select value={d.category} onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], category: e.target.value }; upd(a); }}
                  style={{ border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", background: "#fff" }}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Skills (comma-separated)</label>
                <input value={(d.skills || []).join(", ")} onChange={(e) => { const a = [...devs]; a[i] = { ...a[i], skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }; upd(a); }}
                  style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
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
      <SectionTitle>Pricing Plans</SectionTitle>
      {plans.map((p, i) => (
        <div key={i} style={{ border: "1px solid var(--gray-100)", borderRadius: 12, padding: "18px 20px", marginBottom: 16, background: p.popular ? "linear-gradient(135deg,#f0f4ff,#e8eef8)" : "#fafbff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 15, color: "var(--navy)" }}>{p.name}</span>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--gray-600)", cursor: "pointer" }}>
              <input type="checkbox" checked={!!p.popular} onChange={(e) => { const a = [...plans]; a[i] = { ...a[i], popular: e.target.checked }; upd(a); }} />
              Popular
            </label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[["name","Plan Name"],["amount","Amount"],["period","Period"]].map(([k, label]) => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>{label}</label>
                <input value={p[k]} onChange={(e) => { const a = [...plans]; a[i] = { ...a[i], [k]: e.target.value }; upd(a); }}
                  style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>Subtext</label>
            <input value={p.subtext} onChange={(e) => { const a = [...plans]; a[i] = { ...a[i], subtext: e.target.value }; upd(a); }}
              style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
          </div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 6 }}>Features</label>
          {p.features.map((f, j) => (
            <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input value={f} onChange={(e) => { const a = [...plans]; const feats = [...a[i].features]; feats[j] = e.target.value; a[i] = { ...a[i], features: feats }; upd(a); }}
                style={{ flex: 1, border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none" }} />
              <Btn variant="danger" size="sm" onClick={() => { const a = [...plans]; a[i] = { ...a[i], features: a[i].features.filter((_, k) => k !== j) }; upd(a); }}>&#x2715;</Btn>
            </div>
          ))}
          <Btn variant="ghost" size="sm" onClick={() => { const a = [...plans]; a[i] = { ...a[i], features: [...a[i].features, "New feature"] }; upd(a); }}>+ Feature</Btn>
        </div>
      ))}
    </Card>
  );
}

function AboutEditor({ data, onChange }) {
  const ab = data.about;
  const updHero    = (k, v) => onChange({ ...data, about: { ...ab, hero:    { ...ab.hero,    [k]: v } } });
  const updContent = (k, v) => onChange({ ...data, about: { ...ab, content: { ...ab.content, [k]: v } } });
  return (
    <>
      <Card>
        <SectionTitle>About Hero</SectionTitle>
        <Input label="Heading" value={ab.hero.heading} onChange={(v) => updHero("heading", v)} />
        <Input label="Subtext" value={ab.hero.subtext} onChange={(v) => updHero("subtext", v)} multiline rows={3} />
      </Card>
      <Card style={{ marginTop: 22 }}>
        <SectionTitle>About Content</SectionTitle>
        <Input label="Section Heading" value={ab.content.heading} onChange={(v) => updContent("heading", v)} />
        {ab.content.paragraphs.map((p, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 5 }}>Paragraph {i + 1}</label>
            <div style={{ display: "flex", gap: 8 }}>
              <textarea rows={3} value={p} onChange={(e) => { const arr = [...ab.content.paragraphs]; arr[i] = e.target.value; updContent("paragraphs", arr); }}
                style={{ flex: 1, border: "1.5px solid var(--gray-100)", borderRadius: 8, padding: "8px 12px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", resize: "vertical" }} />
              <Btn variant="danger" size="sm" onClick={() => updContent("paragraphs", ab.content.paragraphs.filter((_, j) => j !== i))}>&#x2715;</Btn>
            </div>
          </div>
        ))}
        <Btn variant="ghost" size="sm" onClick={() => updContent("paragraphs", [...ab.content.paragraphs, "New paragraph..."])}>+ Add Paragraph</Btn>
      </Card>
      <Card style={{ marginTop: 22 }}>
        <SectionTitle>Stats</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {ab.stats.map((s, i) => (
            <div key={i} style={{ background: "var(--off)", borderRadius: 10, padding: 14 }}>
              <input value={s.value} onChange={(e) => { const a = [...ab.stats]; a[i] = { ...a[i], value: e.target.value }; onChange({ ...data, about: { ...ab, stats: a } }); }}
                placeholder="Value"
                style={{ width: "100%", marginBottom: 7, border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
              <input value={s.label} onChange={(e) => { const a = [...ab.stats]; a[i] = { ...a[i], label: e.target.value }; onChange({ ...data, about: { ...ab, stats: a } }); }}
                placeholder="Label"
                style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "7px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function ContactEditor({ data, onChange }) {
  const ct = data.contact;
  const updHero = (k, v) => onChange({ ...data, contact: { ...ct, hero: { ...ct.hero, [k]: v } } });
  const updInfo = (k, v) => onChange({ ...data, contact: { ...ct, info: { ...ct.info, [k]: v } } });
  return (
    <>
      <Card>
        <SectionTitle>Contact Hero</SectionTitle>
        <Input label="Heading" value={ct.hero?.heading || ""} onChange={(v) => updHero("heading", v)} />
        <Input label="Subtext" value={ct.hero?.subtext || ""} onChange={(v) => updHero("subtext", v)} multiline rows={3} />
      </Card>
      <Card style={{ marginTop: 22 }}>
        <SectionTitle>Contact Info</SectionTitle>
        <Input label="Location" value={ct.info?.location || ""} onChange={(v) => updInfo("location", v)} />
        <Input label="Email"    value={ct.info?.email    || ""} onChange={(v) => updInfo("email", v)} />
        <Input label="Phone"    value={ct.info?.phone    || ""} onChange={(v) => updInfo("phone", v)} />
        <Input label="Website"  value={ct.info?.website  || ""} onChange={(v) => updInfo("website", v)} />
      </Card>
      <Card style={{ marginTop: 22 }}>
        <SectionTitle>Next Steps</SectionTitle>
        {(ct.nextSteps || []).map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input value={s} onChange={(e) => { const a = [...ct.nextSteps]; a[i] = e.target.value; onChange({ ...data, contact: { ...ct, nextSteps: a } }); }}
              style={{ flex: 1, border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none" }} />
            <Btn variant="danger" size="sm" onClick={() => onChange({ ...data, contact: { ...ct, nextSteps: ct.nextSteps.filter((_, j) => j !== i) } })}>&#x2715;</Btn>
          </div>
        ))}
        <Btn variant="ghost" size="sm" onClick={() => onChange({ ...data, contact: { ...ct, nextSteps: [...(ct.nextSteps || []), "New step"] } })}>+ Add Step</Btn>
      </Card>
    </>
  );
}

function FooterEditor({ data, onChange }) {
  const ft = data.footer;
  return (
    <Card>
      <SectionTitle>Footer</SectionTitle>
      <Input label="Description" value={ft.desc} onChange={(v) => onChange({ ...data, footer: { ...ft, desc: v } })} multiline rows={3} />
      <Input label="Copyright Text" value={ft.copyright} onChange={(v) => onChange({ ...data, footer: { ...ft, copyright: v } })} />
    </Card>
  );
}

function FAQEditor({ data, onChange }) {
  const faqs = data.howItWorks.faqs;
  const upd = (newFaqs) => onChange({ ...data, howItWorks: { ...data.howItWorks, faqs: newFaqs } });
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <SectionTitle style={{ margin: 0 }}>FAQs</SectionTitle>
        <Btn variant="primary" size="sm" onClick={() => upd([...faqs, { q: "New question?", a: "Answer here." }])}>+ Add FAQ</Btn>
      </div>
      {faqs.map((f, i) => (
        <div key={i} style={{ border: "1px solid var(--gray-100)", borderRadius: 10, padding: "14px 16px", marginBottom: 10, background: "#fafbff" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
            <Btn variant="danger" size="sm" onClick={() => upd(faqs.filter((_, j) => j !== i))}>Remove</Btn>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>Question</label>
            <input value={f.q} onChange={(e) => { const a = [...faqs]; a[i] = { ...a[i], q: e.target.value }; upd(a); }}
              style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 4 }}>Answer</label>
            <textarea rows={3} value={f.a} onChange={(e) => { const a = [...faqs]; a[i] = { ...a[i], a: e.target.value }; upd(a); }}
              style={{ width: "100%", border: "1.5px solid var(--gray-100)", borderRadius: 7, padding: "8px 10px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--navy)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </div>
        </div>
      ))}
    </Card>
  );
}

// ── Site Settings Panel (talks to real backend /admin/site-settings) ──────────

function SiteSettingsEditor({ backendSettings, onSaved }) {
  const [form, setForm] = useState({
    companyName: backendSettings?.companyName || "",
    logoUrl: backendSettings?.logoUrl || "",
    faviconUrl: backendSettings?.faviconUrl || "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      let result;
      if (backendSettings?.id) {
        result = await withTokenRefresh(() => adminUpdateSiteSettings(backendSettings.id, form));
      } else {
        result = await withTokenRefresh(() => adminCreateSiteSettings(form));
      }
      setToast({ msg: "Site settings saved to backend!", type: "success" });
      onSaved(result);
    } catch (err) {
      setToast({ msg: `Failed: ${err.message}`, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <SectionTitle>Site Settings (Backend)</SectionTitle>
      <div style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 10, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: "var(--blue)" }}>
        These settings are saved directly to the Spring Boot database via <code style={{ background: "rgba(37,99,235,0.1)", padding: "1px 5px", borderRadius: 4 }}>PUT /admin/site-settings</code>.
      </div>
      <Input label="Company Name" value={form.companyName} onChange={(v) => setForm(f => ({ ...f, companyName: v }))} />
      <Input label="Logo URL" value={form.logoUrl} onChange={(v) => setForm(f => ({ ...f, logoUrl: v }))} />
      <Input label="Favicon URL" value={form.faviconUrl} onChange={(v) => setForm(f => ({ ...f, faviconUrl: v }))} />
      <Btn variant="success" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save to Backend"}
      </Btn>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </Card>
  );
}

// ── Main Admin Dashboard ───────────────────────────────────────────────────────

const TABS = [
  { id: "site",         label: "Site Settings",  icon: "&#x2699;&#xFE0F;",  group: "BACKEND" },
  { id: "home",         label: "Home Hero",       icon: "&#x1F3E0;",        group: "HOME" },
  { id: "testimonials", label: "Testimonials",    icon: "&#x1F4AC;",        group: "HOME" },
  { id: "developers",   label: "Developers",      icon: "&#x1F465;",        group: "PAGES" },
  { id: "pricing",      label: "Pricing",         icon: "&#x1F4B0;",        group: "PAGES" },
  { id: "about",        label: "About",           icon: "&#x2139;&#xFE0F;", group: "PAGES" },
  { id: "contact",      label: "Contact",         icon: "&#x1F4E9;",        group: "PAGES" },
  { id: "faq",          label: "FAQs",            icon: "&#x2753;",         group: "PAGES" },
  { id: "footer",       label: "Footer",          icon: "&#x1F4CB;",        group: "PAGES" },
];

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab]           = useState("site");
const [data, setDataState] = useState(null);
  const [saved, setSaved]       = useState(null);
  const [sideOpen, setSideOpen] = useState(false);

  // Backend sync state
  const [syncStatus, setSyncStatus] = useState("checking"); // checking | synced | error
  const [backendSettings, setBackendSettings] = useState(null);

  // On mount: pull live data from backend to pre-populate editors
  // useEffect(() => {
  //   syncFromBackend();
  // }, []);
useEffect(() => {
  loadData();
  syncFromBackend();
}, []);

async function loadData() {
  const siteData = await getData();
  setDataState(siteData);
}
  async function syncFromBackend() {
    setSyncStatus("checking");
    try {
      const settings = await withTokenRefresh(() => adminGetSiteSettings());
      if (settings && settings.length > 0) {
        setBackendSettings(settings[0]);
      }
      setSyncStatus("synced");
    } catch {
      setSyncStatus("error");
    }
  }

  const save = () => {
    setData(data);
    setSaved({ msg: "Changes saved to local storage!", type: "success" });
  };

//   const reset = () => {
//     if (!window.confirm("Reset ALL content to defaults? This cannot be undone.")) return;
//     // const { resetData } = require("./Datastore");
//     await resetData();
//     resetData();
//     // setDataState(getData());
//     const freshData = await getData();
// setDataState(freshData);
//     setSaved({ msg: "Reset to defaults.", type: "success" });
//   };
const reset = async () => {
  if (!window.confirm("Reset ALL content to defaults? This cannot be undone.")) return;

  await resetData();

  const freshData = await getData();
  setDataState(freshData);

  setSaved({
    msg: "Reset to defaults.",
    type: "success"
  });
};

  const handleLogout = () => {
    sessionStorage.removeItem("hr_admin_auth");
    clearTokens();
    onLogout();
  };

  const renderPanel = () => {
    switch (tab) {
      case "site":         return <SiteSettingsEditor backendSettings={backendSettings} onSaved={(s) => setBackendSettings(s)} />;
      case "home":         return <HeroEditor data={data} onChange={setDataState} />;
      case "testimonials": return <TestimonialsEditor data={data} onChange={setDataState} />;
      case "developers":   return <DevelopersEditor data={data} onChange={setDataState} />;
      case "pricing":      return <PricingEditor data={data} onChange={setDataState} />;
      case "about":        return <AboutEditor data={data} onChange={setDataState} />;
      case "contact":      return <ContactEditor data={data} onChange={setDataState} />;
      case "faq":          return <FAQEditor data={data} onChange={setDataState} />;
      case "footer":       return <FooterEditor data={data} onChange={setDataState} />;
      default:             return null;
    }
  };

  const currentTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div style={{ minHeight: "100vh", background: "var(--off, #f0f4ff)", fontFamily: "var(--font-body)" }}>
      {/* Top Bar */}
      <div style={{
        height: 62, background: "#fff",
        borderBottom: "1px solid var(--gray-100)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 16px rgba(26,86,219,.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setSideOpen(v => !v)} style={{ display: "none", width: 36, height: 36, border: "1.5px solid var(--gray-100)", borderRadius: 8, background: "var(--off)", cursor: "pointer", alignItems: "center", justifyContent: "center" }} className="admin-hamburger">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.2" style={{ width: 18, height: 18 }}>
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
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 15, color: "var(--navy)", letterSpacing: "-.2px", lineHeight: 1 }}>HourlyRecruit</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".1em" }}>Admin Portal</div>
            </div>
          </div>
          {/* Backend status pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: syncStatus === "synced" ? "rgba(34,197,94,0.1)" : syncStatus === "error" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", border: `1px solid ${syncStatus === "synced" ? "rgba(34,197,94,0.3)" : syncStatus === "error" ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)"}`, borderRadius: 99, padding: "3px 10px 3px 8px", fontSize: 11, fontWeight: 700, color: syncStatus === "synced" ? "#16a34a" : syncStatus === "error" ? "#dc2626" : "#92400e" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: syncStatus === "synced" ? "#22c55e" : syncStatus === "error" ? "#ef4444" : "#f59e0b", display: "inline-block" }} />
            {syncStatus === "synced" ? "Backend synced" : syncStatus === "error" ? "Backend offline" : "Syncing…"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Btn variant="ghost" size="sm" onClick={reset}>Reset Defaults</Btn>
          <Btn variant="success" size="sm" onClick={save}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 14, height: 14 }}><polyline points="20 6 9 17 4 12" /></svg>
            Save Local
          </Btn>
          <button onClick={handleLogout} style={{ width: 34, height: 34, border: "1.5px solid var(--gray-100)", borderRadius: 8, background: "var(--off)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Logout">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--gray-600)" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 62px)" }}>
        {/* Sidebar */}
        <>
          <div className={`admin-sidebar-backdrop${sideOpen ? " open" : ""}`} onClick={() => setSideOpen(false)} />
          <aside className={`admin-sidebar${sideOpen ? " mobile-open" : ""}`}>
            <div style={{ padding: "18px 14px 14px" }}>
              {["BACKEND", "HOME", "PAGES"].map((group) => (
                <div key={group}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: ".12em", margin: "12px 0 6px", paddingLeft: 4 }}>
                    {group}
                  </div>
                  {TABS.filter((t) => t.group === group).map((t) => (
                    <button key={t.id} onClick={() => { setTab(t.id); setSideOpen(false); }}
                      style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 11, padding: "10px 13px", borderRadius: 10, background: tab === t.id ? "var(--blue-glow, rgba(37,99,235,.1))" : "transparent", color: tab === t.id ? "var(--blue)" : "var(--gray-600)", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: tab === t.id ? 700 : 500, transition: "all .15s", marginBottom: 3 }}>
                      <span style={{ fontSize: 16 }} dangerouslySetInnerHTML={{ __html: t.icon }} />
                      {t.label}
                      {tab === t.id && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" style={{ width: 14, height: 14, marginLeft: "auto" }}>
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ padding: "14px", borderTop: "1px solid var(--gray-100)", marginTop: "auto" }}>
              <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.08))", borderRadius: 12, padding: "14px", border: "1px solid rgba(99,102,241,.15)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", marginBottom: 5 }}>API Base URL</div>
                <code style={{ fontSize: 11, color: "var(--gray-600)", wordBreak: "break-all" }}>
                  {import.meta?.env?.VITE_API_URL || "http://localhost:8080"}
                </code>
                <div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 6, lineHeight: 1.5 }}>
                  Set <code>VITE_API_URL</code> in your .env to point to your Spring Boot server.
                </div>
              </div>
            </div>
          </aside>
        </>

        {/* Main content */}
        <main style={{ flex: 1, padding: "28px 32px", maxWidth: "860px", overflowX: "hidden" }}>
          <SyncBanner status={syncStatus} onSync={syncFromBackend} />

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }} dangerouslySetInnerHTML={{ __html: currentTab.icon }} />
              <h2 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 22, color: "var(--navy)", letterSpacing: "-.4px", margin: 0 }}>{currentTab.label}</h2>
            </div>
            <p style={{ fontSize: 13, color: "var(--gray-400)" }}>
              {tab === "site"
                ? "These settings sync directly with your Spring Boot backend."
                : <>Edit content below — click <strong style={{ color: "var(--navy)" }}>Save Local</strong> to update the live site.</>
              }
            </p>
          </div>

          {renderPanel()}

          {tab !== "site" && (
            <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
              <Btn variant="success" onClick={save}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 14, height: 14 }}><polyline points="20 6 9 17 4 12" /></svg>
                Save Local
              </Btn>
              <Btn variant="ghost" onClick={() => setDataState(getData())}>Discard</Btn>
            </div>
          )}
        </main>
      </div>

      {saved && <Toast msg={saved.msg} type={saved.type} onClose={() => setSaved(null)} />}

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px) scale(.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .admin-sidebar {
          width: 230px; min-height: calc(100vh - 62px);
          background: #fff; border-right: 1px solid var(--gray-100);
          display: flex; flex-direction: column; flex-shrink: 0;
        }
        .admin-sidebar-backdrop { display: none; position: fixed; inset: 0; background: rgba(5,13,31,.4); z-index: 200; opacity: 0; transition: opacity .25s; }
        @media (max-width: 768px) {
          .admin-hamburger { display: flex !important; }
          .admin-sidebar { position: fixed; top: 62px; left: 0; bottom: 0; z-index: 201; transform: translateX(-100%); transition: transform .3s cubic-bezier(.4,0,.2,1); box-shadow: 4px 0 24px rgba(5,13,31,.15); }
          .admin-sidebar.mobile-open { transform: translateX(0); }
          .admin-sidebar-backdrop { display: block; }
          .admin-sidebar-backdrop.open { opacity: 1; pointer-events: all; }
          main { padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  );
}