import { useRef, useState } from "react";
import { ChefHat, ChevronLeft, ChevronRight, ArrowRight, CupSoda } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { drinkTabs } from "@/data/drinks";
import { siteInfo } from "@/data/siteinfo";
import "./Drinks.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Small gold line icons for the two tabs */
const Svg = ({ children }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ConeIcon = () => (
  <Svg>
    <path d="M7 11l5 11 5-11" />
    <path d="M6.5 11a5.5 5.5 0 0 1 11 0z" />
    <path d="M12 5.5V3.5" />
  </Svg>
);

const CupIcon = () => (
  <Svg>
    <path d="M6 8h12" />
    <path d="M7 8l1.2 13h7.6L17 8" />
    <path d="M13 8l2-5.5" />
  </Svg>
);

const tabIcons = { coolers: ConeIcon, drinks: CupIcon };

export default function Drinks() {
  const root = useRef(null);
  const startX = useRef(null);
  const [tabId, setTabId] = useState(drinkTabs[0].id);
  const [indexes, setIndexes] = useState({}); // remembers a position for each tab
  const index = indexes[tabId] ?? 0;
  const setIndex = (value) =>
  setIndexes((prev) => ({
    ...prev,
    [tabId]: typeof value === "function" ? value(prev[tabId] ?? 0) : value,
  }));

  const tab = drinkTabs.find((t) => t.id === tabId) ?? drinkTabs[0];
  const items = tab.items;
  const n = items.length;
  const item = items[index] ?? items[0];

  const go = (dir) => setIndex((i) => (n ? (i + dir + n) % n : 0));

  const chooseTab = (id) => setTabId(id);

  /* Entrance when the section scrolls into view */
  useGSAP(
    () => {
      if (reduceMotion()) return;

      gsap.from(".drinks__head > *", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".drinks__head", start: "top 85%", once: true },
      });

      gsap.from(".drinks__tabs, .drinks__stage, .drinks__thumbs", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: ".drinks__tabs", start: "top 92%", once: true },
      });
    },
    { scope: root }
  );

  /*
    Slide change: the photo fades in with a slight zoom, the text slides in from the right.
    0.7s with the power3.out easing, as in the design note.
  */
  useGSAP(
    () => {
      if (reduceMotion()) return;

      const photo = gsap.utils.toArray(".drinks__img");
      if (photo.length) {
        gsap.from(photo, { opacity: 0, scale: 1.08, duration: 0.7, ease: "power3.out" });
      }
      gsap.from(".drinks__text > *", {
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    { scope: root, dependencies: [tabId, index], revertOnUpdate: true }
  );

  /* Swipe on touch screens, arrow keys on a keyboard */
  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section className="drinks" ref={root} aria-labelledby="drinks-title">
      <div className="drinks__inner">
        {/* ---------- Heading ---------- */}
        <header className="drinks__head">
          <div className="drinks__emblem" aria-hidden="true">
            <span className="drinks__line drinks__line--l" />
            <CupSoda size={46} strokeWidth={1.3} />
            <span className="drinks__line drinks__line--r" />
          </div>
          <h2 className="drinks__title scroll-blur" id="drinks-title">
            Cool Treats &amp; Refreshing Sips
          </h2>
          <p className="drinks__tagline">Perfect for any time!</p>
        </header>

        {/* ---------- Tabs ---------- */}
        <div className="drinks__tabs" role="group" aria-label="Choose a group">
          {drinkTabs.map(({ id, label }) => {
            const Icon = tabIcons[id];
            return (
              <button
                key={id}
                type="button"
                className={`drinks__tab ${id === tab.id ? "is-active" : ""}`}
                aria-pressed={id === tab.id}
                onClick={() => chooseTab(id)}
              >
                {Icon ? <Icon /> : null}
                {label}
              </button>
            );
          })}
        </div>

        {n === 0 ? (
          <p className="drinks__empty">Coming soon!</p>
        ) : (
          <>
            {/* ---------- Big card ---------- */}
            <div
              className="drinks__stage"
              role="region"
              aria-roledescription="carousel"
              aria-label="Coolers and drinks"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (startX.current = null)}
            >
              {/* Desktop: these two appear when the mouse is over the card */}
              {n > 1 && (
                <>
                  <button
                    type="button"
                    className="drinks__arrow drinks__arrow--prev"
                    aria-label="Previous"
                    onClick={() => go(-1)}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    type="button"
                    className="drinks__arrow drinks__arrow--next"
                    aria-label="Next"
                    onClick={() => go(1)}
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              <article className="drinks__card">
                <div className="drinks__media">
                  {item.image ? (
                    <img
                      key={item.id}
                      className="drinks__img"
                      src={item.image}
                      alt={item.name}
                      decoding="async"
                    />
                  ) : (
                    <span className="drinks__noimg">Photo coming soon</span>
                  )}

                  {n > 1 && (
                    <div className="drinks__dots" role="group" aria-label="Choose an item">
                      {items.map((it, i) => (
                        <button
                          key={it.id}
                          type="button"
                          className={`drinks__dot ${i === index ? "is-active" : ""}`}
                          aria-label={`Show ${it.name}`}
                          aria-current={i === index}
                          onClick={() => setIndex(i)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="drinks__text" key={item.id}>
                  <h3 className="drinks__name">{item.name}</h3>
                  <span className="drinks__rule" aria-hidden="true" />
                  <p className="drinks__desc">{item.description}</p>
                  <span className="drinks__rule drinks__rule--long" aria-hidden="true" />
                  <div className="drinks__buy">
                    <span className="drinks__price">&#8369; {item.price || "---"}</span>
                    {/*<a
                      className="drinks__order"
                      href={siteInfo.orderFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order Now <ArrowRight size={18} aria-hidden="true" />
                    </a> */}
                  </div>
                </div>
              </article>
            </div>

            {/* Phones: real buttons under the card (a phone has no mouse to hover with) */}
            {n > 1 && (
              <div className="drinks__controls">
                <button
                  type="button"
                  className="drinks__ctrl"
                  aria-label="Previous"
                  onClick={() => go(-1)}
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="drinks__count" aria-live="polite">
                  {index + 1} / {n}
                </span>
                <button
                  type="button"
                  className="drinks__ctrl"
                  aria-label="Next"
                  onClick={() => go(1)}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}

            {/* ---------- Thumbnails ---------- */}
            <div className="drinks__thumbs">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  className={`drinks__thumb ${i === index ? "is-active" : ""}`}
                  aria-label={`Show ${it.name}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                >
                  {it.image && <img src={it.image} alt="" loading="lazy" decoding="async" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}