// client/src/pages/HomePage.jsx
/**
 * Landing Page
 * - Apresenta o produto e CTAs para login/registro.
 */
import React from "react";
import { Link } from "react-router-dom"; // Para criar links
import "./HomePage.scss"; // Vamos criar este ficheiro de estilo

function HomePage() {
  return (
    <div className="home-container">
      <div className="love-banner" role="note" aria-label="Mensagem especial">
        <div className="hearts" aria-hidden>
          ❤︎ ❤︎ ❤︎
        </div>
        <p>
          Cada foto guarda um pedacinho da nossa história. Que esta galeria seja
          um lugar para revisitarmos sorrisos e construirmos novas memórias,
          lado a lado.
        </p>
      </div>
      <div className="home-content">
        <h2 className="home-title">Bem-vindo à Nossa Galeria de Memórias</h2>
        <p className="home-subtitle">
          Um espaço privado para guardar os momentos que partilhamos e amamos.
        </p>
        <div className="home-buttons">
          <Link to="/login" className="home-button primary">
            Fazer Login
          </Link>
          <Link to="/register" className="home-button secondary">
            Registrar-se
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
