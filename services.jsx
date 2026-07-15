/* global React, Navbar, Footer, FabChat, Icon, usePageMotion, useReveal, onPageLinkClick, SITE */
const { useState } = React;

const CATEGORY_ICONS = {
  "General Maintenance": () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  "Brakes & Suspension": () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  "Engine & Transmission": () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h8M8 14h5"/>
    </svg>
  ),
  "Cooling & AC": () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
    </svg>
  ),
  "Tires & Wheels": () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  "Specialty Services": () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

const ALL_SERVICES = [
  {
    cat: "General Maintenance",
    items: [
      { name: "Oil Changes", time: "30 min", price: "Starting from $69.99", desc: "Conventional, semi-synthetic or full synthetic with a multi-point inspection on every visit." },
      { name: "Tire Rotation", time: "30 min", price: "Starting from $39.99", desc: "Extend tire life with proper rotation to manufacturer spec." },
      { name: "Tire Balancing", time: "20 min/tire", price: "Starting from $24.99 per tire", desc: "Smooth out vibrations and uneven wear for a quieter ride." },
      { name: "Air Filter Replacement", time: "15 min", price: "Starting from $29.99", desc: "Engine and cabin filters replaced — better airflow and fuel economy." },
      { name: "Windshield Wiper Blades", time: "10 min", price: "Starting from $19.99", desc: "Clear vision in New Brunswick weather. Installed and tested." },
      { name: "Fluid Inspection", time: "20 min", price: "Starting from $29.99", desc: "Full check of oil, coolant, brake, power steering and washer fluids." },
      { name: "Vehicle Inspection", time: "60 min", price: "Starting from $89.99", desc: "Comprehensive safety and mechanical inspection with written report." },
    ],
  },
  {
    cat: "Brakes & Suspension",
    items: [
      { name: "Brake Repair", time: "2 – 4 h", price: "Starting from $149.99", desc: "Pads, rotors, calipers and lines — stop safely every time." },
      { name: "Steering & Suspension Repair", time: "Quoted", price: "Starting from $199.99", desc: "Struts, shocks, ball joints and tie-rods for a smooth, controlled ride." },
    ],
  },
  {
    cat: "Engine & Transmission",
    items: [
      { name: "Engine Repair and Diagnostics", time: "60 min+", price: "Starting from $129.99", desc: "Computerized scan plus hands-on diagnosis to find the root cause." },
      { name: "Alternator Replacement", time: "1 – 2 h", price: "Starting from $249.99", desc: "Restore charging power and keep your electrical system reliable." },
      { name: "Batteries", time: "20 min", price: "Starting from $149.99", desc: "Load test, terminal service and quality replacement batteries in stock." },
      { name: "Transmission Service", time: "60 – 90 min", price: "Starting from $179.99", desc: "Fluid exchange, filter and full transmission health check." },
      { name: "Tune Up", time: "2 – 3 h", price: "Starting from $99.99", desc: "Spark plugs, filters and ignition components for peak performance." },
      { name: "Muffler / Exhaust System Repair", time: "Quoted", price: "Starting from $149.99", desc: "Mufflers, pipes and oxygen sensors — quiet and emissions-compliant." },
    ],
  },
  {
    cat: "Cooling & AC",
    items: [
      { name: "Air Conditioning Repair", time: "1 – 2 h", price: "Starting from $129.99", desc: "Stay cool all summer with A/C diagnosis, recharge and repair." },
      { name: "Cooling System Repair", time: "Quoted", price: "Starting from $159.99", desc: "Radiators, hoses, water pumps and thermostats to prevent overheating." },
    ],
  },
  {
    cat: "Tires & Wheels",
    items: [
      { name: "Tires", time: "Per vehicle", price: "Starting from $119.99 per tire (installed)", desc: "Quality tire brands mounted, balanced and ready to roll." },
      { name: "Tire Installation", time: "20 min/tire", price: "Starting from $24.99 per tire", desc: "Professional mounting and balancing on your rims." },
      { name: "Tire Repair", time: "30 min", price: "Starting from $29.99", desc: "Safe plug or patch repairs for punctures when repairable." },
      { name: "TPMS Service", time: "30 min", price: "Starting from $49.99", desc: "Tire pressure sensor diagnosis, reset and replacement." },
    ],
  },
  {
    cat: "Specialty Services",
    items: [
      { name: "Belts & Hoses", time: "1 – 2 h", price: "Starting from $89.99", desc: "Serpentine belts, timing belts and coolant hoses replaced before they fail." },
      { name: "Diesel Engine Maintenance & Repair", time: "Quoted", price: "Starting from $199.99", desc: "Specialized diesel service for trucks and heavy-duty vehicles." },
      { name: "Differential Repair", time: "Quoted", price: "Starting from $349.99", desc: "Front and rear differential diagnosis, fluid service and repair." },
      { name: "Four Wheel Drive System", time: "Quoted", price: "Starting from $249.99", desc: "4WD and AWD transfer case, hub and driveline service." },
      { name: "Lift Kits", time: "1 – 2 days", price: "Starting from $799 (parts + labour)", desc: "Professional lift kit installation for trucks and SUVs." },
      { name: "Preventive Maintenance", time: "2 h", price: "Starting from $99.99", desc: "Scheduled service package to keep your vehicle running reliably." },
    ],
  },
];

