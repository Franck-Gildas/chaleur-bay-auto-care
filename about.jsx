/* global React, Navbar, Footer, FabChat, Icon, usePageMotion, SITE */

function AboutHero() {
  return (
    <section className="page-hero" style={{
      paddingTop: "calc(var(--nav-h) + 80px)",
      paddingBottom: 80,
      position: "relative",
      overflow: "hidden",
      background: "var(--bg)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div className="wrap abh-grid" style={{
        display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "end",
      }}>
        <div>
          <span className="eyebrow hero-eyebrow">About</span>
          <h1 className="display hero-title" style={{
            fontSize: "clamp(48px, 7vw, 112px)",
            margin: "16px 0 24px",
          }}>
            Your neighbours<br/>on <span style={{color: "var(--copper)"}}>Main Street.</span>
          </h1>
          <p className="hero-lead" style={{
            maxWidth: 560,
            fontSize: 18,
            color: "var(--text-dim)",
            lineHeight: 1.55, margin: 0,
          }}>
            Mountain View Auto Ltd. is a family-owned garage in Bath, New Brunswick.
            Honest quotes, quality parts, and service you can trust — that's what
            we stand for every day.
          </p>
        </div>
        <div className="hero-extra" style={{
          aspectRatio: "4/5",
          background: "url('img/hero-bg.jpg') center/cover",
          border: "1px solid var(--line)",
          maxHeight: 480,
        }}/>
      </div>
      <style>{`
        @media (max-width: 880px) { .abh-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function Story() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">01 / Our story</span>
            <h2>Rooted in Bath,<br/><em>built on trust.</em></h2>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1,
          background: "var(--line)", border: "1px solid var(--line)",
        }} className="story-grid">
          {[
            { year: "Day 1", title: "Main Street beginnings", body: "Mountain View Auto opened its doors on Main Street in Bath with a simple goal: honest auto repair for the community we call home." },
            { year: "Growth", title: "Tires & full service", body: "Expanded into comprehensive tire service alongside general maintenance and repair — becoming a one-stop shop for local drivers." },
            { year: "Today", title: "A Bath fixture", body: "Trusted by neighbours across Bath and the Fredericton region. Same family, same commitment to quality work and fair pricing." },
          ].map((m, i) => (
            <div key={i} className="reveal" style={{
              background: "var(--bg)", padding: 40,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div className="display" style={{
                fontSize: 56, color: "var(--copper)", lineHeight: 0.8,
              }}>{m.year}</div>
              <h3 style={{
                fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.01em", margin: 0,
              }}>{m.title}</h3>
              <p style={{color: "var(--text-dim)", margin: 0, lineHeight: 1.65, fontSize: 14}}>{m.body}</p>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 820px) { .story-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    { kicker: "Honest", title: "Quote first, fix second", body: "If the price changes, we call — before the wrench turns." },
    { kicker: "Quality", title: "Parts you can trust", body: "We use quality parts and stand behind the work we do on every vehicle." },
    { kicker: "Local", title: "Family-run, year-round", body: "Same family. Same garage. Same commitment to our neighbours." },
    { kicker: "Fair", title: "Transparent pricing", body: "Starting prices listed upfront. Your final quote is in writing before we begin." },
  ];
  return (
    <section className="section" style={{background: "var(--bg-elev)"}}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">02 / How we work</span>
            <h2>Four rules<br/><em>we don't break.</em></h2>
          </div>
          <div className="sec-head__right">
            These are the promises we made to ourselves before we made them to customers.
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        }} className="val-grid">
          {values.map((v, i) => (
            <div key={i} className="reveal" style={{
              background: "var(--bg)", border: "1px solid var(--line)",
              padding: 32, display: "flex", flexDirection: "column", gap: 16,
              minHeight: 240,
            }}>
              <div style={{
                width: 44, height: 44,
                background: "var(--copper)", color: "#fff",
                display: "grid", placeItems: "center",
                fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 800,
              }}>0{i+1}</div>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--copper)",
              }}>{v.kicker}</div>
              <h3 style={{
                fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.01em", margin: 0,
              }}>{v.title}</h3>
              <p style={{color: "var(--text-dim)", fontSize: 14, lineHeight: 1.6, margin: 0}}>{v.body}</p>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 980px) { .val-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 540px) { .val-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function Team() {
  const crew = [
    { name: "Lead Technician", role: "Diagnostics & Engine Repair", bio: "Experienced in engine diagnostics, drivetrain repair, and getting to the root of complex problems." },
    { name: "Tire Specialist", role: "Tires & Wheels", bio: "Expert in tire sales, installation, rotation, balancing, and TPMS service for all makes and models." },
    { name: "Service Advisor", role: "Front Desk & Scheduling", bio: "Your first point of contact — clear quotes, honest timelines, and answers to every question." },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">03 / Our team</span>
            <h2>Skilled people,<br/><em>personal service.</em></h2>
          </div>
          <div className="sec-head__right">
            A small, dedicated team that treats every vehicle like our own.
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
        }} className="team-grid">
          {crew.map((p, i) => (
            <div key={i} className="reveal" style={{
              background: "var(--bg)", border: "1px solid var(--line)",
              padding: 32, display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "var(--forest-soft)", border: "2px solid var(--forest)",
                display: "grid", placeItems: "center",
                fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 800,
                color: "var(--forest)",
              }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "var(--copper)",
              }}>{p.role}</div>
              <h3 style={{
                fontFamily: "var(--f-display)", fontSize: 24, fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.01em", margin: 0,
              }}>{p.name}</h3>
              <p style={{color: "var(--text-dim)", fontSize: 14, lineHeight: 1.65, margin: 0}}>{p.bio}</p>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 880px) { .team-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="section" style={{background: "var(--bg-elev)"}}>
      <div className="wrap">
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        }} className="num-grid">
          {[
            ["4.58★", "Google rating"],
            ["27", "Services offered"],
            ["Mon–Fri", "8 AM – 5:30 PM"],
            ["100%", "Written quotes"],
          ].map(([n, l], i) => (
            <div key={i} className="reveal" style={{
              padding: "32px 0", borderTop: "1px solid var(--line)",
            }}>
              <div className="display" style={{fontSize: "clamp(48px, 12vw, 88px)", lineHeight: 0.85, marginBottom: 12}}>{n}</div>
              <div style={{color: "var(--text-dim)", fontSize: 14}}>{l}</div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 820px) { .num-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </div>
    </section>
  );
}

function CommunityBlock() {
  return (
    <section className="section">
      <div className="wrap comm-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center",
      }}>
        <div style={{
          aspectRatio: "4/5",
          background: "url('img/hero-bg.jpg') center/cover",
          border: "1px solid var(--line)",
        }}/>
        <div className="reveal">
          <span className="eyebrow">04 / Our community</span>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            margin: "16px 0 24px",
          }}>
            Proud to serve<br/>
            <span style={{color: "var(--copper)"}}>Bath & beyond.</span>
          </h2>
          <p style={{color: "var(--text-dim)", fontSize: 17, lineHeight: 1.65, marginBottom: 24}}>
            We're part of this community — Bath, the Highway 105 corridor, and
            the wider Fredericton region. When you bring your vehicle to Mountain
            View Auto, you're supporting a local family business that gives back
            to the place we all call home.
          </p>
          <p style={{color: "var(--text-dim)", fontSize: 17, lineHeight: 1.65, margin: 0}}>
            Conveniently located at {SITE.address.full}. Stop by, call {SITE.phone},
            or book online — we're here to help.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) { .comm-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function AboutPage() {
  usePageMotion();
  return (
    <React.Fragment>
      <Navbar active="about"/>
      <main>
        <AboutHero/>
        <Story/>
        <Values/>
        <Team/>
        <Numbers/>
        <CommunityBlock/>
      </main>
      <Footer/>
      <FabChat/>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AboutPage/>);
