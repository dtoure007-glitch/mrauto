# Design System — MR Auto Canada
## Palette Blanc & Rouge · Instructions pour Claude Code

---

## 1. Tokens CSS (à coller dans `:root`)

```css
:root {
  /* Fonds */
  --bg:             #ffffff;        /* fond principal */
  --bg-alt:         #f5f5f5;        /* fond alterné (sections) */
  --card-bg:        #ffffff;        /* fond des cards */

  /* Texte */
  --text:           #111111;        /* texte principal */
  --text-muted:     rgba(17,17,17,0.48); /* texte secondaire */

  /* Accent — rouge logo */
  --accent:         #E2001A;        /* rouge principal (boutons, lignes, prix) */
  --accent-on-dark: #ff4d4d;        /* rouge sur fond sombre */
  --accent-pale:    rgba(226,0,26,0.07); /* rouge très léger (badges, trust pills) */

  /* Bordures & chips */
  --border:         rgba(17,17,17,0.1);
  --chip-bg:        rgba(17,17,17,0.05);

  /* Nav */
  --nav-bg:         rgba(255,255,255,0.97); /* nav scrollée (backdrop-filter blur) */

  /* Typographie */
  --font-display:   'Barlow Condensed', sans-serif; /* titres — 900, uppercase */
  --font-body:      'Barlow', sans-serif;            /* corps — 400/500/700 */

  /* Géométrie */
  --radius:         0px; /* angles vifs partout — pas de border-radius */
}
```

---

## 2. Google Fonts (à mettre dans `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

---

## 3. Sections sombres (fond noir — Stats, CTA push, Footer)

Ces sections gardent un fond **noir pur** pour le contraste fort :

```css
background: #111111;  /* Stats + CTA push + Footer */
```

Les chiffres et titres sur fond noir utilisent `--accent-on-dark` (`#ff4d4d`) ou blanc (`#ffffff`).

---

## 4. Ligne d'accent (remplace toute bande décorative)

Une simple ligne de 2–3px en `var(--accent)` :

```css
/* CSS */
.accent-line {
  height: 2px;          /* ou 3px */
  background: #E2001A;  /* = var(--accent) */
  width: 100%;
}
```

Utilisée en : haut de nav (au scroll), séparateurs de section, bas des photos, haut des cards Démarche, haut du formulaire.

---

## 5. Typographie — règles

| Usage | Font | Taille | Poids | Casse |
|---|---|---|---|---|
| H1 hero | Barlow Condensed | clamp(58px, 6.5vw, 96px) | 900 | UPPERCASE |
| H2 section | Barlow Condensed | 56px | 900 | UPPERCASE |
| H2 CTA | Barlow Condensed | clamp(44px, 5vw, 76px) | 900 | UPPERCASE |
| Kicker | Barlow | 10px | 700 | UPPERCASE · letter-spacing 0.22em |
| Corps | Barlow | 15–16px | 400–500 | Normal |
| Bouton | Barlow | 11–13px | 700 | UPPERCASE · letter-spacing 0.1em |
| Chip / Badge | Barlow | 9–11px | 700 | UPPERCASE · letter-spacing 0.14em |
| Label formulaire | Barlow | 10px | 700 | UPPERCASE · letter-spacing 0.12em |

---

## 6. Composants — styles clés

### Boutons
```css
/* Bouton primaire */
background: #E2001A;
color: #ffffff;
border-radius: 0;
padding: 17px 38px;          /* lg */
font-weight: 700;
letter-spacing: 0.1em;
text-transform: uppercase;
transition: opacity 0.15s;   /* hover: opacity 0.8 */

/* Bouton outline */
background: transparent;
color: #E2001A;
border: 1.5px solid #E2001A;
border-radius: 0;

/* Bouton WhatsApp */
background: #25D366;
color: #ffffff;
border-radius: 0;

/* Bouton ghost (sur fond sombre) */
background: transparent;
color: rgba(255,255,255,0.88);
border: 1px solid rgba(255,255,255,0.3);
border-radius: 0;
```

### Cards voiture
```css
background: #ffffff;
border: 1px solid rgba(17,17,17,0.1);
border-radius: 0;
/* hover */
border-color: #E2001A;
transform: translateY(-3px);
box-shadow: 0 8px 32px rgba(226,0,26,0.12);
transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
```

