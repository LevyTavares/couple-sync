# Couple Sync — Frontend (Vite + React)

Interface da galeria de memórias com autenticação, upload e visualização responsiva.

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

- Home: landing com CTA para login/registro
- Login/Register: autenticação; token é guardado em `localStorage`
- Galeria: lista fotos, permite editar descrição/data, apagar e fazer upload via modal

## Notas de UI/UX

- Tema escuro com variáveis em `src/index.css`
- Grid responsivo na galeria (`App.scss`)
- Navbar sticky com blur
- Upload com arrastar-e-soltar + preview

## Problemas comuns

- Se a galeria não carrega e aparece 401/403, faça login novamente (token expirado)
- Se o upload falhar, verifique `VITE_API_BASE_URL` e o backend
