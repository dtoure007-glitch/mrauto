// WF C — Story Scroll narratif
// Le vendeur raconte. Portrait, voix personnelle, chiffres énormes intégrés au texte.
// Accent: terracotta chaud — humain, chaleureux.

const ACCENT_C = '#b5563a';
const SAND_C = '#f6f1e8';

function WfC() {
  return (
    <div style={{ width: '100%', height: '100%', background: SAND_C, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* NAV minimal */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 48px' }}>
        <div style={{ fontFamily: 'Patrick Hand', fontSize: 22, fontWeight: 600 }}>Tonton N. <span style={{ opacity: 0.5, fontSize: 14 }}>· Dakar</span></div>
        <WfBtn dark accent="#25D366" style={{ padding: '8px 16px', fontSize: 13 }}>📱 WhatsApp</WfBtn>
      </div>

      {/* HERO — portrait + intro */}
      <div style={{ padding: '40px 48px 80px', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56, alignItems: 'center' }}>
        <WfImg h={460} label="portrait du vendeur" />
        <div>
          <WfNote color={ACCENT_C} style={{ marginBottom: 16 }}>Bonjour, moi c'est Tonton N.</WfNote>
          <WfH size={64} style={{ lineHeight: 1.0, marginBottom: 20 }}>
            <span style={{ color: ACCENT_C }}>8 ans</span>,<br />
            <span style={{ color: ACCENT_C }}>200+</span> voitures,<br />
            une seule réputation.
          </WfH>
          <WfText lines={3} widths={[92, 88, 70]} thickness={5} style={{ marginBottom: 28 }} />
          <div style={{ display: 'flex', gap: 12 }}>
            <WfBtn dark accent={ACCENT_C} style={{ padding: '14px 22px', fontSize: 15 }}>Voir mes voitures ↓</WfBtn>
            <WfBtn accent={ACCENT_C} style={{ padding: '14px 22px', fontSize: 15 }}>WhatsApp</WfBtn>
          </div>
        </div>
      </div>

      {/* BANDEAU citation / chiffre clé */}
      <div style={{ padding: '50px 48px', background: ACCENT_C, color: '#fff', textAlign: 'center', borderTop: '1.5px solid #222', borderBottom: '1.5px solid #222' }}>
        <WfH size={32} style={{ color: '#fff', fontStyle: 'italic', maxWidth: 800, margin: '0 auto', lineHeight: 1.3 }}>
          « Je vends pas des voitures.<br />Je vends de la tranquillité. »
        </WfH>
      </div>

      {/* MES VOITURES DU MOMENT — scroll horizontal personnel */}
      <div style={{ padding: '70px 0 70px 48px' }}>
        <div style={{ paddingRight: 48, marginBottom: 28 }}>
          <WfNote color={ACCENT_C}>— ce mois-ci</WfNote>
          <WfH size={42}>Les voitures<br />que je propose en ce moment.</WfH>
          <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginTop: 10 }}>
            12 voitures, choisies une à une. Pas plus.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, overflow: 'hidden' }}>
          {[
            { t: 'BMW X5', y: '2019', p: '18 500 000 F', b: 'Coup de cœur' },
            { t: 'Range Sport', y: '2020', p: '32 000 000 F', b: null },
            { t: 'Mercedes C220', y: '2018', p: '14 200 000 F', b: 'Nouveau' },
            { t: 'Chevrolet Tahoe', y: '2017', p: '22 000 000 F', b: null },
          ].map((c, i) => (
            <WfCarCard key={i} accent={ACCENT_C} w={320} h={420} badge={c.b} title={`${c.t} — ${c.y}`} price={c.p} />
          ))}
          <div style={{ flex: '0 0 60px' }} />
        </div>
        <div style={{ paddingRight: 48, marginTop: 18 }}>
          <WfBtn accent={ACCENT_C} style={{ padding: '10px 20px', fontSize: 14 }}>Voir les 12 →</WfBtn>
        </div>
      </div>

      {/* COMMENT JE TRAVAILLE — timeline verticale narrative */}
      <div style={{ padding: '70px 48px', borderTop: '1.5px solid #222', background: '#fff' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <WfNote color={ACCENT_C} style={{ textAlign: 'center', marginBottom: 8 }}>— comment je travaille</WfNote>
          <WfH size={42} style={{ textAlign: 'center', marginBottom: 50 }}>De la première discussion<br />aux clés dans ta main.</WfH>
          <div style={{ position: 'relative', paddingLeft: 60 }}>
            <div style={{ position: 'absolute', left: 24, top: 20, bottom: 20, width: 1.5, background: '#222', opacity: 0.3 }} />
            {[
              ['01', 'On se parle', 'Tu m\'écris ce que tu cherches. Budget, usage, préférence.'],
              ['02', 'Je te propose', 'Je sors 2-3 voitures qui collent. On échange en vidéo si tu veux.'],
              ['03', 'Tu viens essayer', 'Visite au showroom, essai routier, tu poses toutes les questions.'],
              ['04', 'On vérifie tout', 'Papiers, historique, état mécanique — je cache rien.'],
              ['05', 'Tu repars', 'Paiement, mise en circulation, livraison à domicile si tu veux.'],
            ].map(([n, t, d], i) => (
              <div key={i} style={{ marginBottom: 28, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <WfCircle n={n} size={48} accent={ACCENT_C} dark style={{ marginLeft: -60, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <WfH size={22}>{t}</WfH>
                  <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginTop: 4 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MES DERNIERS HEUREUX CLIENTS — mur photos + chiffre énorme */}
      <div style={{ padding: '70px 48px', borderTop: '1.5px solid #222' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 56, alignItems: 'center', marginBottom: 36 }}>
          <div>
            <WfNote color={ACCENT_C}>— social proof</WfNote>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 180, color: ACCENT_C, lineHeight: 1, margin: '8px 0' }}>200+</div>
            <WfH size={26}>voitures livrées,<br />200+ clients heureux.</WfH>
            <WfText lines={2} widths={[88, 62]} thickness={5} style={{ marginTop: 18 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <WfImg h={130} label={i === 0 ? 'client + voiture' : ''} />
                <div style={{ position: 'absolute', bottom: 6, left: 6 }}>
                  <WfTag accent={ACCENT_C} filled style={{ fontSize: 10 }}>VENDUE</WfTag>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <WfBtn accent={ACCENT_C} style={{ padding: '10px 20px', fontSize: 14 }}>Voir les 200+ livraisons →</WfBtn>
        </div>
      </div>

      {/* CTA WhatsApp géant */}
      <div style={{ padding: '90px 48px', background: '#1a1a1a', color: '#fff', textAlign: 'center', borderTop: '1.5px solid #222' }}>
        <WfNote color={ACCENT_C} style={{ marginBottom: 14 }}>— parlons-en</WfNote>
        <WfH size={52} style={{ color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>Écris-moi.<br />Je réponds dans l'heure.</WfH>
        <div style={{ display: 'inline-block', border: '2px solid #25D366', padding: '20px 36px', background: '#25D366', color: '#fff', fontFamily: 'Patrick Hand', fontSize: 22, marginTop: 14 }}>
          📱 +221 XX XXX XX XX
        </div>
        <div style={{ marginTop: 18, fontFamily: 'Patrick Hand', fontSize: 14, opacity: 0.6 }}>ou appelle directement</div>
      </div>

      <WfFooter accent={ACCENT_C} />
    </div>
  );
}

window.WfC = WfC;
