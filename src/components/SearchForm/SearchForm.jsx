import React from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="search-form__input" 
        placeholder="Introduce un tema"
        onChange={(e) => setKeyword(e.target.value)}
        required 
      />
      <button type="submit" className="search-form__button">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
