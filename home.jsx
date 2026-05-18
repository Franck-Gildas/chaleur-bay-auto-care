/* global React, Navbar, Footer, FabChat, Icon, useReveal */
const { useState, useEffect, useRef } = React;

/* ===================== HERO with parallax depth ===================== */
function Hero() {
  const heroRef = useRef(null);
  const [t, setT] = useState(0); // scroll progress 0..1 within hero
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onScroll() {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const h = el.offsetHeight;
      const p = Math.max(0, Math.min(1, -rect.top / h));
      setT(p);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onMove(e) {
    const r = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5);
    const y = ((e.clientY - r.top) / r.height - 0.5);
    setMouse({ x, y });
  }

  const ty = (factor) => `translate3d(${mouse.x * factor}px, ${t * 120 * (factor / 20) + mouse.y * factor}px, 0)`;

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "var(--nav-h)",
        overflow: "hidden",
        background: "#070D1B",
      }}
    >
      {/* Layer 1: image */}
      <div style={{
        position: "absolute",
        inset: "-6%",
        backgroundImage: "url('img/hero-mechanic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        transform: ty(14) + ` scale(${1.06 + t * 0.06})`,
        filter: "saturate(0.85) contrast(1.05)",
        transition: "transform 0.15s linear",
      }}/>
      {/* Layer 2: navy gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(180deg, rgba(10,20,40,0.55) 0%, rgba(10,20,40,0.7) 50%, rgba(10,20,40,0.95) 100%),
          linear-gradient(100deg, rgba(10,20,40,0.85) 0%, rgba(10,20,40,0.2) 60%, rgba(10,20,40,0) 100%)
        `,
      }}/>
      {/* Layer 3: floating glow */}
      <div style={{
        position: "absolute",
        right: "-12%",
        top: "20%",
        width: 720, height: 720,
        background: "radial-gradient(circle, rgba(255,98,0,0.22), transparent 60%)",
        transform: ty(-26),
        transition: "transform 0.2s ease-out",
        pointerEvents: "none",
      }}/>
      {/* Layer 4: snow flecks */}
      <Snow t={t}/>

      {/* Content */}
      <div className="wrap" style={{
        position: "relative",
        zIndex: 2,
        minHeight: `calc(100vh - var(--nav-h))`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 32px 80px",
        gap: 0,
      }}>
        <div style={{
          transform: `translateY(${t * -60}px)`,
          opacity: 1 - t * 1.4,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 28,
          }}>
            <span className="eyebrow" style={{color: "#fff"}}>
              <span style={{
                background: "var(--orange)", color: "#0A1428",
                padding: "4px 10px", borderRadius: 4, fontWeight: 700,
                letterSpacing: "0.14em",
              }}>EST. 2012</span>
              Bathurst · New Brunswick
            </span>
          </div>

          <h1 className="display" style={{
            fontSize: "clamp(56px, 9vw, 152px)",
            margin: 0,
            color: "#fff",
            maxWidth: 1100,
          }}>
            Local Pride.<br/>
            Winter-Ready.<br/>
            <span style={{color: "var(--orange)"}}>Trusted Performance.</span>
          </h1>

          <p style={{
            margin: "32px 0 44px",
            maxWidth: 560,
            fontSize: 19,
            color: "#D7DFEE",
            lineHeight: 1.55,
          }}>
            Expert auto repair with honest service in Bathurst, NB. Red-Seal & ASE certified
            technicians, 2-year warranty on every fix, and no surprises when you pay.
          </p>

          <div style={{display: "flex", gap: 14, flexWrap: "wrap"}}>
            <a className="btn btn--primary" href="contact.html#book">
              Book Service Now <Icon.arrow width="16" height="16"/>
            </a>
            <a className="btn btn--ghost" href="services.html">View Services</a>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{
          marginTop: "auto",
          paddingTop: 64,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 36,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingBlock: 32,
          opacity: 1 - t * 0.8,
        }} className="hero-stats">
          {[
            ["13", "Years on the bay"],
            ["4.9★", "180+ Google reviews"],
            ["2 yr", "Parts & labour warranty"],
            ["48 h", "Average turnaround"],
          ].map(([n, l], i) => (
            <div key={i}>
              <div className="display" style={{fontSize: 56, color: "#fff", marginBottom: 6}}>{n}</div>
              <div style={{color: "#A7B6CC", fontSize: 13, letterSpacing: "0.04em"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 24, right: 32,
        display: "flex", alignItems: "center", gap: 10,
        color: "#A7B6CC", fontSize: 11, letterSpacing: "0.2em",
        fontFamily: "var(--f-mono)", textTransform: "uppercase",
        zIndex: 3,
        opacity: 1 - t * 2,
      }}>
        SCROLL
        <div style={{
          width: 1, height: 40, background: "rgba(255,255,255,0.3)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 14,
            background: "var(--orange)",
            animation: "scrollDot 1.8s ease-in-out infinite",
          }}/>
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(40px); }
        }
        @media (max-width: 720px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

function Snow({ t }) {
  // Decorative flecks for the winter feel
  const flecks = useRef(
    Array.from({length: 22}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 1 + Math.random() * 3,
      d: 0.4 + Math.random() * 0.6,
    }))
  ).current;
  return (
    <div style={{position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6}}>
      {flecks.map((f, i) => (
        <div key={i} style={{
          position: "absolute",
          left: f.x + "%",
          top: f.y + "%",
          width: f.s, height: f.s,
          background: "white",
          borderRadius: "50%",
          filter: "blur(0.4px)",
          opacity: f.d,
          transform: `translateY(${t * 40 * f.d * 4}px)`,
        }}/>
      ))}
    </div>
  );
}

