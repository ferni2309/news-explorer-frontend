import React from "react";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ savedArticles, currentUser }) {
  const keywords = savedArticles.map((art) => art.keyword);
  const keywordCounts = keywords.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  const sortedKeywords = Object.keys(
    keywords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {}),
  ).sort(
    (a, b) =>
      keywords.filter((y) => y === b).length -
      keywords.filter((y) => y === a).length,
  );
  const getKeywordsText = () => {
    if (sortedKeywords.length === 0) return "Ninguna";
    if (sortedKeywords.length <= 3) {
      return sortedKeywords.join(", ");
    }
    return `${sortedKeywords[0]}, ${sortedKeywords[1]} y ${sortedKeywords.length - 2} más`;
  };

  return (
    <section className="saved-header">
      <p className="saved-header__subtitle">Artículos guardados</p>
      <h1 className="saved-header__title">
        {currentUser.name}, tienes {savedArticles.length} artículos guardados
      </h1>
      <p className="saved-header__keywords">
        Por palabras clave: <b>{getKeywordsText()}</b>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
