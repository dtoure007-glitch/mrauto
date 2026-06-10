# Audit SEO Complet — MR Auto Canada
**Date** : 2026-06-10  
**Domaine** : https://www.mrautocanada.com  
**Type** : Concessionnaire local — Voitures d'occasion — Dakar, Sénégal  
**Stack** : HTML statique + React 18 (Babel in-browser) + Supabase + Vercel

---

## Résumé Exécutif

### Score SEO Global : **47 / 100** — État : ⚠️ Critique

| Catégorie | Poids | Score brut | Contribution |
|-----------|-------|------------|-------------|
| SEO Technique | 22 % | 5,5 / 10 | 12,1 |
| Qualité du contenu | 23 % | 5,5 / 10 | 12,7 |
| On-Page SEO | 20 % | 6,3 / 10 | 12,5 |
| Schéma / Données structurées | 10 % | 0 / 10 | **0** |
| Performance (CWV) | 10 % | 4,0 / 10 | 4,0 |
| Préparation IA / GEO | 10 % | 2,5 / 10 | 2,5 |
| Images | 5 % | 6,5 / 10 | 3,3 |
| **TOTAL** | 100 % | | **47 / 100** |

### Top 5 Problèmes Critiques

1. **Rendu JavaScript pur** — Le contenu de toutes les pages est rendu côté client par React. Les bots qui n'exécutent pas JavaScript (Bingbot, crawlers IA, réseaux sociaux) voient une page vide.
2. **Zéro schema markup** — Aucune donnée structurée sur aucune page (Organization, Car, LocalBusiness, Product).
3. **React en mode développement + Babel in-browser** — Performance catastrophique : bundle dev (~1 Mo), transpilation JSX en temps réel côté utilisateur.
4. **fiche.html : meta titre/description statiques** — Toutes les fiches partagent le même `<title>` et la même `<meta description>`, annulant tout potentiel SEO des pages véhicules.
5. **Canonical manquant sur 3 pages** — `catalogue.html`, `fiche.html`, `vendues.html` n'ont pas de balise `<link rel="canonical">`.

### Top 5 Quick Wins

1. Ajouter `<link rel="canonical">` sur les 3 pages secondaires (15 min)
2. Ajouter les balises Twitter Card manquantes sur 3 pages (15 min)
3. Passer React en mode production (remplacer `.development.js` → `.production.min.js`) (10 min)
4. Ajouter un schéma JSON-LD `Organization` + `LocalBusiness` sur l'accueil (30 min)
5. Ajouter les dimensions `og:image:width` / `og:image:height` sur les 3 pages secondaires (10 min)

---

## 1. SEO Technique

### 1.1 Robots.txt ✅
```
User-agent: *
Allow: /
Sitemap: https://www.mrautocanada.com/sitemap.xml
```
**Statut** : Correct. Toutes les pages sont accessibles.

### 1.2 Sitemap XML ⚠️

**Trouvé** : `sitemap.xml` avec 4 URLs.

| URL | Problème |
|-----|----------|
| `/` | ✅ OK |
| `/catalogue.html` | ✅ OK |
| `/fiche.html` | ❌ Page dynamique sans paramètre — sans `?id=XXX` la page affiche "Voiture introuvable" |
| `/vendues.html` | ✅ OK |

**Manquant** :
- Les URLs propres `/catalogue`, `/voitures` (définies dans `vercel.json`) ne sont pas dans le sitemap
- Les fiches individuelles (`/fiche?id=...`) ne sont pas générées dynamiquement dans le sitemap
- `lastmod` est codé en dur (2026-06-05) — ne reflète pas les vraies modifications

### 1.3 Balises Canoniques ❌

| Page | Canonical présent |
|------|------------------|
| `index.html` | ✅ `https://www.mrautocanada.com` |
| `catalogue.html` | ❌ Absent |
| `fiche.html` | ❌ Absent (et la valeur `og:url` est statique, sans `?id=`) |
| `vendues.html` | ❌ Absent |

### 1.4 Rendu JavaScript — Problème CRITIQUE ❌

**Architecture actuelle** : Tout le contenu HTML visible est généré par `ReactDOM.createRoot(...).render(<App />)` dans un `<div id="root">` initialement vide.

**Conséquences** :
- Bingbot (et la plupart des crawlers IA) voient : `<div id="root"></div>` — page vide
- Googlebot peut rendre JS mais avec délai (2nd wave indexing) : risque de non-indexation
- Les partages sur WhatsApp/Facebook/Twitter/LinkedIn lisent les Open Graph statiques mais pas le contenu dynamique du catalogue
- La fiche voiture (`fiche.html`) tire ses données depuis Supabase **après** le chargement — meta titre/description ne reflètent JAMAIS la vraie voiture

