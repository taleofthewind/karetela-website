import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight } from "lucide-react";
import { siteInfo } from "@/data/siteinfo";
import "./Menulightbox.css";

export default function Menulightbox({ item, label, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    // stop the page behind from scrolling while the box is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // keyboard focus starts on the close button
    const id = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(id);
    };
  }, [item, onClose]);

  if (!item) return null;

  // keep Tab inside the box
  const trapTab = (e) => {
    if (e.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll("button, a[href]");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div className="mlb" onClick={onClose} role="presentation">
      <div
        className="mlb__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mlb-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapTab}
      >
        <button
          ref={closeRef}
          type="button"
          className="mlb__close"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="mlb__photo">
          {item.image && <img src={item.image} alt={item.name} />}
        </div>

        <div className="mlb__info">
          {label && <p className="mlb__tag">{label}</p>}
          <h2 className="mlb__name" id="mlb-title">
            {item.name}
          </h2>
          <p className="mlb__price">&#8369;{item.price}</p>
          <p className="mlb__desc">{item.description}</p>

          <a
            className="mlb__btn"
            href={siteInfo.orderFormUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order or inquire <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}