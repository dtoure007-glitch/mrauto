// WF D — WhatsApp First
// Action-first, mobile-centric, CTA omniprésent, format "fiche produit" direct.
// Accent: vert WhatsApp — direct, énergique.

const ACCENT_D = '#1a1a1a';
const WHATS = '#25D366';

function WfD() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Bandeau sticky WhatsApp */}
      <div style={{ background: WHATS, color: '#fff', padding: '10px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Patrick Hand', fontSize: 14 }}>
        <div>📱 Tu peux m'écrire 24/7 sur WhatsApp</div>
        <div style={{ fontWeight: 600 }}>+221 XX XXX XX XX →</div>
      </div>

      {/* NAV simple */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: '1.5px solid #222' }}>
        <div style={{ fontFamily: 'Patrick Hand', fontSize: 22, fontWeight: 700 }}>TONTON N.</div>
        <div style={{ display: 'flex', gap: 24, fontFamily: 'Patrick Hand', fontSize: 14 }}>
          <div>Dispo (12)</div>
          <div>Vendues</div>
          <div>Démarche</div>
        </div>
        <WfBtn dark accent={WHATS} style={{ padding: '10px 18px', fontSize: 14, fontWeight: 600 }}>📱 WhatsApp</WfBtn>
      </div>

      {/* HERO action — gros visuel + CTA énorme */}
      <div style={{ padding: '40px 48px', borderBottom: '1.5px solid #222', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'center' }}>
        <div>
          <WfTag accent={WHATS} filled style={{ marginBottom: 16, padding: '4px 12px', fontSize: 13 }}>● 12 voitures dispos maintenant</WfTag>
          <WfH size={64} style={{ lineHeight: 1, marginBottom: 18 }}>Trouve ta voiture.<br />Écris.<br />Roule.</WfH>
          <WfText lines={1} widths={[78]} thickness={6} style={{ marginBottom: 28 }} />
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <WfBtn dark accent={WHATS} style={{ padding: '18px 30px', fontSize: 18, fontWeight: 600 }}>📱 Écrire maintenant</WfBtn>
            <WfBtn accent={ACCENT_D} style={{ padding: '18px 30px', fontSize: 16 }}>Voir le catalogue ↓</WfBtn>
          </div>
          <div style={{ fontFamily: 'Patrick Hand', fontSize: 13, opacity: 0.6 }}>⏱ Réponse moyenne en moins d'1h</div>
        </div>
        <WfImg h={380} label="voiture hero (carousel)" />
      </div>

      {/* COMPTEUR 3 tuiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1.5px solid #222' }}>
        {[
          ['200+', 'voitures vendues'],
          ['8 ans', "à Dakar"],
          ['< 1h', 'temps de réponse'],
        ].map(([n, l], i) => (
          <div key={i} style={{ padding: '36px 24px', textAlign: 'center', borderRight: i < 2 ? '1.5px solid #222' : 'none', background: i === 1 ? '#f5f5f3' : '#fff' }}>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 72, lineHeight: 1, color: ACCENT_D }}>{n}</div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 16, opacity: 0.7, marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CATALOGUE — cards larges, prix proéminent, WhatsApp sur chaque */}
      <div style={{ padding: '50px 48px', borderBottom: '1.5px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <WfTag accent={WHATS} filled style={{ marginBottom: 10, fontSize: 11 }}>● MISE À JOUR HIER</WfTag>
            <WfH size={36}>12 voitures dispos</WfH>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Tous', 'SUV', 'Berline', '< 15M', '15-25M', '25M+'].map((f, i) => (
              <WfTag key={i} accent={ACCENT_D} filled={i === 0}>{f}</WfTag>
            ))}
          </div>
        </div>
        {/* Cards larges horizontales avec WhatsApp énorme */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { t: 'BMW X5 — 2019', km: '62 000 km', f: 'Diesel · Auto · Noir', p: '18 500 000 F', b: 'NOUVEAU' },
            { t: 'Range Rover Sport — 2020', km: '45 000 km', f: 'Essence · Auto · Blanc', p: '32 000 000 F', b: '★ Coup de cœur' },
            { t: 'Mercedes C220 — 2018', km: '80 000 km', f: 'Diesel · Auto · Gris', p: '14 200 000 F', b: null },
          ].map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '220px 1fr auto', gap: 20, border: '1.5px solid #222', background: '#fff', padding: 14, alignItems: 'center' }}>
              <WfImg h={140} label="photo" />
              <div>
                {c.b && <WfTag accent={WHATS} filled style={{ marginBottom: 8, fontSize: 11 }}>{c.b}</WfTag>}
                <WfH size={22}>{c.t}</WfH>
                <div style={{ fontFamily: 'Patrick Hand', fontSize: 15, opacity: 0.7, marginTop: 4 }}>{c.km} · {c.f}</div>
                <div style={{ fontFamily: 'Patrick Hand', fontSize: 26, color: ACCENT_D, marginTop: 10 }}>{c.p}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'stretch' }}>
                <WfBtn dark accent={WHATS} style={{ padding: '14px 22px', fontSize: 15, fontWeight: 600 }}>📱 WhatsApp</WfBtn>
                <WfBtn accent={ACCENT_D} style={{ padding: '10px 22px', fontSize: 13 }}>Voir détails</WfBtn>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <WfBtn accent={ACCENT_D} style={{ padding: '12px 24px', fontSize: 14 }}>Voir les 12 voitures →</WfBtn>
        </div>
      </div>

      {/* DEMARCHE 5 numéros illustrés */}
      <div style={{ padding: '50px 48px', borderBottom: '1.5px solid #222', background: '#f5f5f3' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <WfNote color={WHATS}>— super simple</WfNote>
          <WfH size={36}>En 5 étapes, c'est plié.</WfH>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {[
            ['1', '💬', 'Tu écris sur WhatsApp'],
            ['2', '📅', 'On fixe un rendez-vous'],
            ['3', '🚗', 'Tu essaies sur route'],
            ['4', '📄', 'On vérifie les papiers'],
            ['5', '🔑', 'Tu repars avec les clés'],
          ].map(([n, e, t], i) => (
            <div key={i} style={{ background: '#fff', border: '1.5px solid #222', padding: 16, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Patrick Hand', fontSize: 38, color: WHATS, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 32, margin: '8px 0' }}>{e}</div>
              <WfH size={15}>{t}</WfH>
            </div>
          ))}
        </div>
      </div>

      {/* VENDUES — grille dense */}
      <div style={{ padding: '50px 48px', borderBottom: '1.5px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <WfNote color={WHATS}>— preuves en photos</WfNote>
            <WfH size={36}>200+ déjà livrées.</WfH>
          </div>
          <div style={{ fontFamily: 'Patrick Hand', fontSize: 14, opacity: 0.7 }}>↓ scroll pour tout voir</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <WfImg h={100} />
              {i === 0 && <div style={{ position: 'absolute', bottom: 4, left: 4 }}><WfTag accent={WHATS} filled style={{ fontSize: 9, padding: '1px 5px' }}>VENDUE</WfTag></div>}
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT — WhatsApp énorme, tel, formulaire court */}
      <div style={{ padding: '60px 48px', borderBottom: '1.5px solid #222', background: '#1a1a1a', color: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <WfH size={44} style={{ color: '#fff' }}>Allez, on en parle ?</WfH>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 32, maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ background: WHATS, padding: '32px 28px', textAlign: 'center', border: '1.5px solid #fff' }}>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 18, opacity: 0.95 }}>Le plus rapide :</div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 48, margin: '10px 0', fontWeight: 600 }}>📱 WhatsApp</div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 22 }}>+221 XX XXX XX XX</div>
            <div style={{ fontFamily: 'Patrick Hand', fontSize: 13, marginTop: 12, opacity: 0.9 }}>Réponse en moyenne sous 1h</div>
          </div>
          <div style={{ background: '#fff', color: '#222', padding: 20, border: '1.5px solid #fff' }}>
            <WfH size={16} style={{ marginBottom: 12 }}>Ou laisse ton numéro</WfH>
            {['Nom', 'Téléphone', 'Voiture qui t\'intéresse'].map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontFamily: 'Patrick Hand', fontSize: 11, opacity: 0.6 }}>{p}</div>
                <div style={{ height: 32, border: '1.5px solid #222' }} />
              </div>
            ))}
            <WfBtn dark accent={ACCENT_D} style={{ width: '100%', padding: '10px', fontSize: 13, marginTop: 6 }}>Je te rappelle</WfBtn>
          </div>
        </div>
      </div>

      <WfFooter accent={ACCENT_D} />

      {/* CTA flottant WhatsApp */}
      <div style={{ position: 'absolute', right: 24, bottom: 80, background: WHATS, color: '#fff', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: '1.5px solid #222', boxShadow: '2px 3px 0 #222' }}>📱</div>
    </div>
  );
}

window.WfD = WfD;
