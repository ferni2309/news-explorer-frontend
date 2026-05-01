import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ cards, isLoggedIn }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="news-list">
      <h2 className="news-list__title">Resultados de la búsqueda</h2>
      <div className="news-list__grid">
        {cards.slice(0, visibleCount).map((card, index) => (
          <NewsCard key={index} card={card} isLoggedIn={isLoggedIn} />
        ))}
      </div>
      {visibleCount < cards.length && (
        <button className="news-list__more-button" onClick={showMore}>
          Mostrar más
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
