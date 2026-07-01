# Prodigy AI — Frontend

Production frontend for **Prodigy AI**, built with React 19, Vite, Tailwind CSS,
Framer Motion, and shadcn-style primitives. Designed to be a clean, dark, premium
chat interface in the spirit of Claude, Perplexity, and Linear.

This repo is **frontend-only**. It expects an existing FastAPI backend exposing:

- `POST /chat` — `{ "message": string }` → `{ "response": string }`
- `POST /upload` — multipart `file` field → `{ "message": string }`

## Getting started

```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at your backend
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at
`http://localhost:8000` by default (configurable via `VITE_API_BASE_URL`).

## Project structure

```
src/
  components/
    layout/     Navbar, Sidebar
    chat/       ChatBox, ChatInput, ChatMessage, MessageList,
                TypingIndicator, EmptyState, CodeBlock
    upload/     UploadButton, UploadModal, DropZone
    common/     LoadingSpinner, ThemeToggle, ConnectionBadge, Toast
  pages/        Home
  services/     api.js — single Axios client, all backend calls
  hooks/        useChat, useAutoScroll
  utils/        constants.js, helpers.js
```

## Notes on chat history

The backend currently exposes no endpoints for persisting or listing past
conversations, so chat history (new chat, rename, delete, recent chats) is
managed client-side in `useChat.js` and persisted to `localStorage`. Swap
`loadChatsFromStorage` / `persistChatsToStorage` for real API calls as soon
as the backend adds conversation endpoints — the rest of the UI won't need
to change.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
