// client/src/pages/GalleryPage.jsx

import { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import UploadForm from '../components/UploadForm';
import { toast } from 'react-toastify'; // Importa o toast

const API_URL = import.meta.env.VITE_API_BASE_URL;

function GalleryPage() {
  const [fotos, setFotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFotos() {
      try {
        // Garante que a API_URL foi lida
        if (!API_URL) {
          throw new Error("VITE_API_BASE_URL não foi definida. Verifique o .env.local e reinicie o servidor.");
        }

        const response = await fetch(`${API_URL}/fotos`);

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setFotos(data);

      } catch (error) {
        console.error('Erro ao buscar fotos:', error);
        // Mostra o erro para o utilizador
        toast.error(`Erro ao carregar fotos: ${error.message}`);

      } finally {
        // 👇 ESTE É O PASSO CRUCIAL 👇
        // Isto corre sempre (com sucesso ou com erro)
        setIsLoading(false);
      }
    }

    getFotos();
  }, []); 

  // Funções de CRUD (com a lógica de fetch completa)
  const handleNewFoto = (novaFoto) => {
    setFotos(currentFotos => [novaFoto, ...currentFotos]);
  };

  const handleDeleteFoto = async (id) => {
    try {
      const response = await fetch(`${API_URL}/fotos/${id}`, {
        method: 'DELETE',
        // TODO: Adicionar o 'Authorization' header aqui quando tivermos login
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      setFotos(currentFotos => currentFotos.filter(foto => foto.id !== id));
      toast.success('Foto apagada com sucesso!');

    } catch (error) {
      console.error('Erro ao apagar foto:', error);
      toast.error('Ups, algo correu mal ao apagar a foto.');
    }
  };

  const handleUpdateFoto = async (id, novosDados) => {
    try {
      const response = await fetch(`${API_URL}/fotos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Adicionar o 'Authorization' header aqui
        },
        body: JSON.stringify(novosDados),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const fotoAtualizada = await response.json();
      setFotos(currentFotos => 
        currentFotos.map(foto => 
          foto.id === id ? fotoAtualizada : foto
        )
      );
      toast.success('Descrição atualizada!');

    } catch (error) {
      console.error('Erro ao atualizar foto:', error);
      toast.error('Ups, algo correu mal ao atualizar a foto.');
    }
  };

  // Tela de Carregamento
  if (isLoading) {
    return (
      <div className="loading-container">
        <h2>Carregando memórias...</h2>
      </div>
    );
  }

  // JSX da Galeria
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