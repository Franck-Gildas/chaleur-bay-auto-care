/* global React, SITE */
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
  star: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
};

function BrandLogo({ size = 60 }) {
  return (
    <img
      src={SITE.logo}
      srcSet={`${SITE.logo} 1x, ${SITE.logo2x} 2x`}
      alt={SITE.name}
      className="brand-logo"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
    />
  );
}

/* ============ Theme ============ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem(SITE.themeKey, theme); } catch (e) {}
}
function getInitialTheme() {
  try {
    const t = localStorage.getItem(SITE.themeKey);
    if (t) return t;
  } catch (e) {}
  return "dark";
}

/* ============ Page motion & navigation ============ */
function normalizePath(pathname) {
  const p = pathname.replace(/\\/g, "/");
  const file = p.split("/").pop() || "index.html";
  if (file === "" || file === "index.html") return "index";
  return file.replace(/\.html$/, "");
}

function isSamePage(href) {
  const url = new URL(href, window.location.href);
  return normalizePath(url.pathname) === normalizePath(window.location.pathname);
}

function navigateTo(href) {
  document.documentElement.classList.remove("page-ready");

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      window.location.href = href;
    });
    return;
  }

  const main = document.querySelector("main");
  if (main) {
    main.classList.add("page-exit");
    setTimeout(() => { window.location.href = href; }, 280);
  } else {
    window.location.href = href;
  }
}

function scrollToAnchor(target, options = {}) {
  const el = typeof target === "string"
    ? document.querySelector(target.startsWith("#") ? target : `#${target}`)
    : target;
  if (!el) return false;

  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 76;
  const offset = options.offset ?? 20;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: options.behavior ?? "smooth",
  });
  return true;
}

