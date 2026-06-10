# Plan d'Action SEO — MR Auto Canada
**Basé sur l'audit du 2026-06-10**

---

## CRITIQUE — À corriger immédiatement

### C-1 : Passer React en mode production
**Fichiers** : `index.html` (ligne 100-101), `catalogue.html` (lignes 56-57)  
**Impact** : Performance, LCP, score Core Web Vitals  
**Effort** : 10 min

Remplacer :
```html
react.development.js  →  react.production.min.js
react-dom.development.js  →  react-dom.production.min.js
```

### C-2 : Ajouter les balises canoniques manquantes
**Fichiers** : `catalogue.html`, `fiche.html`, `vendues.html`  
**Impact** : Indexation, duplicate content  
**Effort** : 15 min

Dans `<head>` de chaque page :
```html
<!-- catalogue.html -->
<link rel="canonical" href="https://www.mrautocanada.com/catalogue" />

<!-- vendues.html -->
<link rel="canonical" href="https://www.mrautocanada.com/vendues" />

<!-- fiche.html — dynamique, à mettre à jour via JS -->
<link rel="canonical" href="https://www.mrautocanada.com/fiche" id="canonical-tag" />
```

Pour `fiche.html`, ajouter dans le `React.useEffect` du chargement de la voiture :
```js
document.querySelector('#canonical-tag').href =
  `https://www.mrautocanada.com/fiche?id=${id}`;
```

### C-3 : Meta titre dynamique sur fiche.html
**Fichier** : `fiche.html`  
**Impact** : Indexation individuelle des fiches, CTR  
**Effort** : 20 min

Dans `FichePage`, ajouter :
```js
React.useEffect(() => {
  document.title = `${car.brand} ${car.model} ${car.year} — ${car.price} | Mrauto Canada`;
  document.querySelector('meta[name="description"]').content =
    `${car.brand} ${car.model} ${car.year}, ${car.km}, ${car.fuel}. ${car.price}. Essai routier gratuit, livraison à Dakar. Mrauto Canada.`;
}, [car]);
```

---

## HAUT — À corriger dans la semaine

### H-1 : Ajouter le schéma JSON-LD Organization + LocalBusiness
**Fichier** : `index.html`  
**Impact** : Rich results, Knowledge Graph, Local Pack Google  
**Effort** : 30 min

Ajouter dans `<head>` de `index.html` :
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  "name": "Mrauto Canada",
  "url": "https://www.mrautocanada.com",
  "telephone": "+221778346464",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dakar",
    "addressCountry": "SN"
  },
  "areaServed": {
    "@type": "City",
    "name": "Dakar"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.tiktok.com/@mrautoscanada",
    "https://www.instagram.com/mrautos_canada",
    "https://www.facebook.com/share/1G5fghNpeT/"
  ],
  "logo": "https://www.mrautocanada.com/logo.jpg",
  "image": "https://www.mrautocanada.com/logo.jpg",
  "description": "Concessionnaire de voitures d'occasion à Dakar, Sénégal. Véhicules inspectés, papiers vérifiés, essai routier gratuit et livraison à domicile.",
  "foundingDate": "2020",
  "priceRange": "$$"
}
</script>
```

### H-2 : Ajouter les balises Twitter Card manquantes
**Fichiers** : `catalogue.html`, `fiche.html`, `vendues.html`  
**Impact** : Partages sur X/Twitter, meilleure prévisualisation  
**Effort** : 15 min

