// client/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Para links e redirecionamento
import { toast } from 'react-toastify';
import './Navbar.scss'; // Vamos criar este ficheiro de estilos

function Navbar() {
  const navigate = useNavigate();

  // Verifica se o token existe no localStorage
  const token = localStorage.getItem('authToken');

  // Função de Logout
  const handleLogout = () => {
    // 1. Remove o token
    localStorage.removeItem('authToken');

    // 2. Avisa o utilizador
    toast.success('Sessão terminada com sucesso!');

    // 3. Redireciona para a página de login
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* A marca/título - Clicar aqui leva para a página inicial */}
      <Link to="/" className="navbar-brand">
        <svg 
          className="camera-icon" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M9.4 11.3l-1.4 1.4L12 16.7l4-4-1.4-1.4L12 13.9l-2.6-2.6zM20 5c0-1.1-.9-2-2-2h-3.17L13.4 1.4C13.2 1.15 12.8 1 12.5 1h-1c-.3 0-.6.15-.8.4L9.17 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5zm-2 14H6V5h3.17L10.4 3.4C10.6 3.15 10.8 3 11 3h2c.2 0 .4.15.6.4L14.83 5H18v14z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <h1>Galeria de Memórias</h1>
      </Link>

      {/* O menu da Navbar (com o botão de Sair) */}
      <div className="navbar-menu">
        {/* Mostra o botão de Sair APENAS SE o token existir */}
        {token && (
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        )}

        {/* Se não houver token (ex: na HomePage), este espaço fica vazio */}
      </div>
    </nav>
  );
}

export default Navbar;