import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import logo from "@/assets/images/cut1.png";
import { siteInfo } from "@/data/siteinfo";
import "./Navbar.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

/* Brand icons drawn inline (newer lucide versions no longer ship them) */
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V13h2.7v8z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 3c.3 2.4 1.7 3.9 4 4.1v3c-1.5.1-2.8-.4-4-1.2v5.9c0 3.7-3 6.2-6.3 5.7A5.7 5.7 0 0 1 5 14.8c0-3.4 2.9-6 6.3-5.6v3.2c-1.7-.5-3.2.7-3.2 2.3 0 1.4 1.1 2.5 2.4 2.5 1.5 0 2.6-1.1 2.6-2.7V3z" />
  </svg>
);

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const root = useRef(null);
  const openRef = useRef(false);
  const prevOpen = useRef(false);

  const tiktok = siteInfo.socials?.tiktok || "https://www.tiktok.com/";

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Close the mobile menu when the page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu with Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Entrance + hide on scroll down / show on scroll up */
  useGSAP(
    () => {
      if (reduceMotion()) return;

      gsap.from(".navbar__brand, .navbar__toggle, .navbar__link, .navbar__actions", {
        y: -24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });

      let hidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const down = self.direction === 1;
          if (down && self.scroll() > 120 && !openRef.current && !hidden) {
            hidden = true;
            gsap.to(".navbar", { yPercent: -100, duration: 0.35, ease: "power2.out" });
          } else if (!down && hidden) {
            hidden = false;
            gsap.to(".navbar", { yPercent: 0, duration: 0.35, ease: "power2.out" });
          }
        },
      });
    },
    { scope: root }
  );

  /* Mobile menu: burger spins, links slide in */
  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    if (reduceMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".navbar__toggle svg",
        { rotate: -90, scale: 0.6, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }
      );

      const isMobile = window.matchMedia("(max-width: 960px)").matches;
      if (open && isMobile) {
        gsap.fromTo(
          ".navbar__link, .navbar__actions",
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.07, delay: 0.1 }
        );
      }
    }, root);

    return () => ctx.revert();
  }, [open]);

  /* Logo hover wiggle */
  const { contextSafe } = useGSAP({ scope: root });

  const logoEnter = contextSafe(() => {
    if (reduceMotion()) return;
    gsap.to(".navbar__logo", { rotate: 8, scale: 1.1, duration: 0.35, ease: "back.out(2)" });
  });

  const logoLeave = contextSafe(() => {
    gsap.to(".navbar__logo", { rotate: 0, scale: 1, duration: 0.35, ease: "power2.out" });
  });

  return (
    <header className="navbar" ref={root}>
      <div className="navbar__inner">
        <Link
          to="/"
          className="navbar__brand"
          aria-label="Karetela Kusina and Bakery, home"
          onMouseEnter={logoEnter}
          onMouseLeave={logoLeave}
        >
          <img className="navbar__logo" src={logo} alt="" />
          <span className="navbar__brand-text">
            <span className="navbar__brand-name">KARETELA</span>
            <span className="navbar__brand-sub">KUSINA &amp; BAKERY</span>
          </span>
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div id="primary-nav" className={`navbar__panel ${open ? "is-open" : ""}`}>
          <nav aria-label="Primary">
            <ul className="navbar__links">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? "is-active" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <div className="navbar__socials">
              <a href={siteInfo.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="navbar__social">
                <FacebookIcon />
              </a>
              <a href={siteInfo.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="navbar__social">
                <InstagramIcon />
              </a>
              <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="navbar__social">
                <TikTokIcon />
              </a>
            </div>

            <Link to="/menu" className="navbar__cta">
              View Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}