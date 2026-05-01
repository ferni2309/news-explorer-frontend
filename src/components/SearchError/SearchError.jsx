import React from 'react';
import './Searcherror.css'

function SearchError({ message }) {
  return (
    <div className="search-error">
      <p className="search-error__text">
        { message }
      </p>
    </div>
  );
}

export default SearchError;
