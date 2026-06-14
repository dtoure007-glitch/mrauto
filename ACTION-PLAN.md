# Plan d'Action SEO — Mrauto Canada
**Mis à jour :** 14 juin 2026  
**Basé sur :** Audit v2.0 — Score actuel : 58/100

---

## CRITIQUE — À faire immédiatement

### C-1 · Bloquer /admin dans robots.txt
**Effort :** 5 min | **Impact :** Sécurité + SEO

Ajouter `Disallow: /admin` et `Disallow: /admin.html` dans robots.txt.

---

### C-2 · Architecture fiche voiture — Migrer vers SSR ou Static Generation
**Effort :** 3-5 jours | **Impact :** +25 pts de score SEO potentiel

**Problème :** `fiche.html?id=XXX` avec rendu CSR = pages non indexables individuellement.

**Solution recommandée : Next.js App Router**
```
/voitures/toyota-corolla-2019  <- URL propre, statique, indexable
/voitures/honda-crv-2020
```
Chaque page générée avec `generateStaticParams()` depuis Supabase à build time.

**Alternative rapide :** Pré-générer les fiches HTML depuis un script Node.js à chaque mise à jour du catalogue.

---

### C-3 · Supprimer Babel Standalone — Pré-compiler le JSX
**Effort :** 1-2 jours | **Impact :** LCP -60%, score CWV +40 pts

Babel Standalone (882 KB) transpile le JSX dans le navigateur à chaque visite.
La solution : pré-compiler une fois à l'étape de build (esbuild, Vite, ou Next.js).

---

## HAUTE PRIORITÉ — Semaine 1

### H-1 · Schema AggregateRating sur la homepage
**Effort :** 30 min | **Impact :** Rich snippets étoiles dans Google

