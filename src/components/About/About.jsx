import React from 'react';
import './About.css';
import authorImage from '../../images/author.jpg';

function About() {
  return (
    <section className="about">
      <img className="about__image" src={authorImage} alt="Autor del proyecto" />
      <div className="about__content">
        <h2 className="about__title">Acerca del autor</h2>
        <p className="about__text">
          ¡Hola! Soy Fernando Orozco Rodríguez, un desarrollador Full Stack apasionado por crear 
          soluciones digitales que conecten a las personas con la información.
        </p>
        <p className="about__text">
          En este proyecto, utilicé React, Vite y metodologías como BEM para 
          construir una plataforma de búsqueda de noticias robusta y profesional, 
          integrando APIs de terceros y un back-end personalizado.
        </p>
      </div>
    </section>
  );
}

export default About;
