// client/src/components/PhotoCard.jsx
/**
 * Card de foto
 * - Mostra imagem, descrição e data.
 * - Ações: editar (inline), salvar/cancelar e apagar.
 * - Botões aparecem ao hover para interface mais limpa.
 */
import { useState } from "react";
// 👇 1. IMPORTA ÍCONES CORRETOS DA FAMÍLIA FEATHER
import {
  FiEdit,
  FiTrash2,
  FiCheck,
  FiX,
  FiHeart,
  FiDownload,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import ConfirmDialog from "./ConfirmDialog";
import "./PhotoCard.scss";

function PhotoCard({ foto, onDelete, onUpdate, onOpen, isFav, onToggleFav }) {
  // Helpers de data para evitar erros de "Invalid Date" e aceitar formatos variados
  const toInputDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toISOString().split("T")[0];
    // tenta dd/mm/yyyy ou dd-mm-yyyy
    const m = String(value).match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    return "";
  };

  const formatDisplayDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toLocaleDateString();
    const m = String(value).match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
    if (m) return new Date(`${m[3]}-${m[2]}-${m[1]}`).toLocaleDateString();
    return String(value);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(foto.description);
  const [editPhotoDate, setEditPhotoDate] = useState(foto.photo_date);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleSaveClick = () => {
    onUpdate(foto.id, {
      description: editDescription,
      photoDate: editPhotoDate,
    });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditDescription(foto.description);
    setEditPhotoDate(foto.photo_date);
  };

  const handleDownload = async (e) => {
    e?.stopPropagation?.();
    const url = foto?.image_url;
    if (!url) return;

    try {
      // 1) Cloudinary: use fl_attachment para forçar download (sem CORS/Blob)
      if (url.includes("/upload/")) {
        const attachmentUrl = url.replace("/upload/", "/upload/fl_attachment/");
        const a = document.createElement("a");
        a.href = attachmentUrl;
        // tenta sugerir um nome, caso o provedor honre
        const fileName = url.split("/").pop()?.split("?")[0] || "foto.jpg";
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }

      // 2) Fallback genérico: baixa como Blob e cria URL local
      const resp = await fetch(url, { mode: "cors" });
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const fileName = url.split("/").pop()?.split("?")[0] || "foto.jpg";
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Em caso de bloqueio CORS, como último recurso abre em nova aba
      // e registramos o erro no console para diagnóstico
      console.debug("Falha no download da imagem:", error);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="photo-card">
        {/* Botão de favorito (lado esquerdo) */}
        <button
          className={`favorite-button ${isFav ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(foto.id);
          }}
          title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFav}
          aria-label={
            isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          {isFav ? <FaHeart /> : <FiHeart />}
        </button>
        {/* --- BOTÕES DE AÇÃO (AGORA COM ÍCONES) --- */}
        {isEditing ? (
          <>
            {/* 👇 2. SUBSTITUI '✓' PELO ÍCONE */}
            <button
              className="action-button save"
              onClick={handleSaveClick}
              title="Salvar alterações"
              aria-label="Salvar alterações"
            >
              <FiCheck />
            </button>
            {/* 👇 3. SUBSTITUI '×' PELO ÍCONE */}
            <button
              className="action-button cancel"
              onClick={handleCancelClick}
              title="Cancelar edição"
              aria-label="Cancelar edição"
            >
              <FiX />
            </button>
          </>
        ) : (
          <>
            {/* Botão de download */}
            <button
              className="action-button download"
              onClick={handleDownload}
              title="Baixar imagem"
              aria-label="Baixar imagem"
            >
              <FiDownload />
            </button>
            {/* 👇 4. SUBSTITUI '&times;' PELO ÍCONE */}
            <button
              className="action-button delete"
              onClick={handleDeleteClick}
              title="Apagar foto"
              aria-label="Apagar foto"
            >
              <FiTrash2 />
            </button>
            {/* 👇 5. SUBSTITUI '✎' PELO ÍCONE */}
            <button
              className="action-button edit"
              onClick={() => setIsEditing(true)}
              title="Editar descrição/data"
              aria-label="Editar descrição e data"
            >
              <FiEdit />
            </button>
          </>
        )}

        {/* --- CONTEÚDO DO CARD (Não muda) --- */}
        <img
          src={foto.image_url}
          alt={editDescription}
          className="photo-card-image"
          onClick={() => onOpen?.(foto)}
          role="button"
        />

        <div className="photo-card-info">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="edit-input"
              />
              <input
                type="date"
                value={toInputDate(editPhotoDate)}
                onChange={(e) => setEditPhotoDate(e.target.value)}
                className="edit-input"
              />
            </>
          ) : (
            <>
              <p className="photo-card-description">{foto.description}</p>
              <span className="photo-card-date">
                {formatDisplayDate(foto.photo_date)}
              </span>
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Apagar foto"
        message="Tem certeza de que deseja remover esta memória? Esta ação não pode ser desfeita."
        confirmText="Apagar"
        cancelText="Cancelar"
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(foto.id);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default PhotoCard;
