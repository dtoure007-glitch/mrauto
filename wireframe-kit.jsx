// Wireframe primitives — sketchy / low-fi look.
// Shared across all 4 directions.

// Image placeholder with X diagonals
function WfImg({ w, h, label, dashed = true, dark = false, style = {} }) {
  const bg = dark ? '#1a1a1a' : 'transparent';
  const stroke = dark ? '#fff' : '#222';
  const op = dark ? 0.45 : 0.35;
  return (
    <div style={{
      width: w === undefined ? '100%' : w,
      height: h === undefined ? '100%' : h,
      background: bg,
      border: `${dashed ? '1.5px dashed' : '1.5px solid'} ${stroke}`,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: 13,
      color: stroke,
      opacity: dark ? 0.95 : 1,
      flexShrink: 0,
      ...style,
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: op }} preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={stroke} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={stroke} strokeWidth="1" />
      </svg>
      {label && <span style={{ position: 'relative', background: dark ? '#1a1a1a' : '#fff', padding: '2px 8px', borderRadius: 2 }}>{label}</span>}
    </div>
  );
}

// Plain dashed box (no X)
function WfBox({ children, style = {}, solid = false }) {
  return (
    <div style={{
      border: solid ? '1.5px solid #222' : '1.5px dashed #222',
      padding: '12px 14px',
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: 14,
      color: '#222',
      ...style,
    }}>{children}</div>
  );
}

// Pill button
function WfBtn({ children, dark = false, accent, style = {}, w }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 18px',
      borderRadius: 999,
      border: `1.5px solid ${accent || '#222'}`,
      background: dark ? (accent || '#222') : 'transparent',
      color: dark ? '#fff' : (accent || '#222'),
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: 14,
      width: w,
      ...style,
    }}>{children}</div>
  );
}

// Squared button
function WfBtnSq({ children, dark = false, accent, style = {}, w, h }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 20px',
      border: `1.5px solid ${accent || '#222'}`,
      background: dark ? (accent || '#222') : 'transparent',
      color: dark ? '#fff' : (accent || '#222'),
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: 14,
      width: w,
      height: h,
      ...style,
    }}>{children}</div>
  );
}

// Hand-written label
function WfH({ children, size = 28, weight = 400, style = {} }) {
  return (
    <div style={{
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: size,
      fontWeight: weight,
      lineHeight: 1.15,
      color: '#1a1a1a',
      ...style,
    }}>{children}</div>
  );
}

// Greeking text bars (multiple horizontal lines of varying widths)
function WfText({ lines = 3, widths, style = {}, color = '#222', thickness = 6, gap = 8 }) {
  const ws = widths || Array.from({ length: lines }, (_, i) => i === lines - 1 ? 65 : 95 - (i % 2) * 8);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
      {ws.map((w, i) => (
        <div key={i} style={{ height: thickness, width: `${w}%`, background: color, opacity: 0.7, borderRadius: thickness / 2 }} />
      ))}
    </div>
  );
}

// Annotation arrow + label (sketchy)
function WfNote({ children, color = '#c44', style = {} }) {
  return (
    <div style={{
      fontFamily: 'Caveat, cursive',
      fontSize: 18,
      color,
      lineHeight: 1.2,
      ...style,
    }}>{children}</div>
  );
}

// Sketchy circle (for icons / dots / step numbers)
function WfCircle({ n, size = 38, accent = '#222', dark = false }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: `1.5px solid ${accent}`,
      background: dark ? accent : 'transparent',
      color: dark ? '#fff' : accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: size * 0.5,
      flexShrink: 0,
    }}>{n}</div>
  );
}

// Section title (used inside wireframe pages)
function WfSection({ title, kicker, children, accent = '#222', style = {} }) {
  return (
    <div style={{ ...style }}>
      {kicker && (
        <div style={{
          fontFamily: 'Caveat, cursive',
          fontSize: 18,
          color: accent,
          marginBottom: 4,
        }}>— {kicker}</div>
      )}
      <div style={{
        fontFamily: 'Patrick Hand, sans-serif',
        fontSize: 34,
        color: '#1a1a1a',
        marginBottom: 20,
        lineHeight: 1.1,
      }}>{title}</div>
      {children}
    </div>
  );
}

