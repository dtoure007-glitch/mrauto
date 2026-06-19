import * as esbuild from 'esbuild';

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
