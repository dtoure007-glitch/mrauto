// hifi-components.jsx — Palette Blanc & Rouge (design-handoff v2)
// Accent unique var(--accent) = #E2001A (rouge logo)

// ── RESPONSIVE HOOK ───────────────────────────────────────────────────────────
function useIsMobile(bp = 640) {
  const [is, setIs] = React.useState(() => window.innerWidth <= bp);
  React.useEffect(() => {
    const h = () => setIs(window.innerWidth <= bp);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return is;
}

// ── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold, rootMargin: '0px 0px -30px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── ANIMATED COUNTER HOOK ─────────────────────────────────────────────────────
function useCounter(target, duration = 1400, trigger = false) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!trigger || !target) return;
    let raf;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return val;
}

// ── ACCENT LINE ───────────────────────────────────────────────────────────────
function MStripe({ height = 3, vertical = false, style = {} }) {
  return (
    <div style={{
      background: 'var(--accent)',
      flexShrink: 0,
      ...(vertical ? { width: height, alignSelf: 'stretch' } : { height, width: '100%' }),
      ...style
    }} />);

}

// ── IMAGE PLACEHOLDER ─────────────────────────────────────────────────────────
function ImgPlaceholder({ label, style = {}, bg, overlay = false }) {
  return (
    <div style={{
      background: bg || 'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', flexShrink: 0, ...style
    }}>
      {overlay &&
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)' }} />
      }
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.22em',
        color: 'rgba(0,0,0,0.22)', textTransform: 'uppercase',
        position: 'relative', userSelect: 'none', textAlign: 'center', padding: '0 8px'
      }}>{label || '← photo →'}</span>
    </div>);

}

// ── BADGE ─────────────────────────────────────────────────────────────────────
function HifiBadge({ children, variant = 'primary', style = {} }) {
  const v = {
    primary: { bg: 'rgba(0,0,0,0.07)', color: 'var(--text)' },
    gold: { bg: 'var(--accent)', color: '#fff' },
    green: { bg: '#25D366', color: '#fff' },
    hot: { bg: '#c23b22', color: '#fff' },
    live: { bg: 'var(--accent-pale)', color: 'var(--accent)' },
    new: { bg: '#000', color: '#fff' }
  }[variant] || { bg: 'rgba(0,0,0,0.07)', color: 'var(--text)' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: 0,
      background: v.bg, color: v.color,
      fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.6,
      flexShrink: 0, ...style
    }}>{children}</span>);

}

// ── SPEC CHIP ─────────────────────────────────────────────────────────────────
function SpecChip({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 10px', borderRadius: 0,
      background: 'var(--chip-bg)', color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)', fontSize: 11, lineHeight: 1.4,
      flexShrink: 0, border: '1px solid var(--border)'
    }}>{children}</span>);

}

// ── BUTTON ────────────────────────────────────────────────────────────────────
function HifiBtn({ children, variant = 'primary', size = 'md', href, onClick, style = {}, full = false }) {
  const sz = {
    sm: { padding: '9px 18px', fontSize: 11 },
    md: { padding: '13px 26px', fontSize: 12 },
    lg: { padding: '17px 38px', fontSize: 13 }
  }[size] || {};
  const vr = {
    primary: { background: 'var(--accent)', color: '#fff', border: 'none' },
    whatsapp: { background: '#25D366', color: '#fff', border: 'none' },
    outline: { background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)' },
    ghost: { background: 'transparent', color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.3)' },
    accent: { background: 'var(--accent)', color: '#fff', border: 'none' }
  }[variant] || {};
  const El = href ? 'a' : 'button';
  return (
    <El href={href} onClick={onClick}
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, width: full ? '100%' : undefined, cursor: 'pointer',
      fontFamily: 'var(--font-body)', fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
      borderRadius: 0, transition: 'opacity 0.15s ease',
      ...vr, ...sz, ...style
    }}
    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
      {children}</El>);

}