// Tag/badge
function WfTag({ children, accent = '#222', filled = false, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: 4,
      border: `1.5px solid ${accent}`,
      background: filled ? accent : 'transparent',
      color: filled ? '#fff' : accent,
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: 12,
      lineHeight: 1.3,
      ...style,
    }}>{children}</div>
  );
}

// Car card — composable, configurable
function WfCarCard({ w = 320, h = 380, accent = '#222', badge, title = 'BMW X5 — 2019', price = '18 500 000 FCFA', specs = ['62 000 km', 'Diesel', 'Auto'], color = 'Noir', sold = false, ctaWhatsapp = true, style = {} }) {
  return (
    <div style={{
      width: w,
      height: h,
      border: '1.5px solid #222',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      position: 'relative',
      flexShrink: 0,
      ...style,
    }}>
      <div style={{ flex: '1 1 auto', position: 'relative', minHeight: 0 }}>
        <WfImg label="photo voiture" dashed={false} style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1.5px solid #222' }} />
        {badge && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <WfTag accent={accent} filled>{badge}</WfTag>
          </div>
        )}
        {sold && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ transform: 'rotate(-12deg)', border: '2px solid #c44', color: '#c44', padding: '4px 18px', fontFamily: 'Patrick Hand, sans-serif', fontSize: 22 }}>VENDUE</div>
          </div>
        )}
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <WfH size={17}>{title}</WfH>
        <WfH size={18} style={{ color: accent }}>{price}</WfH>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {specs.map((s, i) => <WfTag key={i}>{s}</WfTag>)}
          <WfTag>{color}</WfTag>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <WfBtn style={{ padding: '6px 12px', fontSize: 12 }}>Voir détails</WfBtn>
          {ctaWhatsapp && <WfBtn dark accent={accent} style={{ padding: '6px 12px', fontSize: 12 }}>WhatsApp</WfBtn>}
        </div>
      </div>
    </div>
  );
}

// Simple top nav for wireframes
function WfNav({ brand = 'Tonton N.', items = ['Voitures', 'Vendues', 'Démarche', 'Contact'], accent = '#222', centered = false, dark = false, style = {} }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: centered ? 'center' : 'space-between',
      padding: '20px 48px',
      borderBottom: '1.5px solid ' + (dark ? '#fff' : '#222'),
      background: dark ? '#1a1a1a' : 'transparent',
      color: dark ? '#fff' : '#222',
      gap: centered ? 40 : 0,
      ...style,
    }}>
      <div style={{ fontFamily: 'Patrick Hand, sans-serif', fontSize: 22, fontWeight: 600 }}>{brand}</div>
      <div style={{ display: 'flex', gap: 28, fontFamily: 'Patrick Hand, sans-serif', fontSize: 15, opacity: 0.9 }}>
        {items.map((it, i) => <div key={i}>{it}</div>)}
      </div>
      {!centered && <WfBtn accent={accent} dark={!dark} style={{ background: dark ? '#fff' : accent, color: dark ? '#222' : '#fff', padding: '8px 16px', fontSize: 13 }}>WhatsApp</WfBtn>}
    </div>
  );
}

// Footer
function WfFooter({ accent = '#222', dark = false, style = {} }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 48px',
      borderTop: '1.5px solid ' + (dark ? '#fff' : '#222'),
      background: dark ? '#1a1a1a' : 'transparent',
      color: dark ? '#fff' : '#222',
      fontFamily: 'Patrick Hand, sans-serif',
      fontSize: 13,
      opacity: 0.85,
      ...style,
    }}>
      <div>Tonton N. — Dakar, Sénégal</div>
      <div style={{ display: 'flex', gap: 18 }}>
        <span>WhatsApp</span>
        <span>Instagram</span>
        <span>+221 XX XXX XX XX</span>
      </div>
    </div>
  );
}

Object.assign(window, { WfImg, WfBox, WfBtn, WfBtnSq, WfH, WfText, WfNote, WfCircle, WfSection, WfTag, WfCarCard, WfNav, WfFooter });
