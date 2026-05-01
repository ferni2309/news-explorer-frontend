import React, { useState } from "react";
import "./Main.css";
import About from "../About/About";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import NotFound from "../NotFound/NotFound";
import { mockCards } from "../../utils/constants";

function Main({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(mockCards);

  return (
    <main className="main">
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title">¿Qué está pasando en el mundo?</h1>
          <p className="hero__subtitle">
            Encuentra las últimas noticias sobre cualquier tema y guárdalas en
            tu cuenta personal.
          </p>
          <SearchForm />
        </div>
      </section>
      {isLoading && <Preloader />}

      {results.length > 0 ? (
        <NewsCardList cards={results} isLoggedIn={isLoggedIn} />
      ) : (
        !isLoading && <NotFound />
      )}
      <About />
    </main>
  );
}

export default Main;
