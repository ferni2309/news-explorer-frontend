# News Explorer - Front-end

Este es el repositorio del front-end para el proyecto final de TripleTen. **News Explorer** es una plataforma interactiva donde los usuarios pueden buscar noticias de todo el mundo utilizando una API externa y guardar sus artículos favoritos en una cuenta personal protegida por autenticación.

## Tecnologías Utilizadas

*   **React**: Biblioteca principal para la construcción de la interfaz de usuario.
*   **Vite**: Herramienta de construcción (build tool) para un entorno de desarrollo rápido.
*   **React Router Dom**: Gestión de rutas para la navegación entre la página principal y los artículos guardados.
*   **BEM Methodology**: Organización de CSS siguiendo la convención Block Element Modifier para estilos escalables y mantenibles.
*   **News API**: Integración con servicios de terceros para la recuperación de noticias en tiempo real.
*   **ESLint (Airbnb Style Guide)**: Garantía de calidad de código siguiendo estándares profesionales.

## Requisitos e Instalación

Para ejecutar este proyecto localmente, asegúrate de tener instalado [Node.js](https://nodejs.org).

1. Clona este repositorio:
   ```bash
   git clone https://github.com/ferni2309/news-explorer-frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz y añade tu API Key:
   ```text
   VITE_NEWS_API_KEY=tu_clave_aqui
   VITE_API_URL=http://localhost:3000
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

*   `/src/components`: Componentes reutilizables de React (Header, Footer, NewsCard, etc.).
*   `/src/utils`: Servicios de API, funciones de utilidad y hooks personalizados.
*   `/src/images`: Recursos gráficos y vectores optimizados.
*   `/src/vendor`: Fuentes WOFF y estilos de normalización.
