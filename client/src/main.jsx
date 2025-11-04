// client/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx' // O nosso "Layout" principal

// Importa todas as nossas páginas
import HomePage from './pages/HomePage.jsx'; // 👈 A NOVA PÁGINA
import GalleryPage from './pages/GalleryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

import './index.css' // Estilos globais

// Cria o "mapa" do site atualizado
const router = createBrowserRouter([
  {
    path: "/", // O caminho raiz
    element: <App />, // Usa App.jsx como o "layout" (casca)
    children: [
      {
        path: "/", // A página inicial AGORA É A HOMEPAGE
        element: <HomePage />,
      },
      {
        path: "/galeria", // A GALERIA MUDOU-SE PARA AQUI
        element: <GalleryPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)