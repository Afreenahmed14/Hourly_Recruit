import { useState } from "react";

// SVG icons mapped to service names (fallback icon reused for all)
const ServiceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

export default function Home({ navigate, siteData }) {
  const [activeTab, setActiveTab] = useState("Frontend");

  // ── pull from siteData, fall back to sensible defaults ──
  const hero = siteData?.home?.hero ?? {};
  const trust = siteData?.home?.trust ?? { label: "", logos: [] };
  const offer = siteData?.home?.offer ?? { label: "", heading: "", sub: "", items: [] };
  const engagement = siteData?.home?.engagement ?? { label: "", heading: "", sub: "", models: [] };
  const startup = siteData?.home?.startup ?? { tag: "", heading: "", desc: "", checks: [], card: { heading: "", desc: "", stats: [] } };
  // const how = siteData?.home?.how ?? { label: "", heading: "", sub: "", steps: [] };
  // const why = siteData?.home?.why ?? { label: "", heading: "", cards: [] };
  const cta = siteData?.home?.cta ?? { label: "", heading: "", sub: "" };
  const testimonials = siteData?.home?.testimonials ?? [];

  // const techData = {
  //   Frontend: [
  //     { name: "React.js", color: "#61dafb" }, { name: "Angular", color: "#dd1b16" },
  //     { name: "Vue.js", color: "#42b883" },   { name: "HTML/CSS", color: "#e34c26" },
  //     { name: "Tailwind CSS", color: "#06b6d4" }, { name: "JavaScript", color: "#f7df1e" },
  //     { name: "TypeScript", color: "#3178c6" }, { name: "Next.js", color: "#000000" },
  //   ],
  //   Backend: [
  //     { name: "Node.js", color: "#339933" }, { name: "Python", color: "#3776ab" },
  //     { name: "Java", color: "#f89820" },    { name: "PHP", color: "#777bb4" },
  //     { name: ".NET", color: "#512bd4" },    { name: "Django", color: "#0c4b33" },
  //     { name: "FastAPI", color: "#009688" }, { name: "Express.js", color: "#259dff" },
  //   ],
  //   "Cloud & DevOps": [
  //     { name: "AWS", color: "#ff9900" },   { name: "Azure", color: "#0078d4" },
  //     { name: "GCP", color: "#4285f4" },   { name: "Docker", color: "#2496ed" },
  //     { name: "Kubernetes", color: "#326ce5" }, { name: "CI/CD", color: "#22c55e" },
  //     { name: "Terraform", color: "#7b42bc" },  { name: "GitHub Actions", color: "#2088ff" },
  //   ],
  // };
  const techData = {
    Frontend: [
      {
        name: "React.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
      },
      {
        name: "Angular",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
      },
      {
        name: "Vue.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
      },
      {
        name: "HTML/CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
      },
      {
        name: "Tailwind CSS",
        logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
      }
    ],

    Backend: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
      },
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
      },
      {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
      },
      {
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
      },
      {
        name: ".NET",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg"
      },
      {
        name: "Django",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
      },
      {
        name: "FastAPI",
        logo: "https://cdn.worldvectorlogo.com/logos/fastapi.svg"
      },
      {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
      }
    ],

    "Cloud & DevOps": [
      {
        name: "AWS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        name: "Azure",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
      },
      {
        name: "GCP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg"
      },
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
      },
      {
        name: "Kubernetes",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
      },
      {
        name: "CI/CD",
        logo: "https://cdn-icons-png.flaticon.com/512/4149/4149680.png"
      },
      {
        name: "Terraform",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
      },
      {
        name: "GitHub Actions",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
      }
    ]
  };
  const industryIcons = [
    <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
    <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
    <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  ];

  const industries = [
    { title: "SaaS & Software", sub: "Scalable platforms & cloud solutions" },
    { title: "E-Commerce", sub: "Online stores & payment solutions" },
    { title: "FinTech", sub: "Banking, payments & blockchain" },
    { title: "Healthcare", sub: "EMR, telemedicine & health apps" },
    { title: "Logistics", sub: "Supply chain & tracking systems" },
    { title: "EdTech", sub: "LMS, e-learning & assessments" },
    { title: "Hospitality", sub: "Booking, PMS & guest apps" },
    { title: "Enterprise", sub: "ERP, CRM & workflow automation" },
  ];
  const how = siteData?.home?.how ?? {
  label: "How It Works",

  heading: "Hire Exceptional Talent in Four Simple Steps",

  sub: "Our streamlined hiring process helps businesses connect with skilled developers and technology professionals quickly, ensuring faster onboarding and successful project delivery.",

  steps: [
    {
      n: "01",
      title: "Share Your Requirements",
      desc: "Tell us about your project goals, technical requirements, preferred technologies, and team size requirements."
    },
    {
      n: "02",
      title: "Review Top Candidates",
      desc: "We shortlist and present highly qualified professionals who match your business needs and project objectives."
    },
    {
      n: "03",
      title: "Interview & Select",
      desc: "Evaluate candidates through interviews and technical assessments to choose the right talent for your team."
    },
    {
      n: "04",
      title: "Onboard & Start Building",
      desc: "Quickly onboard your selected professionals and begin delivering projects with confidence and efficiency."
    }
  ]
};
const why = siteData?.home?.why ?? {
  label: "Why Choose Us",

  heading: "Why Businesses Trust Hourly Recruiters",

  cards: [
    {
      title: "Pre-Screened Talent",
      desc: "Access a pool of highly skilled and thoroughly vetted professionals ready to contribute from day one."
    },
    {
      title: "Flexible Hiring Models",
      desc: "Choose hourly, part-time, full-time, or project-based engagement models tailored to your business needs."
    },
    {
      title: "Fast Onboarding",
      desc: "Reduce recruitment time and onboard qualified professionals quickly to keep your projects moving forward."
    },
    {
      title: "Cost-Effective Solutions",
      desc: "Optimize your hiring budget while gaining access to top-tier talent without long-term commitments."
    },
    {
      title: "Dedicated Support",
      desc: "Our team works closely with you throughout the hiring process to ensure a seamless experience."
    },
    {
      title: "Proven Success",
      desc: "Trusted by startups and enterprises alike to deliver exceptional talent and successful project outcomes."
    }
  ]
};
// testimonials: [
//   {
//     initials: "JS",
//     name: "John Smith",
//     role: "CEO, TechNova Solutions",
//     color: "#2563eb",
//     quote: "Hourly Recruiters helped us find experienced developers within days. Their hiring process was smooth and efficient."
//   },
//   {
//     initials: "MR",
//     name: "Michael Roberts",
//     role: "Founder, StartupHub",
//     color: "#16a34a",
//     quote: "The quality of talent provided was exceptional. We scaled our team quickly and delivered our product successfully."
//   },
//   {
//     initials: "AK",
//     name: "Amit Kumar",
//     role: "Project Manager, DigitalEdge",
//     color: "#f97316",
//     quote: "Professional, reliable, and highly responsive. The developers integrated seamlessly into our team."
//   }
// ]

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge-tag badge-tag-dark">
            <span className="badge-dot" />
            {hero.badge || "Hire Developers On Hourly Basis"}
          </div>
          <h1>
            {hero.heading1 || "Hire Skilled Developers on"}<br />
            <span className="accent">{hero.heading2 || "Hourly Basis"}</span>
          </h1>
          <p className="hero-sub">{hero.subtext || ""}</p>
          <div className="hero-checks">
            {(hero.checks || []).map(c => (
              <div className="hero-check" key={c}>
                <div className="check-icon">
                  <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
                </div>
                {c}
              </div>
            ))}
          </div>
          <div className="hero-btns">
            {/* <button className="btn-primary" onClick={() => navigate("hire")}>Hire Developers</button> */}
            {/* <button className="btn-outline-white" onClick={() => navigate("contact")}>Book Free Consultation</button */}
            <button
              className="btn-outline-white"
              onClick={() => navigate("contact")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "transparent",
                color: "white",
                border: "1.5px solid rgba(255, 255, 255, .35)",
                padding: "12px 26px",
                borderRadius: "9px",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: ".02em",
                whiteSpace: "nowrap",
                margin: "0 auto"
              }}
            >
              Book Free Consultation
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-float hero-float-1">
            <div className="float-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="float-txt">
              <strong>{(hero.floatStats?.[0]?.value) || "500+"} Developers</strong>
              <span>{(hero.floatStats?.[0]?.label) || "Ready to hire"}</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-avatar">HR</div>
            <div className="card-title">Developer Dashboard</div>
            <div className="card-sub">Active projects overview</div>
            <div className="card-stats">
              {(hero.cardStats || [
                { value: "98%", label: "Success Rate" },
                { value: "4.9★", label: "Avg Rating" },
                { value: "24h", label: "Onboarding" },
              ]).map(s => (
                <div className="cs" key={s.label}>
                  <strong>{s.value}</strong><span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="card-bar-wrap">
              <div className="card-bar"><div className="card-bar-fill" style={{ width: "85%" }} /></div>
              <div className="card-bar-label"><span>Project Progress</span><span>85%</span></div>
            </div>
            <div className="card-bar-wrap" style={{ marginTop: 10 }}>
              <div className="card-bar"><div className="card-bar-fill" style={{ width: "92%", background: "linear-gradient(90deg,#22c55e,#4ade80)" }} /></div>
              <div className="card-bar-label"><span>Client Satisfaction</span><span>92%</span></div>
            </div>
          </div>

          <div className="hero-float hero-float-2">
            <div className="float-icon dark">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className="float-txt light">
              <strong>{(hero.floatStats?.[1]?.value) || "200+"} Projects</strong>
              <span>{(hero.floatStats?.[1]?.label) || "Delivered on time"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <div className="trust">
        <div className="trust-inner">
          <span className="trust-label">{trust.label}</span>
          <div className="trust-logos">
            {trust.logos.map(b => <span key={b} className="trust-logo">{b}</span>)}
          </div>
        </div>
      </div>

      {/* ── WHAT WE OFFER ── */}
      <section className="offer">
        <div className="sec-head">
          {/* <span className="sec-label"></span>
          <h2 className="sec-title"></h2>
          <p className="sec-sub"></p> */}
          <span className="sec-label">Hourly Recruiters</span>

          <h2 className="sec-title">
            Connecting Businesses with Exceptional Talent
          </h2>

          <p className="sec-sub">
            We specialize in delivering skilled professionals through flexible hourly engagement models, enabling organizations to scale efficiently and achieve their goals with confidence.
          </p>
        </div>
        <div className="offer-grid">
          {offer.items.map((title, i) => (
            <div key={i} className="offer-item" onClick={() => navigate("hire")} style={{ cursor: "pointer" }}>
              <div className="offer-icon"><ServiceIcon /></div>
              <h3>{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <section className="engage">
        {/* <div className="sec-head">
          <span className="sec-label">{engagement.label}</span>
          <h2 className="sec-title">{engagement.heading}</h2>
          <p className="sec-sub">{engagement.sub}</p>
        </div> */}<div className="sec-head">
          <span className="sec-label">Engagement Models</span>

          <h2 className="sec-title">
            Strategic Talent Solutions for Every Stage of Growth
          </h2>

          <p className="sec-sub">
            From startups to enterprises, our customized engagement models provide access to highly skilled professionals, ensuring maximum productivity, flexibility, and long-term business success.
          </p>
        </div>
        <div className="engage-grid">
          {engagement.models.map((m, i) => (
            <div key={i} className={`eng-card${m.featured ? " featured" : ""}`}>
              {m.featured && <span className="eng-badge">Popular</span>}
              <div className={`eng-icon${m.featured ? " inv" : ""}`}>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
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

      {/* ── TECHNOLOGIES ── */}
      <section className="tech">
        <div className="sec-head">
          <span className="sec-label">Technologies We Work With</span>
          <h2 className="sec-title">Modern Technologies. Expert Developers.</h2>
        </div>
        <div className="tech-tabs">
          {Object.keys(techData).map(tab => (
            <button key={tab} className={`tech-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div className="tech-logos">
          {/* {techData[activeTab].map(({ name, color }) => (
            <div key={name} className="tech-pill">
              <span className="tech-dot" style={{ background: color }} />{name}
            </div>
          ))} */}
          {techData[activeTab].map(({ name, logo }) => (
            <div
              key={name}
              className="tech-pill"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 18px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px"
              }}
            >
              <img
                src={logo}
                alt={name}
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "contain"
                }}
              />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="industries">
        <div className="sec-head">
          <span className="sec-label">Industries We Support</span>
          <h2 className="sec-title">Trusted By Many Industries</h2>
          <p className="sec-sub">Our developers bring domain expertise across a wide range of verticals.</p>
        </div>
        <div className="ind-grid">
          {industries.map(({ title, sub }, i) => (
            <div key={title} className="ind-card">
              <div className="ind-icon" style={{ fill: "none", stroke: "var(--blue)", strokeWidth: 1.7 }}>
                {industryIcons[i % industryIcons.length]}
              </div>
              <h3>{title}</h3>
              <p>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STARTUP ── */}
      <section className="startup">
        <div className="startup-inner">
          <div>
            {/* <span className="startup-tag">{startup.tag}</span>
            <h2>{startup.heading}</h2>
            <p>{startup.desc}</p> */}
            <span className="startup-tag">Empowering Business Growth</span>

            <h2>Access Top Talent Without the Hiring Hassle</h2>

            <p>
              From startups to established enterprises, we provide experienced developers and technology professionals through flexible engagement models, helping you innovate faster, increase productivity, and stay ahead of the competition.
            </p>
            {/* <div className="startup-checks">
              {startup.checks.map(c => <div key={c} className="startup-check">{c}</div>)}
            </div> */}
            <div className="startup-checks">
  {[
    "Access Pre-Screened Developers",
    "Flexible Hourly Hiring Models",
    "Quick Team Scaling & Onboarding",
    "Cost-Effective Talent Solutions"
  ].map(c => (
    <div key={c} className="startup-check">{c}</div>
  ))}
</div>
            {/* <button className="btn-primary" onClick={() => navigate("hire")}>Hire Developers</button> */}
          </div>
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="rocket-card">
              <h4>{startup.card.heading}</h4>
              <p>{startup.card.desc}</p>
              <div className="rocket-stats">
                {startup.card.stats.map(s => (
                  <div key={s.label} className="rs">
                    <strong>{s.value}</strong><span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          

<div style={{ display: "flex", justifyContent: "center" }}>
  <div className="rocket-card">
    <h4>Accelerate Your Business Growth</h4>

    <p>
      Partner with experienced developers and technology professionals who help you deliver projects faster, improve productivity, and achieve your business objectives with confidence.
    </p>

    <div className="rocket-stats">
      {[
        { value: "500+", label: "Developers Available" },
        { value: "200+", label: "Projects Delivered" },
        { value: "98%", label: "Client Satisfaction" }
      ].map(s => (
        <div key={s.label} className="rs">
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  </div>
</div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how">
        {/* <div className="sec-head">
          <span className="sec-label">{how.label}</span>
          <h2 className="sec-title">{how.heading}</h2>
          <p className="sec-sub">{how.sub}</p>
        </div>
        <div className="steps-grid">
          {how.steps.map(s => (
            <div key={s.n} className="step">
              <div className="step-num"><span>{s.n}</span></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div> */}
        <div className="sec-head">
  <span className="sec-label">{how.label}</span>
  <h2 className="sec-title">{how.heading}</h2>
  <p className="sec-sub">{how.sub}</p>
</div>

<div className="steps-grid">
  {how.steps.map(s => (
    <div key={s.n} className="step">
      <div className="step-num"><span>{s.n}</span></div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
    </div>
  ))}
</div>
      </section>

      {/* ── WHY US ── */}
      <section className="why">
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="sec-label sec-label-light">{why.label}</span>
          <h2 className="sec-title sec-title-light">{why.heading}</h2>
          <div className="why-grid">
            {why.cards.map(({ title, desc }) => (
              <div key={title} className="why-card">
                <div className="why-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* <section className="testimonials"> */}
        {/* <div className="sec-head">
          <span className="sec-label">Testimonials</span>
          <h2 className="sec-title">What Our Clients Say</h2>
          <p className="sec-sub">Trusted by businesses worldwide.</p>
        </div>
        <div className="testi-grid">
          {testimonials.map(({ initials, name, role, color, quote }) => (
            <div key={name} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">{quote}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={{ background: color }}>{initials}</div>
                <div><h4>{name}</h4><span>{role}</span></div>
              </div>
            </div>
          ))}
        </div> */}
        
      {/* </section> */}
      <section
  style={{
    padding: "80px 20px",
    background: "#f8fafc"
  }}
>
  <div
    style={{
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 50px"
    }}
  >
    <span
      style={{
        color: "#2563eb",
        fontWeight: "600",
        fontSize: "14px",
        textTransform: "uppercase",
        letterSpacing: "1px"
      }}
    >
      Testimonials
    </span>

    <h2
      style={{
        fontSize: "42px",
        fontWeight: "700",
        margin: "15px 0",
        color: "#1e293b"
      }}
    >
      What Our Clients Say About Us
    </h2>

    <p
      style={{
        color: "#64748b",
        fontSize: "17px",
        lineHeight: "1.7"
      }}
    >
      Trusted by startups, growing businesses, and enterprises worldwide
      for quality talent and exceptional service.
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      gap: "25px",
      maxWidth: "1200px",
      margin: "0 auto"
    }}
  >
    {/* Card 1 */}
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
      }}
    >
      <div
        style={{
          color: "#fbbf24",
          fontSize: "20px",
          marginBottom: "15px"
        }}
      >
        ★★★★★
      </div>

      <p
        style={{
          color: "#475569",
          lineHeight: "1.8",
          marginBottom: "25px"
        }}
      >
        Hourly Recruiters helped us find highly skilled developers within
        days. Their hiring process was smooth, professional, and efficient.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700"
          }}
        >
          JS
        </div>

        <div>
          <h4 style={{ margin: 0 }}>John Smith</h4>
          <span style={{ color: "#64748b" }}>
            CEO, TechNova Solutions
          </span>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
      }}
    >
      <div
        style={{
          color: "#fbbf24",
          fontSize: "20px",
          marginBottom: "15px"
        }}
      >
        ★★★★★
      </div>

      <p
        style={{
          color: "#475569",
          lineHeight: "1.8",
          marginBottom: "25px"
        }}
      >
        The quality of talent provided exceeded our expectations. We
        successfully scaled our team and delivered projects on time.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#16a34a",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700"
          }}
        >
          MR
        </div>

        <div>
          <h4 style={{ margin: 0 }}>Michael Roberts</h4>
          <span style={{ color: "#64748b" }}>
            Founder, StartupHub
          </span>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
      }}
    >
      <div
        style={{
          color: "#fbbf24",
          fontSize: "20px",
          marginBottom: "15px"
        }}
      >
        ★★★★★
      </div>

      <p
        style={{
          color: "#475569",
          lineHeight: "1.8",
          marginBottom: "25px"
        }}
      >
        Professional, reliable, and highly responsive. The developers
        integrated seamlessly into our team and added immediate value.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#f97316",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700"
          }}
        >
          AK
        </div>

        <div>
          <h4 style={{ margin: 0 }}>Amit Kumar</h4>
          <span style={{ color: "#64748b" }}>
            Project Manager, DigitalEdge
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ── CTA ── */}
      {/* <section className="cta">
        <div className="cta-inner">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="sec-label" style={{ color: "#38bdf8" }}>{cta.label}</span>
            <h2>{cta.heading}</h2>
            <p>{cta.sub}</p>
          </div>
          <div className="cta-btns" style={{ position: "relative", zIndex: 1 }}> */}
            {/* <button className="btn-white" onClick={() => navigate("hire")}>Hire Developers Today</button> */}
            {/* <button className="btn-outline-white" onClick={() => navigate("contact")}>Book Free Consultation</button>
          </div>
        </div>
      </section> */}
      <section className="cta">
  <div className="cta-inner">
    <div style={{ position: "relative", zIndex: 1 }}>
      <span
        className="sec-label"
        style={{ color: "#38bdf8" }}
      >
        Get Started Today
      </span>

      <h2>
        Ready to Hire Top Talent for Your Next Project?
      </h2>

      <p>
        Connect with experienced developers, designers, and technology
        professionals who can help accelerate your business growth.
        Whether you need a single developer or an entire dedicated team,
        Hourly Recruiters provides flexible hiring solutions tailored to
        your needs. Start building smarter, faster, and more efficiently
        with the right talent by your side.
      </p>
    </div>

    <div
      className="cta-btns"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* <button
        className="btn-white"
        onClick={() => navigate("hire")}
      >
        Hire Developers Today
      </button> */}

      <button
        className="btn-outline-white"
        onClick={() => navigate("contact")}
      >
        Book Free Consultation
      </button>
    </div>
  </div>
</section>
    </>
  );
}