// ── WHATSAPP ICON ─────────────────────────────────────────────────────────────
function WaIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>);

}

// ── CAR GRADIENTS (cool light tones) ─────────────────────────────────────────
const CAR_GRADIENTS = [
'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)'];


// ── CAR CARD ──────────────────────────────────────────────────────────────────
function CarCard({ id, index = 0, brand, model, year, price, km, fuel, transmission, color, featured, created_at, cover_photo }) {
  const [revealRef, revealed] = useScrollReveal();
  const isMobile = useIsMobile();
  const delay = index * 80;
  const msg = encodeURIComponent(`Bonjour MR Auto Canada, je suis intéressé(e) par la ${brand} ${model} ${year} à ${price}. Est-elle toujours disponible ?`);

  let badgeLabel = null;
  let badgeVariant = 'new';
  if (featured) {
    badgeLabel = 'VEDETTE';
    badgeVariant = 'gold';
  } else if (created_at) {
    const ageDays = (Date.now() - new Date(created_at).getTime()) / 86400000;
    if (ageDays < 30) {
      badgeLabel = 'NOUVEAU';
      badgeVariant = 'new';
    }
  }

  return (
    <div ref={revealRef} style={{
      opacity: revealed ? 1 : 0,
      transform: revealed ? 'none' : 'translateY(32px)',
      transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      <div className="car-card"
        style={{
          background: 'var(--card-bg)', borderRadius: 0, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          border: '1px solid var(--border)', height: '100%',
          transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(226,0,26,0.14)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
        <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0 }}>
          {cover_photo
            ? <img src={cover_photo} alt={`${brand} ${model}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            : <ImgPlaceholder bg={CAR_GRADIENTS[index % CAR_GRADIENTS.length]} label={`${brand} ${model}`} style={{ height: 220 }} />
          }
          <MStripe height={2} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
          {badgeLabel &&
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
              <HifiBadge variant={badgeVariant}>{badgeLabel}</HifiBadge>
            </div>
          }
        </div>
        <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 27, fontWeight: 900,
              color: 'var(--text)', lineHeight: 1.0,
              textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 2
            }}>{brand} {model}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{year}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.02em' }}>{price}</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            <SpecChip>{km}</SpecChip><SpecChip>{fuel}</SpecChip>
            <SpecChip>{transmission}</SpecChip><SpecChip>{color}</SpecChip>
          </div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 8, marginTop: 4 }}>
            <HifiBtn variant="outline" size="sm" href={id ? `fiche.html?id=${id}` : '#'} style={{ flex: 1 }}>Voir la fiche</HifiBtn>
            <HifiBtn variant="whatsapp" size="sm" href={`https://wa.me/221XXXXXXXXX?text=${msg}`} style={{ flex: 1, gap: 6 }}>
              <WaIcon size={13} /> WhatsApp
            </HifiBtn>
          </div>
        </div>
      </div>
    </div>);

}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
function SectionHeader({ kicker, title, subtitle, align = 'left', style = {} }) {
  return (
    <div style={{ marginBottom: 44, textAlign: align, ...style }}>
      {kicker &&
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
        justifyContent: align === 'center' ? 'center' : 'flex-start'
      }}>
          <MStripe height={2} style={{ width: 22 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>{kicker}</span>
          {align === 'center' && <MStripe height={2} style={{ width: 22 }} />}
        </div>
      }
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 5.5vw, 56px)', fontWeight: 900,
        color: 'var(--text)', margin: 0, lineHeight: 0.95,
        letterSpacing: '0.015em', textTransform: 'uppercase'
      }}>{title}</h2>
      {subtitle &&
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)',
        lineHeight: 1.65, maxWidth: 560,
        margin: align === 'center' ? '16px auto 0' : '16px 0 0'
      }}>{subtitle}</p>
      }
    </div>);

}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function HifiNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen]         = React.useState(false);
  const isMobile                = useIsMobile();

  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', h, { passive: true });
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  React.useEffect(() => { if (!isMobile && open) setOpen(false); }, [isMobile]);

  const links = [['Voitures', '#voitures'], ['Vendues', '#vendues'], ['Démarche', '#demarche'], ['Contact', '#contact']];
  const navBg = scrolled || open;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      background: navBg ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: navBg ? 'blur(20px)' : 'none',
      borderBottom: navBg ? '1px solid var(--border)' : 'none',
      transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease'
    }}>
      {scrolled && <MStripe height={2} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 20px' : '0 56px', height: 68 }}>
        <img src="logo.jpg" alt="MR Auto Canada"
          style={{ height: isMobile ? 40 : 48, width: isMobile ? 40 : 48, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center', display: 'block', flexShrink: 0 }} />

        {isMobile ? (
          <button onClick={() => setOpen(o => !o)} aria-label={open ? 'Fermer le menu' : 'Menu'}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', transition: 'transform 0.25s, opacity 0.25s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', transition: 'opacity 0.25s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', transition: 'transform 0.25s, opacity 0.25s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 32 }}>
              {links.map(([l, h]) =>
                <a key={l} href={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>{l}</a>
              )}
            </div>
            <HifiBtn variant="whatsapp" size="sm" href="https://wa.me/221XXXXXXXXX" style={{ gap: 6 }}>
              <WaIcon size={13} /> WhatsApp
            </HifiBtn>
          </>
        )}
      </div>

      {isMobile && open && (
        <div style={{ background: 'var(--nav-bg)', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
          {links.map(([l, h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
              {l}
            </a>
          ))}
          <div style={{ padding: '16px 20px' }}>
            <HifiBtn variant="whatsapp" href="https://wa.me/221XXXXXXXXX" full style={{ gap: 8 }}>
              <WaIcon size={15} /> WhatsApp
            </HifiBtn>
          </div>
        </div>
      )}
    </nav>);

}

// ── FOOTER (fond sombre intentionnel pour le contraste final) ─────────────────
function HifiFooter() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: '#111111', display: 'flex', flexDirection: 'column' }}>
      <MStripe height={3} />
      <div style={{ padding: isMobile ? '32px 24px' : '44px 60px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: isMobile ? 8 : 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12, flex: 1, minWidth: 0 }}>
          <img src="logo.jpg" alt="MR Auto Canada" style={{ height: isMobile ? 36 : 52, width: isMobile ? 36 : 52, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center', display: 'block', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 13 : 20, color: '#fff', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.1 }}>MR Auto Canada</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? 8 : 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dakar, Sénégal · Depuis 2020</div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ display: 'flex', gap: 28 }}>
            {[['Catalogue', '#voitures'], ['Vendues', '#vendues'], ['Démarche', '#demarche'], ['Contact', '#contact']].map(([l, h]) =>
              <a key={l} href={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l}</a>
            )}
          </div>
        )}
        <div style={{ flex: isMobile ? undefined : 1, display: isMobile ? undefined : 'flex', justifyContent: isMobile ? undefined : 'flex-end', fontFamily: 'var(--font-body)', fontSize: isMobile ? 8 : 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, whiteSpace: 'nowrap' }}>© 2026 MR AUTO CANADA</div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: isMobile ? '10px 24px' : '10px 60px', textAlign: 'center' }}>
        <a href="https://wa.me/221772030926" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', textDecoration: 'none' }}>
          Besoin d'un site web ? Contactez-moi : +221 77 203 09 26
        </a>
      </div>
    </footer>);

}

Object.assign(window, {
  useIsMobile, useScrollReveal, useCounter,
  MStripe, ImgPlaceholder, HifiBadge, SpecChip, HifiBtn, WaIcon,
  CarCard, SectionHeader, HifiNav, HifiFooter, CAR_GRADIENTS
});