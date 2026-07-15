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
        display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "stretch",
      }}>
        <div className="abh-copy">
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
        <div className="hero-extra abh-photo">
          <img
            src="img/mountain-view-auto-site.webp"
            alt="Mountain View Auto Ltd. storefront on Main Street, Bath, New Brunswick"
          />
        </div>
      </div>
      <style>{`
        .abh-photo {
          display: flex;
          min-height: 100%;
          border: 1px solid var(--line);
          overflow: hidden;
          background: var(--bg-elev);
        }
        .abh-photo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center top;
          display: block;
        }
        @media (max-width: 880px) {
          .abh-grid { grid-template-columns: 1fr !important; }
          .abh-photo { aspect-ratio: 2 / 3; max-height: none; }
        }
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
    {
      name: "Hank Arseneau",
      role: "Owner · Red Seal Technician",
      years: 22,
      img: "img/hank-arseneau.jpg",
      pos: "center 25%",
      bio: "Bathurst born, NBCC-trained. Specializes in diagnostics and drivetrain. Drives a 2010 Tacoma — still.",
    },
    {
      name: "Jamie Archer",
      role: "Licensed Automotive Mechanic",
      years: "20+",
      img: "img/jamie-archer.jpg",
      pos: "center 20%",
      bio: "A licensed automotive mechanic spanning over two decades. His past work with Hank guarantees a strong partnership in the bay.",
    },
    {
      name: "Élise Chiasson",
      role: "Service Manager · ASE Master",
      years: 14,
      img: "img/elise-chiasson.jpg",
      pos: "center",
      bio: "Runs the front of house and the back of the shop. The reason your quote is in writing.",
    },
    {
      name: "Marc Doucet",
      role: "Red Seal · Tires & Brakes",
      years: 9,
      img: "img/marc-doucet.jpg",
      pos: "70% center",
      bio: "Fastest seasonal swap in the peninsula. Will absolutely tell you when your pads are still fine.",
    },
    {
      name: "Elizabeth McSheffery",
      role: "Customer Service & Sales",
      img: "img/elizabeth-mcSheffery.jpg",
      pos: "center 15%",
      bio: "Your first call, your quote, and the follow-up — Elizabeth keeps customer service and sales running smoothly at the front of the shop.",
    },
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
            No revolving door of technicians. Same trusted faces, every visit.
          </div>
        </div>

        <div className="team-grid">
          {crew.map((p, i) => (
            <article key={p.name} className="team-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div
                className="team-card__photo"
                style={{
                  backgroundImage: `url('${p.img}')`,
                  backgroundPosition: p.pos || "center",
                }}
              >
                {p.years != null && (
                  <span className="team-card__badge">{p.years} yrs in</span>
                )}
              </div>
              <div className="team-card__body">
                <div className="team-card__role">{p.role}</div>
                <h3 className="team-card__name">{p.name}</h3>
                <p className="team-card__bio">{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
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
          background: "url('img/garage.jpg') center/cover",
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
