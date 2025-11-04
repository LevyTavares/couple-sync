// client/src/App.jsx

// 1. Importa o Outlet, que é o "espaço" onde as páginas (login, galeria) vão aparecer
import { Outlet } from 'react-router-dom';

// Importamos os estilos e o container de toast, pois eles são globais
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  // 2. O App.jsx agora é SÓ o layout.
  //    Toda a lógica de 'fotos', 'isLoading', 'handleDelete', etc.
  //    será movida para o GalleryPage.jsx

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* O <header> (título e ícone) ficará aqui,
        para aparecer em todas as páginas.
      */}
      <header className="app-header">
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
      </header>

      {/* 3. <Outlet /> é o "buraco" onde o React Router
           vai renderizar a página correta (GalleryPage, LoginPage, etc.)
      */}
      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default App;