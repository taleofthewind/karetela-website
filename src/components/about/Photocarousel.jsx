import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Photocarousel.css";

/*
  Drop photos into  src/assets/images/about/  and they appear automatically.
  Name them like  01-our-booth.jpg, 02-fresh-bread.jpg  ->  the order follows the
  numbers and the caption becomes "Our Booth", "Fresh Bread".
*/
const modules = import.meta.glob("@/assets/images/about/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const toCaption = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const slides = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, caption: toCaption(path) }));

export default function Photocarousel() {
  if (slides.length === 0) {
    return (
      <div className="carousel carousel--empty">
        Add photos to src/assets/images/about/
      </div>
    );
  }

  return (
    <div className="carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={slides.length > 2}
        speed={800}
        grabCursor
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // hover = pause
        }}
        pagination={{ clickable: true }}
        navigation
      >
        {slides.map(({ src, caption }) => (
          <SwiperSlide key={src}>
            <figure className="carousel__slide">
              <img src={src} alt={caption} loading="lazy" />
              <figcaption>{caption}</figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}