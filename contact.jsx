/* global React, Navbar, Footer, FabChat, Icon, usePageMotion, onPageLinkClick, emailjs, SITE, scrollToAnchor */
const { useState, useLayoutEffect, useRef } = React;

emailjs.init({ publicKey: "kx8ejBAxjQ56jwuma" });

function ContactHero() {
  return (
    <section
      className="page-hero"
      style={{
        paddingTop: "calc(var(--nav-h) + 80px)",
        paddingBottom: 60,
        borderBottom: "1px solid var(--line)",
        background: "var(--bg)",
      }}
    >
      <div className="wrap">
        <span className="eyebrow hero-eyebrow">Contact &amp; booking</span>
        <h1
          className="display hero-title"
          style={{
            fontSize: "clamp(36px, 9vw, 112px)",
            margin: "16px 0 24px",
            maxWidth: 1100,
          }}
        >
          Book an <span style={{ color: "var(--copper)" }}>appointment.</span>
        </h1>
        <p
          className="hero-lead"
          style={{
            maxWidth: 640,
            fontSize: 18,
            color: "var(--text-dim)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          We answer the phone with a real person, Monday to Friday. Online
          requests are confirmed by call during business hours. {SITE.bookingNote}
        </p>
      </div>
    </section>
  );
}

function ContactBands() {
  const bands = [
    {
      kicker: "Call us",
      title: SITE.phone,
      sub: "Real human · no menus · no holds",
      action: `tel:${SITE.phoneTel}`,
      cta: "Call now",
    },
    {
      kicker: "Email",
      title: SITE.email,
      titleVariant: "email",
      sub: "Replies during business hours",
      action: `mailto:${SITE.email}`,
      cta: "Send email",
    },
    {
      kicker: "Visit",
      title: `${SITE.address.street} · ${SITE.address.city}`,
      sub: `${SITE.hours.weekdays} · ${SITE.hours.weekend}`,
      action: SITE.mapsDirections,
      cta: "Get directions",
    },
  ];
  return (
    <section
      style={{
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-elev)",
      }}
    >
      <div
        className="wrap bands-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.25fr 1fr",
          gap: 1,
          background: "var(--line)",
        }}
      >
        {bands.map((b, i) => (
          <a
            key={i}
            href={b.action}
            className="reveal"
            style={{
              background: "var(--bg-elev)",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              transition: "background .2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--bg-card)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--bg-elev)")
            }
          >
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--orange)",
              }}
            >
              0{i + 1} · {b.kicker}
            </div>
            {b.titleVariant === "email" ? (
              <div
                className="band-title band-title--email"
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: "clamp(14px, 1.5vw, 18px)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.45,
                  fontWeight: 500,
                  wordBreak: "break-all",
                }}
              >
                {b.title.split("@").map((part, j, arr) => (
                  <span key={j} style={{ display: "block" }}>
                    {j === 0 ? `${part}@` : part}
                  </span>
                ))}
              </div>
            ) : (
              <div
                className="band-title"
                style={{
                  fontFamily: "var(--f-display)",
                  fontSize: 30,
                  textTransform: "uppercase",
                  letterSpacing: "0.01em",
                  lineHeight: 1.05,
                }}
              >
                {b.title}
              </div>
            )}
            <div style={{ color: "var(--text-dim)", fontSize: 14 }}>
              {b.sub}
            </div>
            <div
              style={{
                marginTop: "auto",
                paddingTop: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--orange)",
                  fontWeight: 600,
                }}
              >
                {b.cta}
              </span>
              <Icon.arrow width="16" height="16" />
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
  const bookingBodyRef = useRef(null);
  const skipBodyReset = useRef(true);

  function changeStep(next) {
    setStep(next);
  }

  useLayoutEffect(() => {
    if (skipBodyReset.current) {
      skipBodyReset.current = false;
      return;
    }
    if (bookingBodyRef.current) {
      bookingBodyRef.current.scrollTop = 0;
    }
  }, [step]);

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

  const serviceCategories = [
    {
      cat: "General Maintenance",
      items: [
        { id: "oil", label: "Oil Changes", time: "30 min" },
        { id: "tire-rot", label: "Tire Rotation", time: "30 min" },
        { id: "air-filter", label: "Air Filter Replacement", time: "15 min" },
        { id: "inspection", label: "Vehicle Inspection", time: "60 min" },
      ],
    },
    {
      cat: "Brakes & Suspension",
      items: [
        { id: "brake", label: "Brake Repair", time: "2 – 4 h" },
        { id: "susp", label: "Steering & Suspension", time: "Quoted" },
      ],
    },
    {
      cat: "Engine & Transmission",
      items: [
        { id: "eng", label: "Engine Repair & Diagnostics", time: "60 min+" },
        { id: "tx", label: "Transmission Service", time: "60 – 90 min" },
        { id: "battery", label: "Batteries", time: "20 min" },
        { id: "tune", label: "Tune Up", time: "2 – 3 h" },
      ],
    },
    {
      cat: "Cooling & AC",
      items: [
        { id: "ac", label: "Air Conditioning Repair", time: "1 – 2 h" },
        { id: "cooling", label: "Cooling System Repair", time: "Quoted" },
      ],
    },
    {
      cat: "Tires & Wheels",
      items: [
        { id: "tires", label: "Tires", time: "Per vehicle" },
        { id: "tire-install", label: "Tire Installation", time: "20 min/tire" },
        { id: "tire-repair", label: "Tire Repair", time: "30 min" },
        { id: "tpms", label: "TPMS Service", time: "30 min" },
      ],
    },
    {
      cat: "Specialty Services",
      items: [
        { id: "belts", label: "Belts & Hoses", time: "1 – 2 h" },
        { id: "diesel", label: "Diesel Engine Service", time: "Quoted" },
        { id: "preventive", label: "Preventive Maintenance", time: "2 h" },
        { id: "other", label: "Something else", time: "Let us know" },
      ],
    },
  ];

  const services = serviceCategories.flatMap((c) => c.items);

  const times = ["8:00", "9:30", "11:00", "13:00", "14:30", "16:00"];

  const canNext =
    (step === 1 && data.service) ||
    (step === 2 && data.vehicle.year && data.vehicle.make) ||
    (step === 3 && data.date && data.time) ||
    (step === 4 && data.name && data.phone);

  const emptyData = {
    service: "",
    vehicle: { year: "", make: "", model: "" },
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    note: "",
  };

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    const serviceName =
      services.find((s) => s.id === data.service)?.label || data.service;
    const vehicle = [data.vehicle.year, data.vehicle.make, data.vehicle.model]
      .filter(Boolean)
      .join(" ");
    try {
      const res = await fetch("https://formspree.io/f/mgoqvzgw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
        emailjs
          .send("service_kf9g69c", "template_8y4b74q", {
            name: data.name,
            email: data.email,
            vehicle,
            service: serviceName,
            preferred_date: data.date,
            preferred_time: data.time,
            notes: data.note,
          })
          .catch((err) => console.error("EmailJS auto-reply failed:", err));
      } else {
        setSubmitError(
          `Something went wrong. Please call us at ${SITE.phone} or try again.`,
        );
      }
    } catch (_) {
      setSubmitError(
        `Something went wrong. Please call us at ${SITE.phone} or try again.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">Book Appointment</span>
            <h2>
              Request your
              <br />
              <em>service slot.</em>
            </h2>
          </div>
          <div className="sec-head__right">
            Roughly 2 minutes. {SITE.bookingNote}
          </div>
        </div>

        <div
          id="book"
          className={`reveal booking-form${step === 5 ? " booking-form--done" : ""}`}
        >
          {/* Stepper */}
          <div
            className="booking-stepper"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {["Service", "Vehicle", "When", "You"].map((s, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <div
                  key={s}
                  style={{
                    padding: "18px 24px",
                    borderRight: i < 3 ? "1px solid var(--line)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: active ? "var(--bg)" : "transparent",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: done
                        ? "var(--orange)"
                        : active
                          ? "transparent"
                          : "transparent",
                      border:
                        "1.5px solid " +
                        (done || active ? "var(--orange)" : "var(--line)"),
                      color: done
                        ? "#0A1428"
                        : active
                          ? "var(--orange)"
                          : "var(--text-mute)",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--f-mono)",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {done ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    ) : n}
                  </div>
                  <div>
                    <div
                      className="step-sublabel"
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--text-mute)",
                      }}
                    >
                      Step 0{n}
                    </div>
                    <div
                      className="step-label"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: active ? "var(--text)" : "var(--text-dim)",
                      }}
                    >
                      {s}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            ref={bookingBodyRef}
            className="booking-body"
          >
            {step === 1 && (
              <div>
                <h3
                  style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 26,
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                  }}
                >
                  What do you need?
                </h3>
                <p style={{ color: "var(--text-dim)", margin: "0 0 28px" }}>
                  Pick the closest match. We'll dial it in when we call.
                </p>
                {serviceCategories.map((cat) => (
                  <div key={cat.cat} style={{ marginBottom: 28 }}>
                    <div style={{
                      fontFamily: "var(--f-mono)", fontSize: 11,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "var(--forest)", marginBottom: 12,
                    }}>{cat.cat}</div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                    }} className="svc-pick">
                      {cat.items.map((s) => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => setData({ ...data, service: s.id })}
                          style={{
                            padding: "20px 18px",
                            background:
                              data.service === s.id ? "var(--copper)" : "var(--bg)",
                            color:
                              data.service === s.id ? "#fff" : "var(--text)",
                            border:
                              "1px solid " +
                              (data.service === s.id
                                ? "var(--copper)"
                                : "var(--line)"),
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            transition: "all .15s ease",
                          }}
                        >
                          <div style={{
                            fontFamily: "var(--f-display)",
                            fontSize: 16, fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.01em",
                          }}>{s.label}</div>
                          <div style={{
                            fontFamily: "var(--f-mono)", fontSize: 10,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                            opacity: 0.8,
                          }}>{s.time}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <style>{`
                  @media (max-width: 880px) { .svc-pick { grid-template-columns: repeat(2, 1fr) !important; } }
                `}</style>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3
                  style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 26,
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                  }}
                >
                  About your vehicle
                </h3>
                <p style={{ color: "var(--text-dim)", margin: "0 0 28px" }}>
                  Helps us pull the right parts in advance.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 1fr 1fr",
                    gap: 20,
                  }}
                  className="veh-grid"
                >
                  <Field2
                    label="Year *"
                    value={data.vehicle.year}
                    onChange={(v) =>
                      setData({
                        ...data,
                        vehicle: { ...data.vehicle, year: v },
                      })
                    }
                    placeholder="2019"
                  />
                  <Field2
                    label="Make *"
                    value={data.vehicle.make}
                    onChange={(v) =>
                      setData({
                        ...data,
                        vehicle: { ...data.vehicle, make: v },
                      })
                    }
                    placeholder="Ford"
                  />
                  <Field2
                    label="Model"
                    value={data.vehicle.model}
                    onChange={(v) =>
                      setData({
                        ...data,
                        vehicle: { ...data.vehicle, model: v },
                      })
                    }
                    placeholder="F-150"
                  />
                </div>
                <div style={{ height: 24 }} />
                <Field2
                  label="Anything we should know?"
                  value={data.note}
                  onChange={(v) => setData({ ...data, note: v })}
                  placeholder="Sounds like the bearing on the front-left. Light comes on cold mornings."
                  multiline
                />
                <style>{`
                  @media (max-width: 720px) { .veh-grid { grid-template-columns: 1fr 1fr !important; } }
                `}</style>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3
                  style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 26,
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                  }}
                >
                  When works?
                </h3>
                <p style={{ color: "var(--text-dim)", margin: "0 0 28px" }}>
                  Pick any open slot. We'll confirm by phone — easy to change.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 32,
                  }}
                  className="when-grid"
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-mute)",
                        marginBottom: 12,
                      }}
                    >
                      Date *
                    </div>
                    <input
                      type="date"
                      value={data.date}
                      onChange={(e) =>
                        setData({ ...data, date: e.target.value })
                      }
                      style={{
                        width: "100%",
                        background: "var(--bg)",
                        border: "1px solid var(--line)",
                        padding: "14px 16px",
                        color: "var(--text)",
                        fontSize: 16,
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-mute)",
                        marginBottom: 12,
                      }}
                    >
                      Time slot *
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 8,
                      }}
                    >
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => setData({ ...data, time: t })}
                          style={{
                            padding: "12px 0",
                            background:
                              data.time === t ? "var(--orange)" : "var(--bg)",
                            color: data.time === t ? "#0A1428" : "var(--text)",
                            border:
                              "1px solid " +
                              (data.time === t
                                ? "var(--orange)"
                                : "var(--line)"),
                            fontFamily: "var(--f-mono)",
                            fontSize: 13,
                            letterSpacing: "0.04em",
                            fontWeight: 600,
                          }}
                        >
                          {t}
                        </button>
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
                <h3
                  style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 26,
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                  }}
                >
                  How to reach you
                </h3>
                <p style={{ color: "var(--text-dim)", margin: "0 0 28px" }}>
                  One call, one confirmation — that's it.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                  }}
                  className="you-grid"
                >
                  <Field2
                    label="Full name *"
                    value={data.name}
                    onChange={(v) => setData({ ...data, name: v })}
                    placeholder="Marc Doucet"
                  />
                  <Field2
                    label="Phone *"
                    value={data.phone}
                    onChange={(v) => setData({ ...data, phone: v })}
                    placeholder={SITE.phone}
                  />
                </div>
                <div style={{ height: 20 }} />
                <Field2
                  label="Email"
                  value={data.email}
                  onChange={(v) => setData({ ...data, email: v })}
                  placeholder="marc@example.ca"
                />
                <style>{`
                  @media (max-width: 720px) { .you-grid { grid-template-columns: 1fr !important; } }
                `}</style>
              </div>
            )}

            {step === 5 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 0",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "var(--orange)",
                    color: "#0A1428",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--f-display)",
                    fontSize: 38,
                    margin: "0 0 12px",
                    textTransform: "uppercase",
                  }}
                >
                  Request received
                </h3>
                <p
                  style={{
                    color: "var(--text-dim)",
                    maxWidth: 480,
                    margin: "0 0 28px",
                    fontSize: 17,
                    lineHeight: 1.6,
                  }}
                >
                  Your appointment request has been received. We'll confirm by
                  phone within the hour during business hours.
                </p>
                <a href="index.html" className="btn btn--ghost"
                  onClick={(e) => onPageLinkClick(e, "index.html")}>
                  Back to home
                </a>
              </div>
            )}
          </div>

          {step < 5 && (
            <div className="booking-actions">
              {submitError && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: "14px 18px",
                    background: "rgba(220,38,38,0.08)",
                    border: "1px solid rgba(220,38,38,0.35)",
                    color: "#f87171",
                    fontSize: 14,
                    lineHeight: 1.55,
                  }}
                >
                  {submitError}
                </div>
              )}
              <div
                className="booking-actions"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => changeStep(step - 1)}
                    disabled={submitting}
                    className="btn btn--ghost"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={() =>
                    step === 4 ? handleSubmit() : changeStep(step + 1)
                  }
                  disabled={!canNext || submitting}
                  className="btn btn--primary"
                  style={{
                    opacity: canNext && !submitting ? 1 : 0.4,
                    pointerEvents: canNext && !submitting ? "auto" : "none",
                  }}
                >
                  {step === 4
                    ? submitting
                      ? "Sending…"
                      : "Send request"
                    : "Continue"}{" "}
                  {!submitting && <Icon.arrow width="16" height="16" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .booking-stepper { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
          .booking-stepper > div {
            padding: 10px 4px !important;
            gap: 0 !important;
            justify-content: center !important;
            min-width: 0;
          }
          .step-sublabel,
          .step-label { display: none; }
        }
        @media (max-width: 480px) {
          .booking-actions {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .booking-actions .btn { width: 100%; }
        }
      `}</style>
    </section>
  );
}