/* ===================== SERVICES GRID ===================== */
const SERVICES = [
  { title: "Oil Changes", desc: "Synthetic, semi, conventional — with a 21-point check.", price: "from $69", icon: "oil" },
  { title: "Brake Repair", desc: "Pads, rotors, lines, ABS diagnostics. Stop with confidence.", price: "from $189", icon: "brake" },
  { title: "Diagnostics", desc: "Computerized scan and root-cause for every warning light.", price: "$95 flat", icon: "scan" },
  { title: "Tires", desc: "Mounting, balancing, seasonal swap & on-rim storage.", price: "from $25/wheel", icon: "tire" },
  { title: "Engine Repair", desc: "Timing, gaskets, sensors, full rebuilds when needed.", price: "Quoted", icon: "engine" },
  { title: "Transmission", desc: "Fluid service, mounts, and full transmission diagnosis.", price: "from $149", icon: "trans" },
  { title: "Fleet Service", desc: "Priority bays and monthly invoicing for local fleets.", price: "Per contract", icon: "fleet" },
  { title: "Mobile Repair", desc: "We come to you within Greater Bathurst for select jobs.", price: "from $120", icon: "mobile" },
];

const SvgIcon = {
  oil: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8h12v6H16zM18 14v4l-6 4v18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V22l-6-4v-4M30 26l8-4v18"/>
      <path d="M22 30c0 2-2 3-2 5s2 3 2 3"/>
    </svg>
  ),
  brake: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="14"/>
      <circle cx="24" cy="24" r="6"/>
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2"/>
    </svg>
  ),
  scan: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 14V8a2 2 0 0 1 2-2h6M42 14V8a2 2 0 0 0-2-2h-6M6 34v6a2 2 0 0 0 2 2h6M42 34v6a2 2 0 0 1-2 2h-6"/>
      <path d="M12 24h24M16 18l3 12M24 16l-2 16M32 18l-3 12"/>
    </svg>
  ),
  tire: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18"/>
      <circle cx="24" cy="24" r="4"/>
      <path d="M24 10v6M24 32v6M10 24h6M32 24h6M14 14l4 4M30 30l4 4M14 34l4-4M30 18l4-4"/>
    </svg>
  ),
  engine: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 22v8a2 2 0 0 0 2 2h2v4h4v-4h12v4h4v-4h2a2 2 0 0 0 2-2v-6h4v-4h-4v-4a2 2 0 0 0-2-2h-6V8h-6v6h-6v-4h-4v4h-2a2 2 0 0 0-2 2v4H6v4Z"/>
    </svg>
  ),
  trans: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10v28M24 10v28M36 10v28M12 10h24M12 24h24M12 38h24"/>
      <circle cx="12" cy="10" r="2"/><circle cx="24" cy="10" r="2"/><circle cx="36" cy="10" r="2"/>
      <circle cx="12" cy="38" r="2"/><circle cx="24" cy="24" r="2"/><circle cx="36" cy="38" r="2"/>
    </svg>
  ),
  fleet: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 30V20h16v10M20 30h12V14h-8l-4 6"/>
      <circle cx="10" cy="32" r="3"/><circle cx="26" cy="32" r="3"/>
      <path d="M32 26h12v6h-3"/><circle cx="38" cy="32" r="3"/>
    </svg>
  ),
  mobile: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 32V22l4-8h20l4 8v10"/>
      <circle cx="14" cy="32" r="3"/><circle cx="30" cy="32" r="3"/>
      <path d="M38 8l4 4-4 4M42 12H30"/>
    </svg>
  ),
};

