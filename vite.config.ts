import path from "path"
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import * as fs from "node:fs";

// https://vite.dev/config/
export default defineConfig(({command}) => {
    const isDev = command === "serve"
    return {
        plugins: [react(), tailwindcss()],
        server: isDev ? {
            https: {
                key: fs.readFileSync('./certs/localhost-key.pem'),
                cert: fs.readFileSync('./certs/localhost.pem'),
            },
            host: true,
        } : undefined,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    }
})
