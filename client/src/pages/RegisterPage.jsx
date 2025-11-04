// client/src/pages/RegisterPage.jsx

import { useState } from 'react';
// 👇 NOVOS IMPORTS
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Para dar feedback

// Reusando o estilo
import '../components/UploadForm.scss';

// Pega a URL da API
const API_URL = import.meta.env.VITE_API_BASE_URL;

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para desabilitar o botão
  
  // 👇 HOOK para navegar (redirecionar)
  const navigate = useNavigate();

  // 👇 ATUALIZAÇÃO DA FUNÇÃO handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Chama o nosso endpoint de registro no backend
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o backend der um erro (ex: "Email já em uso"), 'data.error' terá a mensagem
        throw new Error(data.error || 'Falha no registro.');
      }

      // 2. Sucesso!
      toast.success('Conta criada com sucesso! Por favor, faça o login.');
      
      // 3. Redireciona o usuário para a página de login
      navigate('/login');

    } catch (error) {
      console.error('Erro no registro:', error);
      toast.error(error.message); // Mostra o erro exato no toast
      setIsLoading(false);
    }
    // Não precisamos de setIsLoading(false) no 'try'
    // porque o usuário será redirecionado
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
            disabled={isLoading} // Desabilita enquanto carrega
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
            disabled={isLoading} // Desabilita enquanto carrega
            required
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Já tem uma conta? <Link to="/login">Faça login aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;