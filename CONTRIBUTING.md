# Contribuindo para o Couple Sync

Obrigado por considerar contribuir! Este guia descreve como rodar o projeto localmente, o fluxo de trabalho de PRs e padrões que seguimos.

## Pré‑requisitos

- Node.js 18+
- PostgreSQL (DATABASE_URL) e conta no Cloudinary

## Setup rápido

```bash
# Backend
cd api
cp .env.example .env
npm install
npm run dev

# Frontend
cd ../client
cp .env.example .env
npm install
npm run dev
```

## Fluxo de trabalho

1. Crie um branch a partir de `main`: `feat/<escopo>` ou `fix/<escopo>`
2. Commits seguindo Conventional Commits (ex.: `feat(ui):`, `fix(api):`, `docs:`)
3. Abra um Pull Request descrevendo:
   - O problema/objetivo
   - O que foi alterado (arquivos principais)
   - Como testar (passos)
4. Aguarde revisão. Ajuste caso solicitado.

## Padrões de código

- Frontend: React + SCSS; tema e utilitários em `src/index.css`
- Backend: Express; rotas em `api/index.js`; DB via `api/db.js`
- Comentários de cabeçalho explicam o papel de cada módulo

## Testes manuais (mínimo)

- Login/Logout e fluxo de token
- Upload com arrastar-e-soltar (preview) e com input normal
- Edição/remoção de foto
- Responsividade em mobile

## Documentação da API

- Acesse `/api/docs` quando o backend estiver rodando
- O arquivo de especificação está em `api/openapi.yml`

## Dúvidas

Abra uma issue com contexto suficiente (logs, prints, trechos de código). Obrigado!
