import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroImg from "@/assets/images/bread.jpg"; // your hero photo
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Thin gold line-art branch (the leaves on the left of the design) */
const leaves = [
  { x: 22, y: 235, r: -20, s: 0.9 },
  { x: 27, y: 205, r: -165, s: 0.85 },
  { x: 34, y: 172, r: -25, s: 1 },
  { x: 44, y: 138, r: -160, s: 0.9 },
  { x: 57, y: 102, r: -30, s: 0.95 },
  { x: 72, y: 66, r: -155, s: 0.8 },
  { x: 86, y: 30, r: -35, s: 0.7 },
];

function LeafBranch({ flip = false, className = "" }) {
  return (
    <svg
      className={`hero__leaves ${className}`}
      viewBox="0 0 130 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform={flip ? "translate(0 260) scale(1 -1)" : undefined}>
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

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* Intro */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero__eyebrow", { y: 16, opacity: 0, duration: 0.6, delay: 0.15 })
        .from(".hero__line > span", { yPercent: 110, duration: 0.9, stagger: 0.15 }, "-=0.3")
        .from(".hero__text", { y: 20, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero__btn", { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(".hero__leaves", { opacity: 0, x: -30, duration: 1, stagger: 0.2 }, 0.3);

      /* Leaves sway gently */
      gsap.to(".hero__leaves", {
        y: "+=10",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.6,
      });

      /* Parallax: photo drifts slower than the page, text a little faster */
      const scrub = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(".hero__bg", { yPercent: 18, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero__content", { y: 60, ease: "none", scrollTrigger: scrub });
    },
    { scope: root }
  );

  return (
    <section className="hero" ref={root}>
      <img className="hero__bg" src={heroImg} alt="" />
      <div className="hero__overlay" />

      <LeafBranch className="hero__leaves--top" flip />
      <LeafBranch className="hero__leaves--bottom" />

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">KARETELA KUSINA &amp; BAKERY</p>

          <h1 className="hero__title scroll-blur">
            <span className="hero__line">
              <span>Freshly Baked,</span>
            </span>
            <span className="hero__line hero__line--accent">
              <span>Lovingly Made.</span>
            </span>
          </h1>

          <p className="hero__text">
            From our oven to your table, we serve fresh bread, delicious pastries,
            and homemade meals &mdash; made with quality ingredients and a whole lot of love.
          </p>

          <Link to="/menu" className="hero__btn">
            View Our Menu <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}