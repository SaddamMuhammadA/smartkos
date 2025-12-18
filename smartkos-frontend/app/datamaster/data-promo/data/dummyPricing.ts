export interface Pricing {
  id_pricing: number;
  id_kos: number;
  id_jenis_kamar: number;
  lama_tinggal: 'Bulanan' | 'Tahunan';
  harga: number;
}

export const pricingData: Pricing[] = [
  {
    id_pricing: 1,
    id_kos: 1,
    id_jenis_kamar: 1,
    lama_tinggal: 'Bulanan',
    harga: 1500000,
  },
  {
    id_pricing: 2,
    id_kos: 1,
    id_jenis_kamar: 1,
    lama_tinggal: 'Tahunan',
    harga: 16000000,
  },
];
