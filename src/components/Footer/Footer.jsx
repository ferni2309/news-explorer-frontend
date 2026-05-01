import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import githubIcon from '../../images/icon-Github.svg';
import facebookIcon from '../../images/icon-Facebook.svg';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <nav className="footer__navigation">
        <ul className="footer__links">
          <li className="footer__list-item">
            <Link to="/" className="footer__link">Inicio</Link>
          </li>
          <li className="footer__list-item">
            <a href="https://tripleten.com" className="footer__link" target="_blank" rel="noreferrer">
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__social">
          <li className="footer__list-item">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img src={githubIcon} alt="GitHub" className="footer__social-icon" />
            </a>
          </li>
          <li className="footer__list-item">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={facebookIcon} alt="Facebook" className="footer__social-icon" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
