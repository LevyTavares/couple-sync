import { useState } from 'react'
import { toast } from 'react-toastify'; // 👈 IMPORTA O TOAST
import './UploadForm.scss'

// Pega a URL da nossa API (do arquivo .env.local)
const API_URL = import.meta.env.VITE_API_BASE_URL

function UploadForm({ onUploadSuccess }) {
  
  // Estados para guardar os dados do formulário
  const [description, setDescription] = useState('')
  const [photoDate, setPhotoDate] = useState('')
  const [file, setFile] = useState(null)
  
  // Estado para feedback
  const [uploading, setUploading] = useState(false)
  // const [message, setMessage] = useState('') // 👈 NÃO PRECISAMOS MAIS DESTE

  // Lida com a seleção do arquivo
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  // Lida com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault() // Impede o recarregamento da página

    if (!file || !description || !photoDate) {
      // 👇 TROCAMOS 'setMessage' POR 'toast.warn'
      toast.warn('Por favor, preencha todos os campos e escolha um arquivo.')
      return
    }

    try {
      setUploading(true)
      // setMessage('Enviando dados para o servidor...') // 👈 LINHA REMOVIDA

      // 1. Criamos um "pacote" FormData
      const formData = new FormData()
      formData.append('description', description)
      formData.append('photoDate', photoDate)
      formData.append('imageFile', file) 

      // 2. Enviamos esse "pacote" para nossa API Express
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData, 
      })

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro HTTP: ${response.status}`);
      }

      const novaFoto = await response.json() 

      // 3. SUCESSO!
      setUploading(false)
      // 👇 TROCAMOS 'setMessage' POR 'toast.success'
      toast.success('Foto enviada com sucesso!');
      
      // Limpa o formulário
      setDescription('')
      setPhotoDate('')
      setFile(null)
      e.target.reset() // Reseta o input de arquivo
      
      onUploadSuccess(novaFoto) // Avisa o App.jsx

    } catch (error) {
      console.error('Erro no upload:', error)
      // 👇 TROCAMOS 'setMessage' POR 'toast.error'
      toast.error(`Erro no upload: ${error.message}`);
      setUploading(false)
    }
  }

  return (
    <div className="upload-form-container">
      <h3>Adicionar Nova Foto</h3>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input 
            type="text" 
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photoDate">Data da Foto</label>
          <input 
            type="date" 
            id="photoDate"
            value={photoDate}
            onChange={(e) => setPhotoDate(e.target.value)}
            disabled={uploading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileUpload">Arquivo da Foto</label>
          <input 
            type="file" 
            id="fileUpload"
            accept="image/png, image/jpeg" // Aceita apenas imagens
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        
        <button type="submit" disabled={uploading}>
          {uploading ? 'Enviando...' : 'Enviar Foto'}
        </button>
        
        {/* <p>...</p> 👈 NÃO PRECISAMOS MAIS DA MENSAGEM AQUI */}
      </form>
    </div>
  )
}

export default UploadForm