Dans `<head>` de chaque page :
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[titre de la page]" />
<meta name="twitter:description" content="[description de la page]" />
<meta name="twitter:image" content="https://www.mrautocanada.com/logo.jpg" />
<meta name="twitter:image:alt" content="Logo Mrauto Canada" />
```

### H-3 : Ajouter og:locale et og:image:width/height manquants
**Fichiers** : `catalogue.html`, `fiche.html`, `vendues.html`  
**Impact** : Affichage correct des prévisualisations sociales  
**Effort** : 10 min

```html
<meta property="og:locale" content="fr_SN" />
<meta property="og:image:width" content="1170" />
<meta property="og:image:height" content="990" />
```

### H-4 : Corriger le sitemap.xml
**Fichier** : `sitemap.xml`  
**Impact** : Indexation correcte  
**Effort** : 15 min

- Remplacer `/fiche.html` par `/fiche` (URL propre) ou retirer cette URL du sitemap
- Remplacer `/catalogue.html` et `/vendues.html` par `/catalogue` et `/vendues`
- Mettre à jour `lastmod` avec la vraie date de modification

### H-5 : Compléter les en-têtes de sécurité
**Fichier** : `vercel.json`  
**Impact** : Sécurité, confiance Google  
**Effort** : 20 min

Ajouter dans la section `headers` :
```json
{ "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
{ "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
{ "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
```

### H-6 : Ajouter SRI sur fiche.html et vendues.html
**Fichiers** : `fiche.html` (lignes 63-65), `vendues.html` (lignes 44-46)  
**Impact** : Sécurité, best practice  
**Effort** : 10 min

Ajouter les attributs `integrity="sha384-..."` identiques à ceux de `index.html` sur les balises `<script>` React et Babel.

### H-7 : Unifier la casse de la marque
**Tous les fichiers**  
**Impact** : Cohérence de marque, confiance  
**Effort** : 10 min

Choisir une convention unique — recommandé : **"Mrauto Canada"** (titre) dans tous les `<title>` et balises meta. Utiliser **"MRAUTO Canada"** pour les éléments visuels UI seulement.

---

## MOYEN — À planifier dans le mois

### M-1 : Schéma Car/Product sur les fiches voiture
**Fichier** : `fiche.html`  
**Impact** : Rich results produit avec prix en SERP  
**Effort** : 45 min

Générer dynamiquement via JS après chargement de la fiche :
```js
const schema = {
  "@context": "https://schema.org",
  "@type": "Car",
  "name": `${car.brand} ${car.model} ${car.year}`,
  "brand": { "@type": "Brand", "name": car.brand },
  "modelDate": car.year,
  "mileageFromOdometer": { "@type": "QuantitativeValue", "value": car.km_numeric },
  "fuelType": car.fuel,
  "vehicleTransmission": car.transmission,
  "color": car.color,
  "offers": {
    "@type": "Offer",
    "price": car.price_numeric,
    "priceCurrency": "XOF",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "AutoDealer", "name": "Mrauto Canada" }
  }
};
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schema);
document.head.appendChild(script);
```

### M-2 : Créer /llms.txt
**Fichier** : `llms.txt` (nouveau)  
**Impact** : Visibilité IA (ChatGPT, Perplexity, Claude)  
**Effort** : 15 min

```
# Mrauto Canada

Concessionnaire de voitures d'occasion à Dakar, Sénégal.
Fondé en 2020. Spécialiste de l'import de véhicules depuis le Canada.

## Services
- Vente de voitures d'occasion inspectées
- Papiers vérifiés et dédouanement inclus
- Essai routier gratuit
- Livraison à domicile à Dakar

## Contact
Téléphone / WhatsApp : +221 77 834 64 64
Site : https://www.mrautocanada.com

## Pages principales
- Catalogue : https://www.mrautocanada.com/catalogue
- Voitures vendues : https://www.mrautocanada.com/vendues
- Contact : https://www.mrautocanada.com/#contact
```

### M-3 : Corriger le formulaire de contact (handler onSubmit)
**Fichier** : `index.html` — `ContactSection`  
**Impact** : Conversion, expérience utilisateur  
**Effort** : 1-2h

Ajouter un handler qui envoie les données (via Supabase insert ou email service).

### M-4 : Schéma BreadcrumbList
**Fichiers** : `catalogue.html`, `fiche.html`  
**Impact** : Fil d'Ariane en SERP  
**Effort** : 30 min

### M-5 : Schéma FAQ sur la homepage
**Fichier** : `index.html`  
**Impact** : Expanded results en SERP, visibilité IA  
**Effort** : 30 min

Ajouter une section FAQ (peut rester discrète visuellement) avec les questions fréquentes :
- "Comment acheter une voiture chez Mrauto Canada ?"
- "Proposez-vous un essai routier ?"
- "Livrez-vous à domicile à Dakar ?"
- "Les papiers sont-ils vérifiés ?"

### M-6 : Optimiser les titres de page trop courts
**Fichiers** : `catalogue.html`, `fiche.html`, `vendues.html`  
**Impact** : CTR en SERP  
**Effort** : 10 min

Suggestions :
- Catalogue : "Catalogue voitures d'occasion Dakar — Mrauto Canada"
- Vendues : "Voitures vendues à Dakar — Mrauto Canada | 20+ livraisons"
- Fiche : dynamique — voir C-3 ci-dessus

### M-7 : Créer une image OG dédiée
**Remplacement de** : `logo.jpg` pour les partages sociaux  
**Impact** : CTR partages WhatsApp, Facebook, Twitter  
**Effort** : 1h design

Créer une image `og-cover.jpg` en **1200×630** avec le nom de la marque, une voiture et la valeur proposition ("Voitures d'occasion à Dakar"). L'utiliser dans toutes les balises `og:image`.

---

## BAS — Backlog

### B-1 : Passer à un vrai bundler (Vite)
Éliminer Babel in-browser et React dev mode. Gain de performance estimé : 60-70% sur le JS.  
**Effort** : 2-4 jours | **Impact** : LCP < 2s

### B-2 : Apple Touch Icon + Web App Manifest
**Effort** : 1h | Améliore l'expérience mobile

### B-3 : Passer le favicon en PNG/ICO
**Effort** : 30 min

### B-4 : Générer des URLs de fiche sémantiques
`/fiche?id=123` → `/voitures/toyota-corolla-2021`  
Nécessite un routeur ou génération statique.  
**Effort** : 1-2 jours

### B-5 : Ajouter Google Analytics / Tag Manager
Pour tracker les conversions WhatsApp, appels, et pages vues.  
**Effort** : 1h

### B-6 : Page "À propos" dédiée
Renforce l'E-E-A-T (Expérience, Expertise, Autorité, Confiance).  
**Effort** : 2h design + rédaction

---

## Récapitulatif priorités

| # | Tâche | Priorité | Effort | Impact |
|---|-------|----------|--------|--------|
| C-1 | React prod mode | Critique | 10 min | LCP ↑↑ |
| C-2 | Canonical sur 3 pages | Critique | 15 min | Indexation ↑↑ |
| C-3 | Meta titre dynamique fiche | Critique | 20 min | CTR fiches ↑↑↑ |
| H-1 | Schema Organization/LocalBusiness | Haut | 30 min | Local SEO ↑↑↑ |
| H-2 | Twitter Card sur 3 pages | Haut | 15 min | Social sharing ↑ |
| H-3 | og:locale + image dims | Haut | 10 min | Social sharing ↑ |
| H-4 | Sitemap corrigé | Haut | 15 min | Indexation ↑ |
| H-5 | En-têtes sécurité | Haut | 20 min | Confiance ↑ |
| H-6 | SRI sur fiche+vendues | Haut | 10 min | Sécurité ↑ |
| H-7 | Unifier casse marque | Haut | 10 min | Cohérence ↑ |
| M-1 | Schema Car/Product | Moyen | 45 min | Rich results ↑↑ |
| M-2 | llms.txt | Moyen | 15 min | IA search ↑ |
| M-3 | Formulaire contact fonctionnel | Moyen | 1-2h | Conversion ↑↑ |
| M-4 | Schema BreadcrumbList | Moyen | 30 min | SERP ↑ |
| M-5 | Schema FAQ homepage | Moyen | 30 min | SERP + IA ↑ |
| M-6 | Titres optimisés | Moyen | 10 min | CTR ↑ |
| M-7 | Image OG 1200×630 | Moyen | 1h | Partages ↑ |
| B-1 | Migration Vite | Bas | 2-4j | Perf ↑↑↑ |
| B-4 | URLs sémantiques fiches | Bas | 1-2j | SEO structurel ↑ |

**Score estimé après Critique + Haut** : **~65-68 / 100**  
**Score estimé après tout le plan** : **~78-82 / 100**
