// WF A — Catalogue Classique
// Direction sûre, structurée. Hero split, filtres, grille 3 colonnes, mur de vendues.
// Accent: ardoise sombre — sérieux, rassurant.

const ACCENT_A = '#3a4a5c';

function WfA() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fafaf8', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* NAV */}
      <WfNav accent={ACCENT_A} brand="Tonton N." />

      {/* HERO split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '60px 48px', borderBottom: '1.5px solid #222', alignItems: 'center', gap: 48 }}>
        <div>
          <WfNote color={ACCENT_A} style={{ marginBottom: 16 }}>↘ ton + tagline rassurant</WfNote>
          <WfH size={56} style={{ lineHeight: 1.05, marginBottom: 16 }}>Le bon choix<br />de voiture<br />à Dakar.</WfH>
          <WfText lines={2} widths={[88, 70]} thickness={5} style={{ marginBottom: 24 }} />
          <div style={{ display: 'flex', gap: 12 }}>
            <WfBtn dark accent={ACCENT_A} style={{ padding: '14px 24px', fontSize: 15 }}>Voir le catalogue</WfBtn>
            <WfBtn accent={ACCENT_A} style={{ padding: '14px 24px', fontSize: 15 }}>WhatsApp</WfBtn>
          </div>
        </div>
        <WfImg h={360} label="photo hero — voiture vedette" />
      </div>

      {/* COMPTEUR band */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1.5px solid #222' }}>
        {[['200+', 'voitures vendues'], ['8 ans', "d'expérience"], ['100%', 'clients livrés']].map(([n, l], i) => (
          <div key={i} style={{ padding: '32px 24px', textAlign: 'center', borderRight: i < 2 ? '1.5px solid #222' : 'none' }}>
            <WfH size={48} style={{ color: ACCENT_A }}>{n}</WfH>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 15, opacity: 0.7, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CATALOGUE */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222' }}>
        <WfSection kicker="catalogue" title="Voitures disponibles" accent={ACCENT_A}>
          {/* Filtres */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {['Tous', 'SUV', 'Berlines', 'Luxe', 'Sous 10M', '10–20M', '20M+'].map((f, i) => (
              <WfTag key={i} accent={ACCENT_A} filled={i === 0}>{f}</WfTag>
            ))}
            <div style={{ flex: 1 }} />
            <WfNote color={ACCENT_A}>← filtres simples</WfNote>
          </div>
          {/* Grille 3×2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <WfCarCard accent={ACCENT_A} w="100%" h={380} badge="Nouveau" title="BMW X5 — 2019" price="18 500 000 F" specs={['62k km', 'Diesel', 'Auto']} color="Noir" />
            <WfCarCard accent={ACCENT_A} w="100%" h={380} title="Range Rover Sport" price="32 000 000 F" specs={['45k km', 'Essence', 'Auto']} color="Blanc" />
            <WfCarCard accent={ACCENT_A} w="100%" h={380} badge="Coup de cœur" title="Mercedes C220 — 2018" price="14 200 000 F" specs={['80k km', 'Diesel', 'Auto']} color="Gris" />
            <WfCarCard accent={ACCENT_A} w="100%" h={380} title="Chevrolet Tahoe — 2017" price="22 000 000 F" specs={['95k km', 'Essence', 'Auto']} color="Noir" />
            <WfCarCard accent={ACCENT_A} w="100%" h={380} title="Audi A4 — 2020" price="16 500 000 F" specs={['38k km', 'Essence', 'Auto']} color="Bleu" />
            <WfCarCard accent={ACCENT_A} w="100%" h={380} title="Toyota RAV4 — 2019" price="13 900 000 F" specs={['72k km', 'Essence', 'Auto']} color="Rouge" />
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <WfBtn accent={ACCENT_A} style={{ padding: '12px 24px', fontSize: 14 }}>Voir toutes les voitures →</WfBtn>
          </div>
        </WfSection>
      </div>

      {/* DEMARCHE 5 étapes horizontale */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222', background: '#f3f1ec' }}>
        <WfSection kicker="démarche" title="Comment ça se passe" accent={ACCENT_A}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {[
              ['1', 'Tu choisis', 'Catalogue ou demande sur mesure'],
              ['2', 'On programme', 'Visite + essai routier'],
              ['3', 'Vérification', 'Papiers, état, historique'],
              ['4', 'Paiement', 'Cash, virement, échelonné'],
              ['5', 'Tu repars', 'Livraison à domicile'],
            ].map(([n, t, d], i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                <WfCircle n={n} accent={ACCENT_A} size={40} />
                <WfH size={18}>{t}</WfH>
                <div style={{ fontFamily: 'Patrick Hand', fontSize: 13, opacity: 0.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </WfSection>
      </div>

      {/* VENDUES — mur photos */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222' }}>
        <WfSection kicker="social proof" title="Déjà vendues, déjà livrées" accent={ACCENT_A}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <WfImg h={140} label={i % 3 === 0 ? 'voiture livrée' : ''} />
                <div style={{ position: 'absolute', bottom: 6, left: 6 }}>
                  <WfTag accent={ACCENT_A} filled style={{ fontSize: 10, padding: '2px 6px' }}>VENDUE</WfTag>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <WfNote color={ACCENT_A}>↑ grille 4 cols, 200+ photos cliquables</WfNote>
          </div>
        </WfSection>
      </div>

      {/* CONTACT split */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <WfSection kicker="contact" title="Une question ?" accent={ACCENT_A}>
            <WfText lines={2} widths={[90, 68]} thickness={5} style={{ marginBottom: 28 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <WfBtn dark accent="#25D366" style={{ padding: '14px 20px', fontSize: 15, justifyContent: 'flex-start' }}>📱 WhatsApp — +221 XX XXX XX XX</WfBtn>
              <WfBtn accent={ACCENT_A} style={{ padding: '14px 20px', fontSize: 15, justifyContent: 'flex-start' }}>☎ Téléphone — +221 XX XXX XX XX</WfBtn>
              <WfBtn accent={ACCENT_A} style={{ padding: '14px 20px', fontSize: 15, justifyContent: 'flex-start' }}>📍 Dakar — sur rendez-vous</WfBtn>
            </div>
          </WfSection>
        </div>
        <WfBox style={{ padding: 24 }}>
          <WfH size={18} style={{ marginBottom: 16 }}>Formulaire rapide</WfH>
          {['Ton nom', 'Téléphone', 'Voiture qui t\'intéresse', 'Budget'].map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 12, opacity: 0.6, marginBottom: 4 }}>{p}</div>
              <div style={{ height: 38, border: '1.5px solid #222', background: '#fff' }} />
            </div>
          ))}
          <div style={{ marginTop: 6 }}>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 12, opacity: 0.6, marginBottom: 4 }}>Message</div>
            <div style={{ height: 80, border: '1.5px solid #222', background: '#fff' }} />
          </div>
          <WfBtn dark accent={ACCENT_A} style={{ marginTop: 14, padding: '12px 20px', fontSize: 14, width: '100%' }}>Envoyer</WfBtn>
        </WfBox>
      </div>

      <WfFooter accent={ACCENT_A} />
    </div>
  );
}

window.WfA = WfA;
