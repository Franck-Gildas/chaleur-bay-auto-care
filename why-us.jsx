/* global React, ReactDOM, Navbar, Footer, FabChat, Icon, usePageMotion, onPageLinkClick, SITE */

function WhyHero() {
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
        position: "absolute", inset: 0, opacity: 0.15,
        backgroundImage: "url('img/garage.jpg')",
        backgroundSize: "cover", backgroundPosition: "center 35%",
        maskImage: "linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%)",
      }}/>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(60% 60% at 80% 50%, rgba(184,115,51,0.12), transparent 70%)",
        pointerEvents: "none",
      }}/>
      <div className="wrap" style={{position: "relative"}}>
        <span className="eyebrow hero-eyebrow">Why Mountain View</span>
        <h1 className="display hero-title" style={{
          fontSize: "clamp(56px, 9vw, 140px)",
          margin: "20px 0 28px",
          maxWidth: 1200,
        }}>
          Four reasons<br/>
          <span style={{color: "var(--copper)"}}>drivers stay with us.</span>
        </h1>
        <p className="hero-lead" style={{
          maxWidth: 720,
          fontSize: 19,
          color: "var(--text-dim)",
          lineHeight: 1.55,
          margin: 0,
        }}>
          Family-owned on Main Street in Bath. Honest starting prices, tire expertise,
          and a {SITE.rating.score}★ Google rating — here's why neighbours keep coming back.
        </p>

        <div className="hero-extra jump-grid" style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }}>
          {[
            { num: "01", label: "Certified Techs", href: "#certified" },
            { num: "02", label: "Fair Pricing", href: "#pricing" },
            { num: "03", label: "Tire Experts", href: "#tires" },
            { num: "04", label: "Local & Trusted", href: "#local" },
          ].map(j => (
            <a key={j.num} href={j.href} className="jump-cell" style={{
              background: "var(--bg)",
              padding: "22px 24px",
              display: "flex", flexDirection: "column", gap: 6,
              transition: "background .2s ease",
            }}>
              <span style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--copper)",
              }}>{j.num} / Reason</span>
              <span style={{
                fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.01em",
              }}>{j.label}</span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .jump-cell:hover { background: var(--bg-elev) !important; }
        @media (max-width: 820px) { .jump-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}

