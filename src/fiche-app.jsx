import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MStripe, HifiBtn, WaIcon, useIsMobile, SpecChip, HifiFooter } from './hifi-components.jsx';

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

// ── GALERIE PHOTOS ────────────────────────────────────────────────────────────
function PhotoGallery({ photos, brand, model }) {
  const [idx, setIdx] = useState(0);
  const isMobile = useIsMobile();
  const has = photos && photos.length > 0;

  if (!has) {
    return (
      <div style={{ height: '100%', minHeight: 480, background: 'linear-gradient(150deg,#d8d8d8 0%,#c4c4c4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10, position: 'relative' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', color: 'rgba(0,0,0,0.25)', textTransform: 'uppercase' }}>{brand} {model}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.14em', color: 'rgba(0,0,0,0.18)', textTransform: 'uppercase' }}>photos à venir</span>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <img src={photos[idx]} alt={`${brand} ${model} — photo ${idx + 1}`}
          fetchPriority="high" decoding="async"
          width="1200" height="800"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
        {photos.length > 1 && (
          <>
            <button onClick={() => setIdx(i => (i - 1 + photos.length) % photos.length)}
              style={{ position: 'absolute', left: 14, ...(isMobile ? { bottom: 16 } : { top: '50%', transform: 'translateY(-50%)' }), width: 44, height: 44, background: 'rgba(255,255,255,0.92)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 22, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
            <button onClick={() => setIdx(i => (i + 1) % photos.length)}
              style={{ position: 'absolute', right: 14, ...(isMobile ? { bottom: 16 } : { top: '50%', transform: 'translateY(-50%)' }), width: 44, height: 44, background: 'rgba(255,255,255,0.92)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 22, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            <div style={{ position: 'absolute', bottom: 12, right: isMobile ? 72 : 14, background: 'rgba(0,0,0,0.5)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 10, padding: '3px 8px', letterSpacing: '0.1em' }}>
              {idx + 1}/{photos.length}
            </div>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div style={{ display: 'flex', gap: 4, padding: isMobile ? '8px 8px 10px' : 8, background: 'var(--bg-alt)', overflowX: 'auto', flexShrink: 0 }}>
          {photos.map((url, i) => (
            <div key={i} onClick={() => setIdx(i)}
              style={{ width: isMobile ? 88 : 82, height: isMobile ? 80 : 60, flexShrink: 0, cursor: 'pointer', border: i === idx ? '2px solid var(--accent)' : '2px solid transparent', overflow: 'hidden', transition: 'border-color 0.15s' }}>
              <img src={url} alt="" loading="lazy" width="88" height="80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── NAVIGATION FICHE ──────────────────────────────────────────────────────────
function FicheNav() {
  const isMobile = useIsMobile();
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 2, background: 'var(--accent)' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 16px' : '0 40px', height: 66 }}>
        <a href="/catalogue"
          onClick={e => { e.preventDefault(); goBack('/catalogue'); }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', transition: 'color 0.15s', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          ← {isMobile ? 'Retour' : 'Catalogue'}
        </a>
        <img src="logo.jpg" alt="MRAUTO Canada" width="40" height="40" fetchPriority="high" style={{ height: isMobile ? 36 : 40, width: isMobile ? 36 : 40, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center' }} />
        <HifiBtn variant="whatsapp" size="sm" href="https://wa.me/221778346464" style={{ gap: 6 }}>
          <WaIcon size={13} /> {isMobile ? '' : 'WhatsApp'}
        </HifiBtn>
      </div>
    </nav>
  );
}

// ── PAGE FICHE ────────────────────────────────────────────────────────────────
function FichePage({ car }) {
  const msg = encodeURIComponent(
    `Bonjour MRAUTO Canada, je suis intéressé(e) par la ${car.brand} ${car.model} ${car.year} à ${car.price}. Est-elle toujours disponible ?`
  );

  return (
    <>
      <FicheNav />
      <main style={{ paddingTop: 68 }}>
        <div className="fiche-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', minHeight: 'calc(100vh - 68px)' }}>

          {/* Galerie */}
          <div className="fiche-gallery" style={{ position: 'sticky', top: 68, height: 'calc(100vh - 68px)', overflow: 'hidden', borderRight: '1px solid var(--border)' }}>
            <PhotoGallery photos={car.photos || []} brand={car.brand} model={car.model} />
          </div>

          {/* Infos */}
          <div className="fiche-info" style={{ padding: '52px 52px 80px', display: 'flex', flexDirection: 'column', gap: 28, background: 'var(--bg)', overflowY: 'auto' }}>

            {car.badge &&
              <HifiBtn variant="new" style={{ alignSelf: 'flex-start' }}>{car.badge}</HifiBtn>
            }

            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
                {car.year}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,5.5vw,80px)', fontWeight: 900, color: 'var(--text)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '0.01em' }}>
                {car.brand}<br />{car.model}
              </h1>
            </div>

            <div style={{ fontFamily: 'var(--font-body)', fontSize: 26, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.02em' }}>
              {car.price}
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <SpecChip>{car.km}</SpecChip>
              <SpecChip>{car.fuel}</SpecChip>
              <SpecChip>{car.transmission}</SpecChip>
              <SpecChip>{car.color}</SpecChip>
            </div>

            <div style={{ height: 1, background: 'var(--border)' }} />

            {car.description &&
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.72 }}>{car.description}</p>
            }

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['✓ Papiers vérifiés', '✓ Essai gratuit', '✓ Livraison domicile'].map((t, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 12px', background: 'var(--accent-pale)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, border: '1px solid var(--border)' }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <HifiBtn variant="whatsapp" size="lg" href={`https://wa.me/221778346464?text=${msg}`} full style={{ gap: 10 }}>
                <WaIcon size={18} /> Écrire sur WhatsApp
              </HifiBtn>
              <HifiBtn variant="outline" size="lg" href="tel:+221778346464" full>
                ☎ Appeler
              </HifiBtn>
            </div>
          </div>
        </div>
      </main>
      <HifiFooter />
    </>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
function App() {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) { setNotFound(true); setLoading(false); return; }
    sb.from('cars').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setCar(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!car) return;
    const id = new URLSearchParams(window.location.search).get('id');
    const title = `${car.year} ${car.brand} ${car.model} à vendre — Mrauto Canada`;
    const specs = [car.km, car.fuel, car.transmission].filter(Boolean).join(', ');
    const desc = car.description
      ? `${car.brand} ${car.model} ${car.year} à ${car.price} — ${car.description.slice(0, 120)}`
      : `Achetez cette ${car.brand} ${car.model} ${car.year} à ${car.price} chez MRAUTO Canada à Dakar. ${specs}. Livraison disponible.`;
    const url = `https://www.mrautocanada.com/fiche${id ? '?id=' + id : ''}`;

    document.title = title;
    document.querySelector('meta[name="description"]').setAttribute('content', desc);
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', desc);
    document.querySelector('meta[property="og:url"]').setAttribute('content', url);
    document.getElementById('canonical-tag').setAttribute('href', url);
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', desc);

    const prev = document.getElementById('car-schema-ld');
    if (prev) prev.remove();
    const priceNum = parseInt((car.price || '').replace(/\D/g, ''), 10) || undefined;
    const kmNum    = parseInt((car.km    || '').replace(/\D/g, ''), 10) || undefined;
    const carSchema = {
      '@context': 'https://schema.org',
      '@type': 'Car',
      'name': `${car.brand} ${car.model} ${car.year}`,
      'brand': { '@type': 'Brand', 'name': car.brand },
      'modelDate': String(car.year),
      ...(car.fuel         && { 'fuelType': car.fuel }),
      ...(car.transmission && { 'vehicleTransmission': car.transmission }),
      ...(car.color        && { 'color': car.color }),
      ...(kmNum            && { 'mileageFromOdometer': { '@type': 'QuantitativeValue', 'value': kmNum, 'unitCode': 'KMT' } }),
      ...(car.cover_photo  && { 'image': car.cover_photo }),
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'priceCurrency': 'XOF',
        ...(priceNum && { 'price': priceNum }),
        'seller': { '@type': 'AutoDealer', 'name': 'Mrauto Canada' }
      }
    };
    const schemaEl = document.createElement('script');
    schemaEl.type = 'application/ld+json';
    schemaEl.id   = 'car-schema-ld';
    schemaEl.text = JSON.stringify(carSchema);
    document.head.appendChild(schemaEl);

    const prevBc = document.getElementById('breadcrumb-schema-ld');
    if (prevBc) prevBc.remove();
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil',   'item': 'https://www.mrautocanada.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Catalogue', 'item': 'https://www.mrautocanada.com/catalogue' },
        { '@type': 'ListItem', 'position': 3, 'name': `${car.brand} ${car.model} ${car.year}`, 'item': url }
      ]
    };
    const bcEl = document.createElement('script');
    bcEl.type = 'application/ld+json';
    bcEl.id   = 'breadcrumb-schema-ld';
    bcEl.text = JSON.stringify(breadcrumb);
    document.head.appendChild(bcEl);
  }, [car]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
      Chargement…
    </div>
  );

  if (notFound) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24, padding: 40 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', lineHeight: 1, textAlign: 'center' }}>Voiture<br />introuvable</div>
      <HifiBtn variant="outline" onClick={() => goBack('/catalogue')}>← Retour au catalogue</HifiBtn>
    </div>
  );

  return <FichePage car={car} />;
}

createRoot(document.getElementById('root')).render(<App />);
