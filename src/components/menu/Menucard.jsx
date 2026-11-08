import { Maximize2 } from "lucide-react";
import "./Menucard.css";

export default function Menucard({ item, onOpen }) {
  return (
    <article className="menu-card">
      {item.image ? (
        // Only the photo is clickable. It opens the bigger view.
        <button
          type="button"
          className="menu-card__media menu-card__media--btn"
          aria-label={`View ${item.name} larger`}
          onClick={(e) => onOpen?.(item, e.currentTarget)}
        >
          <img src={item.image} alt="" loading="lazy" decoding="async" />
          <span className="menu-card__zoom" aria-hidden="true">
            <Maximize2 size={16} />
          </span>
        </button>
      ) : (
        <div className="menu-card__media">
          <span className="menu-card__placeholder" aria-hidden="true">
            Photo coming soon
          </span>
        </div>
      )}

      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__price">&#8369;{item.price}</p>
        <p className="menu-card__desc">{item.description}</p>
      </div>
    </article>
  );
}