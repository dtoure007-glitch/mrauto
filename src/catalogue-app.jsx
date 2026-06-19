import { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { MStripe, HifiBtn, WaIcon, useIsMobile, CarCard, HifiFooter } from './hifi-components.jsx';

const { createClient } = window.supabase;
const sb = createClient(
  'https://tunszuazffcniyaylxwj.supabase.co',
  'sb_publishable_ORGOouzE5_jT5BCgqWLhKQ_Z3XnrPW7'
);

function goBack(fallback) {
  try {
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      history.back(); return;
    }
  } catch(e) {}
  window.location.href = fallback;
}

// ── DATA ───────────────────────────────────────────────────────────────────
function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    sb.from('cars')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setCars(data);
        setLoading(false);
      });
  }, []);
  return { cars, loading };
}

// ── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const isMobile                = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', h, { passive: true });
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)'
    }}>
      {scrolled && <MStripe height={2} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 20px' : '0 56px', height: 68 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <img src="logo.jpg" alt="MRAUTO Canada" width="48" height="48" fetchPriority="high" style={{ height: isMobile ? 36 : 48, width: isMobile ? 36 : 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        </a>
        {isMobile ? (
          <button onClick={() => setOpen(o => !o)} aria-label={open ? 'Fermer' : 'Menu'}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', transition: 'transform 0.25s, opacity 0.25s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', transition: 'opacity 0.25s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text)', transition: 'transform 0.25s, opacity 0.25s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 28 }}>
              <a href="/"
                onClick={e => { e.preventDefault(); goBack('/'); }}
                style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>← Accueil</a>
              {[['Vendues', '/vendues'], ['Contact', '/#contact']].map(([l, h]) =>
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
          <a href="/"
            onClick={e => { e.preventDefault(); setOpen(false); goBack('/'); }}
            style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
            ← Accueil
          </a>
          {[['Vendues', '/vendues'], ['Contact', '/#contact']].map(([l, h]) => (
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

// ── PAGE ───────────────────────────────────────────────────────────────────
function Page() {
  const { cars, loading } = useCars();
  const isMobile = useIsMobile();

  const [query, setQuery] = useState(
    () => new URLSearchParams(window.location.search).get('q') || ''
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) { url.searchParams.set('q', query.trim()); }
    else { url.searchParams.delete('q'); }
    history.replaceState(null, '', url);
  }, [query]);

  const filtered = useMemo(() => {
    if (!query.trim()) return cars;
    const q = query.toLowerCase().trim();
    return cars.filter(c =>
      [c.brand, c.model, String(c.year ?? ''), c.fuel, c.color, c.transmission]
        .some(v => v && String(v).toLowerCase().includes(q))
    );
  }, [cars, query]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div style={{ background: '#111', paddingTop: 68 }}>
        <div style={{ padding: isMobile ? '36px 20px 40px' : '56px 56px 60px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <MStripe height={2} style={{ width: 22 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)' }}>catalogue complet</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,7vw,96px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: 16 }}>
                  Toutes nos<br />voitures disponibles
                </h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, maxWidth: 480 }}>
                  Papiers vérifiés, essai routier inclus, livraison à domicile.<br />
                  Chaque voiture est inspectée avant mise en vente.
                </p>
              </div>
              {!loading && !isMobile && (
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 900, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.02em', flexShrink: 0 }}>
                  {filtered.length}<span style={{ fontSize: 20, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.3)', marginLeft: 8, verticalAlign: 'middle' }}>dispo</span>
                </div>
              )}
            </div>

            {/* ── SEARCH BAR ──────────────────────────────────────────── */}
            <div style={{ marginTop: 32, position: 'relative', maxWidth: 560 }}>
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher une marque, modèle, année…"
                aria-label="Rechercher dans le catalogue"
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 18px',
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 0,
                  outline: 'none',
                  appearance: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent-on-dark)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.18)'}
              />
              {query ? (
                <button onClick={() => setQuery('')} aria-label="Effacer la recherche"
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>✕</button>
              ) : (
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: 16, pointerEvents: 'none' }}>⌕</span>
              )}
            </div>
          </div>
        </div>
        <MStripe height={2} />
      </div>

      {/* ── GRID ──────────────────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: isMobile ? '32px 20px' : '64px 56px', background: 'var(--bg-alt)' }}>
        <div className="max-w">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Chargement du catalogue…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 900, textTransform: 'uppercase', color: 'var(--text)', marginBottom: 14 }}>
                {query ? `Aucun résultat pour "${query}"` : 'Aucune voiture disponible pour le moment'}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 36, lineHeight: 1.6 }}>
                {query ? 'Essayez une autre marque ou modèle, ou contactez-nous directement.' : 'Revenez bientôt ou contactez-nous directement.'}
              </p>
              {query ? (
                <HifiBtn variant="outline" onClick={() => setQuery('')} style={{ marginRight: 12 }}>Voir tout le catalogue</HifiBtn>
              ) : null}
              <HifiBtn variant="whatsapp" href="https://wa.me/221778346464" style={{ gap: 8 }}>
                <WaIcon size={15} /> Écrire sur WhatsApp
              </HifiBtn>
            </div>
          ) : (
            <>
              {query && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, letterSpacing: '0.06em' }}>
                  {filtered.length} résultat{filtered.length > 1 ? 's' : ''} pour <strong style={{ color: 'var(--text)' }}>"{query}"</strong>
                </p>
              )}
              <div className="cars-grid">
                {filtered.map((c, i) => <CarCard key={c.id} index={i} {...c} />)}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <HifiFooter />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<Page />);
