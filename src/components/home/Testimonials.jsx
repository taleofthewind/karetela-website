import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { testimonials, testimonialsBg } from "@/data/testimonials";
import { siteInfo } from "@/data/siteinfo";
import "swiper/css";
import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Testimonials() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* Header: eyebrow, title, text rise in one after another */
      gsap.from(".testi__eyebrow, .testi__title, .testi__lead", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testi__head", start: "top 80%", once: true },
      });

      /* Cards fade up one by one */
      gsap.from(".testi__card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testi__body", start: "top 75%", once: true },
      });

      /* Footer tagline */
      gsap.from(".testi__tagline", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testi__tagline", start: "top 92%", once: true },
      });

      /* Parallax: the dark bakery photo drifts slower than the page */
      gsap.fromTo(
        ".testi__bg",
        { yPercent: -8 },
        {
          yPercent: 8,
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

  return (
    <section className="testi" ref={root} aria-labelledby="testi-title">
      {/* Cream header */}
      <div className="testi__head">
        <p className="testi__eyebrow">What our customers say</p>
        <h2 className="testi__title scroll-blur" id="testi-title">
          Real People. Real Feedback.
        </h2>
        <p className="testi__lead">
          We&rsquo;re grateful for every kind word, every visit, and every order.
          <br />
          Here&rsquo;s what our happy customers have to say about KARETELA.
        </p>
      </div>

      {/* Dark body */}
      <div className="testi__body">
        <div
          className="testi__bg"
          style={
            testimonialsBg
              ? { backgroundImage: `url(${testimonialsBg})` }
              : undefined
          }
          aria-hidden="true"
        />
        <div className="testi__shade" aria-hidden="true" />

        <svg
          className="testi__wave"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0H1440V40C1260 80 1010 100 770 85C510 68 250 8 0 28Z" />
        </svg>

        <div className="testi__slider">
          <button className="testi__arrow testi__arrow--prev" aria-label="Previous reviews">
            <ChevronLeft size={22} />
          </button>
          <button className="testi__arrow testi__arrow--next" aria-label="Next reviews">
            <ChevronRight size={22} />
          </button>

          <Swiper
            modules={[Navigation, Keyboard]}
            navigation={{ prevEl: ".testi__arrow--prev", nextEl: ".testi__arrow--next" }}
            keyboard
            rewind
            grabCursor
            speed={600}
            spaceBetween={20}
            slidesPerView={1.12}
            breakpoints={{
              640: { slidesPerView: 2 },
              1000: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <article className="testi__card">
                  <header className="testi__person">
                    {t.avatar ? (
                      <img className="testi__avatar" src={t.avatar} alt="" loading="lazy" />
                    ) : (
                      <span className="testi__avatar testi__avatar--initials" aria-hidden="true">
                        {initials(t.name)}
                      </span>
                    )}
                    <div>
                      <h3 className="testi__name">{t.name}</h3>
                      <p className="testi__role">{t.role}</p>
                    </div>
                  </header>

                  {t.rating ? (
                    <div className="testi__stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  ) : null}

                  <blockquote className="testi__quote">&ldquo;{t.quote}&rdquo;</blockquote>

                  {t.photo ? (
                    <img className="testi__photo" src={t.photo} alt="" loading="lazy" />
                  ) : null}
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="testi__tagline">
          <p className="testi__script">Have a Taste, Share the Love</p>
          <p className="testi__support">Your support means everything to us</p>
          <a
            className="testi__btn"
            href={siteInfo.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave us a review
          </a>
        </div>
      </div>
    </section>
  );
}