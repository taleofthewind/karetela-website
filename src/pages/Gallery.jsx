import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GalleryShowcase from "@/components/gallery/GalleryShowcase";
import logo from "@/assets/images/cut1.png";
import "./Gallery.css";

gsap.registerPlugin(useGSAP);

export default function Gallery() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".gallery__line--l", { scaleX: 0, transformOrigin: "right", duration: 0.8 })
        .from(".gallery__line--r", { scaleX: 0, transformOrigin: "left", duration: 0.8 }, "<")
        .from(".gallery__logo", { scale: 0.5, opacity: 0, duration: 0.7, ease: "back.out(2)" }, "<0.1")
        .from(
          ".gallery__eyebrow, .gallery__title, .gallery__sub",
          { y: 28, opacity: 0, duration: 0.7, stagger: 0.14 },
          "-=0.4"
        );
    },
    { scope: root }
  );

  return (
    <section className="gallery" ref={root}>
      <header className="gallery__head">
        <div className="gallery__emblem">
          <span className="gallery__line gallery__line--l" aria-hidden="true" />
          <img className="gallery__logo" src={logo} alt="Karetela" />
          <span className="gallery__line gallery__line--r" aria-hidden="true" />
        </div>
        <p className="gallery__eyebrow">OUR</p>
        <h1 className="gallery__title scroll-blur">GALLERY</h1>
        <p className="gallery__sub">Freshly Baked. Lovingly Made.</p>
      </header>

      <GalleryShowcase />
    </section>
  );
}