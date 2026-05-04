import React from 'react';
import './Notfound.css'
import notFoundIcon from '../../images/not-found.svg';

function NotFound() {
  return (
    <div className="not-found">
      <img src={notFoundIcon} alt="No encontrado" className="not-found__icon" />
      <h2 className="not-found__title">No se ha encontrado nada</h2>
      <p className="not-found__text">Lo sentimos, pero nada coincide con tus términos de búsqueda.</p>
    </div>
  );
}

export default NotFound;
