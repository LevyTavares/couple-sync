// client/src/pages/GalleryPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import PhotoCard from '../components/PhotoCard';
import UploadForm from '../components/UploadForm';
import Modal from '../components/Modal'; // 1. IMPORTA O NOVO MODAL
import { toast } from 'react-toastify'; 

const API_URL = import.meta.env.VITE_API_BASE_URL;

function GalleryPage() {
  const [fotos, setFotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 2. NOVO ESTADO para controlar o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    async function getFotos() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          toast.error('Acesso negado. Por favor, faça login.');
          navigate('/login'); 
          return;
        }
        
        const response = await fetch(`${API_URL}/fotos`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.status === 401) {
          toast.error('Sessão inválida. Faça login novamente.');
          localStorage.removeItem('authToken'); 
          navigate('/login');
          return;
        }
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        const data = await response.json();
        setFotos(data);
      } catch (error) {
        console.error('Erro ao buscar fotos:', error);
        toast.error(error.message || 'Erro ao carregar fotos.');
      } finally {
        setIsLoading(false);
      }
    }
    getFotos();
  }, [navigate]); 

  // 3. ATUALIZA handleNewFoto para fechar o modal
  const handleNewFoto = (novaFoto) => {
    setFotos(currentFotos => [novaFoto, ...currentFotos]);
    setIsModalOpen(false); // Fecha o modal após o sucesso!
  };

  // Função para DELETAR uma foto (com lógica de fetch completa)
  const handleDeleteFoto = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Acesso negado. Faça login.');
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/fotos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  // Função para ATUALIZAR uma foto (com lógica de fetch completa)
  const handleUpdateFoto = async (id, novosDados) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Acesso negado. Faça login.');
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/fotos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
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

      {/* NOVO BOTÃO FLUTUANTE "+" */}
      <button 
        className="fab-add-button" 
        onClick={() => setIsModalOpen(true)}
      >
        +
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
    </>
  );
}

export default GalleryPage;