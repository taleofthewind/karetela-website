import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CategoryTabs from "@/components/menu/Categorytabs";
import MenuCard from "@/components/menu/Menucard";
import Customordercard from "@/components/menu/Customordercard";
import { menuTabs, menuItems } from "@/data/menu";
import "./Menu.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Gold line-art branch on the right of the banner */
const leaves = [
  { x: 22, y: 235, r: -20, s: 0.9 },
  { x: 27, y: 205, r: -165, s: 0.85 },
  { x: 34, y: 172, r: -25, s: 1 },
  { x: 44, y: 138, r: -160, s: 0.9 },
  { x: 57, y: 102, r: -30, s: 0.95 },
  { x: 72, y: 66, r: -155, s: 0.8 },
  { x: 86, y: 30, r: -35, s: 0.7 },
];

function LeafBranch() {
  return (
    <svg
      className="menu-banner__leaves"
      viewBox="0 0 130 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 255C28 190 42 120 92 8" />
      {leaves.map(({ x, y, r, s }) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
          <path d="M0 0C12 -11 36 -11 52 0C36 11 12 11 0 0Z" />
          <path d="M2 0H48" />
        </g>
      ))}
    </svg>
  );
}

export default function Menu() {
  const root = useRef(null);
  const [params, setParams] = useSearchParams();

  // The category lives in the URL (?category=breads) so the Home cards can link here
  const requested = params.get("category");
  const category = menuTabs.some((t) => t.id === requested) ? requested : "all";

  /*
    Group the items by category. "All Items" shows every group, each under its own
    divider (Fresh Pastries, Fresh Breads, Custom Cakes). A filter shows just one.
  */
  const sections = menuTabs
    .filter((t) => t.id !== "all" && (category === "all" || t.id === category))
    .map((t) => ({ ...t, items: menuItems.filter((i) => i.category === t.id) }))
    .filter((s) => s.items.length > 0 || s.id === "custom");

  const handleSelect = (id) => setParams(id === "all" ? {} : { category: id });

  /* Page intro, runs once */
  useGSAP(
    () => {
      if (reduceMotion()) return;

      gsap.from(".menu-banner", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".menu-banner__item", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".menu-tabs__btn", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        delay: 0.45,
        ease: "power3.out",
      });
      gsap.to(".menu-banner__leaves", {
        y: "+=10",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  /* Dividers draw in and cards fade up as they scroll into view (re-runs on every filter) */
  useGSAP(
    () => {
      if (reduceMotion()) return;

      gsap.utils.toArray(".menu-section__head").forEach((head) => {
        const trigger = { trigger: head, start: "top 92%", once: true };
        gsap.from(head.querySelector(".menu-section__title"), {
          x: -16,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: trigger,
        });
        gsap.from(head.querySelector(".menu-section__line"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: trigger,
        });
      });

      const cards = gsap.utils.toArray(".menu-card");
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 30 });
      ScrollTrigger.batch(cards, {
        start: "top 94%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
            clearProps: "transform", // keeps the CSS hover lift working
          }),
      });
    },
    { scope: root, dependencies: [category], revertOnUpdate: true }
  );

  return (
    <div className="menu-page" ref={root}>
      <div className="menu-wrap">
        <header className="menu-banner">
          <p className="menu-banner__eyebrow menu-banner__item">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11 22V10h2v12zM12 9C9.8 9 8 7.2 8 5c2.2 0 4 1.8 4 4zm0 0c2.2 0 4-1.8 4-4-2.2 0-4 1.8-4 4zm0 6c-2.2 0-4-1.8-4-4 2.2 0 4 1.8 4 4zm0 0c2.2 0 4-1.8 4-4-2.2 0-4 1.8-4 4z" />
            </svg>
            Karetela Kusina &amp; Bakery
          </p>
          <h1 className="menu-banner__title menu-banner__item scroll-blur">Our Menu</h1>
          <p className="menu-banner__lead menu-banner__item">
            Discover something freshly made for you.
          </p>
          <LeafBranch />
        </header>

        <CategoryTabs tabs={menuTabs} active={category} onSelect={handleSelect} />

        {/* key = category, so everything re-mounts and animates in on every filter */}
        <div className="menu-sections" key={category}>
          {sections.map((section) => (
            <section
              className="menu-section"
              key={section.id}
              aria-labelledby={`menu-section-${section.id}`}
            >
              <div className="menu-section__head">
                <h2 className="menu-section__title" id={`menu-section-${section.id}`}>
                  {section.label}
                </h2>
                <span className="menu-section__line" aria-hidden="true" />
              </div>

              <div className="menu-grid">
                {section.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
                {section.id === "custom" && <Customordercard />}
              </div>
            </section>
          ))}
        </div>

        {sections.length === 0 && (
          <p className="menu-empty">Nothing here yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}