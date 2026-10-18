import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Thumbs,
  EffectCoverflow,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { galleryItems } from "@/data/gallery";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/thumbs";
import "./Galleryshowcase.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Galleryshowcase() {
  const root = useRef(null);
  const mainRef = useRef(null);
  const [thumbs, setThumbs] = useState(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".gal__stage", {
        opacity: 0,
        scale: 0.94,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });

      gsap.from(".gal__thumbs, .gal__dots, .gal__hint", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gal__thumbs", start: "top 95%", once: true },
      });
    },
    { scope: root }
  );

  if (galleryItems.length === 0) {
    return (
      <p className="gal__empty">
        Add photos to <code>src/assets/images/gallery/</code> and they will appear here.
      </p>
    );
  }

  // Both side previews need neighbours, so loop only when there are enough photos
  const canLoop = galleryItems.length >= 6;

  return (
    <div className="gal" ref={root}>
      <div className="gal__stage">
        <button className="gal__arrow gal__arrow--prev" aria-label="Previous photo">
          <ChevronLeft size={30} />
        </button>
        <button className="gal__arrow gal__arrow--next" aria-label="Next photo">
          <ChevronRight size={30} />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Thumbs, EffectCoverflow, Autoplay, Keyboard]}
          onSwiper={(s) => (mainRef.current = s)}
          effect="coverflow"
          coverflowEffect={{ rotate: 24, stretch: 0, depth: 160, modifier: 1, slideShadows: false }}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={0}
          loop={canLoop}
          rewind={!canLoop}
          speed={700}
          grabCursor
          keyboard
          autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: ".gal__arrow--prev", nextEl: ".gal__arrow--next" }}
          pagination={{ el: ".gal__dots", clickable: true }}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
        >
          {galleryItems.map((item) => (
            <SwiperSlide key={item.src} className="gal__slide-wrap">
              <figure className="gal__slide">
                <img src={item.src} alt={`${item.name} (${item.category})`} />
                <figcaption className="gal__caption">
                  <span className="gal__cat">{item.category}</span>
                  <span className="gal__name">{item.name}</span>
                  <span className="gal__bar" aria-hidden="true" />
                </figcaption>
                <button
                  className="gal__go"
                  aria-label="Next photo"
                  onClick={() => mainRef.current?.slideNext()}
                >
                  <ChevronRight size={20} />
                </button>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        className="gal__thumbs"
        onSwiper={setThumbs}
        slidesPerView="auto"
        spaceBetween={16}
        watchSlidesProgress
        centerInsufficientSlides
      >
        {galleryItems.map((item) => (
          <SwiperSlide key={item.src} className="gal__thumb">
            <img src={item.src} alt={item.name} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="gal__dots" />

      <p className="gal__hint">
        <Sparkles size={16} aria-hidden="true" />
        <span className="gal__hint-hover">
          Hover over an image to see the name of the pastry, or click the thumbnails to view more.
        </span>
        <span className="gal__hint-touch">Swipe the photo, or tap the thumbnails to view more.</span>
      </p>
    </div>
  );
}