import React, { useState } from "react";
import "./News-Card.css";

function NewsCard({ card, isLoggedIn, isSavedRoute }) {
  const [isHovering, setIsHovering] = useState(false);

  const buttonClass = isSavedRoute 
    ? "news-card__button_type_delete" 
    : "news-card__button_type_save";

  return (
    <article className="news-card">
      <img className="news-card__image" src={card.urlToImage} alt={card.title} />

      {isSavedRoute && <div className="news-card__keyword">{card.keyword}</div>}

      {isHovering && (
        <div className="news-card__tooltip">
          {isSavedRoute 
            ? "Eliminar de guardados" 
            : !isLoggedIn && "Inicia sesión para guardar artículos"}
        </div>
      )}

      <button
        className={`news-card__button ${buttonClass}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={isSavedRoute ? "Eliminar noticia" : "Guardar noticia"}
      />

      <div className="news-card__content">
        <p className="news-card__date">{card.publishedAt}</p>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.description}</p>
        <p className="news-card__source">{card.source.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
