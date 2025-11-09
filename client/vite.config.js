import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// SPA fallback para ambientes que sirvam arquivos estáticos sem reescrita automática
// O Vite preview já trata, mas na build estática (Vercel), garantimos que o index.html handle as rotas.
// Em Vercel, usamos vercel.json. Este fallback é seguro localmente.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
});
