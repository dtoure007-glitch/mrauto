-- MR Auto Canada — schéma Supabase
-- À coller dans : Supabase Dashboard → SQL Editor → New query → Run

create table if not exists cars (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  brand         text not null,
  model         text not null,
  year          text not null,
  price         text not null,
  km            text not null,
  fuel          text not null,
  transmission  text not null,
  color         text not null,
  badge         text,
  photos        text[] not null default '{}',
  status        text not null default 'available' check (status in ('available', 'sold')),
  description   text
);

-- Lecture publique (anon)
alter table cars enable row level security;

create policy "Lecture publique" on cars
  for select using (true);

-- Écriture pour les utilisateurs authentifiés (admin)
create policy "Écriture admin" on cars
  for all to authenticated
  using (true)
  with check (true);

-- Photo de couverture (image principale sur la carte)
alter table cars add column if not exists cover_photo text;

-- Voiture vedette (une seule à la fois — affichée en héro)
alter table cars add column if not exists featured boolean not null default false;

-- Prix de vente final (renseigné lors du marquage "vendue" dans l'admin)
alter table cars add column if not exists prix_vente text;

-- Données de départ (6 voitures fictives)
insert into cars (brand, model, year, price, km, fuel, transmission, color, badge, status) values
  ('BMW',        'X5',    '2019', '18 500 000 FCFA', '62 000 km', 'Diesel',  'Auto', 'Noir',  'Nouveau',       'available'),
  ('Range Rover','Sport', '2020', '32 000 000 FCFA', '45 000 km', 'Essence', 'Auto', 'Blanc', null,            'available'),
  ('Mercedes',   'C220',  '2018', '14 200 000 FCFA', '80 000 km', 'Diesel',  'Auto', 'Gris',  'Coup de cœur', 'available'),
  ('Chevrolet',  'Tahoe', '2017', '22 000 000 FCFA', '95 000 km', 'Essence', 'Auto', 'Noir',  null,            'available'),
  ('Audi',       'A4',    '2020', '16 500 000 FCFA', '38 000 km', 'Essence', 'Auto', 'Bleu',  null,            'available'),
  ('Toyota',     'RAV4',  '2019', '13 900 000 FCFA', '72 000 km', 'Essence', 'Auto', 'Gris',  null,            'available');
