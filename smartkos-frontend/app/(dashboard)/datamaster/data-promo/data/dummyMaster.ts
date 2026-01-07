export interface MasterKos {
  id_kos: number;
  nama_kos: string;
}

export interface JenisKamar {
  id_jenis_kamar: number;
  id_kos: number;
  nama_jenis_kamar: string;
}

export const masterKosData: MasterKos[] = [
  { id_kos: 1, nama_kos: "SmartKos 1" },
  { id_kos: 2, nama_kos: "SmartKos 2" },
];

export const jenisKamarData: JenisKamar[] = [
  { id_jenis_kamar: 1, id_kos: 1, nama_jenis_kamar: "Standard" },
  { id_jenis_kamar: 2, id_kos: 1, nama_jenis_kamar: "Deluxe" },
  { id_jenis_kamar: 3, id_kos: 2, nama_jenis_kamar: "VIP" },
];
