// client/src/pages/GalleryPage.jsx

import { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import UploadForm from '../components/UploadForm';

// NOTA: Os estilos do App.scss (como .photo-grid) ainda funcionam
// porque o App.scss é importado no App.jsx (nosso "pai").

const API_URL = import.meta.env.VITE_API_BASE_URL;

function GalleryPage() {
  // Toda a lógica que estava no App.jsx agora mora aqui
  const [fotos, setFotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFotos() {
      try {
        const response = await fetch(`${API_URL}/fotos`);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setFotos(data);
      } catch (error) {
        console.error('Erro ao buscar fotos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getFotos();
  }, []); 

  // Funções de CRUD (exatamente como antes)
  const handleNewFoto = (novaFoto) => {
    setFotos(currentFotos => [novaFoto, ...currentFotos]);
  };

  const handleDeleteFoto = async (id) => {
    // (A lógica de delete com fetch e toast.success/toast.error vai aqui)
    // Por enquanto, vamos apenas remover do estado:
    try {
      // TODO: Adicionar a lógica real de fetch DELETE
      setFotos(currentFotos => currentFotos.filter(foto => foto.id !== id));
      // toast.success('Foto apagada!'); // Você precisará importar o 'toast' se quiser usá-lo aqui
    } catch (error) {
       // toast.error('Erro ao apagar foto.');
       console.error(error);
    }
  };

  const handleUpdateFoto = async (id, novosDados) => {
    // (A lógica de update com fetch e toast.success/toast.error vai aqui)
    // Por enquanto, vamos apenas atualizar o estado:
    try {
      // TODO: Adicionar a lógica real de fetch PUT
       setFotos(currentFotos => 
         currentFotos.map(foto => 
           foto.id === id ? { ...foto, ...novosDados } : foto
         )
       );
      // toast.success('Foto atualizada!');
    } catch (error) {
      // toast.error('Erro ao atualizar foto.');
      console.error(error);
    }
  };

  // Tela de Carregamento (específica desta página)
  if (isLoading) {
    return (
      <div className="loading-container">
        <h2>Carregando memórias...</h2>
      </div>
    );
  }

  // O JSX que estava no App.jsx (UploadForm, hr, photo-grid)
  return (
    <>
      <UploadForm onUploadSuccess={handleNewFoto} />

      <hr />

      <div className="photo-grid">
        {fotos.length > 0 ? (
          fotos.map((foto) => (
            <PhotoCard 
              key={foto.id} 
              foto={foto} 
              onDelete={handleDeleteFoto}
              onUpdate={handleUpdateFoto}
            />
          ))
        ) : (
          <div className="empty-gallery">
            <h2>Nenhuma memória aqui ainda...</h2>
            <p>Que tal adicionar a sua primeira foto?</p>
          </div>
        )}
      </div>
    </>
  );
}

export default GalleryPage;