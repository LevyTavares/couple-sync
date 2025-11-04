import { useState } from 'react';
import './PhotoCard.scss';

// Recebe a nova prop "onUpdate"
function PhotoCard({ foto, onDelete, onUpdate }) {
  
  // CRIA ESTADOS LOCAIS PARA O MODO DE EDIÇÃO
  const [isEditing, setIsEditing] = useState(false);
  // Guarda os valores dos inputs de edição
  const [editDescription, setEditDescription] = useState(foto.description);
  const [editPhotoDate, setEditPhotoDate] = useState(foto.photo_date);

  // Função para o botão "X" (Delete)
  const handleDeleteClick = () => {
    if (window.confirm('Tem a certeza que quer apagar esta foto?')) {
      onDelete(foto.id);
    }
  };

  // FUNÇÃO PARA LIDAR COM O "SALVAR"
  const handleSaveClick = () => {
    // Chama a função que veio do App.jsx
    onUpdate(foto.id, {
      description: editDescription,
      photoDate: editPhotoDate
    });
    setIsEditing(false); // Sai do modo de edição
  };

  // FUNÇÃO PARA "CANCELAR" A EDIÇÃO
  const handleCancelClick = () => {
    setIsEditing(false);
    // Reseta os valores para os originais
    setEditDescription(foto.description);
    setEditPhotoDate(foto.photo_date);
  };

  // O JSX AGORA TERÁ DUAS VERSÕES (NORMAL E EDIÇÃO)
  return (
    <div className="photo-card">
      {/* --- BOTÕES DE AÇÃO --- */}
      {isEditing ? (
        // Estamos em Modo de Edição
        <>
          <button className="action-button save" onClick={handleSaveClick}>✓</button>
          <button className="action-button cancel" onClick={handleCancelClick}>×</button>
        </>
      ) : (
        // Estamos em Modo Normal (Visualização)
        <>
          <button className="action-button delete" onClick={handleDeleteClick}>&times;</button>
          <button className="action-button edit" onClick={() => setIsEditing(true)}>✎</button>
        </>
      )}
      
      {/* --- CONTEÚDO DO CARD --- */}
      <img 
        src={foto.image_url} 
        alt={editDescription} 
        className="photo-card-image" 
      />
      
      <div className="photo-card-info">
        {isEditing ? (
          // Modo de Edição: Mostra inputs
          <>
            <input 
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-input"
            />
            <input 
              type="date"
              // Formata a data para o input (YYYY-MM-DD)
              value={new Date(editPhotoDate).toISOString().split('T')[0]}
              onChange={(e) => setEditPhotoDate(e.target.value)}
              className="edit-input"
            />
          </>
        ) : (
          // Modo Normal: Mostra textos
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