function onPageLinkClick(e, href, onAfter) {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return;
  if (url.protocol === "tel:" || url.protocol === "mailto:") return;

  if (isSamePage(href)) {
    if (url.hash) {
      e.preventDefault();
      history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      scrollToAnchor(url.hash);
      if (onAfter) onAfter();
    }
    return;
  }

  e.preventDefault();
  if (onAfter) onAfter();
  navigateTo(href);
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

  function handleNav(e, href) {
    onPageLinkClick(e, href, () => setOpen(false));
  }

  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__inner">
        <a className="nav__brand" href="index.html" aria-label={`${SITE.name} home`}
          onClick={(e) => handleNav(e, "index.html")}>
          <BrandLogo />
          <div className="brand-name">
            <b>Mountain View</b>
            <small>Auto Ltd. · NB</small>
          </div>
        </a>
        <nav className="nav__menu">
          {items.map(it => (
            <a key={it.id} href={it.href} className={active === it.id ? "is-active" : ""}
              onClick={(e) => handleNav(e, it.href)}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <a className="nav__phone" href={`tel:${SITE.phoneTel}`}>
            <Icon.phone />
            <span className="num num-tab">{SITE.phone}</span>
          </a>
          <button
            className="theme-toggle"
            aria-label="Toggle color theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Icon.sun width="16" height="16"/> : <Icon.moon width="16" height="16"/>}
          </button>
          <a className="btn btn--primary nav__cta" href="contact.html#book"
            onClick={(e) => handleNav(e, "contact.html#book")}>Book Now</a>
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
            <a key={it.id} href={it.href} onClick={(e) => handleNav(e, it.href)} style={{
              color: active === it.id ? "var(--copper)" : "var(--text)",
              fontWeight: 500, padding: "8px 0",
            }}>{it.label}</a>
          ))}
          <a className="btn btn--primary" href="contact.html#book"
            onClick={(e) => handleNav(e, "contact.html#book")}>Book Appointment</a>
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
              <BrandLogo />
              <div className="brand-name">
                <b>Mountain View</b>
                <small>Auto Ltd. · NB</small>
              </div>
            </div>
            <p>{SITE.tagline}. Family-owned garage with honest quotes and quality work you can count on.</p>
            <span className="location-badge">Proudly Bath · New Brunswick</span>
          </div>

          <div className="footer__col">
            <h5>Visit</h5>
            <ul>
              <li>{SITE.address.street}</li>
              <li>{SITE.address.city}, {SITE.address.province} {SITE.address.postal}</li>
              <li>{SITE.hours.weekdays}</li>
              <li>{SITE.hours.weekend}</li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Services</h5>
            <ul>
              <li><a href="services.html" onClick={(e) => onPageLinkClick(e, "services.html")}>Oil Changes</a></li>
              <li><a href="services.html" onClick={(e) => onPageLinkClick(e, "services.html")}>Brakes & Suspension</a></li>
              <li><a href="services.html" onClick={(e) => onPageLinkClick(e, "services.html")}>Tires & Wheels</a></li>
              <li><a href="services.html" onClick={(e) => onPageLinkClick(e, "services.html")}>Engine & Transmission</a></li>
              <li><a href="services.html" onClick={(e) => onPageLinkClick(e, "services.html")}>Specialty Services</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Contact</h5>
            <ul>
              <li><a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href="contact.html#book" onClick={(e) => onPageLinkClick(e, "contact.html#book")}>Book Online →</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div>© 2026 {SITE.name} · All rights reserved.</div>
          <div style={{display: "flex", gap: 20}}>
            <a href="#">Privacy</a>
            <a href="#">Warranty</a>
            <a href="admin.html" style={{color: "var(--text-mute)"}}
              onClick={(e) => onPageLinkClick(e, "admin.html")}>Admin</a>
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
    { role: "bot", text: `Hi! I'm the Mountain View Auto service assistant. What can I help with today — booking, a quote, or a quick question?` }
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
    const apiMessages = [
      ...msgs.slice(1).map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: text },
    ];
    setInput("");
    setMsgs(m => [...m, { role: "user", text }]);
    setThinking(true);
    try {
      const systemPrompt = `You are the friendly AI service assistant for ${SITE.name} in Bath, New Brunswick. You help customers with booking appointments, getting quotes, and answering questions about services. Keep responses short and friendly — 2-3 sentences max. Services include: Oil changes from $69.99, Brake repair from $149.99, Tires from $119.99/tire installed, Engine repair from $129.99, Transmission from $179.99, A/C repair from $129.99, Vehicle inspection from $89.99, and many more. Hours: Mon-Fri 8:00 AM-5:30 PM, closed weekends. Phone: ${SITE.phone}. Address: ${SITE.address.full}. Email: ${SITE.email}. Google rating: ${SITE.rating.score} stars. When a customer wants to book an appointment, give them ALL THREE options: 1) Use the online booking form on this website — click Book Now at the top or go to the Contact page — it takes 2 minutes. 2) Call us directly at ${SITE.phone}. 3) Visit us at ${SITE.address.full}. Always mention the online form first. If you cannot help, direct them to call ${SITE.phone}.`;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          systemPrompt,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMsgs(m => [...m, { role: "bot", text: data.text }]);
    } catch (err) {
      setMsgs(m => [...m, { role: "bot", text: `Sorry, I am having trouble connecting. Please call us at ${SITE.phone}.` }]);
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
          <span className="lbl">Ask us · AI helper</span>
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
            background: "linear-gradient(180deg, rgba(184,115,51,0.12), transparent)",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "var(--copper)", color: "#fff",
              display: "grid", placeItems: "center",
              fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 800,
            }}>MV</div>
            <div style={{flex: 1, lineHeight: 1.2}}>
              <div style={{fontWeight: 700, fontSize: 14}}>Mountain View Assistant</div>
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
                background: m.role === "user" ? "var(--copper)" : "var(--bg-card)",
                color: m.role === "user" ? "#fff" : "var(--text)",
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
                <span className="dots">Typing</span>
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
              background: "var(--copper)", color: "#fff",
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
function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-in)");
    if (!els.length) return;

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
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    els.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${Math.min(i % 6, 5) * 0.07}s`);
      io.observe(el);
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.88 && r.bottom > 0) {
        el.classList.add("is-in");
      }
    });

    return () => io.disconnect();
  }, deps);
}

function usePageMotion(deps = []) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const hash = window.location.hash;
    if (!hash) window.scrollTo(0, 0);
    document.documentElement.classList.remove("page-ready");
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add("page-ready");
        if (hash) {
          setTimeout(() => {
            scrollToAnchor(hash, { behavior: "smooth" });
          }, 480);
        }
      });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useReveal(deps);
}

Object.assign(window, {
  Navbar, Footer, FabChat, Icon, useReveal, usePageMotion,
  onPageLinkClick, navigateTo, scrollToAnchor, BrandLogo,
});
