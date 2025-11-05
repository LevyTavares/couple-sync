// client/src/pages/LoginPage.jsx
/**
 * Página de Login
 * - Autentica via /api/login e armazena token.
 * - Em caso de sucesso, redireciona para /galeria.
 */
import { useState } from "react";
// 👇 NOVOS IMPORTS
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMail, FiLock } from "react-icons/fi";
import InputField from "../components/InputField.jsx";

// Reusando o estilo
import "../components/UploadForm.scss";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 👇 ATUALIZAÇÃO DA FUNÇÃO handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Chama o nosso endpoint de login no backend
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o backend der um erro (ex: "Email ou senha inválidos")
        throw new Error(data.error || "Falha no login.");
      }

      // 2. SUCESSO! O backend enviou-nos um token.

      // 3. Guarda o token no localStorage do navegador
      //    (localStorage é uma "memória" que persiste mesmo se fecharmos a aba)
      localStorage.setItem("authToken", data.token);

      toast.success("Login bem-sucedido!");

      // 4. Redireciona o usuário para a página da galeria
      //    (que ainda está com aquele bug, mas vamos resolver isso a seguir)
      navigate("/galeria");
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error(error.message); // Mostra o erro exato no toast
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
          placeholder="seu@email.com"
          icon={<FiMail />}
          autoComplete="email"
        />
        <InputField
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
          placeholder="••••••••"
          icon={<FiLock />}
          autoComplete="current-password"
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
