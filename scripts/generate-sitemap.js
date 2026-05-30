import fs from "fs";
import path from "path";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pedroubedasanchez.es/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pedroubedasanchez.es/cv</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

try {
    fs.writeFileSync(path.resolve("public/sitemap.xml"), sitemap);
    console.log("✅ sitemap.xml generado con éxito en la carpeta /public!");
} catch (error) {
    console.error("❌ Error generando sitemap.xml:", error);
    process.exit(1);
}
