import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [
        react(),
        visualizer({
            filename: "dist/stats.html",
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./"),
        },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (
                        id.includes("node_modules/react/") ||
                        id.includes("node_modules/react-dom/") ||
                        id.includes("node_modules/react-router-dom/")
                    ) {
                        return "vendor-react";
                    }
                    if (
                        id.includes("@radix-ui/react-slot") ||
                        id.includes("class-variance-authority") ||
                        id.includes("node_modules/clsx/")
                    ) {
                        return "vendor-ui";
                    }
                    if (id.includes("framer-motion")) return "vendor-motion";
                    if (id.includes("@react-pdf/renderer")) return "vendor-pdf";
                    if (id.includes("three") || id.includes("@react-three")) return "vendor-three";
                },
            },
        },
    },
    server: {
        // Configuración del servidor de desarrollo
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.ts",
    },
});