Ajouter dans le schéma AutoDealer existant :
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "20",
  "bestRating": "5"
}
```

---

### H-2 · Schema ItemList sur vendues.html
**Effort :** 1h | **Impact :** Google comprend que c'est une liste de produits

Ajouter un bloc `ItemList` JSON-LD avec les voitures vendues.

---

### H-3 · Enrichir llms.txt
**Effort :** 30 min | **Impact :** Meilleure citation par ChatGPT, Perplexity, etc.

Ajouter : processus d'achat en 5 étapes, FAQ complète, fourchette de prix (FCFA), zones desservies (quartiers de Dakar), marques typiques.

---

### H-4 · OG Image dédiée par page (1200x630)
**Effort :** 2h | **Impact :** +30% CTR sur les partages WhatsApp/Facebook

Créer 3 images OG 1200x630 (utiliser `og-image-generator.html` déjà présent) :
- Home : Logo + tagline sur fond sombre
- Catalogue : Grille voitures + titre
- Vendues : Photo livraison + "20+ clients livrés"

Remplacer les balises og:image sur chaque page.

---

### H-5 · Corriger le canonical de la home
**Effort :** 5 min | **Impact :** Évite les conflits de canonicalisation

```html
<!-- Avant -->
<link rel="canonical" href="https://www.mrautocanada.com" />
<!-- Après -->
<link rel="canonical" href="https://www.mrautocanada.com/" />
```

---

### H-6 · Unifier la casse du nom de marque
**Effort :** 15 min | **Impact :** Cohérence NAP pour le Local SEO

Choisir "MRAUTO Canada" et l'appliquer dans le schema JSON-LD ET dans l'UI (footer, nav).

---

### H-7 · Versionner hifi-components.jsx sur fiche.html
**Effort :** 2 min | **Impact :** Évite le cache stale

```html
<script type="text/babel" src="hifi-components.jsx?v=4"></script>
```

---

## PRIORITÉ MOYENNE — Mois 1

### M-1 · Adresse physique précise
**Effort :** 30 min | **Impact :** Local SEO significatif

Ajouter quartier / rue / point de repère dans le schéma JSON-LD, la section Contact et le footer.

---

### M-2 · Section témoignages textuels + schema Review
**Effort :** 2h | **Impact :** E-E-A-T fort + conversion

3-5 témoignages de clients réels avec prénom, quartier, voiture. Schema Review correspondant.

---

### M-3 · Schema WebSite + SearchAction
**Effort :** 20 min | **Impact :** Éligibilité Sitelinks Search Box

```json
{
  "@type": "WebSite",
  "url": "https://www.mrautocanada.com/",
  "name": "MRAUTO Canada",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.mrautocanada.com/catalogue?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

### M-4 · Content-Security-Policy header
**Effort :** 1h | **Impact :** Sécurité + signal confiance

Ajouter une CSP dans vercel.json couvrant les domaines utilisés : unpkg.com, cdn.jsdelivr.net, fonts.googleapis.com, Supabase, Google Analytics.

---

### M-5 · Enrichir la meta description de vendues.html
**Effort :** 5 min

```html
<meta name="description" content="20+ voitures livrées à Dakar par Mrauto Canada depuis 2020. Toyota, Honda, Nissan — chaque vente, un client livré, papiers vérifiés. Zéro vice caché." />
```

---

### M-6 · Créer une page "À propos"
**Effort :** 2h | **Impact :** E-E-A-T fort

Photo fondateur, histoire depuis 2020, processus de sélection Canada, engagement qualité. Lien depuis la navigation.

---

### M-7 · Lier le Google Business Profile
**Effort :** 30 min | **Impact :** Local Pack Google Maps

Créer/revendiquer GBP, ajouter le lien dans `sameAs` du schéma, ajouter "Voir nos avis Google" dans la section contact.

---

## BASSE PRIORITÉ — Trimestre 1

### L-1 · Articles de blog informatifs
**Mots-clés cibles :**
- "acheter voiture occasion Dakar"
- "import voiture Canada Sénégal"
- "voiture dédouanée Sénégal prix"

---

### L-2 · Optimisation Google Business Profile
Photos, réponses aux avis, posts hebdomadaires nouvelles arrivées.

---

### L-3 · IndexNow pour Bing
Utiliser le script `indexnow_submit.py` disponible pour notifier Bing de chaque nouvelle voiture.

---

## Tableau de priorisation

| ID | Action | Effort | Impact | Urgence |
|----|--------|--------|--------|---------|
| C-1 | Bloquer /admin robots.txt | 5 min | Moyen | IMMEDIAT |
| C-2 | Migration SSR fiche pages | 3-5j | TRÈS FORT | IMMEDIAT |
| C-3 | Supprimer Babel Standalone | 1-2j | TRÈS FORT | IMMEDIAT |
| H-1 | Schema AggregateRating | 30 min | Moyen | Semaine 1 |
| H-2 | Schema ItemList vendues | 1h | Moyen | Semaine 1 |
| H-3 | Enrichir llms.txt | 30 min | Faible | Semaine 1 |
| H-4 | OG Images 1200x630 | 2h | Moyen | Semaine 1 |
| H-5 | Canonical trailing slash | 5 min | Faible | Semaine 1 |
| H-6 | Unifier casse marque | 15 min | Faible | Semaine 1 |
| H-7 | Version hifi-components fiche | 2 min | Faible | Semaine 1 |
| M-1 | Adresse physique complete | 30 min | FORT | Mois 1 |
| M-2 | Temoignages textuels | 2h | Fort | Mois 1 |
| M-3 | Schema WebSite SearchAction | 20 min | Faible | Mois 1 |
| M-4 | Content-Security-Policy | 1h | Moyen | Mois 1 |
| M-5 | Meta desc vendues | 5 min | Faible | Mois 1 |
| M-6 | Page A propos | 2h | Fort | Mois 1 |
| M-7 | Lier Google Business Profile | 30 min | FORT | Mois 1 |
| L-1 | Blog articles | 3h/article | Tres fort | Trimestre 1 |

---

## Score projeté après corrections

| Etape | Score estimé |
|-------|-------------|
| Actuellement | 58/100 |
| + Quick wins (C-1, H-1 à H-7) | 65/100 |
| + Mois 1 (M-1 à M-7) | 73/100 |
| + Migration SSR (C-2) | 82/100 |
| + Suppression Babel (C-3) | 87/100 |
| + Contenu blog (L-1) | 91/100 |

---

*Plan d'action généré le 14 juin 2026 — Mrauto Canada SEO Audit v2.0*
