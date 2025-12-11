// app/Master/DataKamar/data/dummyKamar.ts

export interface Kamar {
  id_kamar: number;
  id_kos: number | null;
  id_jenis_kamar: number | null;
  kode_kamar: string;
  status_kamar: "Tersedia" | "Terisi" | "Perawatan";
  catatan?: string;
}

export const dummyKamar: Kamar[] = [
  {
    id_kamar: 1,
    id_kos: 1,
    id_jenis_kamar: 2,
    kode_kamar: "A01",
    status_kamar: "Tersedia",
    catatan: "Dekat jendela"
  },
  {
    id_kamar: 2,
    id_kos: 1,
    id_jenis_kamar: 1,
    kode_kamar: "B12",
    status_kamar: "Terisi",
    catatan: ""
  }
];
