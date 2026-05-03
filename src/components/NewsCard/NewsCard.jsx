import React, { useState } from "react";
import "./News-Card.css";
import { formatDate } from '../../utils/dateFormatter';

function NewsCard({
  card,
  isLoggedIn,
  isSavedRoute,
  onSaveClick,
  savedArticles = [],
  onDeleteClick,
  onLoginClick,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const isSaved =
    isLoggedIn &&
    savedArticles.some((article) => article.link === (card.url || card.link));

  const buttonClass = isSavedRoute
    ? "news-card__button_type_delete"
    : isSaved
      ? "news-card__button_type_saved-active"
      : "news-card__button_type_save";

  const handleButtonClick = () => {
    if (isSavedRoute) {
      if (onDeleteClick) {
        onDeleteClick(card._id);
      }
    } else {
      if (isLoggedIn) {
        onSaveClick?.(card);
      } else {
        onLoginClick?.();
      }
    }
  };

  return (
    <article className="news-card">
      <img
        className="news-card__image"
        src={card.urlToImage || card.image}
        alt={card.title}
      />

      {isSavedRoute && <div className="news-card__keyword">{card.keyword}</div>}

      {isHovering && (isSavedRoute || !isLoggedIn) && (
        <div className="news-card__tooltip">
          {isSavedRoute
            ? "Eliminar de guardados"
            : "Inicia sesión para guardar artículos"}
        </div>
      )}

      <button
        className={`news-card__button ${buttonClass}`}
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={isSavedRoute ? "Eliminar noticia" : "Guardar noticia"}
      />

      <div className="news-card__content">
        <p className="news-card__date">{formatDate(card.publishedAt || card.date)}</p>
        <h3 className="news-card__title">{card.title}</h3>
        <p className="news-card__text">{card.description || card.text}</p>
        <p className="news-card__source">{card.source?.name || card.source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
