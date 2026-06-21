import * as esbuild from 'esbuild';
import { writeFileSync } from 'fs';

const SUPABASE_URL = 'https://tunszuazffcniyaylxwj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ORGOouzE5_jT5BCgqWLhKQ_Z3XnrPW7';

const shared = {
  bundle: true,
  minify: true,
  jsx: 'automatic',
  target: ['es2020'],
  logLevel: 'info',
};

await Promise.all([
  esbuild.build({ ...shared, entryPoints: ['src/catalogue-app.jsx'], outfile: 'dist/catalogue-app.js' }),
  esbuild.build({ ...shared, entryPoints: ['src/fiche-app.jsx'],     outfile: 'dist/fiche-app.js' }),
  esbuild.build({ ...shared, entryPoints: ['src/vendues-app.jsx'],   outfile: 'dist/vendues-app.js' }),
]);

// Sitemap dynamique — inclut toutes les fiches voitures
const today = new Date().toISOString().split('T')[0];
let carUrls = '';

try {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/cars?select=slug,created_at&slug=not.is.null&status=eq.available`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  const cars = await res.json();
  carUrls = cars.map(c => `
  <url>
    <loc>https://www.mrautocanada.com/voitures/${c.slug}</loc>
    <lastmod>${new Date(c.created_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');
  console.log(`sitemap: ${cars.length} fiche(s) voiture ajoutée(s)`);
} catch (e) {
  console.warn('sitemap: impossible de récupérer les voitures Supabase', e.message);
}

writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://www.mrautocanada.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.mrautocanada.com/catalogue</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.mrautocanada.com/vendues</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
${carUrls}
</urlset>`);
