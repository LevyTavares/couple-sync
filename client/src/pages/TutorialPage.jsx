// client/src/pages/TutorialPage.jsx
import React from "react";
import {
  FiUpload,
  FiEdit,
  FiTrash2,
  FiHeart,
  FiMaximize,
} from "react-icons/fi";
import "./TutorialPage.scss";

function Step({ icon, title, children }) {
  return (
    <div className="step-card">
      <div className="step-icon">{icon}</div>
      <div className="step-body">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default function TutorialPage() {
  return (
    <div className="tutorial-container">
      <header className="tutorial-header">
        <h2>Como usar a Galeria</h2>
        <p>Um guia rápido para guardar e celebrar os seus momentos.</p>
      </header>

      <section className="steps-grid">
        <Step icon={<FiUpload />} title="Adicionar fotos">
          Clique no botão vermelho + no canto para abrir o formulário. Escolha a
          imagem, descreva o momento e adicione a data. Depois é só enviar.
        </Step>
        <Step icon={<FiEdit />} title="Editar detalhes">
          Use o botão de lápis no cartão para alterar descrição e data. Salve
          com o check ou cancele com o X.
        </Step>
        <Step icon={<FiTrash2 />} title="Apagar memórias">
          Apague clicando na lixeira. Um diálogo de confirmação garante que
          ninguém apaga nada por engano.
        </Step>
        <Step icon={<FiHeart />} title="Favoritar e filtrar">
          Marque as preferidas com o coração e use “Mostrar favoritos” para ver
          só as que mais ama.
        </Step>
        <Step icon={<FiMaximize />} title="Ver em tela cheia">
          Clique na foto para abrir o Lightbox. Use ESC para sair e as setas do
          teclado para navegar. Dá até para baixar a imagem.
        </Step>
      </section>
    </div>
  );
}
