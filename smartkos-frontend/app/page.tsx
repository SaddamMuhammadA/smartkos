'use client';

import React, { useEffect, useState } from 'react';
import {
  Home,
  List,
  Users,
  DollarSign,
  Bell,
  RefreshCw,
  LucideIcon,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ----------------------
// TIPE DATA
// ----------------------
interface HistoryItem {
  month: string;
  amount: number;
}

interface JadwalItem {
  no: number;
  kamar: string;
  tipe: string;
  tanggal: string;
  sewa: number;
  status: 'Aktif' | 'Booking';
}

interface NotifikasiItem {
  type: string;
  message: string;
}

interface DashboardData {
  totalKamar: number;
  tersedia: number;
  penghuniAktif: number;
  pendapatanBulanIni: number;
  userName: string;
  pendapatanHistory: HistoryItem[];
  jadwalSingkat: JadwalItem[];
  notifikasi: NotifikasiItem[];
}

// ----------------------
// DATA DUMMY
// ----------------------
const DUMMY_DATA: DashboardData = {
  totalKamar: 128,
  tersedia: 56,
  penghuniAktif: 83,
  pendapatanBulanIni: 12950000,
  userName: 'Dimas',
  pendapatanHistory: [
    { month: 'Jan', amount: 3000000 },
    { month: 'Feb', amount: 4500000 },
    { month: 'Mar', amount: 5000000 },
    { month: 'Apr', amount: 4000000 },
    { month: 'May', amount: 6500000 },
    { month: 'Jun', amount: 5500000 },
  ],
  jadwalSingkat: [
    { no: 1, kamar: 'A1', tipe: 'Single', tanggal: '12 Okt 2025', sewa: 8000, status: 'Aktif' },
    { no: 2, kamar: 'B2', tipe: 'Double', tanggal: '14 Okt 2025', sewa: 12000, status: 'Aktif' },
    { no: 3, kamar: 'C1', tipe: 'VIP', tanggal: '17 Okt 2025', sewa: 15000, status: 'Booking' },
  ],
  notifikasi: [
    { type: 'Tagihan', message: '3 kamar akan jatuh tempo dalam 3 hari' },
  ],
};

// ----------------------
// COMPONENTS
// ----------------------
interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  format?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, format = true }) => (
  <Card className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <Icon className="w-5 h-5 text-blue-600" />
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p
        className={`text-3xl font-extrabold ${
          format ? 'text-blue-700' : 'text-gray-800'
        }`}
      >
        {format ? `Rp${value.toLocaleString('id-ID')}` : value}
      </p>
    </CardContent>
  </Card>
);

const SimpleLineChart: React.FC<{ data: HistoryItem[] }> = ({ data }) => {
  const amounts = data.map((d) => d.amount);
  const max = Math.max(...amounts);
  const min = Math.min(...amounts);

  const normalized = data.map((d) => ({
    ...d,
    height: max === min ? 50 : ((d.amount - min) / (max - min)) * 90 + 5,
  }));

  const points = normalized
    .map((d, i) => `${(i / (data.length - 1)) * 100},${100 - d.height}`)
    .join(' ');

  return (
    <div className="relative h-48 transition-all duration-500 ease-out">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {/* grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.3" />
        ))}
        {/* area gradient */}
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill="url(#fill)" points={`0,100 ${points} 100,100`} />
        {/* line */}
        <polyline
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* dots */}
        {normalized.map((d, i) => (
          <circle
            key={i}
            cx={(i / (data.length - 1)) * 100}
            cy={100 - d.height}
            r="1.8"
            fill="#2563eb"
            className="transition-all duration-500 ease-out"
          />
        ))}
      </svg>
      <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 px-2">
        {data.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  );
};

const DashboardMain: React.FC<{ data: DashboardData }> = ({ data }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`space-y-8 transition-opacity duration-700 ease-in-out ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h2 className="text-3xl font-bold text-gray-800">Selamat Datang, {data.userName} 👋</h2>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Kamar" value={data.totalKamar} icon={List} format={false} />
        <StatCard title="Tersedia" value={data.tersedia} icon={Home} format={false} />
        <StatCard title="Penghuni Aktif" value={data.penghuniAktif} icon={Users} format={false} />
        <StatCard title="Pendapatan Bulan Ini" value={data.pendapatanBulanIni} icon={DollarSign} />
      </div>

      {/* Grafik */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
        <CardHeader>
          <CardTitle className="text-gray-800 text-lg font-semibold">
            Pendapatan 6 Bulan Terakhir
          </CardTitle>
          <p className="text-sm text-gray-500">Tren pertumbuhan pendapatan SmartKos</p>
        </CardHeader>
        <CardContent>
          <SimpleLineChart data={data.pendapatanHistory} />
        </CardContent>
      </Card>

      {/* Jadwal & Notifikasi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal */}
        <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-gray-800 text-lg font-semibold">Jadwal Sewa Aktif</CardTitle>
            <Button variant="ghost" className="text-gray-800 hover:text-blue-600">
              Lihat Semua →
            </Button>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-left text-gray-700 transition-all duration-300 ease-out">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-3 py-2">No</th>
                  <th className="px-3 py-2">Kamar</th>
                  <th className="px-3 py-2">Tipe</th>
                  <th className="px-3 py-2">Tanggal</th>
                  <th className="px-3 py-2">Sewa/Bln</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.jadwalSingkat.map((item) => (
                  <tr key={item.no} className="border-b hover:bg-gray-50 transition-all">
                    <td className="px-3 py-2">{item.no}</td>
                    <td className="px-3 py-2 text-blue-600 font-medium">{item.kamar}</td>
                    <td className="px-3 py-2">{item.tipe}</td>
                    <td className="px-3 py-2">{item.tanggal}</td>
                    <td className="px-3 py-2">Rp{item.sewa.toLocaleString('id-ID')}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === 'Aktif'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Notifikasi */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800 text-lg font-semibold">
              <Bell className="w-5 h-5 mr-2 text-amber-500" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.notifikasi.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4 transition-all duration-300 hover:shadow-sm"
              >
                <h4 className="font-semibold text-amber-700 mb-1 flex items-center">
                  {item.type}
                  <RefreshCw className="w-4 h-4 ml-auto text-amber-600" />
                </h4>
                <p className="text-sm text-gray-700">{item.message}</p>
                <Button className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
                  Lihat
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ----------------------
// EXPORT
// ----------------------
export default function Page() {
  return <DashboardMain data={DUMMY_DATA} />;
}
