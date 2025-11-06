# Couple Sync — Frontend (Vite + React)

Interface rica em React para uma galeria de memórias privada. Foco em UX acessível, tema escuro consistente e interações suaves.

## Requisitos

- Node.js 18+
- Backend rodando (veja `../api/README.md`)
- Variável `VITE_API_BASE_URL` apontando para a API

## Configuração

Crie um `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Edite o valor de `VITE_API_BASE_URL` conforme seu backend, por exemplo:

```
VITE_API_BASE_URL=http://localhost:4000/api
```

## Scripts

```bash
npm install       # instala dependências
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção
npm run preview   # pré-visualiza o build
```

## Páginas/Fluxos

- Home: landing + botão para Tutorial.
- Tutorial: guia passo a passo (ícones) sobre upload, edição, favoritos e tela cheia.
- Login / Register: autenticação (token salvo em `localStorage`).
- Galeria: grid responsivo, editar descrição/data inline, excluir com confirmação, favoritar, filtro de favoritos e Lightbox.

## Notas de UI/UX

- Tema dark com variáveis centralizadas (`src/index.css`) para cores, radius, sombras.
- Ações (editar, excluir, favorito) sempre visíveis para evitar dependência de hover em mobile.
- FAB estilizado com gradiente, animação de pulso e tooltip.
- Lightbox acessível: ESC fecha, setas navegam, botão para download.
- Confetti discreto apenas no primeiro upload do dia (celebração sem exagero).
- Inputs customizados com ícones e toggle de visibilidade de senha.

## Principais componentes

- `PhotoCard.jsx`: card da foto com ações, estado de edição e favorito.
- `UploadForm.jsx`: multipart + drag & drop + preview.
- `Lightbox.jsx`: visualização em tela cheia, navegação e download.
- `ConfirmDialog.jsx`: diálogo genérico de confirmação.
- `InputField.jsx`: campo de texto com ícone e toggle de senha.
- `useFavorites.js`: hook com persistência em `localStorage`.

## Problemas comuns

- 401 na galeria → token expirado ou ausente: faça login.
- Erro no upload → verifique URL da API ou credenciais do backend (Cloudinary / JWT).
- Imagem não aparece → checar `image_url` retornado e permissões do Cloudinary.

## Stack complementar

- React Router para rotas.
- React Toastify para feedback rápido.
- React Icons para ícones.
- SASS (SCSS) para composição e reutilização de estilos.
- canvas-confetti (import dinâmico) para efeito leve de celebração.

## Segurança no frontend

- Token guardado em `localStorage` (simples para demo; em produção usar httpOnly cookies/refresh).
- Sanitização indireta: descrição é enviada como plain text; exibir sempre como texto (sem dangerouslySetInnerHTML).
