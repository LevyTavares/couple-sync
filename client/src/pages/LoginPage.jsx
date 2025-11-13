// client/src/pages/LoginPage.jsx

import { useState, useEffect } from "react"; // 1. IMPORTAR useEffect
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../components/UploadForm.scss";
import InputField from "../components/InputField";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // 2. USAR O navigate

  // 3. ADICIONAR ESTA VERIFICAÇÃO
  useEffect(() => {
    // Verifica se já existe um token
    const token = localStorage.getItem("authToken");
    if (token) {
      // Se existe, não o deixe ver esta página, mande-o para a galeria
      navigate("/galeria");
    }
  }, [navigate]); // O [navigate] garante que a função não corre desnecessariamente

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha no login.");
      }

      localStorage.setItem("authToken", data.token);
      toast.success("Login bem-sucedido!");
      navigate("/galeria"); // Redireciona APÓS o login
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        {/* ... (o resto do formulário JSX fica igual) ... */}
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="email"
          placeholder="seu@email.com"
        />
        <InputField
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="current-password"
          placeholder="Sua senha"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
