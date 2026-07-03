import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const steps = [
    {
        name: "Prettier Formato Check",
        command: "npm",
        args: ["run", "format:check"],
    },
    {
        name: "ESLint Análisis Estático",
        command: "npm",
        args: ["run", "lint"],
    },
    {
        name: "TypeScript Verificación de Tipos",
        command: "npm",
        args: ["run", "typecheck"],
    },
    {
        name: "Vitest Pruebas Unitarias",
        command: "npx",
        args: ["vitest", "run"],
    },
    {
        name: "Vite Compilación de Producción",
        command: "npm",
        args: ["run", "build"],
    },
];

console.log("==================================================");
console.log("🚀 Iniciando Ciclo de Verificación (Loop Engineering)");
console.log("==================================================\n");

let allPassed = true;

for (const step of steps) {
    console.log(`[PROCESANDO] ${step.name}...`);

    const result = spawnSync(step.command, step.args, {
        cwd: rootDir,
        stdio: "inherit",
        shell: true,
    });

    if (result.status !== 0) {
        console.error(`\n❌ [FALLO] ${step.name} falló con código de salida ${result.status}.\n`);
        allPassed = false;
        break;
    } else {
        console.log(`\n✅ [ÉXITO] ${step.name} completado con éxito.\n`);
    }
}

if (allPassed) {
    console.log("==================================================");
    console.log("🎉 ¡Todas las validaciones completadas con éxito!");
    console.log("El proyecto está listo para ser integrado/desplegado.");
    console.log("==================================================");
    process.exit(0);
} else {
    console.error("==================================================");
    console.error("⚠️ El proceso falló. Corrige los errores arriba indicados.");
    console.error("==================================================");
    process.exit(1);
}
