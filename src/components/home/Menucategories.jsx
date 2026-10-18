import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { menuCategories } from "@/data/menucategories";
import "./Menucategories.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Thin gold line icons, drawn inline so nothing can fail to import */
const Svg = ({ children }) => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const CroissantIcon = () => (
  <Svg>
    <path d="M3 16c.5-5 4.5-9 9-9s8.5 4 9 9c-1 .8-2.2 1.2-3.3 1l-1.2-2.6-2.5 3-1-.2-1-.1-2.5-3-1.2 2.6c-1.1.2-2.3-.2-3.3-1z" />
    <path d="M8.5 8.7l2 4.6M15.5 8.7l-2 4.6M12 7v6" />
  </Svg>
);

const BreadIcon = () => (
  <Svg>
    <path d="M5 8.5a3.5 3.5 0 0 1 3-4h8a3.5 3.5 0 0 1 3 4c1 .5 1.5 1.5 1.5 2.5 0 1-.6 1.8-1.5 2.2V19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5.8c-.9-.4-1.5-1.2-1.5-2.2 0-1 .5-2 1.5-2.5z" />
    <path d="M9 9l1 3.2M13.5 9l1 3.2" />
  </Svg>
);

const CakeIcon = () => (
  <Svg>
    <path d="M4 20h16v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z" />
    <path d="M4 16c2 1.2 3 1.2 4 0s2.5-1.2 4 0 3 1.2 4 0 2-1.2 4 0" />
    <path d="M12 12V8.5" />
    <path d="M12 4.6c.9 1 1.1 1.7 0 2.6-1.1-.9-.9-1.6 0-2.6z" />
  </Svg>
);

const icons = { pastries: CroissantIcon, breads: BreadIcon, custom: CakeIcon };

/* Gold line-art branch, mirrored for the right side */
const leaves = [
  { x: 22, y: 235, r: -20, s: 0.9 },
  { x: 27, y: 205, r: -165, s: 0.85 },
  { x: 34, y: 172, r: -25, s: 1 },
  { x: 44, y: 138, r: -160, s: 0.9 },
  { x: 57, y: 102, r: -30, s: 0.95 },
  { x: 72, y: 66, r: -155, s: 0.8 },
  { x: 86, y: 30, r: -35, s: 0.7 },
];

function LeafBranch({ side }) {
  return (
    <svg
      className={`menucat__leaves menucat__leaves--${side}`}
      viewBox="0 0 130 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform={side === "right" ? "translate(130 0) scale(-1 1)" : undefined}>
        <path d="M18 255C28 190 42 120 92 8" />
        {leaves.map(({ x, y, r, s }) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
            <path d="M0 0C12 -11 36 -11 52 0C36 11 12 11 0 0Z" />
            <path d="M2 0H48" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function MenuCategories() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* Header rises in */
      gsap.from(".menucat__eyebrow, .menucat__title, .menucat__lead", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".menucat__head", start: "top 85%", once: true },
      });

      /* Cards fade up one by one (clearProps keeps the CSS hover lift working) */
      gsap.from(".menucat__card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: ".menucat__grid", start: "top 85%", once: true },
      });

      /* Parallax inside each card photo */
      gsap.utils.toArray(".menucat__img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".menucat__card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      /* Leaves sway gently */
      gsap.to(".menucat__leaves", {
        y: "+=10",
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.7,
      });
    },
    { scope: root }
  );

  return (
    <section className="menucat" ref={root} aria-labelledby="menucat-title">
      <LeafBranch side="left" />
      <LeafBranch side="right" />

      <div className="menucat__head">
        <p className="menucat__eyebrow">Explore</p>
        <h2 className="menucat__title scroll-blur" id="menucat-title">
          Our Menu
        </h2>
        <p className="menucat__lead">
          Discover a variety of freshly baked treats, hearty meals, and more.
        </p>
      </div>

      <div className="menucat__grid">
        {menuCategories.map(({ id, title, text, image, to }) => {
          const Icon = icons[id];
          return (
            <Link to={to} className="menucat__card" key={id} aria-label={`${title}: ${text}`}>
              <div className="menucat__media">
                {image ? <img className="menucat__img" src={image} alt="" loading="lazy" /> : null}
              </div>
              <div className="menucat__shade" />

              <div className="menucat__info">
                <span className="menucat__icon">{Icon ? <Icon /> : null}</span>
                <div className="menucat__text">
                  <h3 className="menucat__card-title">{title}</h3>
                  <p className="menucat__card-sub">{text}</p>
                </div>
                <span className="menucat__go" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}