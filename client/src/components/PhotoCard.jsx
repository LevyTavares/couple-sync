// client/src/components/PhotoCard.jsx
/**
 * Card de foto
 * - Mostra imagem, descrição e data.
 * - Ações: editar (inline), salvar/cancelar e apagar.
 * - Botões aparecem ao hover para interface mais limpa.
 */
import { useState } from "react";
// 👇 1. IMPORTA ÍCONES CORRETOS DA FAMÍLIA FEATHER
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import ConfirmDialog from "./ConfirmDialog";
import "./PhotoCard.scss";

function PhotoCard({ foto, onDelete, onUpdate }) {
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

  return (
    <>
      <div className="photo-card">
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
                value={new Date(editPhotoDate).toISOString().split("T")[0]}
                onChange={(e) => setEditPhotoDate(e.target.value)}
                className="edit-input"
              />
            </>
          ) : (
            <>
              <p className="photo-card-description">{foto.description}</p>
              <span className="photo-card-date">
                {new Date(foto.photo_date).toLocaleDateString()}
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