function StatStrip() {
  const stats = [
    { v: "3", l: "Red Seal journeymen on staff" },
    { v: `${SITE.rating.score}★`, l: "Google rating" },
    { v: "27", l: "Services offered" },
    { v: "100%", l: "Written quotes before work" },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
      <div className="wrap stat-strip" style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1, background: "var(--line)",
        border: "1px solid var(--line)",
        borderLeft: "none", borderRight: "none",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "var(--bg)",
            padding: "44px 28px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div className="display num-tab" style={{
              fontSize: "clamp(48px, 5vw, 72px)",
              color: "var(--text)", lineHeight: 0.9,
            }}>{s.v}</div>
            <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 820px) { .stat-strip { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}

function ReasonBlock({ id, num, kicker, title, lead, paragraphs, bullets, signal, image, flip, bg }) {
  return (
    <section id={id} className="section" style={{background: bg || "var(--bg)"}}>
      <div className="wrap">
        <div className="reason-grid" style={{
          display: "grid",
          gridTemplateColumns: flip ? "1fr 1.1fr" : "1.1fr 1fr",
          gap: 80, alignItems: "stretch",
        }}>
          <div className="reveal reason-img" style={{
            order: flip ? 2 : 1,
            position: "relative",
            minHeight: 520,
          }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid var(--line)",
            }}/>
            <div className="display" style={{
              position: "absolute",
              [flip ? "right" : "left"]: -28,
              top: -28,
              fontSize: "clamp(100px, 12vw, 180px)",
              color: "var(--copper)", lineHeight: 0.8, opacity: 0.3,
              pointerEvents: "none",
            }}>{num}</div>
            {signal && (
              <div style={{
                position: "absolute",
                bottom: 24,
                [flip ? "right" : "left"]: 24,
                background: "var(--bg)",
                border: "1px solid var(--line)",
                padding: "14px 18px",
                display: "flex", alignItems: "center", gap: 12,
                maxWidth: 320,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "var(--copper)", color: "#fff",
                  display: "grid", placeItems: "center",
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <div style={{
                  fontFamily: "var(--f-mono)", fontSize: 11,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--text)", lineHeight: 1.4,
                }}>{signal}</div>
              </div>
            )}
          </div>
          <div className="reveal reason-detail" style={{
            order: flip ? 1 : 2,
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 24,
          }}>
            <div>
              <span className="eyebrow">{num} / {kicker}</span>
              <h2 className="display" style={{
                fontSize: "clamp(36px, 4.8vw, 56px)",
                margin: "16px 0 0", lineHeight: 0.95,
              }}>{title}</h2>
            </div>
            <p style={{ fontSize: 18, color: "var(--text)", lineHeight: 1.55, margin: 0, fontWeight: 500 }}>{lead}</p>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.7, margin: 0 }}>{p}</p>
            ))}
            <ul style={{
              listStyle: "none", padding: 0, margin: "8px 0 0",
              display: "flex", flexDirection: "column", gap: 14,
              borderTop: "1px solid var(--line)", paddingTop: 24,
            }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{
                    width: 20, height: 20, flexShrink: 0,
                    border: "1.5px solid var(--forest)",
                    display: "grid", placeItems: "center", marginTop: 2,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <div>
                    <div style={{
                      fontFamily: "var(--f-display)", fontSize: 15, fontWeight: 800,
                      textTransform: "uppercase", marginBottom: 4,
                    }}>{b.t}</div>
                    <div style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>{b.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            .reason-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .reason-img { min-height: 380px !important; order: 1 !important; overflow: hidden !important; }
            .reason-detail { order: 2 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

const CERTS = [
  { name: "Red Seal", sub: "Inter-provincial standard", code: "RS" },
  { name: "ASE Certified", sub: "Automotive Service Excellence", code: "ASE" },
  { name: "NB Inspection", sub: "Authorized MVI station", code: "MVI" },
  { name: "AIA Canada", sub: "Automotive Industries Assoc.", code: "AIA" },
];

const PARTNERS = [
  { name: "NAPA Auto Parts", tag: "Parts supplier" },
  { name: "Bosch Service", tag: "Diagnostic equipment" },
  { name: "Michelin", tag: "Tire partner" },
  { name: "Mobil 1", tag: "Lubricants" },
  { name: "Castrol", tag: "Lubricants" },
  { name: "Interstate Batteries", tag: "Battery partner" },
];

function Certifications() {
  return (
    <section className="section" style={{background: "var(--bg-elev)", borderTop: "1px solid var(--line)"}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">Credentials</span>
            <h2>Certifications<br/><em>& partnerships.</em></h2>
          </div>
          <div className="sec-head__right">
            We invest in training and we partner with the brands you already trust.
            The wall in our waiting room is covered in this stuff — here's the short version.
          </div>
        </div>

        <div className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
          marginBottom: 56,
        }} data-cert-grid>
          {CERTS.map((c, i) => (
            <div key={i} style={{
              background: "var(--bg)",
              padding: "48px 28px",
              display: "flex", flexDirection: "column",
              alignItems: "center", textAlign: "center", gap: 18,
            }}>
              <div style={{
                width: 96, height: 96,
                border: "2px solid var(--copper)",
                borderRadius: "50%",
                display: "grid", placeItems: "center",
                position: "relative",
                background: "var(--copper-soft)",
              }}>
                <div style={{
                  position: "absolute", inset: 6,
                  border: "1px solid var(--copper-soft)",
                  borderRadius: "50%",
                }}/>
                <span className="display" style={{
                  fontSize: 28,
                  color: "var(--copper)",
                  letterSpacing: 0,
                  lineHeight: 1,
                }}>{c.code}</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.02em",
                  marginBottom: 4,
                }}>{c.name}</div>
                <div style={{
                  fontFamily: "var(--f-mono)", fontSize: 11,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--text-mute)",
                }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: "32px 0",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}>
          <div style={{
            fontFamily: "var(--f-mono)", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "var(--text-mute)", marginBottom: 24, textAlign: "center",
          }}>Trusted parts &amp; equipment partners</div>
          <div className="partner-row" style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 0,
          }}>
            {PARTNERS.map((p, i) => (
              <div key={i} style={{
                padding: "12px 16px",
                textAlign: "center",
                borderRight: i < PARTNERS.length - 1 ? "1px solid var(--line)" : "none",
              }} className="partner-cell">
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: "0.03em",
                  marginBottom: 4,
                  color: "var(--text)",
                }}>{p.name}</div>
                <div style={{
                  fontFamily: "var(--f-mono)", fontSize: 10,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--text-mute)",
                }}>{p.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          [data-cert-grid] { grid-template-columns: repeat(2, 1fr) !important; }
          .partner-row { grid-template-columns: repeat(2, 1fr) !important; }
          .partner-cell { border-right: none !important; border-bottom: 1px solid var(--line); padding: 18px 12px !important; }
        }
      `}</style>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section final-cta-sec" style={{
      background: "var(--bg-elev)",
      borderTop: "1px solid var(--line)",
      textAlign: "center",
    }}>
      <div className="wrap reveal">
        <span className="eyebrow">Ready when you are</span>
        <h2 className="display" style={{
          fontSize: "clamp(48px, 7vw, 96px)",
          margin: "20px 0 28px",
        }}>
          Book your<br/>
          <span style={{color: "var(--copper)"}}>appointment today.</span>
        </h2>
        <p style={{
          maxWidth: 560, margin: "0 auto 40px",
          fontSize: 18, color: "var(--text-dim)", lineHeight: 1.6,
        }}>
          Call us, book online, or stop by {SITE.address.street} in Bath.
          {SITE.bookingNote}
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn--primary" href="contact.html#book"
            onClick={(e) => onPageLinkClick(e, "contact.html#book")}>
            Book Appointment <Icon.arrow width="16" height="16"/>
          </a>
          <a className="btn btn--ghost" href={`tel:${SITE.phoneTel}`}>
            <Icon.phone width="16" height="16"/> {SITE.phone}
          </a>
        </div>
        <div style={{
          marginTop: 56, display: "flex", gap: 32, justifyContent: "center",
          flexWrap: "wrap", fontFamily: "var(--f-mono)", fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-mute)",
        }}>
          <span>✓ {SITE.rating.label}</span>
          <span>✓ Free quotes</span>
          <span>✓ Family-owned</span>
        </div>
      </div>
    </section>
  );
}

function WhyUsPage() {
  usePageMotion();
  return (
    <React.Fragment>
      <Navbar active="why-us"/>
      <main>
        <WhyHero/>
        <StatStrip/>

        <ReasonBlock
          id="certified"
          num="01"
          kicker="Certified"
          title={<>Red Seal &amp; ASE<br/><span style={{color: "var(--copper)"}}>certified technicians.</span></>}
          lead="Every wrench in our bay belongs to a technician with credentials you can verify — not someone we hired off Kijiji last week."
          paragraphs={[
            "Our team includes Red Seal journeymen and ASE-certified techs. Every diagnosis on a complex job gets signed off by a certified lead before we quote you.",
            "We pay for ongoing training because vehicles change. Our scan tools, our techs and our procedures stay current with what's actually rolling out of the factory — hybrids, modern diesels, ADAS calibration, the works.",
          ]}
          bullets={[
            { t: "Red Seal journeymen", d: "On staff. Their tickets are on the wall, not just on the website." },
            { t: "ASE Master Certified", d: "Specialty areas recertified every five years as required." },
            { t: "Manufacturer-trained", d: "Ongoing training on GM, Ford, Toyota and Subaru systems." },
            { t: "Lead-tech sign-off", d: "Complex diagnoses are reviewed by a senior tech before quoting." },
          ]}
          signal="Verify any tech's Red Seal at red-seal.ca"
          image="img/hero-mechanic.jpg"
          flip={false}
        />

        <ReasonBlock
          id="pricing"
          num="02"
          kicker="Transparent"
          title={<>Honest<br/><span style={{color: "var(--copper)"}}>starting prices.</span></>}
          lead="Every service on our menu has a clear starting price. Your final quote is in writing before we begin."
          paragraphs={[
            "No surprise invoices. We explain what we find, what it costs, and what happens next — before any work starts.",
            SITE.priceDisclaimer,
          ]}
          bullets={[
            { t: "27 services listed", d: "Full catalog with starting prices on our Services page." },
            { t: "Written quotes", d: "You approve the price before we turn a wrench." },
          ]}
          signal="Starting prices published on our Services page"
          image="img/measurement.jpg"
          flip={true}
          bg="var(--bg-elev)"
        />

        <ReasonBlock
          id="tires"
          num="03"
          kicker="Tires"
          title={<>Full tire<br/><span style={{color: "var(--copper)"}}>service centre.</span></>}
          lead="Sales, installation, rotation, balancing, repair and TPMS — everything your wheels need under one roof."
          paragraphs={[
            "Tires are a specialty at Mountain View Auto. Whether you need a single replacement or a full set for the season, we've got you covered.",
          ]}
          bullets={[
            { t: "Tires from $119.99", d: "Quality brands mounted and balanced, ready to roll." },
            { t: "Complete wheel service", d: "Rotation, balancing, repair and TPMS diagnostics." },
          ]}
          signal="Rotation, balancing, repair and TPMS under one roof"
          image="img/tire-change.jpg"
          flip={false}
        />

        <ReasonBlock
          id="local"
          num="04"
          kicker="Local"
          title={<>Family-owned<br/><span style={{color: "var(--copper)"}}>on Main St.</span></>}
          lead="Your neighbours in Bath, NB. Convenient location, personal service, and a team that knows the community."
          paragraphs={[
            "We're not a chain — we're a local family garage serving Bath, the Highway 105 corridor, and the wider Fredericton region.",
          ]}
          bullets={[
            { t: SITE.address.full, d: "Easy to find on Main Street with convenient parking." },
            { t: SITE.hours.weekdays, d: SITE.hours.weekend },
          ]}
          signal={`Serving Bath & the Fredericton region`}
          image="img/car-repair.jpg"
          flip={true}
          bg="var(--bg-elev)"
        />

        <Certifications/>
        <FinalCTA/>
      </main>
      <Footer/>
      <FabChat/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WhyUsPage />);
