import React, { useEffect } from "react";
import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, onLoginClick }) {
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
      <div
        className="popup__container popup__container_type_success"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup__close" type="button" onClick={onClose} />
        <div className="popup__content">
          <h2 className="popup__title popup__title_success">
            ¡El registro se ha completado con éxito!
          </h2>
          <span className="popup__redirect-link" onClick={onLoginClick}>
            Inscribirse
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
