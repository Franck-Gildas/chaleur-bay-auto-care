/* global React, Navbar, Footer, FabChat, Icon, useReveal, emailjs */
const { useState } = React;

emailjs.init({ publicKey: "kx8ejBAxjQ56jwuma" });

function ContactHero() {
  return (
    <section style={{
      paddingTop: "calc(var(--nav-h) + 80px)",
      paddingBottom: 60,
      borderBottom: "1px solid var(--line)",
      background: "var(--bg)",
    }}>
      <div className="wrap">
        <span className="eyebrow">Contact &amp; booking</span>
        <h1 className="display" style={{
          fontSize: "clamp(48px, 7vw, 112px)",
          margin: "16px 0 24px",
          maxWidth: 1100,
        }}>
          Pick up the phone,<br/>or <span style={{color: "var(--orange)"}}>fill out the form.</span>
        </h1>
        <p style={{
          maxWidth: 640, fontSize: 18, color: "var(--text-dim)",
          lineHeight: 1.55, margin: 0,
        }}>
          We answer the phone with a real person, Monday to Saturday. Online requests are
          confirmed by call within the hour during business hours, and first thing the next
          morning otherwise.
        </p>
      </div>
    </section>
  );
}

function ContactBands() {
  const bands = [
    { kicker: "Call us", title: "(506) 555 - 1234",
      sub: "Real human · no menus · no holds", action: "tel:+15065551234", cta: "Call now" },
    { kicker: "Email", title: "hello@chaleurbayauto.ca",
      sub: "Replies in under 4 business hours", action: "mailto:hello@chaleurbayauto.ca", cta: "Send email" },
    { kicker: "Visit", title: "418 King Avenue · Bathurst",
      sub: "Mon – Fri · 7:30 – 17:30 · Sat · 8 – 14", action: "#map", cta: "Get directions" },
  ];
  return (
    <section style={{
      borderBottom: "1px solid var(--line)",
      background: "var(--bg-elev)",
    }}>
      <div className="wrap bands-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
        background: "var(--line)",
      }}>
        {bands.map((b, i) => (
          <a key={i} href={b.action} className="reveal" style={{
            background: "var(--bg-elev)",
            padding: "40px 32px",
            display: "flex", flexDirection: "column", gap: 14,
            transition: "background .2s ease",
          }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card)"}
             onMouseLeave={(e) => e.currentTarget.style.background = "var(--bg-elev)"}>
            <div style={{
              fontFamily: "var(--f-mono)", fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--orange)",
            }}>0{i+1} · {b.kicker}</div>
            <div style={{
              fontFamily: "var(--f-display)", fontSize: 30,
              textTransform: "uppercase", letterSpacing: "0.01em",
              lineHeight: 1.05,
              wordBreak: "break-word", overflowWrap: "break-word",
            }}>{b.title}</div>
            <div style={{color: "var(--text-dim)", fontSize: 14}}>{b.sub}</div>
            <div style={{marginTop: "auto", paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <span style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--orange)", fontWeight: 600,
              }}>{b.cta}</span>
              <Icon.arrow width="16" height="16"/>
            </div>
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 880px) { .bands-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function BookingFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    service: "",
    vehicle: { year: "", make: "", model: "" },
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const services = [
    { id: "oil",   label: "Oil & filter",        time: "30 min" },
    { id: "brake", label: "Brakes",              time: "2 – 4 h" },
    { id: "tires", label: "Tires / swap",        time: "45 min" },
    { id: "diag",  label: "Diagnostics",         time: "60 min" },
    { id: "eng",   label: "Engine repair",       time: "Quoted" },
    { id: "tx",    label: "Transmission",        time: "60 – 90 min" },
    { id: "mob",   label: "Mobile service",      time: "On-site" },
    { id: "other", label: "Something else",      time: "Let us know" },
  ];

  const times = ["7:30", "9:00", "10:30", "13:00", "14:30", "16:00"];

  const canNext = (
    (step === 1 && data.service) ||
    (step === 2 && data.vehicle.year && data.vehicle.make) ||
    (step === 3 && data.date && data.time) ||
    (step === 4 && data.name && data.phone)
  );

  const emptyData = {
    service: "", vehicle: { year: "", make: "", model: "" },
    date: "", time: "", name: "", phone: "", email: "", note: "",
  };

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    const serviceName = services.find(s => s.id === data.service)?.label || data.service;
    const vehicle = [data.vehicle.year, data.vehicle.make, data.vehicle.model].filter(Boolean).join(" ");
    try {
      const res = await fetch("https://formspree.io/f/mgoqvzgw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          vehicle,
          service: serviceName,
          preferred_date: data.date,
          preferred_time: data.time,
          notes: data.note,
        }),
      });
      if (res.ok) {
        setData(emptyData);
        setStep(5);
        emailjs.send("service_kf9g69c", "template_8y4b74q", {
          name: data.name,
          email: data.email,
          vehicle,
          service: serviceName,
          preferred_date: data.date,
        }).catch(err => console.error("EmailJS auto-reply failed:", err));
      } else {
        setSubmitError("Something went wrong. Please call us at (506) 555-1234 or try again.");
      }
    } catch (_) {
      setSubmitError("Something went wrong. Please call us at (506) 555-1234 or try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section" id="book">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">Book in 4 steps</span>
            <h2>Request an<br/><em>appointment.</em></h2>
          </div>
          <div className="sec-head__right">
            Roughly 2 minutes. We'll confirm by phone — you can adjust anything then.
          </div>
        </div>

        <div className="reveal" style={{
          border: "1px solid var(--line)",
          background: "var(--bg-card)",
        }}>
          {/* Stepper */}
          <div className="booking-stepper" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: "1px solid var(--line)",
          }}>
            {["Service", "Vehicle", "When", "You"].map((s, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <div key={s} style={{
                  padding: "18px 24px",
                  borderRight: i < 3 ? "1px solid var(--line)" : "none",
                  display: "flex", alignItems: "center", gap: 12,
                  background: active ? "var(--bg)" : "transparent",
                  position: "relative",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: done ? "var(--orange)" : (active ? "transparent" : "transparent"),
                    border: "1.5px solid " + (done || active ? "var(--orange)" : "var(--line)"),
                    color: done ? "#0A1428" : (active ? "var(--orange)" : "var(--text-mute)"),
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 700,
                  }}>{done ? "✓" : n}</div>
                  <div>
                  <div className="step-sublabel" style={{
                    fontFamily: "var(--f-mono)", fontSize: 10,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--text-mute)",
                  }}>Step 0{n}</div>
                    <div style={{
                      fontSize: 14, fontWeight: 600,
                      color: active ? "var(--text)" : "var(--text-dim)",
                    }}>{s}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{padding: 40, minHeight: 340}}>
            {step === 1 && (
              <div>
                <h3 style={{fontFamily: "var(--f-display)", fontSize: 26, margin: "0 0 8px", textTransform: "uppercase"}}>What do you need?</h3>
                <p style={{color: "var(--text-dim)", margin: "0 0 28px"}}>Pick the closest match. We'll dial it in when we call.</p>
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12,
                }} className="svc-pick">
                  {services.map(s => (
                    <button key={s.id} onClick={() => setData({...data, service: s.id})} style={{
                      padding: "20px 18px",
                      background: data.service === s.id ? "var(--orange)" : "var(--bg)",
                      color: data.service === s.id ? "#0A1428" : "var(--text)",
                      border: "1px solid " + (data.service === s.id ? "var(--orange)" : "var(--line)"),
                      textAlign: "left",
                      display: "flex", flexDirection: "column", gap: 6,
                      transition: "all .15s ease",
                    }}>
                      <div style={{
                        fontFamily: "var(--f-display)", fontSize: 18,
                        textTransform: "uppercase", letterSpacing: "0.01em",
                      }}>{s.label}</div>
                      <div style={{
                        fontFamily: "var(--f-mono)", fontSize: 11,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        opacity: 0.8,
                      }}>⏱ {s.time}</div>
                    </button>
                  ))}
                </div>
                <style>{`
                  @media (max-width: 880px) { .svc-pick { grid-template-columns: repeat(2, 1fr) !important; } }
                `}</style>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{fontFamily: "var(--f-display)", fontSize: 26, margin: "0 0 8px", textTransform: "uppercase"}}>About your vehicle</h3>
                <p style={{color: "var(--text-dim)", margin: "0 0 28px"}}>Helps us pull the right parts in advance.</p>
                <div style={{display: "grid", gridTemplateColumns: "0.5fr 1fr 1fr", gap: 20}} className="veh-grid">
                  <Field2 label="Year *" value={data.vehicle.year} onChange={v => setData({...data, vehicle: {...data.vehicle, year: v}})} placeholder="2019"/>
                  <Field2 label="Make *" value={data.vehicle.make} onChange={v => setData({...data, vehicle: {...data.vehicle, make: v}})} placeholder="Ford"/>
                  <Field2 label="Model" value={data.vehicle.model} onChange={v => setData({...data, vehicle: {...data.vehicle, model: v}})} placeholder="F-150"/>
                </div>
                <div style={{height: 24}}/>
                <Field2 label="Anything we should know?" value={data.note} onChange={v => setData({...data, note: v})} placeholder="Sounds like the bearing on the front-left. Light comes on cold mornings." multiline/>
                <style>{`
                  @media (max-width: 720px) { .veh-grid { grid-template-columns: 1fr 1fr !important; } }
                `}</style>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{fontFamily: "var(--f-display)", fontSize: 26, margin: "0 0 8px", textTransform: "uppercase"}}>When works?</h3>
                <p style={{color: "var(--text-dim)", margin: "0 0 28px"}}>Pick any open slot. We'll confirm by phone — easy to change.</p>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}} className="when-grid">
                  <div>
                    <div style={{
                      fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--text-mute)", marginBottom: 12,
                    }}>Date *</div>
                    <input type="date" value={data.date} onChange={(e) => setData({...data, date: e.target.value})} style={{
                      width: "100%",
                      background: "var(--bg)", border: "1px solid var(--line)",
                      padding: "14px 16px", color: "var(--text)", fontSize: 16, fontFamily: "inherit",
                      outline: "none",
                    }}/>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--text-mute)", marginBottom: 12,
                    }}>Time slot *</div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8}}>
                      {times.map(t => (
                        <button key={t} onClick={() => setData({...data, time: t})} style={{
                          padding: "12px 0",
                          background: data.time === t ? "var(--orange)" : "var(--bg)",
                          color: data.time === t ? "#0A1428" : "var(--text)",
                          border: "1px solid " + (data.time === t ? "var(--orange)" : "var(--line)"),
                          fontFamily: "var(--f-mono)", fontSize: 13,
                          letterSpacing: "0.04em", fontWeight: 600,
                        }}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <style>{`
                  @media (max-width: 720px) { .when-grid { grid-template-columns: 1fr !important; } }
                `}</style>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 style={{fontFamily: "var(--f-display)", fontSize: 26, margin: "0 0 8px", textTransform: "uppercase"}}>How to reach you</h3>
                <p style={{color: "var(--text-dim)", margin: "0 0 28px"}}>One call, one confirmation — that's it.</p>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}} className="you-grid">
                  <Field2 label="Full name *" value={data.name} onChange={v => setData({...data, name: v})} placeholder="Marc Doucet"/>
                  <Field2 label="Phone *" value={data.phone} onChange={v => setData({...data, phone: v})} placeholder="(506) 555-0000"/>
                </div>
                <div style={{height: 20}}/>
                <Field2 label="Email" value={data.email} onChange={v => setData({...data, email: v})} placeholder="marc@example.ca"/>
                <style>{`
                  @media (max-width: 720px) { .you-grid { grid-template-columns: 1fr !important; } }
                `}</style>
              </div>
            )}

            {step === 5 && (
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", textAlign: "center"}}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "var(--orange)", color: "#0A1428",
                  display: "grid", placeItems: "center", marginBottom: 24,
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7"/>
                  </svg>
                </div>
                <h3 style={{fontFamily: "var(--f-display)", fontSize: 38, margin: "0 0 12px", textTransform: "uppercase"}}>
                  Request received
                </h3>
                <p style={{color: "var(--text-dim)", maxWidth: 480, margin: "0 0 28px", fontSize: 17, lineHeight: 1.6}}>
                  Your appointment request has been received. We'll confirm by phone within the hour during business hours.
                </p>
                <a href="index.html" className="btn btn--ghost">Back to home</a>
              </div>
            )}
          </div>

          {step < 5 && (
            <div style={{
              padding: 24, borderTop: "1px solid var(--line)",
              background: "var(--bg)",
            }}>
              {submitError && (
                <div style={{
                  marginBottom: 16, padding: "14px 18px",
                  background: "rgba(220,38,38,0.08)",
                  border: "1px solid rgba(220,38,38,0.35)",
                  color: "#f87171", fontSize: 14, lineHeight: 1.55,
                }}>
                  {submitError}
                </div>
              )}
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} disabled={submitting} className="btn btn--ghost">
                    ← Back
                  </button>
                ) : <div/>}
                <button
                  onClick={() => step === 4 ? handleSubmit() : setStep(step + 1)}
                  disabled={!canNext || submitting}
                  className="btn btn--primary"
                  style={{opacity: (canNext && !submitting) ? 1 : 0.4, pointerEvents: (canNext && !submitting) ? "auto" : "none"}}>
                  {step === 4 ? (submitting ? "Sending…" : "Send request") : "Continue"} {!submitting && <Icon.arrow width="16" height="16"/>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 540px) {
          .booking-stepper > div { padding: 12px 8px !important; gap: 6px !important; }
          .step-sublabel { display: none; }
        }
      `}</style>
    </section>
  );
}

function Field2({ label, value, onChange, placeholder, multiline }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <label style={{display: "block"}}>
      <div style={{
        fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "var(--text-mute)", marginBottom: 10,
      }}>{label}</div>
      <Tag
        rows={multiline ? 3 : undefined}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: "var(--bg)",
          border: "1px solid var(--line)",
          padding: "14px 16px",
          fontSize: 15,
          color: "var(--text)",
          fontFamily: "inherit",
          outline: "none",
          resize: multiline ? "vertical" : "none",
        }}/>
    </label>
  );
}

function MapBlock() {
  return (
    <section className="section" id="map" style={{background: "var(--bg-elev)"}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">Find the shop</span>
            <h2>418 King Avenue<br/><em>Bathurst, NB.</em></h2>
          </div>
          <div className="sec-head__right">
            Across from the Foodland, two minutes from Highway 11. Lots of parking,
            warm waiting room with real coffee.
          </div>
        </div>

        <div className="reveal" style={{
          display: "grid", gridTemplateColumns: "1fr 380px",
          background: "var(--line)", gap: 1, border: "1px solid var(--line)",
        }} className="map-grid">
          <div style={{
            background: "linear-gradient(180deg, #0F1B33 0%, #152545 100%)",
            position: "relative", minHeight: 480, overflow: "hidden",
          }}>
            <svg viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
            }}>
              <defs>
                <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                </pattern>
                <linearGradient id="bay2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1A2A48"/>
                  <stop offset="1" stopColor="#0E1A30"/>
                </linearGradient>
              </defs>
              <rect width="800" height="480" fill="url(#grid2)"/>
              <path d="M 0 100 Q 250 160 480 130 T 800 60 L 800 0 L 0 0 Z" fill="url(#bay2)"/>
              <path d="M 0 100 Q 250 160 480 130 T 800 60" stroke="rgba(138,160,191,0.4)" fill="none"/>
              {/* Roads */}
              <path d="M 100 480 L 100 280 Q 100 240 160 240 L 460 240 Q 500 240 500 280 L 500 400 Q 500 440 540 440 L 800 440" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none"/>
              <path d="M 0 320 L 300 320 Q 340 320 340 360 L 340 480" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none"/>
              <path d="M 520 480 L 520 320 Q 520 300 560 300 L 800 300" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none"/>
              <path d="M 600 0 L 600 240" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none"/>

              <text x="50" y="80" fill="rgba(199,213,232,0.55)" fontFamily="JetBrains Mono, monospace" fontSize="12" letterSpacing="3">CHALEUR BAY</text>
              <text x="50" y="370" fill="rgba(199,213,232,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">KING AVE</text>
              <text x="560" y="295" fill="rgba(199,213,232,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">RTE 11 →</text>
              <text x="350" y="475" fill="rgba(199,213,232,0.4)" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5">↓ DOWNTOWN</text>

              <g transform="translate(380, 300)">
                <circle r="60" fill="rgba(255,98,0,0.12)">
                  <animate attributeName="r" values="30;60;30" dur="2.4s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite"/>
                </circle>
                <circle r="22" fill="#FF6200"/>
                <circle r="8" fill="#0A1428"/>
              </g>
              <text x="412" y="306" fill="#FF6200" fontFamily="Anton, sans-serif" fontSize="18" letterSpacing="1.5">CHALEUR BAY AUTO</text>
              <text x="412" y="324" fill="rgba(255,255,255,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5">418 KING AVE</text>
            </svg>
          </div>

          <div style={{background: "var(--bg)", padding: 32, display: "flex", flexDirection: "column", gap: 24}}>
            <div>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--text-mute)", marginBottom: 8,
              }}>Address</div>
              <div style={{fontWeight: 600, fontSize: 17}}>418 King Avenue</div>
              <div style={{color: "var(--text-dim)"}}>Bathurst, NB · E2A 1S2</div>
            </div>

            <div>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--text-mute)", marginBottom: 12,
              }}>Hours</div>
              <table style={{width: "100%", borderCollapse: "collapse", fontSize: 14}}>
                <tbody>
                  {[
                    ["Mon – Fri", "7:30 – 17:30"],
                    ["Saturday", "8:00 – 14:00"],
                    ["Sunday", "Closed"],
                    ["Mobile", "By appointment"],
                  ].map(([d, h], i) => (
                    <tr key={i} style={{borderTop: i ? "1px solid var(--line)" : "none"}}>
                      <td style={{padding: "10px 0", color: "var(--text-dim)"}}>{d}</td>
                      <td style={{padding: "10px 0", textAlign: "right", fontWeight: 600}}>{h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)"}}>
              <a className="btn btn--primary btn--block" href="#book">Book online <Icon.arrow width="16" height="16"/></a>
              <div style={{height: 10}}/>
              <a className="btn btn--ghost btn--block" href="tel:+15065551234">Call (506) 555-1234</a>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) { .map-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: "Do I need an appointment?",
      a: "We recommend it — appointments get same-day service. Walk-ins are welcome for diagnostics, batteries, and quick checks; we'll do our best to fit you in." },
    { q: "What's the 2-year warranty cover?",
      a: "Anything we repaired, both parts and labour, for 24 months from the invoice date — no kilometre limit. If the part fails, we replace it free. No fine print." },
    { q: "Can you service my fleet vehicles?",
      a: "Yes. We hold dedicated bays for fleet partners, do monthly invoicing, and can run scheduled preventive maintenance. Call us to set up a contract." },
    { q: "Is mobile repair available year-round?",
      a: "Yes — battery, brakes, seasonal swaps and basic diagnostics. Anything that needs a lift comes into the shop. Mobile zone is Greater Bathurst plus 30 km." },
    { q: "Do you speak French?",
      a: "Oui. Toute notre équipe est bilingue. Aucun problème, on s'occupe de vous en français ou en anglais." },
  ];
  return (
    <section className="section">
      <div className="wrap" style={{maxWidth: 900}}>
        <div className="sec-head reveal" style={{marginBottom: 40}}>
          <div className="sec-head__left">
            <span className="eyebrow">FAQ</span>
            <h2>Common<br/><em>questions.</em></h2>
          </div>
        </div>

        <div className="reveal" style={{borderTop: "1px solid var(--line)"}}>
          {items.map((it, i) => (
            <div key={i} style={{borderBottom: "1px solid var(--line)"}}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: "100%",
                padding: "26px 0",
                textAlign: "left",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                color: "var(--text)",
              }}>
                <span style={{
                  fontFamily: "var(--f-display)", fontSize: 22,
                  textTransform: "uppercase", letterSpacing: "0.01em",
                }}>{it.q}</span>
                <span style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid var(--line)",
                  display: "grid", placeItems: "center",
                  transition: "transform .25s ease, background .25s ease",
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  background: open === i ? "var(--orange)" : "transparent",
                  color: open === i ? "#0A1428" : "var(--text)",
                  flexShrink: 0,
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 200 : 0,
                opacity: open === i ? 1 : 0,
                overflow: "hidden",
                transition: "max-height .35s ease, opacity .35s ease, padding .35s ease",
                paddingBottom: open === i ? 28 : 0,
                color: "var(--text-dim)",
                fontSize: 16,
                lineHeight: 1.65,
                maxWidth: 700,
              }}>{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  useReveal();
  return (
    <React.Fragment>
      <Navbar active="contact"/>
      <main>
        <ContactHero/>
        <ContactBands/>
        <BookingFlow/>
        <MapBlock/>
        <FAQ/>
      </main>
      <Footer/>
      <FabChat/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ContactPage/>);
