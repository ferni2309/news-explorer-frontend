import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <section className="saved-header">
      <p className="saved-header__subtitle">Artículos guardados</p>
      <h1 className="saved-header__title">Reina, tienes 5 artículos guardados</h1>
      <p className="saved-header__keywords">
        Por palabras clave: 
        <span className="saved-header__keywords-bold"> Naturaleza, Yellowstone y 2 más</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
