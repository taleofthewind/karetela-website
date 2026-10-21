import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import logo from "@/assets/images/cut.png";
import { story, storyPhotos } from "@/data/story";
import "./OurStory.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Where does each photo sit in the fan?
  rel = how many steps it is behind the front photo.
  The photo that was just in front slides out to the left (-1) and fades.
*/
function slotFor(i, active, n) {
  const rel = (i - active + n) % n;
  const o = n > 3 && rel === n - 1 ? -1 : rel;

  if (o === -1) return { k: -0.9, s: 0.9, b: 1, op: 0, z: 0 };
  if (o === 0) return { k: 0, s: 1, b: 1, op: 1, z: 30 };
  if (o === 1) return { k: 1, s: 0.85, b: 0.78, op: 1, z: 20 };
  if (o === 2) return { k: 2, s: 0.7, b: 0.6, op: 1, z: 10 };
  return { k: 2, s: 0.7, b: 0.6, op: 0, z: 0 }; // waiting behind the stack
}

export default function OurStory() {
  const root = useRef(null);
  const startX = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const n = storyPhotos.length;
  const go = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n]);

  /* Auto-advance, paused while hovering or focused, and off for "reduce motion" */
  useEffect(() => {
    if (n < 2 || paused || reduceMotion()) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [n, paused, go]);

  useGSAP(
    () => {
      if (reduceMotion()) return;

      gsap.from(".story__reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story__text", start: "top 80%", once: true },
      });

      const mediaTrigger = { trigger: ".story__media", start: "top 80%", once: true };

      gsap.from(".story__stack", {
        x: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: mediaTrigger,
      });

      const extras = gsap.utils.toArray(".story__arrow, .story__dots");
      if (extras.length) {
        gsap.from(extras, {
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: mediaTrigger,
        });
      }

      /* Gentle parallax on the photos */
      gsap.fromTo(
        ".story__media",
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  /* Swipe on touch screens */
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
    <section className="story" ref={root} aria-labelledby="story-title">
      <div className="story__inner">
        {/* ---------- Text ---------- */}
        <div className="story__text">
          <div className="story__brand story__reveal">
            <img className="story__logo" src={logo} alt="" />
            <span className="story__brand-line" aria-hidden="true" />
          </div>

          <p className="story__eyebrow story__reveal">{story.eyebrow}</p>

          <h2 className="story__title story__reveal scroll-blur" id="story-title">
            {story.title}
          </h2>

          <div className="story__body">
            {story.paragraphs.map((p) => (
              <p className="story__reveal" key={p}>
                {p}
              </p>
            ))}
          </div>

          <div className="story__sign story__reveal">
            <span className="story__sign-rule" aria-hidden="true" />
            <p className="story__signature" aria-label="Karetela Kusina and Bakery">
              <span>KARETELA</span>
              <em>Kusina &amp; Bakery</em>
            </p>
          </div>
        </div>

        {/* ---------- Photo fan ---------- */}
        <div className="story__media">
          {n === 0 ? (
            <p className="story__empty">
              Add photos to <code>src/assets/images/story/</code>
            </p>
          ) : (
            <>
              <div
                className="story__carousel"
                role="region"
                aria-roledescription="carousel"
                aria-label="Photos of our bakery"
                tabIndex={0}
                onKeyDown={onKeyDown}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
              >
                {n > 1 && (
                  <button
                    type="button"
                    className="story__arrow"
                    aria-label="Previous photo"
                    onClick={() => go(-1)}
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                <div
                  className="story__stack"
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerCancel={() => (startX.current = null)}
                >
                  {storyPhotos.map((photo, i) => {
                    const slot = slotFor(i, active, n);
                    return (
                      <figure
                        key={photo.src}
                        className="story__card"
                        aria-hidden={i !== active}
                        style={{
                          "--k": slot.k,
                          "--s": slot.s,
                          "--b": slot.b,
                          opacity: slot.op,
                          zIndex: slot.z,
                        }}
                      >
                        <div className="story__face">
                          <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
                        </div>
                      </figure>
                    );
                  })}
                </div>

                {n > 1 && (
                  <button
                    type="button"
                    className="story__arrow"
                    aria-label="Next photo"
                    onClick={() => go(1)}
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {n > 1 && (
                <div className="story__dots" role="group" aria-label="Choose a photo">
                  {storyPhotos.map((photo, i) => (
                    <button
                      key={photo.src}
                      type="button"
                      className={`story__dot ${i === active ? "is-active" : ""}`}
                      aria-label={`Show photo ${i + 1} of ${n}`}
                      aria-current={i === active}
                      onClick={() => setActive(i)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}