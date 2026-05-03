import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import { mockCards } from "../../utils/constants";
import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../../utils/useForm";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import newsApi from "../../utils/newsApi";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/mainApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [isSearchError, setIsSearchError] = useState(false);
  const [wasSearchMade, setWasSearchMade] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("articles");
    setWasSearchMade(false);
    setIsLoggedIn(false);
    setSavedArticles([]);
    setCurrentUser({});
    setCards([]);
    navigate("/");
  };

  const handleRegister = ({ email, password, name }) => {
    auth
      .register(email, password, name)
      .then(() => {
        setIsRegisterPopupOpen(false);
        setIsSuccessPopupOpen(true);
        handleLogin({ email, password });
      })
      .catch((err) => console.log(`Error en registro: ${err}`));
  };

  const handleSuccessRedirect = () => {
    setIsSuccessPopupOpen(false);
    setIsLoginPopupOpen(true);
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          return auth.checkToken(data.token);
        }
      })
      .then((user) => {
        if (user) setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error en login: ${err}`));
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((user) => {
          if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
          }
        })
        .catch((err) => console.log(`Token inválido: ${err}`));
    }
  }, []);

  useEffect(() => {
    const savedCards = localStorage.getItem("articles");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
      setWasSearchMade(true);
    }
  }, []);

  const handleSearchSubmit = (keyword) => {
    setCurrentKeyword(keyword);
    setIsSearchError(false);
    setIsLoading(true);
    setIsNotFound(false);

    newsApi
      .search(keyword)
      .then((data) => {
        setWasSearchMade(true);
        if (data.articles.length === 0) {
          setIsNotFound(true);
        }
        setCards(data.articles);
        localStorage.setItem("articles", JSON.stringify(data.articles));
      })
      .catch((err) => {
        console.log(err);
        setIsSearchError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLoginClick = () => {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  };

  const handleRegisterClick = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  };

  const handleSaveArticle = (card) => {
    const token = localStorage.getItem("jwt");

    const articleData = {
      keyword: currentKeyword,
      title: card.title,
      text: card.description || card.text,
      date: card.publishedAt || card.date,
      source: card.source?.name || card.source,
      link: card.url || card.link,
      image: card.urlToImage || card.image,
    };

    mainApi
      .saveArticle(articleData, token)
      .then((newArticle) => {
        setSavedArticles([newArticle, ...savedArticles]);
        console.log("Artículo guardado con éxito");
      })
      .catch((err) => console.log("Error al guardar:", err));
  };

  useEffect(() => {
    resetForm();
  }, [isLoginPopupOpen, isRegisterPopupOpen, resetForm]);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      mainApi
        .getSavedArticles(token)
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleDeleteArticle = (articleId) => {
    const token = localStorage.getItem("jwt");

    mainApi
      .deleteArticle(articleId, token)
      .then(() => {
        const updatedArticles = savedArticles.filter(
          (article) => article._id !== articleId,
        );
        setSavedArticles(updatedArticles);
      })
      .catch((err) => console.log("Error al eliminar el artículo:", err));
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLoginClick}
          onLogout={handleLogout}
          currentUser={currentUser}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                cards={cards}
                onDeleteArticle={handleDeleteArticle}
                onSaveArticle={handleSaveArticle}
                savedArticles={savedArticles}
                onSearch={handleSearchSubmit}
                isSearchError={isSearchError}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                wasSearchMade={wasSearchMade}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <SavedNewsHeader
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  onDeleteArticle={handleDeleteArticle}
                />
                <section className="saved-news-list">
                  <NewsCardList
                    cards={savedArticles}
                    isLoggedIn={true}
                    isSavedRoute={true}
                    onDeleteArticle={handleDeleteArticle}
                  />
                </section>
              </>
              </ProtectedRoute>
            }
          />
        </Routes>
        <PopupWithForm
          name="login"
          title="Iniciar sesión"
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          buttonText="Iniciar sesión"
          onRedirect={handleRegisterClick}
          isValid={isValid}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("¡Formulario enviado!");
            handleLogin({ email: values.email, password: values.password });
          }}
        >
          <label className="popup__label">Email</label>
          <input
            name="email"
            type="email"
            className="popup__input"
            value={values.email ?? ""}
            onChange={handleChange}
            placeholder="Introduce tu correo"
            required
          />
          <span className="popup__error-message">{errors.email}</span>
          <label className="popup__label">Contraseña</label>
          <input
            name="password"
            type="password"
            className="popup__input"
            value={values.password ?? ""}
            onChange={handleChange}
            placeholder="Introduce tu contraseña"
            required
            minLength="8"
          />
        </PopupWithForm>
        <PopupWithForm
          title="Inscribirse"
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          buttonText="Inscribirse"
          onRedirect={handleLoginClick}
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(values);
          }}
          isValid={isValid}
        >
          <label className="popup__label">Email</label>
          <input
            className="popup__input"
            name="email"
            type="email"
            placeholder="Introduce tu correo"
            value={values.email ?? ""}
            onChange={handleChange}
            required
          />
          <span className="popup__error-message">{errors.email}</span>
          <label className="popup__label">Contraseña</label>
          <input
            className="popup__input"
            name="password"
            type="password"
            placeholder="Introduce tu contraseña"
            value={values.password ?? ""}
            onChange={handleChange}
            minLength="8"
            required
          />
          <span className="popup__error-message">{errors.password}</span>
          <label className="popup__label">Nombre de usuario</label>
          <input
            className="popup__input"
            name="name"
            type="text"
            placeholder="Introduce tu nombre de usuario"
            value={values.name ?? ""}
            onChange={handleChange}
            required
            minLength="2"
          />
          <span className="popup__error-message">{errors.name}</span>
        </PopupWithForm>
        <Footer />
      </div>
      <InfoTooltip
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        onLoginClick={handleSuccessRedirect}
      />
    </div>
  );
}

export default App;
