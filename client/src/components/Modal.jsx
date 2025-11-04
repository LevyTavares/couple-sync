// client/src/components/Modal.jsx

import React from 'react';
import './Modal.scss'; // Vamos criar este ficheiro de estilo

function Modal({ isOpen, onClose, title, children }) {
  
  // Se o modal não estiver aberto (isOpen: false), não renderiza nada
  if (!isOpen) {
    return null;
  }

  // Impede que o clique DENTRO do modal feche o modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // O "onClose" será chamado quando clicarmos no fundo escuro
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-button" onClick={onClose}>
            &times; {/* (Símbolo de "X") */}
          </button>
        </div>
        
        <div className="modal-body">
          {children} {/* É aqui que o nosso UploadForm vai aparecer */}
        </div>
        
      </div>
    </div>
  );
}

export default Modal;