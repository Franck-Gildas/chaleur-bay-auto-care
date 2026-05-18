/* global React, Navbar, Footer, FabChat, Icon, useReveal */

function AboutHero() {
  return (
    <section style={{
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
          <span className="eyebrow">About</span>
          <h1 className="display" style={{
            fontSize: "clamp(48px, 7vw, 112px)",
            margin: "16px 0 24px",
          }}>
            A small shop<br/>with <span style={{color: "var(--orange)"}}>big standards.</span>
          </h1>
          <p style={{
            maxWidth: 560,
            fontSize: 18,
            color: "var(--text-dim)",
            lineHeight: 1.55, margin: 0,
          }}>
            Three Red Seal techs. One Acadian-Peninsula garage. A flat rate for diagnostics,
            a 2-year warranty on repairs, and a phone call before we spend a dollar of yours.
            That's the whole pitch — and we've kept it since 2012.
          </p>
        </div>
        <div style={{
          aspectRatio: "4/5",
          background: "url('img/oil-change.jpg') center/cover",
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
            <h2>Built on the bay,<br/><em>tested by winter.</em></h2>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1,
          background: "var(--line)", border: "1px solid var(--line)",
        }} className="story-grid">
          {[
            { year: "2012", title: "One bay, one truck", body: "Joël Arseneau finished his Red Seal and opened a single-bay garage off King Avenue. Word of mouth did the marketing." },
            { year: "2017", title: "Three bays, fleet contracts", body: "Two more certified techs joined. Peninsula Coach and Acadie Plumbing signed on for fleet maintenance." },
            { year: "2024", title: "Mobile + winter program", body: "Launched in-driveway service for Greater Bathurst and a free fall winter-prep clinic for seniors." },
          ].map((m, i) => (
            <div key={i} className="reveal" style={{
              background: "var(--bg)", padding: 40,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div className="display" style={{
                fontSize: 88, color: "var(--orange)", lineHeight: 0.8,
              }}>{m.year}</div>
              <h3 style={{
                fontFamily: "var(--f-display)", fontSize: 26,
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
    { kicker: "Documented", title: "Photo of every finding", body: "You'll see what we see. Real pictures of real wear." },
    { kicker: "Warrantied", title: "2 years, parts & labour", body: "Anything we touch is covered, full stop. No fine print." },
    { kicker: "Local", title: "Family-run, year-round", body: "Same family. Same garage. Same bay. Since 2012." },
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
            We made these promises to ourselves before we made them to customers.
            They're how we sleep at night.
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
                background: "var(--orange)", color: "#0A1428",
                display: "grid", placeItems: "center",
                fontFamily: "var(--f-display)", fontSize: 22,
              }}>0{i+1}</div>
              <div style={{
                fontFamily: "var(--f-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--orange)",
              }}>{v.kicker}</div>
              <h3 style={{
                fontFamily: "var(--f-display)", fontSize: 22,
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
    { name: "Joël Arseneau", role: "Owner · Red Seal Technician", years: 22, img: "img/joel-arseneau.jpg", pos: "center 25%",
      bio: "Bathurst born, NBCC-trained. Specializes in diagnostics and drivetrain. Drives a 2010 Tacoma — still." },
    { name: "Élise Chiasson", role: "Service Manager · ASE Master", years: 14, img: "img/customer.jpg", pos: "center",
      bio: "Runs the front of house and the back of the shop. The reason your quote is in writing." },
    { name: "Marc Doucet", role: "Red Seal · Tires & Brakes", years: 9, img: "img/marc-doucet.jpg", pos: "70% center",
      bio: "Fastest seasonal swap in the peninsula. Will absolutely tell you when your pads are still fine." },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-head__left">
            <span className="eyebrow">03 / The crew</span>
            <h2>The people who'll<br/><em>be working on it.</em></h2>
          </div>
          <div className="sec-head__right">
            No revolving door of technicians. Same three faces, every visit.
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
        }} className="team-grid">
          {crew.map((p, i) => (
            <div key={i} className="reveal" style={{
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                aspectRatio: "4/5",
                background: `url('${p.img}') ${p.pos || "center"}/cover, #111`,
                position: "relative",
                border: "1px solid var(--line)",
              }}>
                <div style={{
                  position: "absolute", bottom: 16, left: 16,
                  background: "var(--orange)", color: "#0A1428",
                  padding: "6px 12px",
                  fontFamily: "var(--f-mono)", fontSize: 11,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  fontWeight: 700,
                }}>{p.years} yrs in</div>
              </div>
              <div style={{padding: "20px 0"}}>
                <div style={{
                  fontFamily: "var(--f-mono)", fontSize: 11,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--orange)", marginBottom: 8,
                }}>{p.role}</div>
                <h3 style={{
                  fontFamily: "var(--f-display)", fontSize: 28,
                  textTransform: "uppercase", letterSpacing: "0.01em",
                  margin: "0 0 12px",
                }}>{p.name}</h3>
                <p style={{color: "var(--text-dim)", fontSize: 14, lineHeight: 1.65, margin: 0}}>{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 880px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 540px) { .team-grid { grid-template-columns: 1fr !important; } }
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
            ["13", "Years on King Ave"],
            ["12 400+", "Repairs completed"],
            ["4.9★", "Average review · 180+"],
            ["0", "Surprise invoices"],
          ].map(([n, l], i) => (
            <div key={i} className="reveal" style={{
              padding: "32px 0", borderTop: "1px solid var(--line)",
            }}>
              <div className="display" style={{fontSize: 88, lineHeight: 0.85, marginBottom: 12}}>{n}</div>
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
          background: "url('img/garage.jpg') center/cover",
          border: "1px solid var(--line)",
        }}/>
        <div className="reveal">
          <span className="eyebrow">04 / The bay</span>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            margin: "16px 0 24px",
          }}>
            We live here, too.<br/>
            <span style={{color: "var(--orange)"}}>That changes things.</span>
          </h2>
          <p style={{color: "var(--text-dim)", fontSize: 17, lineHeight: 1.65, marginBottom: 24}}>
            Our kids go to school here. Our suppliers are our neighbours. When
            you sit in our waiting room, the person at the desk knows your name,
            and probably your truck's. We sponsor the K-3 hockey league, host
            the free fall winter-prep clinic for seniors, and donate one
            full-service oil change every month to a family in need.
          </p>
          <p style={{color: "var(--text-dim)", fontSize: 17, lineHeight: 1.65, margin: 0}}>
            Local pride isn't a slogan for us. It's why the shop exists.
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
  useReveal();
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
