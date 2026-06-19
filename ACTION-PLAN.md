# Plan d'Action SEO — MR Auto Canada

**Mis à jour :** 2026-06-19
**Score actuel :** 59/100 · **Objectif court terme :** 80/100

Priorités par impact/effort. Voir `FULL-AUDIT-REPORT.md` pour le détail.

---

## 🔴 Critique — cette semaine

1. **[C1] Ajouter un squelette HTML statique** dans `catalogue.html`, `fiche.html`, `vendues.html`
   (comme l'index) : au minimum `<h1>`, intro, et liens vers les pages clés à l'intérieur du `#root`,
   remplacés par React au chargement. → débloque l'indexation des pages rentables.

2. ~~**[C2] Supprimer la transpilation Babel runtime**~~ ✅ esbuild bundle React dans `dist/` (commit c853c93). `@babel/standalone` + CDN React supprimés des 3 pages. Vercel build : `npm run build`.

---

## 🟠 Élevé — sous 1 semaine

3. **[H1/H2] URLs voitures propres + sitemap dynamique** : routes `/voiture/<marque>-<modele>-<annee>-<id>`,
   canonical par voiture côté serveur, et génération du `sitemap.xml` incluant chaque voiture en stock
   (depuis Supabase). Mettre à jour `vercel.json`.

4. ~~**[H3] Créer une image OG 1200×630 dédiée**~~ ✅ `og-image.svg` créé (1200×630), toutes les pages mises à jour.

---

## 🟡 Moyen — sous 1 mois

5. **[M2]** ~~Compléter le schema `LocalBusiness`~~  ✅ `streetAddress`, `geo` lat/long, `hasMap` ajoutés.
   **Reste** : créer/optimiser la fiche GBP réelle (avis, photos, horaires) et pointer `hasMap` vers l'URL exacte.
6. ~~**[M1]** Schema `CollectionPage`~~ ✅ Ajouté sur catalogue et vendues.
7. ~~**[M3]** Gérer les URLs `?q=`~~ ✅ `noindex, follow` injecté dynamiquement si `?q=` non vide.
8. **[M4]** `alt` descriptif sur toutes les images ; convertir les photos voitures en WebP.
9. **[M5]** Régénérer `sitemap.xml` avec `lastmod` réel à chaque mise à jour de stock.
10. ~~**[M6]** Ajouter `BreadcrumbList` sur catalogue et vendues~~ ✅ Fait sur les deux pages.

---

## 🟢 Faible — backlog

11. **[404]** Ajouter GA4 pour suivre les 404.
12. Nettoyer les `preconnect`/`dns-prefetch` devenus inutiles après bundling.
13. Cohérence du téléphone (`+221 77 834 64 64`) sur tout le site et dans `llms.txt`.

---

## Mesure & suivi

- Connecter **Google Search Console** (couverture d'indexation, requêtes réelles) — priorité.
- Surveiller LCP/INP via **Vercel Speed Insights** (déjà installé) avant/après le chantier C2.
- Re-mesurer le score après C1+C2 (gain attendu : ~59 → ~78).
