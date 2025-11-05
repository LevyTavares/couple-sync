// client/src/components/UploadForm.jsx

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importa o navigate

// Reusando o estilo
import "./UploadForm.scss";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function UploadForm({ onUploadSuccess }) {
  const [description, setDescription] = useState("");
  const [photoDate, setPhotoDate] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate(); // Inicia o hook

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setFile(f);
  };

  // Criar preview quando o arquivo muda
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description || !photoDate) {
      toast.warn("Por favor, preencha todos os campos e escolha um arquivo.");
      return;
    }

    // 👇 1. LER O TOKEN DO LOCALSTORAGE 👇
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Acesso negado. Faça login.");
      navigate("/login");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("photoDate", photoDate);
      formData.append("imageFile", file);

      // 👇 2. ADICIONAR O TOKEN AO CABEÇALHO (HEADER) 👇
      //    (Nota: Para FormData, não definimos 'Content-Type',
      //     mas *podemos* e *devemos* definir 'Authorization')
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        toast.error("Sessão inválida. Faça login novamente.");
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro HTTP: ${response.status}`);
      }

      const novaFoto = await response.json();

      setUploading(false);
      toast.success("Foto enviada com sucesso!");

      setDescription("");
      setPhotoDate("");
      setFile(null);
      e.target.reset();

      onUploadSuccess(novaFoto);
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error(`Erro no upload: ${error.message}`);
      setUploading(false);
    }
  };

  // Suporte a arrastar-e-soltar
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="upload-form-container">
      <h3>Adicionar Nova Foto</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photoDate">Data da Foto</label>
          <input
            type="date"
            id="photoDate"
            value={photoDate}
            onChange={(e) => setPhotoDate(e.target.value)}
            disabled={uploading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileUpload">Arquivo da Foto</label>
          <div
            className={`dropzone ${file ? "has-file" : ""}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() =>
              !uploading && document.getElementById("fileUpload").click()
            }
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Pré-visualização"
                className="preview"
              />
            ) : (
              <span>Arraste e solte aqui, ou clique para escolher</span>
            )}
          </div>
          <input
            type="file"
            id="fileUpload"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            disabled={uploading}
            className="visually-hidden"
          />
        </div>

        <button type="submit" disabled={uploading}>
          {uploading ? "Enviando..." : "Enviar Foto"}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
