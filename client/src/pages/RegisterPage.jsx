// client/src/pages/RegisterPage.jsx

import { useState, useEffect } from "react"; // 1. IMPORTAR useEffect
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../components/UploadForm.scss";
import InputField from "../components/InputField";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // 2. USAR O navigate

  // 3. ADICIONAR A MESMA VERIFICAÇÃO
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/galeria");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha no registro.");
      }

      toast.success("Conta criada com sucesso! Por favor, faça o login.");
      navigate("/login");
    } catch (error) {
      console.error("Erro no registro:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h3>Registrar Nova Conta</h3>
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
          autoComplete="new-password"
          placeholder="Crie uma senha"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Já tem uma conta? <Link to="/login">Faça login aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
