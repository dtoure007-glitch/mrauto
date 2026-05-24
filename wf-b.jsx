// WF B — Magazine Premium
// Layout éditorial, hero plein écran, voiture vedette en grand format, alterné.
// Accent: doré chaud — exclusif, premium.

const ACCENT_B = '#a8824a';
const CREAM_B = '#f4efe6';

function WfB() {
  return (
    <div style={{ width: '100%', height: '100%', background: CREAM_B, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* NAV centré */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 60px', borderBottom: '1.5px solid #222' }}>
        <div style={{ display: 'flex', gap: 22, fontFamily: 'Patrick Hand', fontSize: 14 }}>
          <div>Catalogue</div>
          <div>Vendues</div>
        </div>
        <div style={{ fontFamily: 'Patrick Hand', fontSize: 26, fontWeight: 600, letterSpacing: 2 }}>TONTON N.</div>
        <div style={{ display: 'flex', gap: 22, fontFamily: 'Patrick Hand', fontSize: 14 }}>
          <div>Démarche</div>
          <div>Contact</div>
        </div>
      </div>

      {/* HERO full-bleed editorial */}
      <div style={{ position: 'relative', borderBottom: '1.5px solid #222' }}>
        <WfImg h={520} label="hero plein cadre — voiture vedette, lumière soft" />
        <div style={{ position: 'absolute', left: 60, bottom: 60, maxWidth: 520, background: CREAM_B, padding: 28, border: '1.5px solid #222' }}>
          <WfNote color={ACCENT_B} style={{ marginBottom: 10 }}>Édition mai 2026 — n°14</WfNote>
          <WfH size={42} style={{ lineHeight: 1.05, marginBottom: 14 }}>Une sélection.<br />Pas un catalogue.</WfH>
          <WfText lines={2} widths={[90, 75]} thickness={5} style={{ marginBottom: 18 }} />
          <WfBtn dark accent={ACCENT_B} style={{ padding: '12px 22px', fontSize: 14 }}>Découvrir →</WfBtn>
        </div>
      </div>

      {/* VEDETTE — large featured card */}
      <div style={{ padding: '60px 60px', borderBottom: '1.5px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <WfNote color={ACCENT_B} style={{ marginBottom: 4 }}>— la pièce du moment</WfNote>
            <WfH size={36}>Coup de cœur de la semaine</WfH>
          </div>
          <div style={{ fontFamily: 'Patrick Hand', fontSize: 14, opacity: 0.6 }}>01 / 12 →</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <WfImg h={440} label="grande photo voiture vedette" />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px 0' }}>
            <div>
              <WfTag accent={ACCENT_B} filled style={{ marginBottom: 14 }}>COUP DE CŒUR</WfTag>
              <WfH size={32} style={{ marginBottom: 8 }}>Range Rover Vogue</WfH>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 18, opacity: 0.7, marginBottom: 20 }}>2020 · 38 000 km · Blanc nacré</div>
              <WfText lines={4} widths={[95, 88, 92, 60]} style={{ marginBottom: 24 }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
                {[['Carburant', 'Diesel V8'], ['Boîte', 'Auto'], ['Couleur', 'Blanc nacré'], ['État', 'Comme neuf']].map(([k, v], i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'Patrick Hand', fontSize: 11, opacity: 0.55, textTransform: 'uppercase', letterSpacing: 1 }}>{k}</div>
                    <div style={{ fontFamily: 'Patrick Hand', fontSize: 16 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <WfH size={38} style={{ color: ACCENT_B, marginBottom: 12 }}>42 000 000 FCFA</WfH>
              <div style={{ display: 'flex', gap: 10 }}>
                <WfBtn dark accent={ACCENT_B} style={{ padding: '12px 22px', fontSize: 14 }}>Voir la fiche</WfBtn>
                <WfBtn accent={ACCENT_B} style={{ padding: '12px 22px', fontSize: 14 }}>WhatsApp</WfBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATALOGUE éditorial alterné */}
      <div style={{ padding: '60px 60px', borderBottom: '1.5px solid #222' }}>
        <WfSection kicker="le reste de la collection" title="Catalogue" accent={ACCENT_B} style={{ marginBottom: 32 }} />
        {[
          { side: 'left', title: 'BMW Série 5', year: '2019', price: '21 000 000 F' },
          { side: 'right', title: 'Mercedes GLE', year: '2020', price: '38 000 000 F' },
          { side: 'left', title: 'Audi Q7', year: '2018', price: '26 500 000 F' },
        ].map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 36, alignItems: 'center', direction: c.side === 'right' ? 'rtl' : 'ltr' }}>
            <WfImg h={280} label={`photo ${c.title}`} style={{ direction: 'ltr' }} />
            <div style={{ direction: 'ltr', padding: '0 16px' }}>
              <WfNote color={ACCENT_B}>0{i + 2} / 12</WfNote>
              <WfH size={30} style={{ margin: '8px 0' }}>{c.title}</WfH>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginBottom: 14 }}>{c.year} · 60k km · Auto · Diesel</div>
              <WfText lines={2} widths={[88, 60]} thickness={5} style={{ marginBottom: 18 }} />
              <WfH size={22} style={{ color: ACCENT_B, marginBottom: 12 }}>{c.price}</WfH>
              <div style={{ display: 'flex', gap: 8 }}>
                <WfBtn accent={ACCENT_B} style={{ padding: '8px 14px', fontSize: 13 }}>Détails</WfBtn>
                <WfBtn dark accent={ACCENT_B} style={{ padding: '8px 14px', fontSize: 13 }}>WhatsApp</WfBtn>
              </div>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <WfBtn accent={ACCENT_B} style={{ padding: '12px 24px', fontSize: 14 }}>Tout le catalogue (12) →</WfBtn>
        </div>
      </div>

      {/* COMPTEUR typographique large */}
      <div style={{ padding: '80px 60px', borderBottom: '1.5px solid #222', textAlign: 'center', background: '#1a1a1a', color: '#fff' }}>
        <WfNote color={ACCENT_B} style={{ marginBottom: 18 }}>— les chiffres parlent</WfNote>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 80, alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 120, lineHeight: 1, color: ACCENT_B }}>200+</div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginTop: 6 }}>voitures vendues</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 120, lineHeight: 1, color: ACCENT_B }}>8</div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginTop: 6 }}>années à Dakar</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 120, lineHeight: 1, color: ACCENT_B }}>0</div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginTop: 6 }}>arnaque</div>
          </div>
        </div>
      </div>

      {/* VENDUES — bandeau scroll horizontal */}
      <div style={{ padding: '60px 0 60px 60px', borderBottom: '1.5px solid #222' }}>
        <div style={{ paddingRight: 60, marginBottom: 24 }}>
          <WfNote color={ACCENT_B}>— preuves</WfNote>
          <WfH size={36}>Elles sont déjà chez leurs propriétaires</WfH>
        </div>
        <div style={{ display: 'flex', gap: 16, overflow: 'hidden' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ flex: '0 0 280px' }}>
              <div style={{ position: 'relative' }}>
                <WfImg h={200} label={i === 0 ? 'voiture livrée + client' : ''} />
                <div style={{ position: 'absolute', top: 8, left: 8 }}>
                  <WfTag accent={ACCENT_B} filled style={{ fontSize: 10 }}>VENDUE</WfTag>
                </div>
              </div>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 14, marginTop: 8 }}>Range Sport · 2024</div>
            </div>
          ))}
        </div>
        <div style={{ paddingRight: 60, marginTop: 18 }}>
          <WfNote color={ACCENT_B}>↔ scroll horizontal, défilement libre</WfNote>
        </div>
      </div>

      {/* DEMARCHE en cards verticales */}
      <div style={{ padding: '60px 60px', borderBottom: '1.5px solid #222' }}>
        <WfSection kicker="démarche" title="Du clic à la livraison" accent={ACCENT_B}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {[
              ['01', 'Tu choisis'],
              ['02', 'On programme'],
              ['03', 'Vérification'],
              ['04', 'Paiement'],
              ['05', 'Livraison'],
            ].map(([n, t], i) => (
              <WfBox key={i} solid style={{ padding: 18, minHeight: 140 }}>
                <div style={{ fontFamily: 'Patrick Hand', fontSize: 38, color: ACCENT_B, lineHeight: 1 }}>{n}</div>
                <WfH size={17} style={{ marginTop: 8 }}>{t}</WfH>
                <WfText lines={2} widths={[90, 60]} thickness={4} style={{ marginTop: 10 }} />
              </WfBox>
            ))}
          </div>
        </WfSection>
      </div>

      {/* CONTACT card premium unique */}
      <div style={{ padding: '60px 60px', borderBottom: '1.5px solid #222', textAlign: 'center' }}>
        <WfNote color={ACCENT_B} style={{ marginBottom: 8 }}>— prenons contact</WfNote>
        <WfH size={42} style={{ marginBottom: 18 }}>Une voiture en tête ?</WfH>
        <WfText lines={1} widths={[40]} thickness={4} style={{ margin: '0 auto 28px', display: 'flex', justifyContent: 'center' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <WfBtn dark accent="#25D366" style={{ padding: '16px 28px', fontSize: 16 }}>📱 Écrire sur WhatsApp</WfBtn>
          <WfBtn accent={ACCENT_B} style={{ padding: '16px 28px', fontSize: 16 }}>☎ Appeler</WfBtn>
        </div>
      </div>

      <WfFooter accent={ACCENT_B} />
    </div>
  );
}

window.WfB = WfB;
