export interface RiwayatSewa {
  id: number;
  customer: string;
  telp: string;
  fotoKtp?: string;
  kamar: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  durasi: string;
  total: number;
  status: "Selesai" | "Dibatalkan" | "Berhenti";
}

export const riwayatDummy: RiwayatSewa[] = [
  {
    id: 1,
    customer: "Saddam Muhammad",
    telp: "08123456789",
    fotoKtp: "/ktp/dummy1.png",
    kamar: "A1 - Standar",
    tanggalMulai: "2023-01-10",
    tanggalSelesai: "2023-06-10",
    durasi: "5 Bulan",
    total: 5500000,
    status: "Selesai",
  },
  {
    id: 2,
    customer: "Rizky Alamsyah",
    telp: "08567890123",
    fotoKtp: "/ktp/dummy2.png",
    kamar: "B2 - VIP",
    tanggalMulai: "2023-02-01",
    tanggalSelesai: "2023-03-01",
    durasi: "1 Bulan",
    total: 1500000,
    status: "Dibatalkan",
  },
  {
    id: 3,
    customer: "Dimas Adi",
    telp: "08234567890",
    fotoKtp: "/ktp/dummy3.png",
    kamar: "C1 - Premium",
    tanggalMulai: "2022-10-01",
    tanggalSelesai: "2023-10-01",
    durasi: "12 Bulan",
    total: 18000000,
    status: "Berhenti",
  },
];
