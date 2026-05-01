import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import { mockCards } from "../../utils/constants";
import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../../utils/useForm";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

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
  };

  useEffect(() => {
    resetForm();
  }, [isLoginPopupOpen, isRegisterPopupOpen, resetForm]);

  return (
    <div className="page">
      <div className="page__content">
        <Header isLoggedIn={false} onLoginClick={handleLoginClick} />

        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path="/saved-news"
            element={
              <>
                <SavedNewsHeader />
                <section className="saved-news-list">
                  <NewsCardList
                    cards={mockCards}
                    isLoggedIn={true}
                    isSavedRoute={true}
                  />
                </section>
              </>
            }
          />
        </Routes>
        <PopupWithForm
          title="Iniciar sesión"
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          buttonText="Iniciar sesión"
          onRedirect={handleRegisterClick}
          isValid={isValid}
        >
          <label className="popup__label">Email</label>
          <input
            name="email"
            type="email"
            className="popup__input"
            value={values.email || ""}
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
            value={values.password || ""}
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
        >
          <label className="popup__label">Email</label>
          <input
            className="popup__input"
            type="email"
            placeholder="Introduce tu correo"
            required
          />
          <label className="popup__label">Contraseña</label>
          <input
            className="popup__input"
            type="password"
            placeholder="Introduce tu contraseña"
            required
          />
          <label className="popup__label">Nombre de usuario</label>
          <input
            className="popup__input"
            type="text"
            placeholder="Introduce tu nombre de usuario"
            required
          />
          <span className="popup__error-message">{errors.password}</span>
        </PopupWithForm>
        <Footer />
      </div>
    </div>
  );
}

export default App;
