import React from "react";
import "./Searcherror.css";

function SearchError() {
  return (
    <div className="search-error">
      <p className="search-error__text">
        Durante la búsqueda, ocurrió un error. Es posible que haya un problema
        de conexión o que el servidor no esté funcionando. Por favor, inténtalo
        más tarde.
      </p>
    </div>
  );
}

export default SearchError;
