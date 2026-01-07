export type Promo = {
  id_promo: number;
  nama_promo: string;
  id_kos: number;
  id_jenis_kamar: number;
  pricing_id?: number;
  tipe_promo: 'Persentase' | 'Nominal';
  nilai: number;
  status: 'Aktif' | 'Nonaktif';
  tanggal_mulai: string;
  tanggal_selesai: string;
};