function Services() {
  return (
    <section className="section" id="services" data-screen-label="Services">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">01 / What we do</span>
            <h2>Every service<br/>your car needs<br/><em>under one roof.</em></h2>
          </div>
          <div className="sec-head__right">
            From a 30-minute oil change to a full engine rebuild — eight focused service lines,
            staffed by certified techs, finished with a 2-year warranty.
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }} className="svc-grid">
          {SERVICES.map((s, i) => {
            const IconC = SvgIcon[s.icon];
            return (
              <a key={i} href="services.html" className="svc-card reveal" style={{
                background: "var(--bg)",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                minHeight: 280,
                position: "relative",
                cursor: "pointer",
                transition: "background .25s ease",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 56, height: 56, color: "var(--orange)",
                    display: "grid", placeItems: "center",
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                  }}>
                    <IconC />
                  </div>
                  <span style={{
                    fontFamily: "var(--f-mono)", fontSize: 11,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--text-mute)",
                  }}>0{i+1}</span>
                </div>

                <div style={{marginTop: "auto"}}>
                  <div style={{
                    fontFamily: "var(--f-display)", fontSize: 26,
                    textTransform: "uppercase", letterSpacing: "0.01em",
                    marginBottom: 8,
                  }}>{s.title}</div>
                  <p style={{color: "var(--text-dim)", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px"}}>{s.desc}</p>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    paddingTop: 14, borderTop: "1px solid var(--line)",
                  }}>
                    <span style={{
                      fontFamily: "var(--f-mono)", fontSize: 12,
                      color: "var(--orange)", letterSpacing: "0.04em",
                    }}>{s.price}</span>
                    <Icon.arrow width="14" height="14" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        <style>{`
          .svc-card:hover { background: var(--bg-card) !important; }
          @media (max-width: 980px) { .svc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 540px) { .svc-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

/* ===================== WHY CHOOSE US ===================== */
function WhyUs() {
  const items = [
    { kicker: "Certified", title: "Red Seal & ASE Technicians",
      desc: "Three Red Seal journeymen on staff. Every diagnosis signed off by a certified lead.",
      badge: "ASE · Red Seal" },
    { kicker: "Guaranteed", title: "2-Year Warranty on Repairs",
      desc: "Parts and labour, no fine print. If it fails inside 24 months, we fix it free.",
      badge: "24 mo · Bumper to bumper" },
    { kicker: "Convenient", title: "Mobile Service Available",
      desc: "Battery, brakes, diagnostics and seasonal swaps — we’ll come to your driveway.",
      badge: "Greater Bathurst" },
    { kicker: "Honest", title: "Fast Turnaround & Fair Pricing",
      desc: "Quote before we wrench. Photos of what we find. Average turnaround under 48 hours.",
      badge: "No-surprise pricing" },
  ];

  return (
    <section className="section" style={{background: "var(--bg-elev)"}} data-screen-label="Why us">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">02 / Why Chaleur Bay</span>
            <h2>The shop the<br/><em>peninsula trusts.</em></h2>
          </div>
          <div className="sec-head__right">
            We earn it the old-fashioned way — by knowing your name, your truck,
            and what the road salt did to it last March.
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }} className="why-grid">
          {items.map((it, i) => (
            <div key={i} className="reveal" style={{
              background: "var(--bg)",
              border: "1px solid var(--line)",
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: 4, height: 64,
                background: "var(--orange)",
              }}/>
              <div style={{
                display: "flex", alignItems: "center", gap: 18,
              }}>
                <div className="display" style={{
                  fontSize: 88,
                  color: "var(--orange-soft)",
                  lineHeight: 0.8,
                  letterSpacing: "-0.02em",
                }}>0{i+1}</div>
                <div>
                  <div style={{
                    fontFamily: "var(--f-mono)", fontSize: 11,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "var(--orange)", marginBottom: 8,
                  }}>{it.kicker}</div>
                  <div style={{
                    fontFamily: "var(--f-display)", fontSize: 26,
                    textTransform: "uppercase", letterSpacing: "0.01em",
                    lineHeight: 1,
                  }}>{it.title}</div>
                </div>
              </div>
              <p style={{
                color: "var(--text-dim)", fontSize: 15, lineHeight: 1.65,
                margin: 0,
              }}>{it.desc}</p>
              <div style={{marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)"}}>
                <span style={{
                  fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "var(--text-mute)",
                }}>✓ {it.badge}</span>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 820px) { .why-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS CAROUSEL ===================== */
const TESTIMONIALS = [
  {
    quote: "These guys saved my F-150 from a winter that would have killed it. Honest quote up front, finished a day early, and called to check in a week later. That’s rare.",
    name: "Marc Doucet",
    role: "Fleet manager · Acadie Plumbing",
    rating: 5,
  },
  {
    quote: "I drove three hours from Moncton on a referral. Worth every kilometre. They diagnosed an electrical gremlin two other shops missed — and the price was fair.",
    name: "Janelle Roy",
    role: "Subaru Outback owner",
    rating: 5,
  },
  {
    quote: "First time I’ve had a mechanic show me photos of every problem before touching the car. No upsell, just facts. We’ve moved all four family vehicles here.",
    name: "Pierre & Lisa Arseneau",
    role: "Beresford, NB",
    rating: 5,
  },
  {
    quote: "Mobile service for our school bus fleet has been a game-changer. They come to our yard at 5 a.m. so the buses are ready by route time. Pros, top to bottom.",
    name: "Theresa Chiasson",
    role: "Ops director · Peninsula Coach",
    rating: 5,
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setI(v => (v + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(id);
  }, [autoplay]);

  return (
    <section className="section" data-screen-label="Testimonials"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">03 / What folks say</span>
            <h2>4.9 stars,<br/><em>180+ neighbours.</em></h2>
          </div>
          <div className="sec-head__right" style={{display: "flex", flexDirection: "column", gap: 16}}>
            <div>Real reviews from real customers. We don't filter — we earn.</div>
            <div style={{display: "flex", gap: 8}}>
              <button aria-label="Previous" onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} style={{
                width: 44, height: 44, border: "1px solid var(--line)", borderRadius: 4,
                display: "grid", placeItems: "center", color: "var(--text)",
              }}>
                <Icon.arrow width="16" height="16" style={{transform: "rotate(180deg)"}}/>
              </button>
              <button aria-label="Next" onClick={() => setI((i + 1) % TESTIMONIALS.length)} style={{
                width: 44, height: 44, border: "1px solid var(--line)", borderRadius: 4,
                display: "grid", placeItems: "center", background: "var(--orange)", color: "#0A1428",
              }}>
                <Icon.arrow width="16" height="16"/>
              </button>
            </div>
          </div>
        </div>

        <div className="reveal" style={{
          position: "relative",
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          padding: "64px 56px",
          overflow: "hidden",
          minHeight: 380,
        }}>
          <div style={{
            position: "absolute", top: 24, right: 32,
            fontFamily: "var(--f-display)", fontSize: 220, lineHeight: 0.8,
            color: "var(--orange-soft)",
            pointerEvents: "none",
          }}>”</div>
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} style={{
              opacity: i === idx ? 1 : 0,
              position: i === idx ? "relative" : "absolute",
              inset: i === idx ? "auto" : "64px 56px",
              transition: "opacity .5s ease",
              maxWidth: 880,
              display: i === idx ? "block" : "none",
            }}>
              <div style={{
                display: "flex", gap: 4, marginBottom: 28, color: "var(--orange)",
              }}>
                {Array.from({length: t.rating}).map((_, n) => (
                  <svg key={n} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2 15 9l8 .8-6 5.4 2 7.8L12 19l-7 4 2-7.8L1 9.8 9 9z"/>
                  </svg>
                ))}
              </div>
              <p style={{
                fontFamily: "var(--f-body)", fontSize: 26, lineHeight: 1.45,
                margin: "0 0 36px",
                fontWeight: 500,
              }}>“{t.quote}”</p>
              <div style={{display: "flex", alignItems: "center", gap: 16}}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "var(--orange)",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--f-display)", fontSize: 22, color: "#0A1428",
                }}>{t.name.split(" ").map(p => p[0]).slice(0,2).join("")}</div>
                <div>
                  <div style={{fontWeight: 600}}>{t.name}</div>
                  <div style={{fontSize: 13, color: "var(--text-dim)"}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Progress dots */}
          <div style={{
            position: "absolute", bottom: 32, right: 56,
            display: "flex", gap: 8,
          }}>
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Show review ${idx+1}`} style={{
                width: i === idx ? 28 : 8, height: 8,
                background: i === idx ? "var(--orange)" : "var(--line)",
                transition: "width .3s ease, background .3s ease",
                borderRadius: 0,
              }}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== BEFORE & AFTER GALLERY ===================== */
const BEFORE_AFTER = [
  { label: "Brake rotors", before: "img/brake.jpg", after: "img/brakes.jpg", note: "Worn pads → fresh rotors + ceramic pads. 4-hour job." },
  { label: "Winter tire swap", before: "img/tire-change.jpg", after: "img/lug-nuts.jpg", note: "Mount, balance, torque to spec, on-rim storage." },
  { label: "Engine clean-up", before: "img/oil.jpg", after: "img/engine.jpg", note: "Full oil service + intake clean. 60-minute appointment." },
];

function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  function setFromClient(clientX) {
    const r = trackRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  }
  function onDown(e) {
    dragging.current = true;
    setFromClient((e.touches?.[0]?.clientX) ?? e.clientX);
  }
  function onMove(e) {
    if (!dragging.current) return;
    setFromClient((e.touches?.[0]?.clientX) ?? e.clientX);
  }
  function onUp() { dragging.current = false; }

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const cur = BEFORE_AFTER[active];

  return (
    <section className="section" style={{background: "var(--bg-elev)"}} data-screen-label="Gallery">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">04 / Receipts</span>
            <h2>Before &amp; after.<br/><em>Drag to compare.</em></h2>
          </div>
          <div className="sec-head__right">
            We document every major repair. Drag the slider to see what a Chaleur Bay
            service looks like from rough-shape to road-ready.
          </div>
        </div>

        <div className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 24,
        }} className="ba-grid">
          <div
            ref={trackRef}
            onMouseDown={onDown}
            onTouchStart={onDown}
            style={{
              position: "relative",
              aspectRatio: "16/10",
              background: "#000",
              overflow: "hidden",
              cursor: "ew-resize",
              userSelect: "none",
              border: "1px solid var(--line)",
            }}>
            {/* After (full) */}
            <img src={cur.after} alt="After" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              pointerEvents: "none",
            }}/>
            {/* Before (clipped) */}
            <div style={{
              position: "absolute", inset: 0,
              clipPath: `inset(0 ${100 - pos}% 0 0)`,
              transition: "clip-path 0.08s linear",
            }}>
              <img src={cur.before} alt="Before" style={{
                position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                pointerEvents: "none",
              }}/>
            </div>

            {/* Labels */}
            <div style={{
              position: "absolute", top: 20, left: 20,
              background: "rgba(10,20,40,0.85)", color: "#fff",
              padding: "6px 12px", fontFamily: "var(--f-mono)",
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
            }}>BEFORE</div>
            <div style={{
              position: "absolute", top: 20, right: 20,
              background: "var(--orange)", color: "#0A1428",
              padding: "6px 12px", fontFamily: "var(--f-mono)",
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              fontWeight: 700,
            }}>AFTER</div>

            {/* Handle */}
            <div style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${pos}%`, width: 2,
              background: "#fff",
              transform: "translateX(-1px)",
              pointerEvents: "none",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
            }}>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 48, height: 48, borderRadius: "50%",
                background: "#fff",
                display: "grid", placeItems: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                color: "#0A1428",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6-6 6 6 6M15 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </div>

          <div style={{display: "flex", flexDirection: "column", gap: 12}}>
            {BEFORE_AFTER.map((b, idx) => (
              <button key={idx} onClick={() => { setActive(idx); setPos(50); }} style={{
                textAlign: "left",
                padding: 20,
                background: idx === active ? "var(--bg-card)" : "var(--bg)",
                border: "1px solid " + (idx === active ? "var(--orange)" : "var(--line)"),
                display: "flex", flexDirection: "column", gap: 8,
                transition: "border-color .2s ease, background .2s ease",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--f-mono)", fontSize: 11,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: idx === active ? "var(--orange)" : "var(--text-mute)",
                  }}>0{idx+1}</span>
                  {idx === active && <Icon.arrow width="14" height="14" />}
                </div>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 22,
                  textTransform: "uppercase", letterSpacing: "0.01em",
                }}>{b.label}</div>
                <div style={{fontSize: 13, color: "var(--text-dim)"}}>{b.note}</div>
              </button>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 820px) { .ba-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

/* ===================== CONTACT / BOOKING ===================== */
function ContactBlock() {
  const [form, setForm] = useState({
    name: "", phone: "", vehicle: "", service: "Oil change", date: "", note: "",
  });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <section className="section" id="book" data-screen-label="Book">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">05 / Book your slot</span>
            <h2>Three steps,<br/><em>one trustworthy shop.</em></h2>
          </div>
          <div className="sec-head__right">
            Tell us what's going on with your vehicle. We'll confirm by phone within
            the hour during business hours.
          </div>
        </div>

        <div className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }} className="contact-grid">
          {/* Form */}
          <form onSubmit={submit} style={{
            background: "var(--bg)",
            padding: 48,
          }}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}} className="form-row">
              <Field label="Full name" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Marc Doucet" required/>
              <Field label="Phone" value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="(506) 555-0000" required/>
            </div>
            <div style={{height: 20}}/>
            <Field label="Vehicle (year / make / model)" value={form.vehicle} onChange={v => setForm({...form, vehicle: v})} placeholder="2019 Ford F-150"/>
            <div style={{height: 20}}/>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}} className="form-row">
              <Select label="Service" value={form.service} onChange={v => setForm({...form, service: v})}
                options={["Oil change", "Brake repair", "Tires / seasonal swap", "Diagnostics", "Engine repair", "Transmission", "Mobile service", "Other"]}/>
              <Field label="Preferred date" type="date" value={form.date} onChange={v => setForm({...form, date: v})}/>
            </div>
            <div style={{height: 20}}/>
            <FieldArea label="Anything else we should know?" value={form.note} onChange={v => setForm({...form, note: v})} placeholder="Sounds like the bearing on the front-left…"/>
            <div style={{height: 28}}/>
            <button type="submit" className="btn btn--primary btn--block">
              {sent ? "Thanks — we'll call within the hour ✓" : <>Request Appointment <Icon.arrow width="16" height="16"/></>}
            </button>
            <div style={{
              marginTop: 18, fontSize: 12, color: "var(--text-mute)",
              fontFamily: "var(--f-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Prefer to talk? Call <a href="tel:+15065551234" style={{color: "var(--orange)"}}>(506) 555-1234</a>
            </div>
          </form>

          {/* Map / info */}
          <div style={{
            background: "var(--bg-card)",
            padding: 0,
            position: "relative",
            minHeight: 540,
            display: "flex",
            flexDirection: "column",
          }}>
            <FakeMap />
            <div style={{padding: "28px 32px", borderTop: "1px solid var(--line)"}}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--text-mute)", marginBottom: 16,
              }}>
                <span>Visit the shop</span>
                <span>Bathurst · NB</span>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: 14}}>
                <Info icon={<Icon.pin width="16" height="16"/>}
                  title="418 King Avenue"
                  sub="Bathurst, NB · E2A 1S2"/>
                <Info icon={<Icon.phone width="16" height="16"/>}
                  title="(506) 555 - 1234"
                  sub="Real human on the line"/>
                <Info icon={<Icon.clock width="16" height="16"/>}
                  title="Mon – Fri · 7:30 – 17:30"
                  sub="Sat · 8 – 14 · Sun · Closed"/>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .contact-grid { grid-template-columns: 1fr !important; }
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <label style={{display: "block"}}>
      <div style={{
        fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "var(--text-mute)",
        marginBottom: 8,
      }}>{label}{required && <span style={{color: "var(--orange)"}}> *</span>}</div>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid var(--line)",
          padding: "10px 0",
          fontSize: 16,
          color: "var(--text)",
          fontFamily: "inherit",
          outline: "none",
        }}
      />
    </label>
  );
}

function FieldArea({ label, value, onChange, placeholder }) {
  return (
    <label style={{display: "block"}}>
      <div style={{
        fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "var(--text-mute)", marginBottom: 8,
      }}>{label}</div>
      <textarea
        value={value}
        rows={3}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "1px solid var(--line)",
          padding: "12px 14px",
          fontSize: 15,
          color: "var(--text)",
          fontFamily: "inherit",
          outline: "none",
          resize: "vertical",
        }}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label style={{display: "block"}}>
      <div style={{
        fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "var(--text-mute)", marginBottom: 8,
      }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid var(--line)",
          padding: "10px 0",
          fontSize: 16,
          color: "var(--text)",
          fontFamily: "inherit",
          outline: "none",
          appearance: "none",
          backgroundImage: "linear-gradient(45deg, transparent 50%, var(--orange) 50%), linear-gradient(135deg, var(--orange) 50%, transparent 50%)",
          backgroundPosition: "calc(100% - 14px) center, calc(100% - 8px) center",
          backgroundSize: "6px 6px",
          backgroundRepeat: "no-repeat",
        }}>
        {options.map(o => <option key={o} value={o} style={{background: "var(--bg-elev)", color: "var(--text)"}}>{o}</option>)}
      </select>
    </label>
  );
}

function Info({ icon, title, sub }) {
  return (
    <div style={{display: "flex", alignItems: "flex-start", gap: 14}}>
      <div style={{
        width: 36, height: 36, borderRadius: 4,
        background: "var(--orange-soft)",
        color: "var(--orange)",
        display: "grid", placeItems: "center",
        flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{fontWeight: 600, fontSize: 15}}>{title}</div>
        <div style={{fontSize: 13, color: "var(--text-dim)"}}>{sub}</div>
      </div>
    </div>
  );
}

function FakeMap() {
  // Stylized custom "map" so we don't need an external embed
  return (
    <div style={{
      flex: 1,
      position: "relative",
      background: "linear-gradient(180deg, #0F1B33 0%, #152545 100%)",
      overflow: "hidden",
      minHeight: 260,
    }}>
      <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
      }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="bay" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1A2A48"/>
            <stop offset="1" stopColor="#0E1A30"/>
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#grid)"/>
        {/* Bay shape */}
        <path d="M 0 60 Q 200 120 380 100 T 600 40 L 600 0 L 0 0 Z" fill="url(#bay)"/>
        <path d="M 0 60 Q 200 120 380 100 T 600 40" stroke="rgba(138,160,191,0.4)" strokeWidth="1" fill="none"/>
        {/* Roads */}
        <path d="M 80 360 L 80 200 Q 80 160 140 160 L 320 160 Q 360 160 360 200 L 360 300 Q 360 340 400 340 L 600 340" stroke="rgba(255,255,255,0.18)" strokeWidth="2" fill="none"/>
        <path d="M 0 240 L 220 240 Q 260 240 260 280 L 260 360" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none"/>
        <path d="M 380 360 L 380 220 Q 380 200 420 200 L 600 200" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none"/>
        {/* Labels */}
        <text x="40" y="50" fill="rgba(199,213,232,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">CHALEUR BAY</text>
        <text x="40" y="280" fill="rgba(199,213,232,0.45)" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5">KING AVE</text>
        <text x="430" y="195" fill="rgba(199,213,232,0.45)" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5">RTE 11 →</text>
        {/* Pin */}
        <g transform="translate(280, 220)">
          <circle r="36" fill="rgba(255,98,0,0.15)">
            <animate attributeName="r" values="20;36;20" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <circle r="14" fill="#FF6200"/>
          <circle r="5" fill="#0A1428"/>
        </g>
        <text x="306" y="226" fill="#FF6200" fontFamily="Anton, sans-serif" fontSize="14" letterSpacing="1">CHALEUR BAY AUTO</text>
      </svg>

      <div style={{
        position: "absolute", bottom: 16, left: 16,
        display: "flex", gap: 8,
      }}>
        <a href="#" style={{
          padding: "8px 14px",
          background: "rgba(10,20,40,0.85)",
          color: "#fff",
          fontFamily: "var(--f-mono)", fontSize: 11,
          letterSpacing: "0.14em", textTransform: "uppercase",
          border: "1px solid var(--line)",
        }}>Get directions →</a>
      </div>
    </div>
  );
}

/* ===================== HOMEPAGE ROOT ===================== */
function HomePage() {
  useReveal();
  return (
    <React.Fragment>
      <Navbar active="home"/>
      <main>
        <Hero/>
        <Services/>
        <WhyUs/>
        <Testimonials/>
        <BeforeAfter/>
        <ContactBlock/>
      </main>
      <Footer/>
      <FabChat/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HomePage/>);
