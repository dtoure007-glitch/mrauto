// WF E — Direction retenue
// Hero+Catalogue (A) · Démarche (D) · Social proof (C)
// Sans filtres catalogue · Renforcé pour confiance + push à l'achat.

const ACCENT_E = '#3a4a5c';
const WHATS_E = '#25D366';

function WfE() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fafaf8', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* NAV */}
      <WfNav accent={ACCENT_E} brand="Tonton N." items={['Voitures', 'Vendues', 'Démarche', 'Contact']} />

      {/* HERO split (de A) — renforcé avec trust strip sous-titre */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, padding: '60px 48px', borderBottom: '1.5px solid #222', alignItems: 'center' }}>
        <div>
          <WfNote color={ACCENT_E} style={{ marginBottom: 14 }}>↘ Dakar · depuis 2018</WfNote>
          <WfH size={56} style={{ lineHeight: 1.05, marginBottom: 16 }}>Le bon choix<br />de voiture<br />à Dakar.</WfH>
          <WfText lines={2} widths={[88, 70]} thickness={5} style={{ marginBottom: 24 }} />
          {/* Trust strip sous le hero */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 26 }}>
            <WfTag accent={ACCENT_E} style={{ padding: '5px 10px' }}>✓ Papiers vérifiés</WfTag>
            <WfTag accent={ACCENT_E} style={{ padding: '5px 10px' }}>✓ Essai routier libre</WfTag>
            <WfTag accent={ACCENT_E} style={{ padding: '5px 10px' }}>✓ Livraison à domicile</WfTag>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <WfBtn dark accent={ACCENT_E} style={{ padding: '14px 24px', fontSize: 15 }}>Voir le catalogue ↓</WfBtn>
            <WfBtn dark accent={WHATS_E} style={{ padding: '14px 24px', fontSize: 15 }}>📱 WhatsApp</WfBtn>
          </div>
          <div style={{ fontFamily: 'Patrick Hand', fontSize: 13, opacity: 0.6, marginTop: 12 }}>⏱ Réponse en moins d'1h</div>
        </div>
        <WfImg h={420} label="photo hero — voiture vedette" />
      </div>

      {/* COMPTEUR band (de A) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1.5px solid #222' }}>
        {[['200+', 'voitures vendues'], ['8 ans', "d'expérience à Dakar"], ['100%', 'clients livrés']].map(([n, l], i) => (
          <div key={i} style={{ padding: '36px 24px', textAlign: 'center', borderRight: i < 2 ? '1.5px solid #222' : 'none' }}>
            <WfH size={56} style={{ color: ACCENT_E }}>{n}</WfH>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 15, opacity: 0.7, marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CATALOGUE (de A) — SANS filtres */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <WfNote color={ACCENT_E}>— catalogue</WfNote>
            <WfH size={36}>Voitures disponibles</WfH>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 15, opacity: 0.7, marginTop: 4 }}>12 voitures, mises à jour chaque semaine.</div>
          </div>
          <WfTag accent={WHATS_E} filled style={{ padding: '4px 10px', fontSize: 12 }}>● MIS À JOUR HIER</WfTag>
        </div>
        {/* Grille 3×2 — pas de filtres */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <WfCarCard accent={ACCENT_E} w="100%" h={400} badge="Nouveau" title="BMW X5 — 2019" price="18 500 000 F" specs={['62k km', 'Diesel', 'Auto']} color="Noir" />
          <WfCarCard accent={ACCENT_E} w="100%" h={400} title="Range Rover Sport" price="32 000 000 F" specs={['45k km', 'Essence', 'Auto']} color="Blanc" />
          <WfCarCard accent={ACCENT_E} w="100%" h={400} badge="Coup de cœur" title="Mercedes C220 — 2018" price="14 200 000 F" specs={['80k km', 'Diesel', 'Auto']} color="Gris" />
          <WfCarCard accent={ACCENT_E} w="100%" h={400} title="Chevrolet Tahoe — 2017" price="22 000 000 F" specs={['95k km', 'Essence', 'Auto']} color="Noir" />
          <WfCarCard accent={ACCENT_E} w="100%" h={400} title="Audi A4 — 2020" price="16 500 000 F" specs={['38k km', 'Essence', 'Auto']} color="Bleu" />
          <WfCarCard accent={ACCENT_E} w="100%" h={400} title="Toyota RAV4 — 2019" price="13 900 000 F" specs={['72k km', 'Essence', 'Auto']} color="Rouge" />
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <WfBtn accent={ACCENT_E} style={{ padding: '12px 24px', fontSize: 14 }}>Voir toutes les voitures →</WfBtn>
        </div>
      </div>

      {/* DEMARCHE (de D) — 5 tuiles avec emoji */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222', background: '#f3f1ec' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <WfNote color={ACCENT_E}>— super simple</WfNote>
          <WfH size={38}>En 5 étapes, c'est plié.</WfH>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {[
            ['1', '💬', 'Tu écris', 'WhatsApp ou formulaire'],
            ['2', '📅', 'Rendez-vous', 'Visite au showroom'],
            ['3', '🚗', 'Essai routier', 'Sans pression'],
            ['4', '📄', 'Vérification', 'Papiers + historique'],
            ['5', '🔑', 'Tu repars', 'Livraison à domicile'],
          ].map(([n, e, t, d], i) => (
            <div key={i} style={{ background: '#fff', border: '1.5px solid #222', padding: 18, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 42, color: ACCENT_E, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 34, margin: '10px 0' }}>{e}</div>
              <WfH size={16}>{t}</WfH>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 12, opacity: 0.65, marginTop: 4 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SOCIAL PROOF (de C) — chiffre énorme à gauche + grille à droite */}
      <div style={{ padding: '70px 48px', borderBottom: '1.5px solid #222' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 56, alignItems: 'center', marginBottom: 32 }}>
          <div>
            <WfNote color={ACCENT_E}>— social proof</WfNote>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 200, color: ACCENT_E, lineHeight: 0.9, margin: '12px 0' }}>200+</div>
            <WfH size={28}>voitures livrées,<br />200+ clients heureux.</WfH>
            <WfText lines={2} widths={[88, 62]} thickness={5} style={{ marginTop: 18 }} />
            <div style={{ marginTop: 22 }}>
              <WfBtn accent={ACCENT_E} style={{ padding: '10px 20px', fontSize: 14 }}>Voir toutes les livraisons →</WfBtn>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <WfImg h={150} label={i === 0 ? 'client + voiture' : ''} />
                <div style={{ position: 'absolute', bottom: 6, left: 6 }}>
                  <WfTag accent={ACCENT_E} filled style={{ fontSize: 10, padding: '2px 6px' }}>VENDUE</WfTag>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA confiance + push achat — bandeau noir */}
      <div style={{ padding: '70px 48px', background: '#1a1a1a', color: '#fff', textAlign: 'center', borderBottom: '1.5px solid #222' }}>
        <WfNote color={WHATS_E} style={{ marginBottom: 12 }}>— allez, on en parle ?</WfNote>
        <WfH size={48} style={{ color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>Une voiture en tête ?<br />Écris-moi maintenant.</WfH>
        <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginBottom: 24 }}>Je réponds en moyenne sous 1h, 7j/7.</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <WfBtn dark accent={WHATS_E} style={{ padding: '18px 32px', fontSize: 17, fontWeight: 600 }}>📱 WhatsApp — +221 XX XXX XX XX</WfBtn>
          <WfBtn style={{ padding: '18px 32px', fontSize: 17, color: '#fff', borderColor: '#fff' }}>☎ Appeler</WfBtn>
        </div>
      </div>

      {/* CONTACT split (de A) — formulaire en backup */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <WfNote color={ACCENT_E}>— contact</WfNote>
          <WfH size={32} style={{ marginBottom: 18 }}>Une question ?</WfH>
          <WfText lines={2} widths={[90, 68]} thickness={5} style={{ marginBottom: 24 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <WfBtn dark accent={WHATS_E} style={{ padding: '14px 20px', fontSize: 15, justifyContent: 'flex-start' }}>📱 WhatsApp — +221 XX XXX XX XX</WfBtn>
            <WfBtn accent={ACCENT_E} style={{ padding: '14px 20px', fontSize: 15, justifyContent: 'flex-start' }}>☎ +221 XX XXX XX XX</WfBtn>
            <WfBtn accent={ACCENT_E} style={{ padding: '14px 20px', fontSize: 15, justifyContent: 'flex-start' }}>📍 Dakar — sur rendez-vous</WfBtn>
          </div>
        </div>
        <WfBox style={{ padding: 22 }}>
          <WfH size={18} style={{ marginBottom: 14 }}>Ou laisse-moi un message</WfH>
          {['Ton nom', 'Téléphone', "Voiture qui t'intéresse", 'Budget approximatif'].map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 12, opacity: 0.6, marginBottom: 4 }}>{p}</div>
              <div style={{ height: 36, border: '1.5px solid #222', background: '#fff' }} />
            </div>
          ))}
          <div style={{ marginTop: 4 }}>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 12, opacity: 0.6, marginBottom: 4 }}>Message</div>
            <div style={{ height: 70, border: '1.5px solid #222', background: '#fff' }} />
          </div>
          <WfBtn dark accent={ACCENT_E} style={{ marginTop: 14, padding: '12px 20px', fontSize: 14, width: '100%' }}>Envoyer</WfBtn>
        </WfBox>
      </div>

      <WfFooter accent={ACCENT_E} />

      {/* WhatsApp floating button */}
      <div style={{ position: 'absolute', right: 24, bottom: 80, background: WHATS_E, color: '#fff', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '1.5px solid #222', boxShadow: '2px 3px 0 #222' }}>📱</div>
    </div>
  );
}

window.WfE = WfE;
