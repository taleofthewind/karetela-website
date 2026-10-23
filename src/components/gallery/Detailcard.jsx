import { useEffect, useRef } from "react";
import { X, Crown, Mail, ArrowRight } from "lucide-react";
import { siteInfo } from "@/data/siteinfo";
import logo from "@/assets/images/cut.png";
import "./Detailcard.css";

export default function Detailcard({ item, open, onClose }) {
  const closeRef = useRef(null);
  const rootRef = useRef(null);

  // Escape closes the card
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Move keyboard focus to the close button when the card opens
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Small screens: the card sits under the photo, so make sure it is on screen when it opens
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 1180px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = requestAnimationFrame(() =>
      rootRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" })
    );
    return () => cancelAnimationFrame(id);
  }, [open, item?.src]);

  if (!item) return null;

  return (
    <aside
      ref={rootRef}
      className={`gal__detail ${open ? "is-open" : ""}`}
      aria-label={`Details for ${item.name}`}
      aria-hidden={!open}
    >
      <button
        ref={closeRef}
        type="button"
        className="gal__detail-close"
        aria-label="Close details"
        onClick={onClose}
      >
        <X size={22} />
      </button>

      {/* key = photo, so the text fades in again when the slide changes */}
      <div className="gal__detail-body" key={item.src}>
        <p className="gal__detail-tag">{item.tag || item.category}</p>
        <span className="gal__detail-rule" aria-hidden="true" />

        <h3 className="gal__detail-name">{item.name}</h3>

        {item.description && <p className="gal__detail-desc">{item.description}</p>}

        {(item.price || item.badge) && (
          <div className="gal__detail-meta">
            <img className="gal__detail-seal" src={logo} alt="" />
            {item.price && <span className="gal__detail-price">&#8369; {item.price}</span>}
            {item.badge && (
              <span className="gal__detail-badge">
                <Crown size={14} aria-hidden="true" /> {item.badge}
              </span>
            )}
          </div>
        )}

        <a
          className="gal__detail-btn"
          href={siteInfo.orderFormUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail size={20} aria-hidden="true" />
          Inquire About This {item.kind || "Item"}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}