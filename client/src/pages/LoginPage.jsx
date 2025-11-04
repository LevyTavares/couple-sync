// client/src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom'; // Para o link de "Registrar-se"

// Vamos reusar o estilo do formulário de upload!
import '../components/UploadForm.scss';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Lógica de Login (chamar /api/login)
    console.log('Dados do Login:', { email, password });
  };

  return (
    <div className="upload-form-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;