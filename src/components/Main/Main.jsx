import React from "react";
import "./Main.css";
import About from "../About/About";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import SearchError from "../SearchError/SearchError";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({
  isLoggedIn,
  cards,
  onSearch,
  isLoading,
  isSearchError,
  wasSearchMade,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
}) {
 
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">¿Qué está pasando en el mundo?</h1>
          <p className="hero__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>
          <SearchForm onSearch={onSearch} />
        </div>
      </section>

      {isLoading && <Preloader />}

      {isSearchError && <SearchError />}

      {!isLoading && !isSearchError && (
        <>
          {cards.length > 0 ? (
            <NewsCardList
              cards={cards}
              onDeleteArticle={onDeleteArticle}
              onSaveArticle={onSaveArticle}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
            />
          ) : (
            wasSearchMade && <NotFound />
          )}
        </>
      )}

      <About />
    </main>
  );
}

export default Main;
