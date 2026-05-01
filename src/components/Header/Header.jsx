import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn, onLoginClick }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isSavedNews = location.pathname === "/saved-news";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`header       ${isSavedNews ? "header_theme_light" : ""} 
      ${isMenuOpen ? "header_menu-open" : ""}`}
    >
      <div className="header__container">
        <Link
          to="/"
          className={`header__logo ${isSavedNews && !isMenuOpen ? "header__logo_theme_light" : ""}`}
        >
          NewsExplorer
        </Link>
        <button
          className={`header__menu-button 
            ${isMenuOpen ? "header__menu-button_open" : ""} 
            ${isSavedNews && !isMenuOpen ? "header__menu-button_theme_light" : ""}`}
          onClick={toggleMenu}
        />
        <Navigation
          isLoggedIn={isLoggedIn}
          isLight={isSavedNews}
          isMenuOpen={isMenuOpen}
          onLoginClick={() => {
            setIsMenuOpen(false);
            onLoginClick();
          }}
        />
      </div>
    </header>
  );
}

export default Header;
