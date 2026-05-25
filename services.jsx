/* global React, Navbar, Footer, FabChat, Icon, useReveal */
const { useState } = React;

const ALL_SERVICES = [
  {
    cat: "Maintenance",
    items: [
      { name: "Oil & filter change", time: "30 min", price: "from $69", desc: "Conventional, semi-synthetic or full synthetic, plus a 21-point inspection on every visit." },
      { name: "Seasonal tire swap", time: "45 min", price: "from $90", desc: "Mount, balance, torque to manufacturer spec. Free on-rim tire storage with your first swap." },
      { name: "Wheel alignment", time: "60 min", price: "$129", desc: "Four-wheel laser alignment. Print-out of before & after specs goes home with you." },
      { name: "Battery service", time: "20 min", price: "from $189", desc: "Load test, terminals cleaned, AGM and EFB batteries in stock for most makes." },
    ],
  },
  {
    cat: "Repair",
    items: [
      { name: "Brake repair", time: "2 – 4 h", price: "from $189", desc: "Pads, rotors, calipers, lines and ABS diagnostics. Ceramic and OEM options." },
      { name: "Suspension & steering", time: "Quoted", price: "from $220", desc: "Struts, shocks, ball joints, tie-rods — winter potholes are no joke around here." },
      { name: "Exhaust", time: "Quoted", price: "from $180", desc: "Mufflers, pipes, oxygen sensors. Custom bends in-house." },
      { name: "Electrical", time: "Quoted", price: "from $95/hr", desc: "Alternators, starters, no-start diagnosis, parasitic draw, wiring repair." },
    ],
  },
  {
    cat: "Engine & Drivetrain",
    items: [
      { name: "Engine diagnostics", time: "60 min", price: "$95 flat", desc: "Computerized scan plus a hands-on look. Fee is credited to any repair you book." },
      { name: "Timing service", time: "1 day", price: "from $689", desc: "Timing belts, chains, tensioners, water pumps — done right the first time." },
      { name: "Transmission service", time: "60 – 90 min", price: "from $149", desc: "Fluid exchange, filter, mounts. Full transmission diagnosis when needed." },
      { name: "Engine rebuild", time: "1 – 2 weeks", price: "Quoted", desc: "Yes, we still do them. Quoted, scoped and warrantied — no shortcuts." },
    ],
  },
  {
    cat: "Specialty",
    items: [
      { name: "Mobile repair", time: "On-site", price: "from $120", desc: "Battery, brakes, basic diagnostics — we come to your driveway in Greater Bathurst." },
      { name: "Fleet service", time: "Per contract", price: "Per contract", desc: "Priority bays, monthly invoicing, scheduled preventive maintenance for local fleets." },
      { name: "Pre-purchase inspection", time: "90 min", price: "$149", desc: "Thinking of buying used? We'll tell you what's worth your money — honestly." },
      { name: "Winter prep package", time: "2 h", price: "$229", desc: "Battery test, brake check, fluids, tires, undercarriage rust treatment. Done by Nov. 15." },
    ],
  },
];

function ServicesHero() {
  return (
    <section style={{
      paddingTop: "calc(var(--nav-h) + 80px)",
      paddingBottom: 80,
      position: "relative",
      background: "var(--bg)",
      borderBottom: "1px solid var(--line)",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.15,
        backgroundImage: "url('img/engine.jpg')",
        backgroundSize: "cover", backgroundPosition: "right center",
        maskImage: "linear-gradient(90deg, transparent 30%, black 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 30%, black 100%)",
      }}/>
      <div className="wrap" style={{position: "relative"}}>
        <span className="eyebrow">Services</span>
        <h1 className="display" style={{
          fontSize: "clamp(48px, 7vw, 112px)",
          margin: "16px 0 24px",
          maxWidth: 1000,
        }}>
          Sixteen services.<br/>
          <span style={{color: "var(--orange)"}}>One certified team.</span>
        </h1>
        <p style={{
          maxWidth: 640,
          fontSize: 18,
          color: "var(--text-dim)",
          lineHeight: 1.55,
          margin: 0,
        }}>
          From a 30-minute oil change to a two-week engine rebuild, every job carries
          our 2-year parts &amp; labour warranty. Times and starting prices below are
          honest averages — your final quote is in writing before we touch a wrench.
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
              border: "1px solid " + (filter === c ? "var(--orange)" : "var(--line)"),
              background: filter === c ? "var(--orange)" : "transparent",
              color: filter === c ? "#0A1428" : "var(--text)",
              fontFamily: "var(--f-mono)", fontSize: 12,
              letterSpacing: "0.14em", textTransform: "uppercase",
              fontWeight: 600,
              transition: "all .2s ease",
            }}>{c}</button>
          ))}
        </div>

        {visible.map((cat) => {
          const num = ALL_SERVICES.findIndex(c => c.cat === cat.cat) + 1;
          return (
          <div key={cat.cat} className="reveal" style={{marginBottom: 80}} id={cat.cat === "Specialty" ? "fleet" : null}>
            <div style={{
              display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
            }}>
              <span className="display" style={{
                fontSize: 56, color: "var(--orange-soft)", lineHeight: 0.8,
              }}>0{num}</span>
              <div>
                <div style={{
                  fontFamily: "var(--f-mono)", fontSize: 11,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--orange)", marginBottom: 6,
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
                  }}>
                    <h3 style={{
                      fontFamily: "var(--f-display)", fontSize: 24,
                      textTransform: "uppercase", letterSpacing: "0.01em",
                      margin: 0,
                    }}>{it.name}</h3>
                    <span style={{
                      fontFamily: "var(--f-mono)", fontSize: 11,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--orange)", whiteSpace: "nowrap", paddingTop: 4,
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
                    <a href="contact.html#book" style={{color: "var(--orange)"}}>Book →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          );
        })}

        <style>{`
          @media (max-width: 720px) { .cat-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function ServiceCTA() {
  return (
    <section className="section" style={{
      background: "var(--bg-elev)",
      borderTop: "1px solid var(--line)",
    }}>
      <div className="wrap cta-grid" style={{
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "center",
      }}>
        <div>
          <span className="eyebrow">Not sure what you need?</span>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            margin: "16px 0 24px",
          }}>
            Bring it in for a<br/>
            <span style={{color: "var(--orange)"}}>free 21-point check.</span>
          </h2>
          <p style={{color: "var(--text-dim)", fontSize: 17, lineHeight: 1.6, maxWidth: 540, marginBottom: 32}}>
            We'll put it on the lift, give you a printed report with photos of anything we find,
            and a written quote you can take home. Zero pressure.
          </p>
          <div style={{display: "flex", gap: 14, flexWrap: "wrap"}}>
            <a className="btn btn--primary" href="contact.html#book">Book a free check <Icon.arrow width="16" height="16"/></a>
            <a className="btn btn--ghost" href="tel:+15065551234">Call (506) 555-1234</a>
          </div>
        </div>
        <div style={{
          aspectRatio: "1/1",
          background: "url('img/measurement.jpg') center/cover",
          border: "1px solid var(--line)",
        }}/>
      </div>
      <style>{`
        @media (max-width: 820px) { .cta-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ServicesPage() {
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

ReactDOM.createRoot(document.getElementById("root")).render(<ServicesPage/>);
