import { useState, useEffect, useRef } from 'react';

// ── RESPONSIVE HOOK ───────────────────────────────────────────────────────────
export function useIsMobile(bp = 640) {
  const [is, setIs] = useState(() => window.innerWidth <= bp);
  useEffect(() => {
    const h = () => setIs(window.innerWidth <= bp);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return is;
}

// ── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
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
export function useCounter(target, duration = 1400, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
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
export function MStripe({ height = 3, vertical = false, style = {} }) {
  return (
    <div style={{
      background: 'var(--accent)',
      flexShrink: 0,
      ...(vertical ? { width: height, alignSelf: 'stretch' } : { height, width: '100%' }),
      ...style
    }} />
  );
}

// ── SUPABASE IMAGE TRANSFORM ──────────────────────────────────────────────────
export function toWebP(url, width = 800, quality = 80) {
  if (!url || !url.includes('/storage/v1/object/public/')) return url;
  return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
    + `?width=${width}&format=webp&quality=${quality}`;
}

// ── IMAGE PLACEHOLDER ─────────────────────────────────────────────────────────
export function ImgPlaceholder({ label, style = {}, bg, overlay = false }) {
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
    </div>
  );
}

// ── BADGE ─────────────────────────────────────────────────────────────────────
export function HifiBadge({ children, variant = 'primary', style = {} }) {
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
    }}>{children}</span>
  );
}

// ── SPEC CHIP ─────────────────────────────────────────────────────────────────
export function SpecChip({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 10px', borderRadius: 0,
      background: 'var(--chip-bg)', color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)', fontSize: 11, lineHeight: 1.4,
      flexShrink: 0, border: '1px solid var(--border)'
    }}>{children}</span>
  );
}

// ── BUTTON ────────────────────────────────────────────────────────────────────
export function HifiBtn({ children, variant = 'primary', size = 'md', href, onClick, style = {}, full = false, type, disabled }) {
  const sz = {
    sm: { padding: '9px 18px', fontSize: 11 },
    md: { padding: '13px 26px', fontSize: 12 },
    lg: { padding: '17px 38px', fontSize: 13 }
  }[size] || {};
  const vr = {
    primary:  { background: 'var(--accent)', color: '#fff', border: 'none' },
    whatsapp: { background: '#25D366', color: '#fff', border: 'none' },
    outline:  { background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)' },
    ghost:    { background: 'transparent', color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.3)' },
    accent:   { background: 'var(--accent)', color: '#fff', border: 'none' }
  }[variant] || {};
  const El = href ? 'a' : 'button';
  const isExternal = href && (href.startsWith('https://') || href.startsWith('tel:'));
  return (
    <El href={href} onClick={onClick} type={El === 'button' ? (type || 'button') : undefined}
      disabled={El === 'button' ? disabled : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, width: full ? '100%' : undefined, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-body)', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
        borderRadius: 0, transition: 'opacity 0.15s ease', opacity: disabled ? 0.55 : 1,
        ...vr, ...sz, ...style
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.opacity = '0.8'; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.opacity = '1'; }}>
      {children}
    </El>
  );
}

// ── WHATSAPP ICON ─────────────────────────────────────────────────────────────
export function WaIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── CAR GRADIENTS ─────────────────────────────────────────────────────────────
export const CAR_GRADIENTS = [
  'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
  'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
  'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
  'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
  'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
  'linear-gradient(150deg, #d8d8d8 0%, #c4c4c4 100%)',
];