**Solution recommandée** : SSG (Static Site Generation) ou pré-rendu pour les pages statiques. Pour `fiche.html`, une solution intermédiaire est de mettre à jour dynamiquement le titre via `document.title` + une balise `<meta>` mise à jour côté JS (bénéfice partiel pour Google uniquement).

### 1.5 Performance ❌

**Problèmes identifiés** :

| Fichier | Problème | Impact |
|---------|----------|--------|
| `react.development.js` (index.html, catalogue.html) | Build de dev, non minifié ~1 Mo | LCP très lent |
| `@babel/standalone` (toutes les pages) | Transpilation JSX en temps réel dans le navigateur | TTI +2-4s |
| Google Fonts (sans `display=swap`) | Render-blocking font loading | CLS, FCP |
| `fiche.html` / `vendues.html` | Pas de SRI sur les scripts React | Sécurité |

**Points positifs** :
- ✅ `fetchPriority="high"` sur les images hero
- ✅ `loading="lazy"` sur les images secondaires
- ✅ `preconnect` pour Google Fonts et Supabase
- ✅ `width`/`height` sur la plupart des images (prévention CLS)
- ✅ Vercel Speed Insights activé

**Estimation CWV** :
- LCP : ~4-6s (mauvais) — bloqué par React dev + Babel
- CLS : probablement bon (images dimensionnées)
- INP : variable selon la machine

### 1.6 En-têtes de Sécurité ⚠️

