// client/src/pages/GalleryPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. IMPORTAR O useNavigate
import PhotoCard from '../components/PhotoCard';
import UploadForm from '../components/UploadForm';
import { toast } from 'react-toastify'; 

const API_URL = import.meta.env.VITE_API_BASE_URL;

function GalleryPage() {
  const [fotos, setFotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // 2. INICIAR O hook

  useEffect(() => {
    async function getFotos() {
      try {
        // 3. LER O TOKEN DO LOCALSTORAGE
        const token = localStorage.getItem('authToken');

        if (!token) {
          toast.error('Acesso negado. Por favor, faça login.');
          navigate('/login'); // Redireciona se não houver token
          return;
        }
        
        // 4. ADICIONAR O TOKEN AO CABEÇALHO (HEADER)
        const response = await fetch(`${API_URL}/fotos`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.status === 401) {
          // Se o token for inválido ou expirado
          toast.error('Sessão inválida. Por favor, faça login novamente.');
          localStorage.removeItem('authToken'); // Limpa o token inválido
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
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
  }, [navigate]); // Adiciona 'navigate' às dependências do useEffect

  // Função para ADICIONAR uma foto (do UploadForm)
  const handleNewFoto = (novaFoto) => {
    setFotos(currentFotos => [novaFoto, ...currentFotos]);
  };

  // Função para DELETAR uma foto
  const handleDeleteFoto = async (id) => {
    try {
      // 5. ADICIONAR O TOKEN AQUI TAMBÉM
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

  // Função para ATUALIZAR uma foto
  const handleUpdateFoto = async (id, novosDados) => {
    try {
      // 6. ADICIONAR O TOKEN AQUI TAMBÉM
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
          'Authorization': `Bearer ${token}` // Adiciona o token aqui
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