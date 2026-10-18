import "./Menucard.css";

export default function Menucard({ item }) {
  return (
    <article className="menu-card">
      <div className="menu-card__media">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" />
        ) : (
          <span className="menu-card__placeholder" aria-hidden="true">
            Photo coming soon
          </span>
        )}
      </div>

      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__price">&#8369;{item.price}</p>
        <p className="menu-card__desc">{item.description}</p>
      </div>
    </article>
  );
}