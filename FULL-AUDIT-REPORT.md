# Rapport d'Audit SEO Complet — Mrauto Canada
**Date :** 14 juin 2026  
**URL :** https://www.mrautocanada.com  
**Pages auditées :** index.html · catalogue.html · fiche.html · vendues.html  
**Type de business :** Service local — Concessionnaire auto (B2C, Local Search)

---

## Score SEO Global : **58 / 100**

| Catégorie | Score | Poids | Note |
|-----------|-------|-------|------|
| SEO Technique | 52/100 | 22% | Bloqué par le rendu côté client |
| Qualité de contenu | 65/100 | 23% | Bon sur la home, thin sur les autres pages |
| On-Page SEO | 72/100 | 20% | Titres et balises bien travaillés |
| Schémas / Données structurées | 68/100 | 10% | Home bonne, vendues vide |
| Performance (Core Web Vitals) | 28/100 | 10% | Babel Standalone = catastrophe perf |
| AI Search Readiness | 60/100 | 10% | llms.txt présent mais insuffisant |
| Images | 45/100 | 5% | OG image non optimisée |

---

## Résumé Exécutif

Le site Mrauto Canada présente une base SEO saine (metas, schémas, sitemap, robots.txt) issue des optimisations récentes. Cependant, **deux problèmes architecturaux majeurs plafonnent le score** et bloquent l'indexation réelle :

1. **Rendu 100% côté client avec Babel Standalone** — Toutes les pages utilisent React + Babel pour transpiler le JSX dans le navigateur. Google lit d'abord le HTML statique (vide : juste `<div id="root"></div>`) avant d'exécuter le JS lors d'une second wave de crawl retardée. Résultat : les pages fiches de voitures ont un titre générique "Fiche voiture — Mrauto Canada" au lieu du vrai contenu.

2. **Pages fiches non indexables** — Chaque voiture est accessible via `fiche.html?id=XXX`. Les URLs avec query params sont mal gérées par Google pour l'indexation individuelle. Résultat : aucune voiture spécifique ne peut ranker sur "Toyota Corolla occasion Dakar" par exemple.

**Top 5 problèmes critiques :**
1. Architecture CSR — Google voit un `<div>` vide en premier crawl
2. Pages fiches individuelles non indexables (URLs dynamiques + CSR)
3. Performance catastrophique (Babel Standalone ~882 KB à transpiler avant tout rendu)
4. Pas de témoignages réels / schema Review absent
5. Adresse physique manquante (nuit au Local SEO)

**Top 5 quick wins (< 2h de travail) :**
1. Ajouter `admin.html` au robots.txt (`Disallow: /admin`)
2. Enrichir llms.txt avec le processus d'achat et la FAQ
3. Ajouter le schema ItemList sur vendues.html
4. Créer une vraie OG image 1200x630 pour chaque page
5. Corriger le canonical de la home (ajouter le `/` final)

---

## 1. SEO Technique

### Points forts
- `robots.txt` : Allow complet, sitemap déclaré
- Sitemap XML : 3 URLs avec lastmod, changefreq, priority correctes
- Rewrites Vercel : `/catalogue` → `catalogue.html` (URLs propres sans extension) ✅
- Headers de sécurité : HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy ✅
- Balises canoniques présentes sur toutes les pages ✅
- `lang="fr"` et `og:locale="fr_SN"` cohérents ✅

### Problèmes critiques

#### CSR pur avec Babel Standalone — CRITIQUE
```
Flux de rendu actuel :
1. Google reçoit : <body><div id="root"></div></body>  <- HTML vide
2. Google met en file d'attente le rendu JS (second wave)
3. Babel (882 KB) se telecharge → parse → transpile le JSX
4. React s'initialise → fetch Supabase → rendu DOM
5. Google re-crawle (delai inconnu, parfois jamais)
```
Impact : Les metas statiques (title, description, og:image) sont indexées, mais le contenu principal des pages fiches voiture sera indexé générique.

#### Pages fiches non indexables — CRITIQUE
```
URL actuelle : /fiche?id=abc123
Problemes :
- Query params = mauvaise pratique pour l'indexation
- Contenu unique (titre, description, schema Car) injecte par JS
- Pas dans le sitemap (impossible à lister)
- Google ne peut pas decouvrir les URLs sans crawl JS
```

#### Admin accessible aux bots
- `robots.txt` actuel : `Allow: /`
- `admin.html` → accessible et crawlable par Googlebot