// ── CAR CARD ──────────────────────────────────────────────────────────────────
export function CarCard({ id, slug, index = 0, brand, model, year, price, km, fuel, transmission, color, featured, created_at, cover_photo }) {
  const [revealRef, revealed] = useScrollReveal();
  const isMobile = useIsMobile();
  const delay = index * 80;
  // Les 3 premières cartes sont au-dessus du fold : pas d'animation pour ne pas retarder le FCP
  const aboveFold = index < 3;
  const msg = encodeURIComponent(`Bonjour MRAUTO Canada, je suis intéressé(e) par la ${brand} ${model} ${year} à ${price}. Est-elle toujours disponible ?`);

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
      opacity: aboveFold || revealed ? 1 : 0,
      transform: aboveFold || revealed ? 'none' : 'translateY(32px)',
      transition: aboveFold ? 'none' : `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
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
            ? <img src={toWebP(cover_photo, 800)} alt={`${brand} ${model}`}
                loading={index < 3 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                width="800" height="220"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
            <HifiBtn variant="outline" size="sm" href={slug ? `/voitures/${slug}` : (id ? `/fiche?id=${id}` : '#')} style={{ flex: 1 }}>Voir la fiche</HifiBtn>
            <HifiBtn variant="whatsapp" size="sm" href={`https://wa.me/221778346464?text=${msg}`} style={{ flex: 1, gap: 6 }}>
              <WaIcon size={13} /> WhatsApp
            </HifiBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
export function SectionHeader({ kicker, title, subtitle, align = 'left', style = {} }) {
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
    </div>
  );
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
export function HifiNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const isMobile                = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', h, { passive: true });
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { if (!isMobile && open) setOpen(false); }, [isMobile]);

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
        <img src="logo.jpg" alt="MRAUTO Canada"
          width="48" height="48" fetchPriority="high"
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
            <HifiBtn variant="whatsapp" size="sm" href="https://wa.me/221778346464" style={{ gap: 6 }}>
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
            <HifiBtn variant="whatsapp" href="https://wa.me/221778346464" full style={{ gap: 8 }}>
              <WaIcon size={15} /> WhatsApp
            </HifiBtn>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'TikTok',    href: 'https://www.tiktok.com/@mrautoscanada?_r=1&_t=ZS-96qDwUcA5qO',          d: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  { label: 'Instagram', href: 'https://www.instagram.com/mrautos_canada?igsh=aGJnYXdua20zY3Rh',         d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'Facebook',  href: 'https://www.facebook.com/share/1G5fghNpeT/?mibextid=wwXIfr',             d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Threads',   href: 'https://www.threads.com/@mrautos_canada?igshid=NTc4MTIwNjQ2YQ==',        d: 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.851 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.583-1.313-.877-2.39-.882h-.052c-.876 0-1.629.232-2.13.604l-1.24-1.656C8.764 3.51 10.01 3.158 12 3.158h.083c1.78.024 3.181.493 4.159 1.394 1.045.96 1.62 2.348 1.709 4.127.028.567.031 1.146.032 1.733l.002 1.049c.004 2.04.009 4.5-1.556 6.313-1.34 1.56-3.349 2.394-6.243 2.226z' },
];

export function HifiFooter() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: '#111111', display: 'flex', flexDirection: 'column' }}>
      <MStripe height={3} />
      <div style={{ padding: isMobile ? '32px 24px' : '44px 60px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: isMobile ? 8 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12, flex: 1, minWidth: 0 }}>
          <img src="logo.jpg" alt="MRAUTO Canada"
            loading="lazy" width="52" height="52"
            style={{ height: isMobile ? 36 : 52, width: isMobile ? 36 : 52, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center', display: 'block', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 13 : 20, color: '#fff', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.1 }}>MRAUTO Canada</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? 8 : 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dakar, Sénégal · Depuis 2020</div>
          </div>
        </div>
        {!isMobile && (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 28 }}>
            {[['Catalogue', '/catalogue'], ['Vendues', '/vendues'], ['Contact', '/#contact']].map(([l, h]) =>
              <a key={l} href={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l}</a>
            )}
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: isMobile ? 8 : 10 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? 8 : 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>© 2026 MRAUTO CANADA</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 16 }}>
            {SOCIAL_LINKS.map(({ label, href, d }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', lineHeight: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                <svg width={isMobile ? 15 : 17} height={isMobile ? 15 : 17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: isMobile ? '10px 24px' : '10px 60px', textAlign: 'center' }}>
        <a href="https://wa.me/221772030926" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', textDecoration: 'none' }}>
          Besoin d'un site web ? Contactez-moi : +221 77 203 09 26
        </a>
      </div>
    </footer>
  );
}
