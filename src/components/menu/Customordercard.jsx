import { ArrowRight } from "lucide-react";
import { siteInfo } from "@/data/siteinfo";
import "./MenuCard.css";

export default function CustomOrderCard() {
  return (
    <article className="menu-card menu-card--custom">
      <svg
        className="menu-card__cake"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 20h16v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z" />
        <path d="M4 16c2 1.2 3 1.2 4 0s2.5-1.2 4 0 3 1.2 4 0 2-1.2 4 0" />
        <path d="M9 12V9.5M12 12V8.5M15 12V9.5" />
        <path d="M12 4.6c.9 1 1.1 1.7 0 2.6-1.1-.9-.9-1.6 0-2.6z" />
        <path d="M7 5l-1.2-1M17 5l1.2-1M5 8H3.6M20.4 8H19" />
      </svg>

      <h3 className="menu-card__name menu-card__name--custom">Request a Custom Order</h3>
      <p className="menu-card__desc">
        Have a special design in mind? We&rsquo;d love to bring it to life.
      </p>

      <a
        className="menu-card__btn"
        href={siteInfo.orderFormUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Inquire Now <ArrowRight size={16} />
      </a>
    </article>
  );
}