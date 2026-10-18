import { useRef } from "react";
import { MapPin, Clock, Phone, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Mapsection from "@/components/contact/Mapsection";
import { siteInfo } from "@/data/siteinfo";
import logo from "@/assets/images/cut1.png";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".contact__title, .contact__badge", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".contact__card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact__band", start: "top 80%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <section className="contact">
        <div className="contact__head">
          <h1 className="contact__title scroll-blur">CONTACT US</h1>
          <img className="contact__badge" src={logo} alt="" />
        </div>

        <div className="contact__band">
          <div className="contact__grid">
            <article className="contact__card">
              <MapPin size={28} />
              <h2>Visit KARETELA</h2>
              <p>
                {siteInfo.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </article>

            <article className="contact__card">
              <Clock size={28} />
              <h2>Opening hours</h2>
              <p>
                {siteInfo.hours.map(({ days, time }) => (
                  <span key={days}>
                    {days}: {time}
                  </span>
                ))}
              </p>
            </article>

            <article className="contact__card">
              <Phone size={28} />
              <h2>Call us</h2>
              <p>
                <a href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}>{siteInfo.phone}</a>
                <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
              </p>
            </article>

            <article className="contact__card">
              <ShoppingBag size={28} />
              <h2>Order online</h2>
              <p>Pick your favorites and send us your order.</p>
              <a
                className="contact__btn"
                href={siteInfo.orderFormUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order now
              </a>
            </article>
          </div>
        </div>
      </section>

      <Mapsection />
    </div>
  );
}