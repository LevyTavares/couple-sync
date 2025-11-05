# Couple Sync

Um monorepo simples com frontend em React (Vite) e backend em Node.js/Express para uma galeria privada de memórias com upload de imagens via Cloudinary e autenticação JWT.

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

## Convenções de código

- Frontend usa SCSS com variáveis globais em `src/index.css` (tema escuro e utilitários).
- Componentes com comentários no topo explicando função.
- Toasts para feedback do usuário.

## Problemas comuns

- 401/403 na galeria: o token expirou/ausente → faça login novamente.
- Upload falha: confira as chaves do Cloudinary no `api/.env`.
- DB: verifique `DATABASE_URL` e a execução de `api/initDb.js` (cria tabelas).

## Licença

Este projeto é de uso pessoal/educacional. Adapte uma licença conforme necessidade.
