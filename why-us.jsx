/* global React, ReactDOM, Navbar, Footer, FabChat, Icon, useReveal */

/* =========================================================
   WHY US — Chaleur Bay Auto Care
   Expands the four homepage convictions into detailed sections.
   ========================================================= */

/* ---------- Hero ---------- */
function WhyHero() {
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
        position: "absolute", inset: 0, opacity: 0.18,
        backgroundImage: "url('img/garage.jpg')",
        backgroundSize: "cover", backgroundPosition: "center 35%",
        maskImage: "linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 30%, black 70%, transparent 100%)",
      }}/>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(60% 60% at 80% 50%, rgba(255,98,0,0.12), transparent 70%)",
        pointerEvents: "none",
      }}/>
      <div className="wrap" style={{position: "relative"}}>
        <span className="eyebrow">Why Chaleur Bay</span>
        <h1 className="display" style={{
          fontSize: "clamp(56px, 9vw, 140px)",
          margin: "20px 0 28px",
          maxWidth: 1200,
          letterSpacing: "0.005em",
        }}>
          Four reasons<br/>
          <span style={{color: "var(--orange)"}}>drivers stay with us.</span>
        </h1>
        <p style={{
          maxWidth: 720,
          fontSize: 19,
          color: "var(--text-dim)",
          lineHeight: 1.55,
          margin: 0,
        }}>
          We're not the cheapest shop on the peninsula and we're not trying to be.
          We're the one your neighbour, your boss and your father-in-law all keep
          coming back to. Here's why.
        </p>

        {/* Quick jump nav */}
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }} className="jump-grid">
          {[
            { num: "01", label: "Certified Techs", href: "#certified" },
            { num: "02", label: "2-Year Warranty", href: "#warranty" },
            { num: "03", label: "Mobile Service", href: "#mobile" },
            { num: "04", label: "Honest Pricing", href: "#pricing" },
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
                color: "var(--orange)",
              }}>{j.num} / Reason</span>
              <span style={{
                fontFamily: "var(--f-display)", fontSize: 22,
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

/* ---------- Stat strip ---------- */
function StatStrip() {
  const stats = [
    { v: "3", l: "Red Seal journeymen on staff" },
    { v: "24 / 40k", l: "Month / km warranty on repairs" },
    { v: "35 km", l: "Mobile service radius from Bathurst" },
    { v: "100%", l: "Written quotes before we wrench" },
  ];
  return (
    <section style={{
      borderBottom: "1px solid var(--line)",
      background: "var(--bg)",
    }}>
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
              color: "var(--text)",
              lineHeight: 0.9,
            }}>{s.v}</div>
            <div style={{
              fontSize: 13,
              color: "var(--text-dim)",
              lineHeight: 1.5,
              maxWidth: 220,
            }}>{s.l}</div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 820px) { .stat-strip { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}

/* ---------- Reason block (alternating image / detail) ---------- */
function ReasonBlock({
  id, num, kicker, title, lead, paragraphs, bullets, signal, image, flip, bg,
}) {
  return (
    <section id={id} className="section" style={{background: bg || "var(--bg)"}}>
      <div className="wrap">
        <div className="reason-grid" style={{
          display: "grid",
          gridTemplateColumns: flip ? "1fr 1.1fr" : "1.1fr 1fr",
          gap: 80,
          alignItems: "stretch",
        }}>
          {/* Image side */}
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
            {/* Big number overlay */}
            <div className="display" style={{
              position: "absolute",
              [flip ? "right" : "left"]: -28,
              top: -28,
              fontSize: "clamp(140px, 16vw, 240px)",
              color: "var(--orange)",
              lineHeight: 0.8,
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px rgba(10,20,40,0.6)",
              pointerEvents: "none",
            }}>{num}</div>
            {/* Floating signal chip */}
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
                background: "var(--orange)", color: "#0A1428",
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
          </div>

          {/* Detail side */}
          <div className="reveal reason-detail" style={{
            order: flip ? 1 : 2,
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            gap: 28,
          }}>
            <div>
              <span className="eyebrow">{num} / {kicker}</span>
              <h2 className="display" style={{
                fontSize: "clamp(40px, 4.8vw, 64px)",
                margin: "16px 0 0",
                lineHeight: 0.92,
              }}>{title}</h2>
            </div>
            <p style={{
              fontSize: 19, color: "var(--text)",
              lineHeight: 1.55, margin: 0,
              fontWeight: 500,
            }}>{lead}</p>
            {paragraphs.map((p, i) => (
              <p key={i} style={{
                fontSize: 15, color: "var(--text-dim)",
                lineHeight: 1.7, margin: 0,
              }}>{p}</p>
            ))}

            {/* Bullets */}
            <ul style={{
              listStyle: "none", padding: 0, margin: "8px 0 0",
              display: "flex", flexDirection: "column", gap: 14,
              borderTop: "1px solid var(--line)",
              paddingTop: 24,
            }}>
              {bullets.map((b, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <span style={{
                    width: 20, height: 20, flexShrink: 0,
                    border: "1.5px solid var(--orange)",
                    display: "grid", placeItems: "center",
                    marginTop: 2,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <div>
                    <div style={{
                      fontFamily: "var(--f-display)", fontSize: 16,
                      textTransform: "uppercase", letterSpacing: "0.02em",
                      lineHeight: 1.2, marginBottom: 4,
                    }}>{b.t}</div>
                    <div style={{
                      fontSize: 14, color: "var(--text-dim)",
                      lineHeight: 1.6,
                    }}>{b.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .reason-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .reason-img { min-height: 380px !important; order: 1 !important; }
            .reason-detail { order: 2 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Certifications & Partnerships ---------- */
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
            <h2>Certifications<br/>&amp; <em>partnerships.</em></h2>
          </div>
          <div className="sec-head__right">
            We invest in training and we partner with the brands you already trust.
            The wall in our waiting room is covered in this stuff — here's the short version.
          </div>
        </div>

        {/* Certification badges */}
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
              position: "relative",
            }}>
              {/* Logo-style badge */}
              <div style={{
                width: 96, height: 96,
                border: "2px solid var(--orange)",
                borderRadius: "50%",
                display: "grid", placeItems: "center",
                position: "relative",
                background: "rgba(255,98,0,0.06)",
              }}>
                <div style={{
                  position: "absolute", inset: 6,
                  border: "1px solid var(--orange-soft)",
                  borderRadius: "50%",
                }}/>
                <span className="display" style={{
                  fontSize: 28,
                  color: "var(--orange)",
                  letterSpacing: 0,
                  lineHeight: 1,
                }}>{c.code}</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--f-display)", fontSize: 20,
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

        {/* Partner row */}
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
                  fontFamily: "var(--f-display)", fontSize: 18,
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

/* ---------- Promise band ---------- */
function PromiseBand() {
  const promises = [
    "Written quote before we wrench.",
    "Photos of everything we find.",
    "Old parts saved if you want them.",
    "We call before we overrun a quote.",
    "Loaner car when the job runs long.",
    "Warranty travels with the vehicle.",
  ];
  return (
    <section style={{
      background: "var(--orange)",
      color: "#0A1428",
      padding: "60px 0",
      borderTop: "1px solid #0A1428",
      borderBottom: "1px solid #0A1428",
      overflow: "hidden",
    }}>
      <div className="wrap">
        <div style={{
          display: "flex", alignItems: "baseline", gap: 24,
          marginBottom: 28,
          flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: "var(--f-mono)", fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            fontWeight: 600,
          }}>The Chaleur Bay promise</span>
          <h3 className="display" style={{
            fontSize: "clamp(28px, 3.5vw, 44px)",
            margin: 0, color: "#0A1428",
            lineHeight: 1,
          }}>Six things we will always do.</h3>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          borderTop: "1px solid #0A1428",
        }} className="promise-grid">
          {promises.map((p, i) => (
            <div key={i} style={{
              padding: "24px 0",
              borderBottom: i < 3 ? "1px solid #0A1428" : "none",
              borderRight: (i % 3 !== 2) ? "1px solid #0A1428" : "none",
              paddingLeft: i % 3 === 0 ? 0 : 28,
              paddingRight: 28,
              display: "flex", alignItems: "flex-start", gap: 16,
            }} className="promise-cell">
              <span style={{
                fontFamily: "var(--f-display)", fontSize: 28,
                lineHeight: 0.9,
                color: "#0A1428",
                minWidth: 36,
              }}>0{i+1}</span>
              <span style={{
                fontFamily: "var(--f-display)", fontSize: 22,
                textTransform: "uppercase", letterSpacing: "0.01em",
                lineHeight: 1.1,
                color: "#0A1428",
              }}>{p}</span>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 820px) {
            .promise-grid { grid-template-columns: 1fr !important; }
            .promise-cell { border-right: none !important; padding-left: 0 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section style={{
      background: "var(--bg)",
      padding: "140px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.18,
        backgroundImage: "url('img/hero-mechanic.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        maskImage: "linear-gradient(180deg, transparent 0%, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 50%, transparent 100%)",
      }}/>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(80% 60% at 50% 50%, rgba(255,98,0,0.18), transparent 70%)",
      }}/>
      <div className="wrap reveal" style={{
        position: "relative",
        textAlign: "center",
        maxWidth: 980,
      }}>
        <span className="eyebrow" style={{justifyContent: "center"}}>Ready when you are</span>
        <h2 className="display" style={{
          fontSize: "clamp(56px, 9vw, 128px)",
          margin: "20px 0 24px",
          lineHeight: 0.9,
        }}>
          Book service<br/>
          <span style={{color: "var(--orange)"}}>now.</span>
        </h2>
        <p style={{
          fontSize: 19,
          color: "var(--text-dim)",
          lineHeight: 1.55,
          margin: "0 auto 40px",
          maxWidth: 640,
        }}>
          Online in 90 seconds, or call the shop and talk to a real person.
          Either way you'll have a written quote before we touch your vehicle.
        </p>
        <div style={{
          display: "flex", gap: 14, flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <a className="btn btn--primary" href="contact.html#book" style={{
            padding: "20px 32px", fontSize: 15,
          }}>
            Book service now <Icon.arrow width="16" height="16"/>
          </a>
          <a className="btn btn--ghost" href="tel:+15065551234" style={{
            padding: "20px 32px", fontSize: 15,
          }}>
            <Icon.phone width="16" height="16"/> (506) 555 - 1234
          </a>
        </div>

        {/* Trust footnote */}
        <div style={{
          marginTop: 56,
          display: "flex",
          gap: 32,
          justifyContent: "center",
          flexWrap: "wrap",
          fontFamily: "var(--f-mono)", fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--text-mute)",
        }}>
          <span>✓ 2-year / 40,000 km warranty</span>
          <span>✓ Free 21-point check</span>
          <span>✓ Mobile service available</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
function WhyUsPage() {
  useReveal();
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
          title={<>Red Seal &amp; ASE<br/><span style={{color: "var(--orange)"}}>certified technicians.</span></>}
          lead="Every wrench in our bay belongs to a technician with credentials you can verify — not a kid we hired off Kijiji last week."
          paragraphs={[
            "Three of our four full-time techs hold the Red Seal — Canada's inter-provincial automotive standard. Two are ASE Master Certified across all eight automotive specialty areas. Every diagnosis on a complex job gets signed off by a certified lead before we quote you.",
            "We pay for ongoing training because vehicles change. Our scan tools, our techs and our procedures stay current with what's actually rolling out of the factory — hybrids, modern diesels, ADAS calibration, the works.",
          ]}
          bullets={[
            { t: "Red Seal journeymen", d: "Three on staff. Their tickets are on the wall, not just on the website." },
            { t: "ASE Master Certified", d: "Eight specialty areas, recertified every five years as required." },
            { t: "Manufacturer-trained", d: "Ongoing training on GM, Ford, Toyota and Subaru systems." },
            { t: "Lead-tech sign-off", d: "Complex diagnoses are reviewed by a senior tech before quoting." },
          ]}
          signal="Verify any tech's Red Seal at red-seal.ca"
          image="img/hero-mechanic.jpg"
          flip={false}
          bg="var(--bg)"
        />

        <ReasonBlock
          id="warranty"
          num="02"
          kicker="Guaranteed"
          title={<><span style={{color: "var(--orange)"}}>2-year /</span> 40,000 km<br/>warranty on every repair.</>}
          lead="Parts and labour. No fine print, no fighting at the counter. If a repair we did fails inside the warranty window, we fix it free."
          paragraphs={[
            "Most shops in the region offer 12 months or 20,000 km. We doubled both because we stand behind our parts choice, our diagnostic process, and the way we torque every fastener. If we got something wrong, we own it.",
            "The warranty travels with the vehicle, not the owner — so it transfers if you sell. Bring the original invoice and we'll honour it at any Chaleur Bay location (we're one shop, but the principle stands).",
          ]}
          bullets={[
            { t: "24 months · 40,000 km", d: "Whichever comes first. Industry-leading on the peninsula." },
            { t: "Parts AND labour", d: "Both covered. Some shops only warranty the part." },
            { t: "Transfers with the car", d: "Selling? The next owner is covered too." },
            { t: "Nationwide TechNet coverage", d: "Travelling? Honoured at 14,000+ TechNet shops across North America." },
          ]}
          signal="Average warranty claim resolved in under 24 hours"
          image="img/brake.jpg"
          flip={true}
          bg="var(--bg-elev)"
        />

        <ReasonBlock
          id="mobile"
          num="03"
          kicker="Convenient"
          title={<>We come to you.<br/><span style={{color: "var(--orange)"}}>Mobile service</span> on the bay.</>}
          lead="Battery, brakes, diagnostics, seasonal tire swaps and most maintenance — performed in your driveway, your office parking lot, or your fleet yard."
          paragraphs={[
            "Our mobile unit covers a 35 km radius from the shop: Bathurst, Beresford, Petit-Rocher, Pointe-Verte, Nigadoo, Robertville, Allardville and Grande-Anse. Outside that, we'll still come — we just add a small travel fee, quoted up front.",
            "Mobile service runs on the same diagnostic tools and the same trained techs as the shop. You get the same written quote, the same photos, and the same 2-year warranty. The only difference is you didn't have to take a half-day off work.",
          ]}
          bullets={[
            { t: "35 km service radius", d: "Bathurst + 8 surrounding communities, no travel fee." },
            { t: "Same techs, same tools", d: "Mobile bay carries the same scan tools and torque equipment." },
            { t: "Fleet on-site programs", d: "Scheduled overnight or pre-dawn service for working fleets." },
            { t: "Book online or by phone", d: "We confirm a 1-hour arrival window the day before." },
          ]}
          signal="Serving Bathurst · Beresford · Petit-Rocher · Nigadoo + more"
          image="img/car-repair.jpg"
          flip={false}
          bg="var(--bg)"
        />

        <ReasonBlock
          id="pricing"
          num="04"
          kicker="Honest"
          title={<>Honest, transparent<br/><span style={{color: "var(--orange)"}}>pricing.</span> No surprises.</>}
          lead="You will never pay more than the number on the quote you signed. If we find something else mid-job, we stop, photograph it, call you, and wait."
          paragraphs={[
            "We publish starting prices on our Services page so you know roughly where you stand before you even pick up the phone. Our diagnostic fee is flat, not by-the-hour, and gets credited back if you book the repair with us.",
            "We don't work on commission. Our techs are salaried, so nobody benefits from selling you a job you don't need. If your brakes have 20% pad life left, we'll tell you to come back in six months — not replace them today.",
          ]}
          bullets={[
            { t: "Quote before we wrench", d: "Written, itemized, with parts pricing visible. Nothing hidden in 'shop supplies'." },
            { t: "Stop-and-call policy", d: "Find something extra? We stop, photograph it, and call before continuing." },
            { t: "Flat $95 diagnostic", d: "Credited back when you book the repair. No open-ended hourly meter." },
            { t: "Salaried, not commissioned", d: "Our techs have zero incentive to upsell. Ever." },
          ]}
          signal="0 customer complaints filed with the NB BBB since 2019"
          image="img/measurement.jpg"
          flip={true}
          bg="var(--bg-elev)"
        />

        <Certifications/>
        <PromiseBand/>
        <FinalCTA/>
      </main>
      <Footer/>
      <FabChat/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WhyUsPage/>);
