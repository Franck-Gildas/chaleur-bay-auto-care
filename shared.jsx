/* global React */
const { useState, useEffect, useRef } = React;

/* ============ Shared icons ============ */
const Icon = {
  phone: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>
    </svg>
  ),
  sun: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  moon: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
    </svg>
  ),
  arrow: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  ),
  chat: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/>
    </svg>
  ),
  send: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/>
    </svg>
  ),
  close: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  pin: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  clock: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
};

/* ============ Theme ============ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("cb-theme", theme); } catch (e) {}
}
function getInitialTheme() {
  try {
    const t = localStorage.getItem("cb-theme");
    if (t) return t;
  } catch (e) {}
  return "dark";
}

/* ============ Navbar ============ */
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme());
  const [open, setOpen] = useState(false);

  useEffect(() => { applyTheme(theme); }, [theme]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { id: "home",     label: "Home",     href: "index.html" },
    { id: "services", label: "Services", href: "services.html" },
    { id: "why-us",   label: "Why Us",   href: "why-us.html" },
    { id: "about",    label: "About",    href: "about.html" },
    { id: "contact",  label: "Contact",  href: "contact.html" },
  ];

  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__inner">
        <a className="nav__brand" href="index.html" aria-label="Chaleur Bay Auto Care home">
          <div className="brandmark"><span>CB</span></div>
          <div className="brand-name">
            <b>Chaleur Bay</b>
            <small>Auto Care · NB</small>
          </div>
        </a>
        <nav className="nav__menu">
          {items.map(it => (
            <a key={it.id} href={it.href} className={active === it.id ? "is-active" : ""}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <a className="nav__phone" href="tel:+15065551234">
            <Icon.phone />
            <span className="num num-tab">(506) 555 - 1234</span>
          </a>
          <button
            className="theme-toggle"
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Icon.sun width="16" height="16"/> : <Icon.moon width="16" height="16"/>}
          </button>
          <a className="btn btn--primary nav__cta" href="contact.html#book">Book Now</a>
          <button className="nav__burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>
            <span></span>
          </button>
        </div>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "var(--bg-elev)", borderTop: "1px solid var(--line)",
          padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16,
        }}>
          {items.map(it => (
            <a key={it.id} href={it.href} onClick={() => setOpen(false)} style={{
              color: active === it.id ? "var(--orange)" : "var(--text)",
              fontWeight: 500, padding: "8px 0",
            }}>{it.label}</a>
          ))}
          <a className="btn btn--primary" href="contact.html#book" onClick={() => setOpen(false)}>Book Service</a>
        </div>
      )}
    </header>
  );
}

/* ============ Footer ============ */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="nav__brand" style={{gap: 14}}>
              <div className="brandmark"><span>CB</span></div>
              <div className="brand-name">
                <b>Chaleur Bay</b>
                <small>Auto Care · NB</small>
              </div>
            </div>
            <p>Honest, certified auto repair on the shores of Chaleur Bay. Locally owned and winter-tested since 2012.</p>
            <span className="bathurst-badge">Proudly Bathurst · Acadian Peninsula</span>
          </div>

          <div className="footer__col">
            <h5>Visit</h5>
            <ul>
              <li>418 King Avenue</li>
              <li>Bathurst, NB E2A 1S2</li>
              <li>Mon–Fri · 7:30 – 17:30</li>
              <li>Sat · 8:00 – 14:00</li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Services</h5>
            <ul>
              <li><a href="services.html">Oil Changes</a></li>
              <li><a href="services.html">Brakes & Tires</a></li>
              <li><a href="services.html">Diagnostics</a></li>
              <li><a href="services.html">Mobile Repair</a></li>
              <li><a href="services.html">Winter Prep</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:+15065551234">(506) 555 - 1234</a></li>
              <li><a href="mailto:hello@chaleurbayauto.ca">hello@chaleurbayauto.ca</a></li>
              <li><a href="contact.html#book">Book Online →</a></li>
              <li><a href="#" aria-label="Facebook">Facebook</a></li>
              <li><a href="#" aria-label="Instagram">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div>© 2026 Chaleur Bay Auto Care · All rights reserved.</div>
          <div style={{display: "flex", gap: 20}}>
            <a href="#">Privacy</a>
            <a href="#">Warranty</a>
            <a href="#">Careers</a>
            <a href="admin.html" style={{color: "var(--text-mute)"}}>Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============ Floating Chat ============ */
function FabChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "bot", text: "Hi! I’m Cap, the Chaleur Bay service assistant. What can I help with today — booking, a quote, or a quick question?" }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [msgs, thinking, open]);

  async function send() {
    const text = input.trim();
    if (!text || thinking) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text }]);
    setThinking(true);
    try {
      const system = "You are Cap, the friendly virtual service writer for Chaleur Bay Auto Care, a small auto repair shop in Bathurst, New Brunswick. Be warm, honest and direct. Mention winter readiness, Red-Seal certified techs, 2-year warranty, fleet service, and that we serve the Acadian Peninsula. Keep answers under 60 words. Suggest booking by phone (506) 555-1234 or the online form when appropriate.";
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: system + "\n\nCustomer question: " + text }
        ]
      });
      setMsgs(m => [...m, { role: "bot", text: reply }]);
    } catch (err) {
      setMsgs(m => [...m, { role: "bot", text: "I’m offline for a moment — give the shop a call at (506) 555-1234 and we’ll sort it out." }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <React.Fragment>
      {!open && (
        <button className="fab-chat" onClick={() => setOpen(true)} aria-label="Open chat assistant">
          <div className="fab-chat__dot">
            <Icon.chat width="18" height="18"/>
          </div>
          <span className="lbl">Ask Cap · AI helper</span>
        </button>
      )}
      {open && (
        <div style={{
          position: "fixed", right: 28, bottom: 28, zIndex: 70,
          width: "min(380px, calc(100vw - 40px))",
          height: "min(560px, calc(100vh - 60px))",
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 16,
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "16px 18px",
            borderBottom: "1px solid var(--line)",
            background: "linear-gradient(180deg, rgba(255,98,0,0.12), transparent)",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "var(--orange)", color: "#0A1428",
              display: "grid", placeItems: "center",
              fontFamily: "var(--f-display)", fontSize: 18,
            }}>C</div>
            <div style={{flex: 1, lineHeight: 1.2}}>
              <div style={{fontWeight: 700, fontSize: 14}}>Cap · Service Assistant</div>
              <div style={{fontSize: 11, color: "var(--text-mute)", fontFamily: "var(--f-mono)", letterSpacing: ".12em", textTransform: "uppercase"}}>
                <span style={{display: "inline-block", width: 6, height: 6, background: "#22C55E", borderRadius: "50%", marginRight: 6, verticalAlign: 1}}></span>
                Online · Replies instantly
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{
              width: 32, height: 32, borderRadius: 8,
              display: "grid", placeItems: "center",
              color: "var(--text-dim)",
            }}>
              <Icon.close width="16" height="16"/>
            </button>
          </div>

          <div ref={scrollerRef} style={{
            flex: 1, overflowY: "auto", padding: "20px 18px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                background: m.role === "user" ? "var(--orange)" : "var(--bg-card)",
                color: m.role === "user" ? "#0A1428" : "var(--text)",
                padding: "10px 14px",
                borderRadius: 12,
                borderTopLeftRadius: m.role === "user" ? 12 : 4,
                borderTopRightRadius: m.role === "user" ? 4 : 12,
                fontSize: 14, lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}>{m.text}</div>
            ))}
            {thinking && (
              <div style={{alignSelf: "flex-start", padding: "10px 14px", color: "var(--text-mute)", fontSize: 13}}>
                <span className="dots">Cap is typing</span>
                <span style={{
                  display: "inline-block", marginLeft: 6,
                  animation: "blink 1.2s infinite",
                }}>•••</span>
              </div>
            )}
          </div>

          <div style={{
            padding: 12, borderTop: "1px solid var(--line)",
            display: "flex", gap: 8,
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about a service or a quote…"
              style={{
                flex: 1, background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "var(--text)",
                fontSize: 14,
                fontFamily: "inherit",
              }}
            />
            <button onClick={send} aria-label="Send" style={{
              width: 44, height: 44, borderRadius: 10,
              background: "var(--orange)", color: "#0A1428",
              display: "grid", placeItems: "center",
            }}>
              <Icon.send width="18" height="18"/>
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes blink { 0%, 100% { opacity: 0.3 } 50% { opacity: 1 } }`}</style>
    </React.Fragment>
  );
}

/* ============ Reveal-on-scroll helper ============ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(e => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

Object.assign(window, { Navbar, Footer, FabChat, Icon, useReveal });
