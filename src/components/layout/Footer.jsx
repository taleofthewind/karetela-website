import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteInfo } from "@/data/siteInfo";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.35" stopColor="#fa7e1e" />
          <stop offset="0.6" stopColor="#d62976" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="16.2" cy="7.8" r="1" fill="#fff" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1877f2" />
      <path
        d="M16.5 24v-9h3l.5-3.6h-3.5V9.2c0-1 .3-1.7 1.8-1.7H20V4.3c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.7H10V15h3v9z"
        fill="#fff"
      />
    </svg>
  );
}

export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".footer__col", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <footer className="footer" ref={root}>
      <div className="footer__grid">
        <div className="footer__col">
          <p className="footer__brand-name">Karetela</p>
          <p className="footer__brand-sub">Kusina and Bakery</p>
          <span className="footer__rule" aria-hidden="true" />
          <ul className="footer__list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Visit us</h3>
          <ul className="footer__list">
            <li>
              {siteInfo.address.map((line) => (
                <span className="footer__line" key={line}>{line}</span>
              ))}
            </li>
            <li>
              {siteInfo.hours.map(({ days, time }) => (
                <span className="footer__line" key={days}>{days}: {time}</span>
              ))}
            </li>
            <li>
              <a href={siteInfo.directionsUrl} target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Follow us</h3>
          <ul className="footer__list">
            <li>
              <a href={siteInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="footer__social">
                <InstagramIcon /> Instagram
              </a>
            </li>
            <li>
              <a href={siteInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="footer__social">
                <FacebookIcon /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} KARETELA Kusina &amp; Bakery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}