function ServicesHero() {
  return (
    <section className="page-hero" style={{
      paddingTop: "calc(var(--nav-h) + 80px)",
      paddingBottom: 80,
      position: "relative",
      background: "var(--bg)",
      borderBottom: "1px solid var(--line)",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.12,
        backgroundImage: "url('img/hero-bg.jpg')",
        backgroundSize: "cover", backgroundPosition: "right center",
        maskImage: "linear-gradient(90deg, transparent 30%, black 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 30%, black 100%)",
      }}/>
      <div className="wrap" style={{position: "relative"}}>
        <span className="eyebrow hero-eyebrow">Services</span>
        <h1 className="display hero-title" style={{
          fontSize: "clamp(48px, 7vw, 112px)",
          margin: "16px 0 24px",
          maxWidth: 1000,
        }}>
          Twenty-seven services.<br/>
          <span style={{color: "var(--copper)"}}>One trusted team.</span>
        </h1>
        <p className="hero-lead" style={{
          maxWidth: 640,
          fontSize: 18,
          color: "var(--text-dim)",
          lineHeight: 1.55,
          margin: 0,
        }}>
          From routine maintenance to specialty repairs, every job gets honest
          starting prices and a written quote before we begin. Serving Bath and
          the surrounding Fredericton region.
        </p>
      </div>
    </section>
  );
}

function ServiceCategories() {
  const [filter, setFilter] = useState("All");
  useReveal([filter]);
  const cats = ["All", ...ALL_SERVICES.map(c => c.cat)];

  const visible = filter === "All"
    ? ALL_SERVICES
    : ALL_SERVICES.filter(c => c.cat === filter);

  return (
    <section className="section">
      <div className="wrap">
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56,
        }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "10px 18px",
              border: "1px solid " + (filter === c ? "var(--copper)" : "var(--line)"),
              background: filter === c ? "var(--copper)" : "transparent",
              color: filter === c ? "#fff" : "var(--text)",
              fontFamily: "var(--f-mono)", fontSize: 12,
              letterSpacing: "0.14em", textTransform: "uppercase",
              fontWeight: 600,
              transition: "all .2s ease",
            }}>{c}</button>
          ))}
        </div>

        {visible.map((cat) => {
          const num = ALL_SERVICES.findIndex(c => c.cat === cat.cat) + 1;
          const CatIcon = CATEGORY_ICONS[cat.cat];
          return (
          <div key={cat.cat} className="reveal" style={{marginBottom: 80}}>
            <div style={{
              display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
            }}>
              <span className="display" style={{
                fontSize: 56, color: "var(--copper-soft)", lineHeight: 0.8,
              }}>0{num}</span>
              <div style={{ color: "var(--forest)" }}>
                {CatIcon && <CatIcon />}
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--f-mono)", fontSize: 11,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--copper)", marginBottom: 6,
                }}>Category 0{num}</div>
                <h2 className="display" style={{
                  fontSize: 40, margin: 0,
                }}>{cat.cat}</h2>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
              background: "var(--line)",
              border: "1px solid var(--line)",
            }} className="cat-grid">
              {cat.items.map((it, i) => (
                <div key={i} style={{
                  background: "var(--bg)",
                  padding: 32,
                  display: "flex", flexDirection: "column", gap: 14,
                  position: "relative",
                  minHeight: 200,
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    gap: 16,
                  }}>
                    <h3 style={{
                      fontFamily: "var(--f-display)", fontSize: 22,
                      fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.01em",
                      margin: 0,
                    }}>{it.name}</h3>
                    <span style={{
                      fontFamily: "var(--f-mono)", fontSize: 10,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "var(--copper)", textAlign: "right", flexShrink: 0,
                      maxWidth: 160, paddingTop: 4,
                    }}>{it.price}</span>
                  </div>
                  <p style={{color: "var(--text-dim)", fontSize: 14, lineHeight: 1.6, margin: 0}}>{it.desc}</p>
                  <div style={{
                    marginTop: "auto", paddingTop: 14,
                    borderTop: "1px solid var(--line)",
                    display: "flex", justifyContent: "space-between",
                    fontFamily: "var(--f-mono)", fontSize: 11,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--text-mute)",
                  }}>
                    <span>⏱ {it.time}</span>
                    <a href="contact.html#book" style={{color: "var(--copper)"}}
                      onClick={(e) => onPageLinkClick(e, "contact.html#book")}>Book →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          );
        })}

        <div className="reveal" style={{
          marginTop: 48,
          padding: "24px 32px",
          background: "var(--forest-soft)",
          border: "1px solid var(--forest)",
          borderRadius: "var(--radius-lg)",
          fontSize: 15,
          color: "var(--text-dim)",
          lineHeight: 1.6,
          textAlign: "center",
        }}>
          <em>{SITE.priceDisclaimer}</em>
        </div>

        <style>{`
          @media (max-width: 820px) { .cat-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function ServiceCTA() {
  return (
    <section style={{
      padding: "80px 0",
      background: "var(--bg-elev)",
      borderTop: "1px solid var(--line)",
    }}>
      <div className="wrap reveal" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 40, flexWrap: "wrap",
      }}>
        <div>
          <h2 className="display" style={{fontSize: 48, margin: "0 0 12px"}}>
            Ready to <span style={{color: "var(--copper)"}}>book?</span>
          </h2>
          <p style={{color: "var(--text-dim)", margin: 0, maxWidth: 480}}>
            Get a free quote today. Call us or request an appointment online —
            we'll confirm by phone during business hours.
          </p>
        </div>
        <div style={{display: "flex", gap: 14, flexWrap: "wrap"}}>
          <a className="btn btn--primary" href="contact.html#book"
            onClick={(e) => onPageLinkClick(e, "contact.html#book")}>Book Appointment <Icon.arrow width="16" height="16"/></a>
          <a className="btn btn--ghost" href={`tel:${SITE.phoneTel}`}>Call {SITE.phone}</a>
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  usePageMotion();
  return (
    <React.Fragment>
      <Navbar active="services"/>
      <main>
        <ServicesHero/>
        <ServiceCategories/>
        <ServiceCTA/>
      </main>
      <Footer/>
      <FabChat/>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ServicesPage />);
