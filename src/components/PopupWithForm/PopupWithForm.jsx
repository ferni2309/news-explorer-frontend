import React, { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  children,
  buttonText,
  onRedirect,
  isValid,
  onSubmit
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <span className="popup__error-message popup__error-message_general"></span>
          <button
            className={`popup__submit ${!isValid ? "popup__submit_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
        <p className="popup__redirect">
          o{" "}
          <span className="popup__redirect-link" onClick={onRedirect}>
            {name === 'login' ? 'Inscribirse' : 'Iniciar sesión'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default PopupWithForm;