### Spec chips
```css
background: rgba(17,17,17,0.05);
border: 1px solid rgba(17,17,17,0.1);
border-radius: 0;
padding: 4px 10px;
font-size: 11px;
color: rgba(17,17,17,0.48);
```

### Badges
```css
/* Nouveau / accent */
background: #E2001A;
color: #ffffff;
border-radius: 0;
padding: 3px 9px;
font-size: 9px;
font-weight: 700;
letter-spacing: 0.14em;
text-transform: uppercase;

/* Live / subtil */
background: rgba(226,0,26,0.07);
color: #E2001A;
```

### Formulaire
```css
input, textarea {
  border: 1px solid rgba(17,17,17,0.1);
  border-radius: 0;
  background: #ffffff;
  color: #111111;
  font-family: 'Barlow', sans-serif;
}
input:focus, textarea:focus {
  border-color: #E2001A;
  outline: none;
}
```

### Navigation (scrollée)
```css
background: rgba(255,255,255,0.97);
backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(17,17,17,0.1);
/* + ligne accent 2px en haut */
```

---

## 7. Placeholders photos (avant vraies images)

```css
/* Cards voiture */
background: linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%);

/* Photos vendues */
background: linear-gradient(140deg, #dcdcdc, #c8c8c8);

/* Overlay sur photo hero */
background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%);
```

---

## 8. Spacing système

```
Section padding:  88px 60px  (desktop) → 60px 24px (mobile)
Card padding:     20px
Grid gap cards:   20px
Grid gap démarche: 16px
Grid gap vendues: 10px
Max-width page:   1280px
Nav height:       68px
```

---

## 9. Thèmes alternatifs (Tweaks)

Si l'app doit supporter plusieurs thèmes, voici les 3 variantes — seul `--accent` reste `#E2001A` dans tous les cas :

```js
const themes = {
  'blanc-rouge': {
    '--bg': '#ffffff', '--bg-alt': '#f5f5f5', '--card-bg': '#ffffff',
    '--text': '#111111', '--text-muted': 'rgba(17,17,17,0.48)',
    '--accent': '#E2001A', '--accent-on-dark': '#ff4d4d',
    '--accent-pale': 'rgba(226,0,26,0.07)',
    '--border': 'rgba(17,17,17,0.1)', '--chip-bg': 'rgba(17,17,17,0.05)',
    '--nav-bg': 'rgba(255,255,255,0.97)',
  },
  'noir-rouge': {
    '--bg': '#0e0e0e', '--bg-alt': '#191919', '--card-bg': '#1c1c1c',
    '--text': '#f0f0f0', '--text-muted': 'rgba(240,240,240,0.45)',
    '--accent': '#E2001A', '--accent-on-dark': '#ff4d4d',
    '--accent-pale': 'rgba(226,0,26,0.12)',
    '--border': 'rgba(255,255,255,0.08)', '--chip-bg': 'rgba(255,255,255,0.06)',
    '--nav-bg': 'rgba(14,14,14,0.97)',
  },
  'anthracite-rouge': {
    '--bg': '#1a1a1a', '--bg-alt': '#242424', '--card-bg': '#222222',
    '--text': '#e8e8e8', '--text-muted': 'rgba(232,232,232,0.45)',
    '--accent': '#E2001A', '--accent-on-dark': '#ff4d4d',
    '--accent-pale': 'rgba(226,0,26,0.12)',
    '--border': 'rgba(255,255,255,0.09)', '--chip-bg': 'rgba(255,255,255,0.06)',
    '--nav-bg': 'rgba(26,26,26,0.97)',
  },
};
```

---

## 10. Règles de design à respecter

- **Angles vifs partout** — `border-radius: 0` systématique
- **Pas de gradient sur les fonds** — uniquement couleurs plates
- **Rouge uniquement pour l'accent** — jamais pour le texte courant
- **Barlow Condensed uniquement pour les titres** — Barlow regular pour tout le reste
- **Flex/grid avec `gap`** — jamais de margins entre éléments frères
- **Hover boutons** — `opacity: 0.8`, transition 0.15s, pas de changement de couleur
- **Hover cards** — `translateY(-3px)` + `box-shadow` rouge subtil
- **Logo** — toujours circulaire (`border-radius: 50%`, `object-fit: cover`)
