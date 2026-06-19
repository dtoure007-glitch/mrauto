# Plan d'Action SEO — MR Auto Canada

**Mis à jour :** 2026-06-19
**Score actuel :** 59/100 · **Objectif court terme :** 80/100

Priorités par impact/effort. Voir `FULL-AUDIT-REPORT.md` pour le détail.

---

## 🔴 Critique — cette semaine

1. **[C1] Ajouter un squelette HTML statique** dans `catalogue.html`, `fiche.html`, `vendues.html`
   (comme l'index) : au minimum `<h1>`, intro, et liens vers les pages clés à l'intérieur du `#root`,
   remplacés par React au chargement. → débloque l'indexation des pages rentables.

2. **[C2] Supprimer la transpilation Babel runtime** : pré-compiler le JSX (esbuild/Vite, build Vercel)
   et servir du JS statique. Retirer `@babel/standalone` et `type="text/babel"`.
   → gain LCP/INP majeur sur mobile. Le plus gros chantier, le plus rentable.

---

## 🟠 Élevé — sous 1 semaine

3. **[H1/H2] URLs voitures propres + sitemap dynamique** : routes `/voiture/<marque>-<modele>-<annee>-<id>`,
   canonical par voiture côté serveur, et génération du `sitemap.xml` incluant chaque voiture en stock
   (depuis Supabase). Mettre à jour `vercel.json`.

4. **[H3] Créer une image OG 1200×630 dédiée** (depuis `og-image-generator.html`), l'enregistrer
   (`og-image.jpg`) et pointer `og:image` dessus sur toutes les pages. Vérifier l'aperçu WhatsApp.

---

## 🟡 Moyen — sous 1 mois

5. **[M2]** Compléter le schema `LocalBusiness` : `streetAddress`, `geo` (lat/long), lien Google Business Profile.
   Créer/optimiser la fiche GBP (avis, photos, horaires) — décisif pour le local pack à Dakar.
6. **[M1]** Schema `CollectionPage`/`ItemList` sur catalogue et vendues ; `AggregateRating` si avis réels.
7. **[M3]** Gérer les URLs `?q=` : canonical vers `/catalogue` ou `noindex` des résultats filtrés.
8. **[M4]** `alt` descriptif sur toutes les images ; convertir les photos voitures en WebP.
9. **[M5]** Régénérer `sitemap.xml` avec `lastmod` réel à chaque mise à jour de stock.
10. **[M6]** Ajouter `BreadcrumbList` sur catalogue et vendues.

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
