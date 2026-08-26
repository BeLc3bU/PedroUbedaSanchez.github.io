import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    allowedDevOrigins: [
        "localhost:3000",
        "127.0.0.1:3000",
        "192.168.1.187:3000",
        "192.168.1.187",
        "192.168.1.178:3000",
        "192.168.1.178",
        "192.168.1.*",
        "192.168.*.*",
    ],
    // Si la web se despliega en una subruta (p. ej., BeLc3bU.github.io/proyecto) podemos añadir basePath.
    // Pero según el CNAME y config de Vite: base: "/" y el CNAME es "pedroubedasanchez.es", así que se despliega en la raíz de su dominio propio.
    // Por lo tanto, base = "/" y no necesitamos basePath.
};

export default nextConfig;
