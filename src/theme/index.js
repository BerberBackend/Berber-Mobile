import { olcekle, yaziOlcek } from './responsive';

export const renkler = {
  ana: '#1f2937',
  anaAcik: '#374151',
  vurgu: '#2563eb',
  basari: '#16a34a',
  uyari: '#f59e0b',
  tehlike: '#dc2626',
  tehlikeAcikZemin: '#fee2e2',
  tehlikeYazi: '#991b1b',
  arkaplan: '#ffffff',
  kartZemin: '#f3f4f6',
  cizgi: '#e5e7eb',
  cizgiAcik: '#f3f4f6',
  kenarlik: '#d1d5db',
  yaziAna: '#1f2937',
  yaziIkincil: '#4b5563',
  yaziSoluk: '#6b7280',
  yaziSolukAcik: '#9ca3af',
  beyaz: '#ffffff',
};

export const bosluk = {
  xs: olcekle(4, { min: 3, max: 6 }),
  sm: olcekle(8, { min: 6, max: 10 }),
  md: olcekle(16, { min: 12, max: 20 }),
  lg: olcekle(24, { min: 18, max: 30 }),
  xl: olcekle(32, { min: 24, max: 40 }),
};

export const yazi = {
  kucuk: yaziOlcek(12),
  normal: yaziOlcek(14),
  govde: yaziOlcek(16),
  altBaslik: yaziOlcek(18),
  baslik: yaziOlcek(22),
  buyukBaslik: yaziOlcek(28),
};

export const yuvarlaklik = {
  sm: 8,
  md: 10,
  lg: 12,
  pill: 20,
};
