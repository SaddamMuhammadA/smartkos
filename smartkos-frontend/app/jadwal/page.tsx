'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Room {
  id: number;
  name: string;
  type: string;
}

interface Booking {
  roomId: number;
  name: string;
  start: string;
  end: string;
  status: number; // 1=Terisi, 2=Booking
}

export default function JadwalKamarPage() {
  // --- Data Dummy ---
  const rooms: Room[] = [
    { id: 1, name: 'A1 (Standar)', type: 'Standar' },
    { id: 2, name: 'A2 (Standar)', type: 'Standar' },
    { id: 3, name: 'B1 (VIP)', type: 'VIP' },
    { id: 4, name: 'B2 (VIP)', type: 'VIP' },
    { id: 5, name: 'C1 (Premium)', type: 'Premium' },
    { id: 6, name: 'C2 (Premium)', type: 'Premium' },
  ];

  const bookings: Booking[] = [
    { roomId: 6, name: 'Saddam', start: '2025-10-04', end: '2025-11-04', status: 1 },
    { roomId: 3, name: 'Jajang', start: '2025-10-10', end: '2025-10-30', status: 1 },
    { roomId: 5, name: 'Badang', start: '2025-10-25', end: '2025-11-25', status: 2 },
    { roomId: 1, name: 'Dadang', start: '2025-11-01', end: '2025-12-01', status: 2 },
  ];

  // --- State navigasi bulan ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getMonthName = (i: number) =>
    [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ][i];

  const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentMonth, currentYear]);
  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const parseDate = (d: string) => new Date(`${d}T00:00:00`);
  const dayDiff = (a: Date, b: Date) => Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  // --- UI utama ---
  return (
    <div className="p-4 md:p-6 text-gray-900">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-2">Jadwal Ketersediaan Kamar</h1>
        <p className="text-gray-500 mb-4">
          Visualisasi kamar terisi dan booking dalam format Bagan Gantt bulanan.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Bulan Sebelumnya
          </button>

          <h2 className="text-2xl font-bold">
            {getMonthName(currentMonth)} {currentYear}
          </h2>

          <button
            onClick={() => changeMonth(1)}
            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
          >
            Bulan Berikutnya <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="flex flex-wrap text-sm text-gray-600 gap-x-6 justify-center sm:justify-start">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span> Terisi Penuh
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-blue-300/50 border border-blue-500 border-dashed mr-2"></span> Booking / Deposit
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <div className="min-w-[1000px] relative">
          {/* Header tanggal */}
          <div className="flex sticky top-0 bg-gray-50 border-b border-gray-300 font-semibold text-sm z-20">
            <div className="w-48 flex items-center justify-center border-r border-gray-300 bg-gray-100">
              Kamar / Tanggal
            </div>
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-20 flex items-center justify-center border-r border-gray-300 bg-gray-100 text-gray-700"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Baris kamar */}
          {rooms.map((room) => (
            <div key={room.id} className="flex relative border-b border-gray-100 hover:bg-indigo-50 transition">
              <div className="w-48 h-12 flex items-center px-3 border-r border-gray-200 bg-white sticky left-0 z-10 font-medium text-gray-700">
                {room.name}
              </div>

              <div className="relative flex-grow h-12">
                {/* Garis harian */}
                {Array.from({ length: daysInMonth }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 h-full border-r border-gray-100"
                    style={{
                      width: '80px',
                      left: `${i * 80}px`,
                    }}
                  />
                ))}

                {/* Balok sewa */}
                {bookings
                  .filter((b) => b.roomId === room.id)
                  .map((booking, i) => {
                    const start = parseDate(booking.start);
                    const end = parseDate(booking.end);
                    const visibleStart = start < startOfMonth ? startOfMonth : start;
                    const visibleEnd = end > endOfMonth ? endOfMonth : end;

                    if (visibleEnd < startOfMonth || visibleStart > endOfMonth) return null;

                    const startOffset = dayDiff(startOfMonth, visibleStart) * 80;
                    const width = (dayDiff(visibleStart, visibleEnd) + 1) * 80;

                    return (
                      <div
                        key={i}
                        className={`absolute top-1/2 -translate-y-1/2 h-6 rounded-md px-2 flex items-center text-xs font-semibold shadow cursor-pointer transition ${
                          booking.status === 1
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-blue-300/60 text-blue-800 border border-blue-500 border-dashed hover:bg-blue-400/70'
                        }`}
                        style={{
                          left: `${startOffset}px`,
                          width: `${width}px`,
                        }}
                        title={`${booking.name}: ${booking.start} → ${booking.end}`}
                      >
                        {booking.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
