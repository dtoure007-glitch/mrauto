# Prompt — Site vitrine vendeur de voitures (Dakar) avec design system fourni

## Contexte
Crée un site vitrine one-page (landing page) pour un vendeur particulier de voitures basé à **Dakar, Sénégal**. Le site doit **créer immédiatement la confiance** et **pousser à l'achat/contact**. Le CTA principal est **WhatsApp**.

Je te fournirai un **design system de référence** (inspiré BMW) en Markdown. Applique-le fidèlement pour :
- La typographie (famille, tailles, poids, hiérarchie)
- La palette de couleurs (primaire, fond, accent, états)
- Les composants UI (boutons, cards, badges, chips, formulaires, nav)
- L'espacement, les rayons, les ombres

---

## Structure de la page (dans l'ordre)

### 1. Navigation sticky
- Logo (nom du vendeur) à gauche
- Liens : Voitures · Vendues · Démarche · Contact
- CTA WhatsApp à droite (bouton coloré)
- Transparente au top, blur/opaque au scroll

### 2. Hero (layout split)
- **Gauche** : kicker uppercase tracké · H1 très grand serif · sous-titre 2 lignes · 3 trust badges pill (✓ Papiers vérifiés · ✓ Essai gratuit · ✓ Livraison domicile) · 2 boutons (catalogue + WhatsApp) · note "Réponse < 1h · 7j/7"
- **Droite** : placeholder image voiture vedette (full height, overlay gradient)
- Hauteur : 100vh (minus nav)

### 3. Bande de statistiques (fond sombre)
- 3 colonnes : **200+ voitures vendues** · **8 ans d'expérience** · **100% clients livrés**
- Chiffres très grands, libellés sous en petite typo

### 4. Catalogue (`id="voitures"`)
- Section header (kicker + titre + sous-titre) + badge "Mis à jour récemment" à droite
- Grille 3×2 de cards voiture. Chaque card : placeholder photo · badge (Nouveau / Coup de cœur) · marque + modèle + année · prix accent · spec chips (km / carburant / transmission / couleur) · 2 boutons (Voir fiche + WhatsApp)
- Bouton "Voir toutes les voitures" centré en bas
- **Pas de filtres**

### 5. Démarche (`id="demarche"`, fond alterné)
- Section header centré
- 5 cards en ligne : numéro stylisé · emoji · titre · description courte
- Accent de couleur en bordure top de chaque card

### 6. Social proof (`id="vendues"`)
- Layout 2 colonnes : gauche = chiffre "200+" très grand (couleur accent) + tagline + bouton · droite = grille 3×3 de photos vendues avec badge "VENDUE" overlay

### 7. CTA push (fond sombre)
- Titre grand sur 2 lignes ("Une voiture en tête ? / Écris-moi maintenant.")
- Sous-titre muted
- 2 boutons centrés (WhatsApp + Appeler)

### 8. Contact (`id="contact"`)
- 2 colonnes : gauche = titre + bouton WhatsApp + bouton téléphone + adresse/horaires · droite = formulaire card (nom / téléphone / voiture / budget / message + submit)

### 9. Footer (fond sombre)
- Logo · liens nav · copyright

### 10. FAB WhatsApp
- Bouton circulaire fixe bas-droite, icône SVG WhatsApp, hover scale

---

## Comportement & UX
- Smooth scroll entre sections (ancres #)
- Hover sur cards voiture : shadow + translateY(-3px)
- Boutons : opacity 0.85 au hover, transition 0.15s
- Nav : backdrop-filter blur au scroll, border-bottom apparaît
- FAB WhatsApp : scale(1.1) au hover

---

## Stack technique
- React 18 + Babel standalone (JSX inline dans le HTML)
- CSS custom properties pour le thème (variables sur `:root`)
- Responsive : 3 breakpoints (1024px, 640px)
- Les images sont des **placeholders élégants** (dégradé CSS + label monospace uppercase) — à remplacer par de vraies photos
- Numéro WhatsApp : `+221XXXXXXXXX` (placeholder à remplacer)

---

## Ce que je vais fournir après ce prompt
- Le **design system Markdown** de référence (BMW) avec tokens de couleurs, typographie, composants
- Le **nom réel** du vendeur
- Le **numéro WhatsApp** réel

Applique le design system rigoureusement. Si un token n'est pas explicitement défini dans le MD, reste cohérent avec le style général (premium, sobre, confiance).
