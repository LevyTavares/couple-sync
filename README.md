# Couple Sync

Projeto full‑stack de uma galeria privada de memórias. O foco é oferecer uma experiência bonita e fluida para guardar fotos com descrição e data, com autenticação e upload otimizado.

Este repositório é um monorepo com:

- Frontend em React (Vite) — navegação com React Router, UI em tema escuro (SCSS), toasts e pequenos efeitos que deixam a experiência especial.
- Backend em Node.js/Express — API REST com autenticação JWT, persistência em PostgreSQL (Neon) e imagens no Cloudinary.

## Sobre o projeto (para apresentação)

Couple Sync é uma galeria de memórias feita para casais guardarem momentos importantes. A aplicação permite:

- criar conta e fazer login (JWT);
- enviar fotos (drag‑and‑drop), com descrição e data;
- editar e excluir memórias com confirmação segura;
- favoritar e filtrar favoritas (persistência local);
- ver as fotos em tela cheia (Lightbox) e baixar a imagem;
- consultar um tutorial rápido dentro do app.

### Por que essas tecnologias?

- React + Vite: produtividade alta, HMR rápido e ecossistema moderno.
- Express.js: API leve, direta e fácil de estender.
- Neon (PostgreSQL serverless): Postgres compatível com drivers padrão, conexão SSL e excelente para projetos acadêmicos/demonstração.
- Cloudinary: armazenamento e CDN de imagens pronto para produção; não guardamos binários no banco.

## Arquitetura

```
Cliente (React)
	↕  HTTP/JSON (Bearer Token)
API (Express)
	↔ PostgreSQL (Neon)  → metadados das fotos (description, photo_date, image_url)
	↔ Cloudinary         → armazenamento das imagens
```

Fluxo de Upload (alto nível):

1. Usuário escolhe a imagem e preenche descrição/data.
2. Front envia multipart/form‑data com o token.
3. API valida JWT, faz upload para Cloudinary e grava metadados no Postgres.
4. API retorna a foto criada com `image_url` pronto para uso/CDN.

## Estrutura

```
./
├─ api/           # Backend (Express + PostgreSQL + Cloudinary)
└─ client/        # Frontend (Vite + React Router + Toastify + SASS)
```

## Pré‑requisitos

- Node.js 18+ e npm
- Conta no PostgreSQL (ex.: Neon) e uma DATABASE_URL
- Conta no Cloudinary (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)

## Variáveis de ambiente

Crie os arquivos .env a partir dos exemplos:

- `api/.env` (baseado em `api/.env.example`):

```
PORT=4000
DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=defina-uma-chave-segura
CLOUDINARY_CLOUD_NAME=xxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxx
```

- `client/.env` (baseado em `client/.env.example`):

```
VITE_API_BASE_URL=http://localhost:4000/api
```

## Como rodar em desenvolvimento

Abra dois terminais ou use um gerenciador de workspaces.

Backend (api/):

```bash
cd api
npm install
npm run dev
```

Frontend (client/):

```bash
cd client
npm install
npm run dev
```

Acesse o app em http://localhost:5173 (ou a porta indicada pelo Vite).

## Build de produção

Frontend:

```bash
cd client
npm run build
npm run preview
```

Backend:

```bash
cd api
npm install
npm start
```

## Endpoints principais (API)

Base: `${PORT}/api` (ex.: http://localhost:4000/api)

- POST `/register` → { email, password } → cria usuário
- POST `/login` → { email, password } → retorna { token, user }
- GET `/fotos` (auth) → lista fotos
- POST `/upload` (auth, multipart form: imageFile, description, photoDate) → cria foto
- PUT `/fotos/:id` (auth) → atualiza descrição/data
- DELETE `/fotos/:id` (auth) → apaga foto (e remove do Cloudinary)

Headers de autenticação: `Authorization: Bearer <token>`.

### Documentação interativa (Swagger)

Com o backend rodando, acesse:

- Local: http://localhost:4000/api/docs
- Produção: configure a URL conforme seu deploy

O arquivo de referência OpenAPI está em `api/openapi.yml`.

## Convenções de código

- Frontend usa SCSS com variáveis globais em `src/index.css` (tema escuro e utilitários).
- Componentes com comentários no topo explicando função.
- Toasts para feedback do usuário.

## Principais funcionalidades do frontend

- Upload com arrastar‑e‑soltar e preview
- Modal com rolagem interna para telas pequenas
- Lightbox com navegação via teclado e download
- Favoritos (persistência em `localStorage`) e filtro rápido
- Botão flutuante (FAB) com tooltip e animação
- Página de Tutorial com passos e ícones

## Problemas comuns

- 401/403 na galeria: o token expirou/ausente → faça login novamente.
- Upload falha: confira as chaves do Cloudinary no `api/.env`.
- DB: verifique `DATABASE_URL` e a execução de `api/initDb.js` (cria tabelas).

## Licença

Este projeto é de uso pessoal/educacional. Adapte uma licença conforme necessidade.
