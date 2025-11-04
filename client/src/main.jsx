// client/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'

// 1. Importa o roteador
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx' // Este será nosso "Layout" principal

// 2. Importa nossas novas páginas
import GalleryPage from './pages/GalleryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

import './index.css' // Estilos globais

// 3. Cria o "mapa" do site
const router = createBrowserRouter([
  {
    path: "/", // O caminho raiz
    element: <App />, // Usa App.jsx como o "layout" (casca)
    // "children" são as páginas que vão aparecer *dentro* do App.jsx
    children: [
      {
        path: "/", // A página inicial
        element: <GalleryPage />, // Será a galeria
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
    {/* 4. Diz ao React para usar o roteador */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)