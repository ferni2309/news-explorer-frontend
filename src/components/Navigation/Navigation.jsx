import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logoutWhite from "../../images/logout-white.svg";
import logoutBlack from "../../images/logout-black.svg";

function Navigation({ isLoggedIn, isLight, onLoginClick, isMenuOpen }) {
  return (
    <nav className={`navigation ${isMenuOpen ? "navigation_visible" : ""}`}>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isLight && !isMenuOpen ? "navigation__link_theme_light" : ""} ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Inicio
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `navigation__link ${isLight ? "navigation__link_theme_light" : ""} ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Artículos guardados
            </NavLink>
          </li>
        )}

        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              className={`navigation__button ${isLight ? "navigation__button_theme_light" : ""}`}
            >
              <span className="navigation__user-name">Reina</span>
              <img
                src={isLight ? logoutBlack : logoutWhite}
                alt="Cerrar sesión"
                className="navigation__logout-icon"
              />
            </button>
          ) : (
            <button
              className={`navigation__button ${isLight ? "navigation__button_theme_light" : ""}`}
              onClick={onLoginClick}
            >
              {isLoggedIn ? "NombreUsuario" : "Iniciar sesión"}
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