### Problèmes moyens
- **Canonical home** : `https://www.mrautocanada.com` sans slash final → potentielle confusion avec `https://www.mrautocanada.com/`
- **Sitemap** : fiche.html non listable (conséquence de l'architecture actuelle)
- **hifi-components.jsx** : chargé sans versioning sur fiche.html (`src="hifi-components.jsx"`) vs `?v=4` sur les autres pages

---

## 2. Performance

### Score estimé : 28/100

**Babel Standalone = tueur de performance numéro 1**

| Ressource | Taille (estimée) | Impact |
|-----------|-----------------|--------|
| Babel Standalone 7.29 | ~882 KB | Parse + transpile avant tout rendu |
| React 18 UMD + React DOM | ~1.15 MB | Bloque le rendu initial |
| Supabase JS | ~150 KB | Bloque l'affichage catalogue |

**LCP estimé : 4-6 secondes sur mobile 3G** → Note CWV = Mauvaise

### Points positifs
- `fetchPriority="high"` sur les images hero ✅
- `loading="lazy"` sur les images below-fold ✅
- `decoding="async"` ✅
- `width/height` sur les images (évite le CLS) ✅
- `link rel="preload"` sur logo.jpg ✅
- `link rel="preconnect"` sur fonts + Supabase ✅
- `font-display: swap` via Google Fonts ✅

---

## 3. On-Page SEO

### Titres de page

| Page | Longueur | Note |
|------|----------|------|
| index.html | 82 chars | ⚠️ Légèrement long (>70) |
| catalogue.html | 53 chars | Optimal |
| fiche.html | Variable (JS) | Générique en 1er crawl |
| vendues.html | 59 chars | Optimal |

### Meta Descriptions

| Page | Note |
|------|------|
| index.html | Excellente — USPs clairs, mots-clés présents |
| catalogue.html | Bonne |
| fiche.html | Générique statique indexée par Google |
| vendues.html | Thin — 95 chars sans mots-clés forts |

### Structure des titres (H1/H2)
- H1 sur toutes les pages ✅
- index.html : H1 contient "Dakar" (keyword local) ✅
- catalogue.html : Pas de H2 sous le H1 ⚠️

### Open Graph
- Toutes les pages ont les balises OG et Twitter Card ✅
- **OG image** : `logo.jpg` (1170×990) sur toutes les pages — ratio incorrect (devrait être 1200×630) ❌
- Même image sur toutes les pages (pas de différenciation) ❌

### Liens internes

| Lien | Présent |
|------|---------|
| Home → Catalogue | ✅ |
| Home → Vendues | ✅ |
| Home → Contact (ancre) | ✅ |
| Catalogue → Fiche voiture | ✅ |
| Catalogue → Vendues | ✅ |
| Vendues → Catalogue | ✅ |
| Fiche → "Voir aussi" | ❌ |

---

## 4. Schémas / Données Structurées

### index.html — 85/100
- `AutoDealer + LocalBusiness` ✅ — complet avec telephone, address, areaServed, openingHours, sameAs, logo, foundingDate, priceRange
- `FAQPage` ✅ — 4 questions correspondant au contenu visible
- `WebSite + SearchAction` ❌ — manquant
- `AggregateRating` ❌ — "20+ clients" affiché mais pas structuré

### catalogue.html — 50/100
- `BreadcrumbList` ✅
- `ItemList` des voitures ❌

### fiche.html — 70/100
- `Car` + `BreadcrumbList` ✅ — mais injectés par JS (risque de non-indexation)

### vendues.html — 0/100
- Aucun schema ❌

---

## 5. Qualité de Contenu / E-E-A-T

### Signaux E-E-A-T

| Signal | Présent | Note |
|--------|---------|------|
| Date de fondation (2020) | ✅ | Expérience établie |
| Voix personnelle ("je sélectionne à la main") | ✅ | Authenticité |
| Social proof "20+ clients" | ✅ | Preuve sociale quantifiée |
| Numéro de téléphone visible | ✅ | Transparence |
| Adresse physique complète | ❌ | "Dakar, Sénégal" uniquement |
| Témoignages textuels de clients | ❌ | Aucun |
| Page "À propos" | ❌ | Inexistante |
| Identité du propriétaire | Partiel | "je" mais pas de nom/photo |

### Contenu par page

**index.html** — Bonne densité : hero, stats, démarche 5 étapes, social proof, FAQ, contact ✅  
**catalogue.html** — Quasi-nul hors voitures Supabase, pas de texte descriptif ⚠️  
**fiche.html** — 100% dynamique Supabase, aucun contenu statique riche ⚠️  
**vendues.html** — Grille de photos uniquement, pas de contenu textuel ⚠️

### Opportunités de contenu manquées
1. Blog/articles : "Comment acheter voiture occasion Dakar", "Import Canada → Sénégal"
2. Section témoignages textuels avec noms et photos
3. Page "À propos" avec profil du fondateur

---

## 6. Local SEO

### NAP (Name, Address, Phone)

| Élément | Valeur | Note |
|---------|--------|------|
| Nom | "Mrauto Canada" / "MRAUTO Canada" | ⚠️ Casse variable |
| Adresse | "Dakar, Sénégal" | ❌ Pas de rue/quartier |
| Téléphone | +221 77 834 64 64 | ✅ Cohérent |

**Problème de casse :** "Mrauto Canada" dans le schéma JSON-LD mais "MRAUTO Canada" dans l'UI → incohérence NAP mineure.

### Google Business Profile
- Aucun lien GBP sur le site ❌
- Aucune intégration d'avis Google ❌
- Sans GBP optimisé → absent du Local Pack Google Maps "concessionnaire Dakar"

---

## 7. Sécurité

### Headers HTTP (vercel.json)

| Header | État |
|--------|------|
| X-Content-Type-Options | ✅ |
| X-Frame-Options | ✅ |
| Strict-Transport-Security | ✅ Excellent |
| Referrer-Policy | ✅ |
| Permissions-Policy | ✅ |
| Content-Security-Policy | ❌ ABSENT |

### Exposition Supabase
- Clé anon `sb_publishable_*` visible dans le code HTML — normal pour une clé publique MAIS les Row Level Security (RLS) doivent impérativement être configurées côté Supabase.

### Admin exposé
- `admin.html` non bloqué dans robots.txt → indexable par Google ❌

---

## 8. AI Search Readiness (GEO)

### llms.txt — Score : 55/100
- Présent ✅ mais trop succinct (19 lignes)
- Manque : processus d'achat détaillé, FAQ, modèles disponibles, zones de livraison, fourchettes de prix

### Accessibilité aux crawlers IA
- Aucun blocage de GPTBot/PerplexityBot → les LLMs peuvent citer le site ✅
- Contenu structuré (FAQ, schema) favorise les réponses IA ✅
- Contenu dynamique Supabase non accessible aux crawlers IA sans JS ❌

---

## 9. Images

| Aspect | État |
|--------|------|
| OG Image dimensions | ❌ 1170×990 (devrait être 1200×630) |
| OG Image unique par page | ❌ Logo identique sur toutes les pages |
| Alt text logo | ✅ "MRAUTO Canada" |
| Alt text voitures | ✅ Dynamique (brand + model) |
| Alt text thumbnails galerie | ✅ `alt=""` correct |
| Format WebP/AVIF | ⚠️ Non contrôlable (Supabase CDN) |

---

## 10. Sitemap & Crawlabilité

| Aspect | État |
|--------|------|
| sitemap.xml présent | ✅ |
| Déclaré dans robots.txt | ✅ |
| URLs propres sans .html | ✅ (rewrites Vercel) |
| Page vendues dans sitemap | ✅ |
| Page fiche dans sitemap | ❌ (architecturalement impossible en CSR) |
| lastmod cohérentes | ✅ 2026-06-11 |

---

## Annexe : Inventaire des pages

| Page | Crawlable | Indexable | Schema | OG complète | Sitemap |
|------|-----------|-----------|--------|-------------|---------|
| / (home) | ✅ | ✅ | ✅ AutoDealer + FAQ | ⚠️ logo seul | ✅ |
| /catalogue | ✅ | ✅ | ⚠️ BreadcrumbList | ⚠️ logo seul | ✅ |
| /fiche?id=X | ✅ | ❌ Générique | ⚠️ Dynamique JS | ⚠️ logo seul | ❌ |
| /vendues | ✅ | ✅ | ❌ Aucun | ⚠️ logo seul | ✅ |
| /admin | ✅ | ⚠️ Non bloqué | ❌ | ❌ | ❌ |

---

*Rapport généré le 14 juin 2026 — Mrauto Canada SEO Audit v2.0*
