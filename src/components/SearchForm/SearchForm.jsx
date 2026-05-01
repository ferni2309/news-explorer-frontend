import React from 'react';
import './SearchForm.css';

function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="search-form__input" 
        placeholder="Introduce un tema"
        required 
      />
      <button type="submit" className="search-form__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
