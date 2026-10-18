import { useRef } from "react";
import { Navigation } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteInfo  } from "@/data/siteinfo";
import "./Mapsection.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Mapsection() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".map__card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section className="map" ref={root}>
      <iframe
        className="map__frame"
        src={siteInfo.mapEmbedUrl}
        title="Map showing Karetela Kusina & Bakery"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <div className="map__card">
        <h2 className="map__title">Find us</h2>
        <p className="map__text">
          {siteInfo.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <a
          className="map__btn"
          href={siteInfo.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation size={18} /> Get Directions
        </a>
      </div>
    </section>
  );
}