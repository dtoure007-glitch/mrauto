# Audit SEO complet — MR Auto Canada

**Date :** 2026-06-19
**Domaine :** https://www.mrautocanada.com
**Type d'activité détecté :** Concessionnaire automobile local (AutoDealer / LocalBusiness) — voitures d'occasion, mono-localisation, Dakar (Sénégal). Marché cible mobile, canal de contact principal = WhatsApp.

---

## Score de santé SEO global : **59 / 100** — Moyen

Fondations techniques solides, mais **deux bloqueurs de rendu critiques** empêchent les pages les plus rentables (catalogue + fiches voitures) d'être correctement indexées et performantes.

| Catégorie | Score | Poids |
|---|---|---|
| Technique | 60/100 | 22 % |
| Qualité de contenu | 55/100 | 23 % |
| On-Page | 65/100 | 20 % |
| Schema / données structurées | 80/100 | 10 % |
| Performance (Core Web Vitals) | 35/100 | 10 % |
| Préparation IA (GEO) | 60/100 | 10 % |
| Images | 50/100 | 5 % |

---

## ✅ Ce qui est déjà bien fait

- **`index.html` exemplaire** : title, meta description, canonical, Open Graph complet, Twitter Card, `og:locale=fr_SN`.
- **Squelette HTML statique** dans le `#root` de l'index (nav + hero + H1) → lisible par Google sans exécuter de JS.
- **Données structurées riches** (index) : `AutoDealer`+`LocalBusiness`, `FAQPage` (4 Q/R), `WebSite`+`SearchAction`.
- **`fiche.html` injecte dynamiquement** par voiture : title, description, OG, canonical, schema `Car` + `BreadcrumbList`.
- **Infra présente** : `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`, favicons complets (16/32/180).
- **URLs propres** via `vercel.json` (`/catalogue`, `/fiche`, `/vendues`) + redirections 301 depuis les `.html`.
- **En-têtes de sécurité** : HSTS preload, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **GA4** présent sur toutes les pages principales ; **404 en `noindex, follow`**.
- Titles, descriptions et canonicals **uniques par page**.

---

## 🔴 CRITIQUE (corriger immédiatement)

### C1 — `catalogue.html`, `fiche.html`, `vendues.html` ont un `<div id="root"></div>` VIDE
Tout le contenu (y compris le `<h1>`) est rendu côté client par React. L'index a reçu un squelette statique (commit 634aee3) **mais pas ces trois pages**. Sans exécution JS, Google voit une page blanche.
→ Ce sont précisément les pages censées se positionner sur *« catalogue voiture occasion Dakar »* et sur chaque modèle. **Impact maximal.**

### C2 — Transpilation Babel en runtime (tueur de performance)
Chaque page charge `@babel/standalone` et utilise `type="text/babel"` : le JSX est compilé **dans le navigateur** au chargement. Chaîne de rendu : React CDN → Babel → transpilation → fetch Supabase → rendu.
→ LCP/INP catastrophiques sur mobile/4G (le marché cible). Aggrave C1 : le contenu n'apparaît qu'après toute cette chaîne.

---

## 🟠 ÉLEVÉ (sous 1 semaine)

### H1 — Pas de pages voitures indexables ni dans le sitemap
URLs des fiches = `/fiche?id=<uuid>`. Les requêtes longue traîne (*« Toyota Corolla 2018 occasion Dakar »*) — le cœur de business d'un concessionnaire — n'ont aucune URL propre, découvrable et présente au sitemap. Les fiches ne sont atteignables que via des liens rendus en JS.
→ Recommandation : slugs `/voiture/toyota-corolla-2018-<id>` + **sitemap dynamique** listant chaque voiture en stock.

### H2 — Canonical statique `/fiche` partagé par toutes les voitures
Le canonical n'est corrigé que par JS. Si Google n'exécute pas le JS, toutes les fiches se replient sur une seule URL `/fiche` → contenu dupliqué, aucune voiture indexée individuellement.

### H3 — Pas d'image OG dédiée (1200×630)
`og:image` pointe vers `logo.jpg` (carré 1170×990). Les aperçus **WhatsApp** (canal n°1 ici), Facebook et Instagram sont médiocres. `og-image-generator.html` existe mais le résultat n'est pas utilisé.

---

## 🟡 MOYEN (sous 1 mois)

- **M1** — `vendues.html` n'a aucun schema. Ajouter `CollectionPage`/`ItemList` ; envisager `Review`/`AggregateRating` (étoiles en SERP) si avis authentiques (« 20+ clients satisfaits »).
- **M2** — Schema `LocalBusiness` sans `streetAddress` ni `geo` (lat/long). Bloque le *local pack*. Ajouter adresse complète + coordonnées + lien Google Business Profile.
- **M3** — Recherche `?q=` du catalogue : risque d'URLs paramétrées indexées (contenu fin / index bloat). Forcer le canonical vers `/catalogue` et/ou `noindex` sur les pages de résultats filtrés.
- **M4** — Images : 2 des 5 `<img>` de l'index sans `alt` ; garantir un `alt` descriptif (marque modèle année) sur chaque photo de voiture. Pas de WebP/AVIF.
- **M5** — `sitemap.xml` : `lastmod` figé au 2026-06-11 ; `changefreq=daily` sur le catalogue mais date non mise à jour. À régénérer automatiquement.
- **M6** — Aucun `BreadcrumbList` sur catalogue/vendues (présent seulement sur fiche).

---

## 🟢 FAIBLE (backlog)

- **404.html** sans GA4 (suivi des 404 manquant).
- `preconnect unpkg.com` n'est nécessaire qu'à cause du React CDN — à retirer après bundling.
- `llms.txt` : bon. Vérifier la cohérence du format de téléphone partout (`+221 77 834 64 64`).

---

## Performance (estimation lab, pas de données terrain)

Sans données CrUX/GSC connectées. Estimation mobile 4G : **LCP > 4 s**, **INP dégradé** à cause de la transpilation Babel runtime + dépendance Supabase avant premier rendu. La résolution de C2 est le levier n°1.

> Pour des données réelles : connecter Search Console + PageSpeed/CrUX (le site a déjà Vercel Speed Insights et GA4).
