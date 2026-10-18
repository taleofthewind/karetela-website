import "./Categorytabs.css";

export default function Categorytabs({ tabs, active, onSelect }) {
  return (
    <div className="menu-tabs" role="group" aria-label="Filter the menu by category">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`menu-tabs__btn ${active === id ? "is-active" : ""}`}
          aria-pressed={active === id}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}