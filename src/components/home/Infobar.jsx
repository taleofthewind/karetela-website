import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteInfo } from "@/data/siteinfo";
import "./Infobar.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Infobar() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });

      tl.from(".infobar__col", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      })
        .from(
          ".infobar__divider",
          { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power2.out" },
          0
        )
        .from(
          ".infobar__rule",
          { scaleX: 0, duration: 0.8, ease: "power2.inOut" },
          0.2
        );
    },
    { scope: root }
  );

  return (
    <section className="infobar" ref={root}>
      <div className="infobar__grid">
        <div className="infobar__col">
          <h2 className="infobar__title scroll-blur">Address</h2>
          <p className="infobar__text">
            {siteInfo.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <div className="infobar__divider" aria-hidden="true" />

        <div className="infobar__col">
          <h2 className="infobar__title scroll-blur">Opening Hours</h2>
          <p className="infobar__text">
            {siteInfo.hours.map(({ days, time }) => (
              <span key={days}>
                {days}: {time}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="infobar__rule" aria-hidden="true" />
    </section>
  );
}