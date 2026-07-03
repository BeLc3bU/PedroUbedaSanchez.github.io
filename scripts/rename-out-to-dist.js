import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const outPath = path.join(rootDir, "out");
const distPath = path.join(rootDir, "dist");

console.log("🚧 Renombrando carpeta out a dist para soporte de GitHub Pages...");

try {
    // Si ya existe la carpeta dist anterior, la borramos
    if (fs.existsSync(distPath)) {
        fs.rmSync(distPath, { recursive: true, force: true });
    }

    if (fs.existsSync(outPath)) {
        // En Windows, cpSync + rmSync es mucho más robusto que renameSync para evitar errores EPERM
        fs.cpSync(outPath, distPath, { recursive: true });
        try {
            fs.rmSync(outPath, { recursive: true, force: true });
        } catch (rmError) {
            console.log(
                "⚠️ Nota: No se pudo eliminar la carpeta temporal 'out' debido a un bloqueo de Windows, pero los archivos se copiaron correctamente."
            );
        }
        console.log("✅ Éxito: out copiada a dist de forma segura.");
    } else {
        console.error("❌ Error: Carpeta out no encontrada. ¿Se ejecutó next build correctamente?");
        process.exit(1);
    }
} catch (error) {
    console.error("❌ Error al renombrar la carpeta out:", error);
    process.exit(1);
}
