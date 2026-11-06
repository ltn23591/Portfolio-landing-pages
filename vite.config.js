import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                    vendor: ['react', 'react-dom', 'lucide-react', 'socket.io-client'],
                },
            },
        },
    },
});
