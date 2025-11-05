/**
 * Página Galeria
 * - Busca fotos autenticadas e exibe em grid.
 * - Permite upload (modal), edição de descrição/data e exclusão.
 * - Redireciona para /login se o token estiver ausente/expirado.
 */
// client/src/pages/GalleryPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhotoCard from "../components/PhotoCard";
import UploadForm from "../components/UploadForm";
import Modal from "../components/Modal"; // 1. IMPORTA O NOVO MODAL
import { toast } from "react-toastify";
import Lightbox from "../components/Lightbox";
import { useFavorites } from "../lib/useFavorites";
import { FiPlus } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function GalleryPage({ initialShowFavs = false }) {
  const [fotos, setFotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. NOVO ESTADO para controlar o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFavs, setShowFavs] = useState(!!initialShowFavs);

  const { isFavorite, toggleFavorite } = useFavorites();

  const navigate = useNavigate();

  useEffect(() => {
    async function getFotos() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Acesso negado. Por favor, faça login.");
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/fotos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          toast.error("Sessão inválida. Faça login novamente.");
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const data = await response.json();
        setFotos(data);
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
        toast.error(error.message || "Erro ao carregar fotos.");
      } finally {
        setIsLoading(false);
      }
    }
    getFotos();
  }, [navigate]);

  // 3. ATUALIZA handleNewFoto para fechar o modal
  const handleNewFoto = (novaFoto) => {
    setFotos((currentFotos) => [novaFoto, ...currentFotos]);
    setIsModalOpen(false); // Fecha o modal após o sucesso!
  };

  // Função para DELETAR uma foto (com lógica de fetch completa)
  const handleDeleteFoto = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Acesso negado. Faça login.");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/fotos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      setFotos((currentFotos) => currentFotos.filter((foto) => foto.id !== id));
      toast.success("Foto apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar foto:", error);
      toast.error("Ups, algo correu mal ao apagar a foto.");
    }
  };

  // Função para ATUALIZAR uma foto (com lógica de fetch completa)
  const handleUpdateFoto = async (id, novosDados) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Acesso negado. Faça login.");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/fotos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novosDados),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const fotoAtualizada = await response.json();
      setFotos((currentFotos) =>
        currentFotos.map((foto) => (foto.id === id ? fotoAtualizada : foto))
      );
      toast.success("Descrição atualizada!");
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
      toast.error("Ups, algo correu mal ao atualizar a foto.");
    }
  };

  // Tela de Carregamento (continua igual)
  if (isLoading) {
    return (
      <div className="loading-container">
        <h2>Carregando memórias...</h2>
      </div>
    );
  }

  // JSX da Galeria (AGORA MAIS LIMPO)
  return (
    <>
      {/* O UploadForm e a <hr> foram removidos daqui */}

      {/* Toolbar simples */}
      <div
        className="gallery-toolbar container"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          padding: "0 16px",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        <button
          className={`home-button ${showFavs ? "primary" : "secondary"}`}
          onClick={() => setShowFavs((v) => !v)}
        >
          {showFavs ? "Mostrando favoritos" : "Mostrar favoritos"}
        </button>
      </div>

      <div className="photo-grid">
        {fotos.length > 0 ? (
          (showFavs ? fotos.filter((f) => isFavorite(f.id)) : fotos).map(
            (foto) => (
              <PhotoCard
                key={foto.id}
                foto={foto}
                onDelete={handleDeleteFoto}
                onUpdate={handleUpdateFoto}
                onOpen={() => {
                  const base = showFavs
                    ? fotos.filter((f) => isFavorite(f.id))
                    : fotos;
                  const idx = base.findIndex((f) => f.id === foto.id);
                  setLightboxIndex(idx < 0 ? 0 : idx);
                  setIsLightboxOpen(true);
                }}
                isFav={isFavorite(foto.id)}
                onToggleFav={toggleFavorite}
              />
            )
          )
        ) : (
          <div className="empty-gallery">
            <h2>Nenhuma memória aqui ainda...</h2>
            <p>Que tal adicionar a sua primeira foto?</p>
            <button
              className="home-button primary"
              style={{ marginTop: "1rem" }}
              onClick={() => setIsModalOpen(true)}
            >
              Adicionar foto
            </button>
          </div>
        )}
      </div>

      {/* NOVO BOTÃO FLUTUANTE "+" */}
      <button
        className="fab-add-button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Adicionar foto"
        title="Adicionar foto"
        data-label="Adicionar"
      >
        <FiPlus />
      </button>

      {/* O MODAL (invisível até 'isModalOpen' ser true) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Nova Foto"
      >
        {/* O UploadForm agora vive aqui dentro! */}
        <UploadForm onUploadSuccess={handleNewFoto} />
      </Modal>

      {isLightboxOpen && (
        <Lightbox
          fotos={showFavs ? fotos.filter((f) => isFavorite(f.id)) : fotos}
          startIndex={lightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}

export default GalleryPage;
