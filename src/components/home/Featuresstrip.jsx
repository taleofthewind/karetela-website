import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Featuresstrip.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Thin gold line icons, drawn inline so nothing can fail to import */
const Svg = ({ children }) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const LeafIcon = () => (
  <Svg>
    <path d="M5 20C4 11 10 4 20 4c0 10-6 16-15 16z" />
    <path d="M5 20C8 14 12 10 16 7.5" />
  </Svg>
);

const CupcakeIcon = () => (
  <Svg>
    <path d="M6 12.5h12l-1.8 8H7.8z" />
    <path d="M10 12.5l.5 8M14 12.5l-.5 8" />
    <path d="M6.2 12.5C4.4 9.5 6.7 7 9 7c.2-1.9 1.6-3 3-3s2.8 1.1 3 3c2.3 0 4.6 2.5 2.8 5.5" />
  </Svg>
);

const HeartIcon = () => (
  <Svg>
    <path d="M12 20.5S3.5 15.3 3.5 9.6A4.6 4.6 0 0 1 12 7.3a4.6 4.6 0 0 1 8.5 2.3c0 5.7-8.5 10.9-8.5 10.9z" />
  </Svg>
);

const features = [
  { Icon: LeafIcon, title: "Fresh Ingredients", text: "Quality in every bite" },
  { Icon: CupcakeIcon, title: "Homemade Goodness", text: "Made with love" },
  { Icon: HeartIcon, title: "Local Bakery", text: "Supporting our community" },
];

export default function FeaturesStrip() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
      });

      tl.from(".features__item", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      }).from(
        ".features__divider",
        { scaleY: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        0.2
      );
    },
    { scope: root }
  );

  return (
    <section className="features" ref={root} aria-label="Why choose Karetela">
      <div className="features__grid">
        {features.map(({ Icon, title, text }, i) => (
          <div className="features__cell" key={title}>
            {i > 0 && <span className="features__divider" aria-hidden="true" />}
            <div className="features__item">
              <span className="features__icon">
                <Icon />
              </span>
              <div>
                <h2 className="features__title">{title}</h2>
                <p className="features__text">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}