import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Marquee.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function BreadIcon() {
  return (
    <svg
      className="marquee__icon"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5h14a5.5 5.5 0 0 1 3 10v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V15a5.5 5.5 0 0 1 3-10z" />
      <circle cx="19.5" cy="14" r="0.8" fill="currentColor" />
      <circle cx="22" cy="18" r="0.8" fill="currentColor" />
    </svg>
  );
}

// One "set" of the phrase. Repeated so a single group is wider than any screen.
function Group({ hidden = false }) {
  return (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {[0, 1].map((i) => (
        <div className="marquee__set" key={i}>
          <span className="marquee__text">KARETELA</span>
          <BreadIcon />
          <span className="marquee__text">KUSINA &amp; BAKERY</span>
          <BreadIcon />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* Endless loop: the track holds two identical groups, slide exactly one group */
      const loop = gsap.to(".marquee__track", {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });

      /* Scroll reacts: faster while scrolling, reverses when you scroll up, then settles */
      ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
          gsap.to(loop, {
            timeScale: self.direction * boost,
            duration: 0.25,
            overwrite: true,
            onComplete: () => gsap.to(loop, { timeScale: 1, duration: 1.2 }),
          });
        },
      });

      /* Bread icons gently wobble, one after another */
      gsap.to(".marquee__icon", {
        rotate: 14,
        duration: 0.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.15, repeat: -1, yoyo: true },
      });
    },
    { scope: root }
  );

  return (
    <section className="marquee" ref={root} aria-label="Karetela Kusina and Bakery">
      <div className="marquee__band">
        <div className="marquee__track scroll-blur">
          <Group />
          <Group hidden />
        </div>
      </div>
      <div className="marquee__rule" aria-hidden="true" />
    </section>
  );
}