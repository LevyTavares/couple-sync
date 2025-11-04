// client/src/pages/RegisterPage.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

// Reusando o estilo
import '../components/UploadForm.scss';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Lógica de Registro (chamar /api/register)
    console.log('Dados do Registro:', { email, password });
  };

  return (
    <div className="upload-form-container">
      <h3>Registrar Nova Conta</h3>
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

        <button type="submit">Registrar</button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Já tem uma conta? <Link to="/login">Faça login aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;