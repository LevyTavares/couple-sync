// client/src/App.jsx

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

// 1. IMPORTA O NOVO NAVBAR
import Navbar from './components/Navbar';

function App() {
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
    
      {/* 2. SUBSTITUI O <header> ANTIGO PELO <Navbar /> */}
      <Navbar />
      
      {/* 3. <main> segura o conteúdo da página que muda */}
      <main>
        <Outlet />
      </main>
    
    </div>
  );
}

export default App;