**Configurés** (`vercel.json`) :
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: SAMEORIGIN`

**Manquants** :
- ❌ `Strict-Transport-Security` (HSTS)
- ❌ `Content-Security-Policy`
- ❌ `Referrer-Policy`
- ❌ `Permissions-Policy`

### 1.7 Intégrité des Sous-ressources (SRI) ⚠️

| Page | SRI React/ReactDOM | SRI Babel |
|------|--------------------|-----------|
| `index.html` | ✅ | ✅ |
| `catalogue.html` | ✅ | ✅ |
| `fiche.html` | ❌ | ❌ |
| `vendues.html` | ❌ | ❌ |

### 1.8 URLs propres ✅ Partiel

Les rewrites Vercel sont bien configurés (`/catalogue` → `catalogue.html`), mais :
- Le sitemap référence les `.html` au lieu des URLs propres
- Les `<link rel="canonical">` et `og:url` devraient pointer vers les URLs propres

### 1.9 Favicon ⚠️
- `logo.jpg` utilisé comme favicon — JPEG accepté mais non optimal
- ❌ Pas de `apple-touch-icon`
- ❌ Pas de `manifest.json` / Web App Manifest

---

## 2. Qualité du Contenu

### 2.1 Signaux E-E-A-T

**Expérience & Expertise** :
- ✅ "Depuis 2020" — ancienneté mentionnée
- ✅ "Je sélectionne chaque voiture à la main" — approche personnalisée
- ✅ "Papiers vérifiés, essai routier, livraison" — garanties concrètes
- ✅ Section "20+ voitures vendues" avec photos réelles
- ❌ Pas de nom de personne physique (prénom du vendeur)
- ❌ Pas de témoignages clients avec noms/photos
- ❌ Pas de page "À propos" dédiée

**Autorité** :
- ❌ Aucun lien vers profils sociaux dans les métadonnées
- ✅ Liens TikTok, Instagram, Facebook, Threads dans le footer
- ❌ Pas de Google Business Profile lié

**Confiance** :
- ✅ Numéro de téléphone visible
- ✅ WhatsApp avec vrai numéro
- ❌ Pas d'adresse physique affichée
- ❌ Formulaire de contact non fonctionnel (pas de handler `onSubmit`)

### 2.2 Contenu mince (Thin Content)

| Page | Contenu textuel crawlable | Verdict |
|------|--------------------------|---------|
| Homepage (`index.html`) | H1, description, 5 étapes, stats — mais tout rendu JS | ⚠️ Risque |
| Catalogue | Grille de voitures Supabase — 100% dynamique | ❌ Très mince |
| Fiche voiture | Détails voiture 100% dynamiques | ❌ Mince |
| Vendues | Grille de voitures 100% dynamique | ❌ Très mince |

### 2.3 Lisibilité
- ✅ Texte français clair et direct
- ✅ Langage naturel et conversationnel ("tu")
- ✅ Phrases courtes
- ❌ Pas de contenu éditorial (blog, conseils d'achat, guides)

---

## 3. On-Page SEO

### 3.1 Balises Title

| Page | Title | Longueur | Qualité |
|------|-------|----------|---------|
| Homepage | "Mrauto Canada — Trouvez votre voiture d'occasion à Dakar, sans mauvaise surprise" | 79 chars | ✅ Bon (léger dépassement 60 chars recommandé) |
| Catalogue | "Catalogue — MRAUTO Canada" | 26 chars | ⚠️ Trop court, peu ciblé |
| Fiche | "Fiche voiture — MRAUTO Canada" | 30 chars | ❌ Générique, statique |
| Vendues | "Voitures vendues — MRAUTO Canada" | 33 chars | ⚠️ Acceptable |

### 3.2 Meta Descriptions

| Page | Description | Longueur | Qualité |
|------|-------------|----------|---------|
| Homepage | "Achetez votre voiture d'occasion à Dakar en toute confiance…" | 160 chars | ✅ Bien |
| Catalogue | "Catalogue complet des voitures disponibles chez MRAUTO Canada à Dakar…" | 111 chars | ✅ Correct |
| Fiche | "Fiche détaillée de la voiture — Mrauto Canada à Dakar. Prix, kilométrage…" | 109 chars | ❌ Générique, même desc pour toutes fiches |
| Vendues | "Toutes les voitures vendues par MRAUTO Canada à Dakar. Chaque transaction, un client heureux." | 93 chars | ✅ Correct |

### 3.3 Structure des titres H1/H2

| Page | H1 | H2s |
|------|----|----|
| Homepage | "Le bon choix de voiture à Dakar." | "Une voiture en tête ? Écris-moi maintenant.", "Une question ?" |
| Catalogue | "Toutes nos voitures disponibles" | Aucun |
| Fiche | Nom de la voiture dynamique | Aucun |
| Vendues | "Toutes nos voitures vendues" | "Votre prochain véhicule vous attend." |

**Note** : Les H1/H2 sont corrects structurellement mais uniquement visibles avec JS.

### 3.4 Open Graph

| Page | og:title | og:desc | og:image | og:url | og:locale | Twitter Card |
|------|----------|---------|----------|--------|-----------|-------------|
| Homepage | ✅ | ✅ | ✅ logo.jpg | ✅ | ✅ fr_SN | ✅ |
| Catalogue | ✅ | ✅ | ✅ logo.jpg | ✅ | ❌ manquant | ❌ |
| Fiche | ✅ statique | ✅ statique | ✅ logo.jpg | ❌ statique sans id | ❌ | ❌ |
| Vendues | ✅ | ✅ | ✅ logo.jpg | ✅ | ❌ | ❌ |

**Problème image OG** : `logo.jpg` est en `1170×990` (format carré). Facebook et WhatsApp requièrent `1200×630` (ratio 1.91:1) pour un affichage optimal. Le logo n'est pas une image de partage social efficace.

### 3.5 Cohérence de la casse — ⚠️ Incohérence de marque

| Occurrence | Casse utilisée |
|------------|---------------|
| `<title>` homepage | "Mrauto Canada" |
| `<title>` autres pages | "MRAUTO Canada" |
| Footer | "MRAUTO Canada" |
| Nav logo alt | "MRAUTO Canada" |
| og:site_name | "Mrauto Canada" |

Choisir une convention et l'appliquer partout.

### 3.6 Maillage interne ✅

- ✅ Bonne navigation inter-pages (Home ↔ Catalogue ↔ Fiche ↔ Vendues)
- ✅ Breadcrumb visuel (← Retour / ← Catalogue)
- ❌ Pas de breadcrumb schema
- ❌ Les liens vers les fiches individuelles sont générés dynamiquement par React

---

## 4. Schéma / Données Structurées — ABSENT ❌

**Aucun markup JSON-LD présent sur aucune page.**

### Opportunités manquées (haute valeur)

| Schema | Page | Impact |
|--------|------|--------|
| `Organization` | Toutes | Panneau Knowledge Graph Google |
| `LocalBusiness` + `AutoDealer` | Homepage | Rich results locaux, carte Google |
| `Car` + `Product` + `Offer` | fiche.html | Rich results produit, prix en SERP |
| `ItemList` | catalogue.html | Sitelinks en SERP |
| `BreadcrumbList` | catalogue.html, fiche.html | Fil d'Ariane en SERP |
| `FAQPage` | Homepage | Expanded results en SERP |

---

## 5. Performance — Core Web Vitals (estimations)

### Architecture de chargement actuelle

```
1. HTML initial (vide — juste <div id="root">)
2. react.development.js      ← ~1 000 Ko, non minifié
3. react-dom.development.js  ← ~1 000 Ko, non minifié  
4. @babel/standalone          ← ~850 Ko, transpile JSX in-browser
5. supabase-js               ← ~200 Ko
6. hifi-components.jsx       ← transpilé par Babel
7. Appel API Supabase        ← données voitures
8. Rendu React              ← contenu visible
```

**Total bloquant avant premier affichage** : ~3+ Mo de JavaScript

| Métrique | Estimation | Cible Google |
|---------|------------|-------------|
| LCP | 5-8s ❌ | < 2,5s |
| INP | 200-500ms ❌ | < 200ms |
| CLS | ~0,05 ✅ | < 0,1 |
| FCP | 3-5s ❌ | < 1,8s |

**Solution radicale** : Passer à un bundler (Vite) avec compilation au build time. Le gain estimé est de -70% sur le poids JS et LCP < 2s.

---

## 6. Préparation IA et Recherche GEO

### 6.1 llms.txt ❌
Pas de fichier `/llms.txt`. Les assistants IA (ChatGPT, Perplexity, Claude) ne peuvent pas découvrir le site facilement.

### 6.2 Accessibilité aux crawlers IA
- ❌ Contenu rendu JS → non citable par les LLM
- ❌ Pas de signaux d'autorité lisibles statiquement
- ❌ Pas de FAQ, pas de Q&R structurées

### 6.3 Recommandations GEO
- Créer `/llms.txt` avec nom, activité, localisation, numéro et URL
- Ajouter des sections FAQ avec questions explicites ("Comment acheter une voiture à Dakar ?")
- Structurer les pages avec des réponses directes (passage-level citability)

---

## 7. Images

### 7.1 Alt texts

| Contexte | Alt text | Qualité |
|----------|----------|---------|
| Logo nav | "MRAUTO Canada" | ✅ |
| Voiture vedette hero | `${featuredCar.brand} ${featuredCar.model}` | ✅ Bon |
| Images galerie fiche | `${brand} ${model} — photo ${idx+1}` | ✅ Acceptable |
| Images vendues grid | `${car.brand} ${car.model}` | ✅ OK |
| Thumbnails galerie | `""` (vide) | ✅ Décoratif → correct |

### 7.2 Dimensions et format

- ✅ Attributs `width`/`height` présents → prévention CLS
- ✅ `loading="lazy"` sur les images non-critiques
- ✅ `fetchPriority="high"` sur LCP
- ❌ Format JPEG probable pour toutes les images (vs WebP/AVIF)
- ❌ Image OG (logo.jpg) : 1170×990 au lieu de 1200×630

### 7.3 Favicon
- Logo.jpg utilisé comme favicon — JPEG est supporté mais non optimal
- ❌ Pas d'`apple-touch-icon`
- ❌ Pas de manifest

---

## 8. SEO Local

### 8.1 Signaux locaux présents
- ✅ "Dakar, Sénégal" mentionné en texte
- ✅ "Depuis 2020" — ancienneté
- ✅ Numéro sénégalais (+221 77 834 64 64)
- ✅ WhatsApp activé
- ✅ Liens réseaux sociaux (TikTok, Instagram, Facebook, Threads)

### 8.2 Signaux locaux manquants
- ❌ Pas d'adresse physique
- ❌ Pas de schéma `LocalBusiness` / `AutoDealer`
- ❌ Pas d'horaires d'ouverture
- ❌ Pas de Google Business Profile référencé
- ❌ Pas de cohérence NAP (Name, Address, Phone) structurée

---

## Annexe : Inventaire des fichiers SEO-critiques

| Fichier | Canonical | Twitter Card | Schema | SRI | Notes |
|---------|-----------|-------------|--------|-----|-------|
| `index.html` | ✅ | ✅ | ❌ | ✅ | React dev mode |
| `catalogue.html` | ❌ | ❌ | ❌ | ✅ | React dev mode |
| `fiche.html` | ❌ | ❌ | ❌ | ❌ | Meta statiques, React prod |
| `vendues.html` | ❌ | ❌ | ❌ | ❌ | Composants inline |
| `robots.txt` | — | — | — | — | ✅ Correct |
| `sitemap.xml` | — | — | — | — | ⚠️ fiche.html sans paramètre |
| `vercel.json` | — | — | — | — | ⚠️ Headers sécurité incomplets |
