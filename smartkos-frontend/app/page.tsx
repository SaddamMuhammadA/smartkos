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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

/* ======================
   TIPE DATA
====================== */

interface OccupancyItem {
  month: string;
  terisi: number; // jumlah kamar terisi
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
  jadwalSingkat: JadwalItem[];
  notifikasi: NotifikasiItem[];
}

/* ======================
   DATA DUMMY
====================== */
const DUMMY_DATA: DashboardData = {
  totalKamar: 128,
  tersedia: 56,
  penghuniAktif: 83,
  pendapatanBulanIni: 12950000,
  userName: 'Saddam Muhammad',

  jadwalSingkat: [
    { no: 1, kamar: 'A1', tipe: 'Single', tanggal: '12 Okt 2025', sewa: 8000, status: 'Aktif' },
    { no: 2, kamar: 'B2', tipe: 'Double', tanggal: '14 Okt 2025', sewa: 12000, status: 'Aktif' },
    { no: 3, kamar: 'C1', tipe: 'VIP', tanggal: '17 Okt 2025', sewa: 15000, status: 'Booking' },
  ],
  notifikasi: [
    { type: 'Tagihan', message: '3 kamar akan jatuh tempo dalam 3 hari' },
  ],
};

const OCCUPANCY_DATA: OccupancyItem[] = [
  { month: 'Jan', terisi: 72 },
  { month: 'Feb', terisi: 75 },
  { month: 'Mar', terisi: 78 },
  { month: 'Apr', terisi: 80 },
  { month: 'May', terisi: 82 },
  { month: 'Jun', terisi: 85 },
  { month: 'Jul', terisi: 88 },
  { month: 'Aug', terisi: 90 },
  { month: 'Sep', terisi: 87 },
  { month: 'Oct', terisi: 89 },
  { month: 'Nov', terisi: 91 },
  { month: 'Dec', terisi: 93 },
];

/* ======================
   STAT CARD
====================== */
interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  format?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, format = true }) => (
  <Card className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
    <CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <Icon className="w-5 h-5 text-blue-600" />
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p className={`text-3xl font-extrabold ${format ? 'text-blue-700' : 'text-gray-800'}`}>
        {format ? `Rp${value.toLocaleString('id-ID')}` : value}
      </p>
    </CardContent>
  </Card>
);

/* ======================
   SIMPLE CHART
====================== */
const OccupancyChart: React.FC<{ data: OccupancyItem[] }> = ({ data }) => {
  return (
    <div className="w-full h-[220px] sm:h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          {/* Grid hanya tampil di desktop */}
          <CartesianGrid
            strokeDasharray="3 3"
            className="hidden sm:block"
          />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />

          {/* Y Axis hanya desktop */}
          <YAxis
            className="hidden sm:block"
            tick={{ fontSize: 12 }}
          />

          {/* Tooltip lebih ramping */}
          <Tooltip
            formatter={(value) => {
              if (typeof value === 'number') {
                return [`${value} Kamar`, 'Terisi'];
              }
              return value;
            }}
          />

          <Line
            type="monotone"
            dataKey="terisi"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}          // ❗ penting untuk mobile
            activeDot={{ r: 5 }} // hanya muncul saat hover/tap
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};



/* ======================
   PAGE
====================== */
export default function Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div className={`space-y-8 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-3xl font-bold text-gray-800">
        Selamat Datang, {DUMMY_DATA.userName} 👋
      </h2>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Kamar" value={DUMMY_DATA.totalKamar} icon={List} format={false} />
        <StatCard title="Tersedia" value={DUMMY_DATA.tersedia} icon={Home} format={false} />
        <StatCard title="Penghuni Aktif" value={DUMMY_DATA.penghuniAktif} icon={Users} format={false} />
        <StatCard title="Pendapatan Bulan Ini" value={DUMMY_DATA.pendapatanBulanIni} icon={DollarSign} />
      </div>

      {/* Pendapatan */}
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
        <CardHeader>
          <CardTitle>Grafik Tingkat Hunian Kos 1 Tahun Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <OccupancyChart data={OCCUPANCY_DATA} />
        </CardContent>
      </Card>

      {/* Jadwal & Notifikasi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jadwal */}
        <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Jadwal Sewa Aktif</CardTitle>
            <Button variant="ghost">Lihat Semua →</Button>
          </CardHeader>
          <CardContent>
            {/* MOBILE */}
            <div className="space-y-4 md:hidden">
              {DUMMY_DATA.jadwalSingkat.map((j) => (
                <div key={j.no} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-blue-600">{j.kamar}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      {j.status}
                    </span>
                  </div>
                  <p className="text-sm">Tipe: {j.tipe}</p>
                  <p className="text-sm">Tanggal: {j.tanggal}</p>
                  <p className="font-semibold mt-1">
                    Rp{j.sewa.toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <tbody>
                  {DUMMY_DATA.jadwalSingkat.map((j) => (
                    <tr key={j.no} className="border-b hover:bg-gray-50 transition-all">
                      <td className="px-3 py-2">{j.no}</td>
                      <td className="px-3 py-2 text-blue-600 font-medium">{j.kamar}</td>
                      <td className="px-3 py-2">{j.tipe}</td>
                      <td className="px-3 py-2">{j.tanggal}</td>
                      <td className="px-3 py-2">
                        Rp{j.sewa.toLocaleString('id-ID')}
                      </td>
                      <td className="px-3 py-2">{j.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Notifikasi */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-amber-500" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {DUMMY_DATA.notifikasi.map((n, i) => (
              <div key={i} className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-semibold text-amber-700 flex items-center">
                  {n.type}
                  <RefreshCw className="w-4 h-4 ml-auto" />
                </h4>
                <p className="text-sm mt-1">{n.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
