// client/src/components/PhotoCard.jsx

import { useState } from 'react';
// 👇 1. IMPORTA OS NOVOS ÍCONES
import { FeEdit, FeTrash2, FeCheck, FeX } from 'react-icons/fe';
import './PhotoCard.scss';

function PhotoCard({ foto, onDelete, onUpdate }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(foto.description);
  const [editPhotoDate, setEditPhotoDate] = useState(foto.photo_date);

  const handleDeleteClick = () => {
    if (window.confirm('Tem a certeza que quer apagar esta foto?')) {
      onDelete(foto.id);
    }
  };

  const handleSaveClick = () => {
    onUpdate(foto.id, {
      description: editDescription,
      photoDate: editPhotoDate
    });
    setIsEditing(false); 
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditDescription(foto.description);
    setEditPhotoDate(foto.photo_date);
  };

  return (
    <div className="photo-card">
      {/* --- BOTÕES DE AÇÃO (AGORA COM ÍCONES) --- */}
      {isEditing ? (
        <>
          {/* 👇 2. SUBSTITUI '✓' PELO ÍCONE */}
          <button className="action-button save" onClick={handleSaveClick}>
            <FeCheck />
          </button>
          {/* 👇 3. SUBSTITUI '×' PELO ÍCONE */}
          <button className="action-button cancel" onClick={handleCancelClick}>
            <FeX />
          </button>
        </>
      ) : (
        <>
          {/* 👇 4. SUBSTITUI '&times;' PELO ÍCONE */}
          <button className="action-button delete" onClick={handleDeleteClick}>
            <FeTrash2 />
          </button>
          {/* 👇 5. SUBSTITUI '✎' PELO ÍCONE */}
          <button className="action-button edit" onClick={() => setIsEditing(true)}>
            <FeEdit />
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
              value={new Date(editPhotoDate).toISOString().split('T')[0]}
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
  );
}

export default PhotoCard;