function Field2({ label, value, onChange, placeholder, multiline }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <label style={{ display: "block" }}>
      <div
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-mute)",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
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
        }}
      />
    </label>
  );
}

function MapBlock() {
  return (
    <section
      className="section"
      id="map"
      style={{ background: "var(--bg-elev)" }}
    >
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">Find the shop</span>
            <h2>
              {SITE.address.street}
              <br />
              <em>{SITE.address.city}, {SITE.address.province}.</em>
            </h2>
          </div>
          <div className="sec-head__right">
            Conveniently located on Main Street in Bath. Easy parking and
            a welcoming waiting area.
          </div>
        </div>

        <div
          className="reveal map-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            background: "var(--line)",
            gap: 1,
            border: "1px solid var(--line)",
          }}
        >
          <div style={{ minHeight: 480, background: "var(--bg-card)" }}>
            <iframe
              title="Mountain View Auto location"
              src={SITE.mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 480, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div
            style={{
              background: "var(--bg)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--text-mute)", marginBottom: 8,
              }}>Address</div>
              <div style={{ fontWeight: 600, fontSize: 17 }}>{SITE.address.street}</div>
              <div style={{ color: "var(--text-dim)" }}>
                {SITE.address.city}, {SITE.address.province} · {SITE.address.postal}
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--text-mute)", marginBottom: 12,
              }}>Hours</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody>
                  {[
                    ["Mon – Fri", "8:00 AM – 5:30 PM"],
                    ["Saturday", "Closed"],
                    ["Sunday", "Closed"],
                  ].map(([d, h], i) => (
                    <tr key={i} style={{ borderTop: i ? "1px solid var(--line)" : "none" }}>
                      <td style={{ padding: "10px 0", color: "var(--text-dim)" }}>{d}</td>
                      <td style={{ padding: "10px 0", textAlign: "right", fontWeight: 600 }}>{h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
              <a
                className="btn btn--primary btn--block"
                href="#book"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor("#book");
                }}
              >
                Book online <Icon.arrow width="16" height="16" />
              </a>
              <div style={{ height: 10 }} />
              <a className="btn btn--ghost btn--block" href={`tel:${SITE.phoneTel}`}>
                Call {SITE.phone}
              </a>
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
    {
      q: "Do I need an appointment?",
      a: "We recommend booking ahead to guarantee a slot. Walk-ins are welcome for quick checks and we'll do our best to fit you in during business hours.",
    },
    {
      q: "What are your hours?",
      a: `${SITE.hours.weekdays}. ${SITE.hours.weekend}.`,
    },
    {
      q: "Do you provide free quotes?",
      a: "Yes — we provide written quotes before any work begins. Starting prices are listed on our Services page; your final quote depends on vehicle make and model.",
    },
    {
      q: "What tire brands do you carry?",
      a: "We carry a range of quality tire brands for passenger vehicles, trucks and SUVs. Call us or visit the shop for current availability and pricing.",
    },
    {
      q: "Do you speak French?",
      a: "Oui. Toute notre équipe est bilingue. Aucun problème, on s'occupe de vous en français ou en anglais.",
    },
  ];
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="sec-head reveal" style={{ marginBottom: 40 }}>
          <div className="sec-head__left">
            <span className="eyebrow">FAQ</span>
            <h2>
              Common
              <br />
              <em>questions.</em>
            </h2>
          </div>
        </div>

        <div className="reveal" style={{ borderTop: "1px solid var(--line)" }}>
          {items.map((it, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: "100%",
                  minWidth: 0,
                  padding: "26px 0",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  color: "var(--text)",
                }}
              >
                <span
                  className="faq-q"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    paddingRight: 16,
                    fontFamily: "var(--f-display)",
                    fontSize: 22,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.01em",
                  }}
                >
                  {it.q}
                </span>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid var(--line)",
                    display: "grid",
                    placeItems: "center",
                    transition: "transform .25s ease, background .25s ease",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                    background: open === i ? "var(--copper)" : "transparent",
                    color: open === i ? "#fff" : "var(--text)",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? 200 : 0,
                  opacity: open === i ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "max-height .35s ease, opacity .35s ease, padding .35s ease",
                  paddingBottom: open === i ? 28 : 0,
                  color: "var(--text-dim)",
                  fontSize: 16,
                  lineHeight: 1.65,
                  maxWidth: 700,
                }}
              >
                {it.a}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 640px) {
            .faq-q { font-size: clamp(18px, 5vw, 22px) !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function ContactPage() {
  usePageMotion();
  return (
    <React.Fragment>
      <Navbar active="contact" />
      <main>
        <ContactHero />
        <ContactBands />
        <BookingFlow />
        <MapBlock />
        <FAQ />
      </main>
      <Footer />
      <FabChat />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ContactPage />);
