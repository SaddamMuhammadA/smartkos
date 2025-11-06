'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Room {
  id: number;
  name: string;
  type: string;
}

interface Booking {
  roomId: number;
  name: string;
  start: string; // YYYY-MM-DD
  end: string;
  status: 1 | 2; // 1=Terisi, 2=Booking
}

export default function GanttChartDesktop() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    booking?: Booking;
    room?: Room;
  }>({ visible: false, x: 0, y: 0 });

  const rooms: Room[] = [
    { id: 1, name: 'A1', type: 'Standar' },
    { id: 2, name: 'A2', type: 'Standar' },
    { id: 3, name: 'B1', type: 'VIP' },
    { id: 4, name: 'B2', type: 'VIP' },
    { id: 5, name: 'C1', type: 'Premium' },
    { id: 6, name: 'C2', type: 'Premium' },
  ];

  const bookings: Booking[] = [
    { roomId: 1, name: 'Saddam', start: '2025-10-04', end: '2025-11-04', status: 1 },
    { roomId: 3, name: 'Jajang', start: '2025-10-10', end: '2025-10-30', status: 1 },
    { roomId: 5, name: 'Badang', start: '2025-10-25', end: '2025-11-25', status: 2 },
    { roomId: 6, name: 'Dadang', start: '2025-11-01', end: '2025-12-01', status: 2 },
  ];

  const getMonthName = (monthIndex: number) =>
    new Date(0, monthIndex).toLocaleString('id-ID', { month: 'long' });

  useEffect(() => {
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    setDaysInMonth(Array.from({ length: totalDays }, (_, i) => i + 1));
  }, [currentMonth, currentYear]);

  const handleChangeMonth = (delta: number) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const parseDate = (date: string) => new Date(`${date}T00:00:00`);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    booking: Booking,
    room: Room
  ) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY - 80,
      booking,
      room,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="overflow-x-auto w-full relative">
      {/* Header navigasi bulan */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleChangeMonth(-1)}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ChevronLeft size={16} /> <span className="ml-1">Bulan Sebelumnya</span>
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {getMonthName(currentMonth)} {currentYear}
        </h2>
        <button
          onClick={() => handleChangeMonth(1)}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <span className="mr-1">Bulan Berikutnya</span> <ChevronRight size={16} />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-sm"></span> Terisi
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-400/60 border border-blue-500 border-dashed rounded-sm"></span> Booking / Deposit
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto bg-white shadow-sm">
        <div className="min-w-[900px]">
          {/* Header tanggal */}
          <div className="flex border-b border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium">
            <div className="w-40 py-2 px-3 border-r border-gray-200 text-center bg-gray-100">
              Kamar / Tanggal
            </div>
            {daysInMonth.map((day) => (
              <div key={day} className="w-12 py-2 text-center border-r border-gray-100">
                {day}
              </div>
            ))}
          </div>

          {/* Baris kamar */}
          {rooms.map((room) => (
            <div
              key={room.id}
              className="flex relative border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="w-40 py-3 px-4 border-r border-gray-200 bg-white text-sm font-medium text-gray-700 sticky left-0 z-10">
                {room.name} <span className="text-xs text-gray-400">({room.type})</span>
              </div>

              <div className="relative flex">
                {daysInMonth.map((day) => (
                  <div key={day} className="w-12 h-10 border-r border-gray-50"></div>
                ))}

                {/* Bar booking */}
                {bookings
                  .filter((b) => b.roomId === room.id)
                  .map((b) => {
                    const start = parseDate(b.start);
                    const end = parseDate(b.end);
                    const startOfMonth = new Date(currentYear, currentMonth, 1);
                    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

                    const visibleStart = start < startOfMonth ? startOfMonth : start;
                    const visibleEnd = end > endOfMonth ? endOfMonth : end;

                    const startDay = visibleStart.getDate();
                    const endDay = visibleEnd.getDate();

                    const left = (startDay - 1) * 48;
                    const width = (endDay - startDay + 1) * 48;

                    return (
                      <div
                        key={b.name}
                        onMouseEnter={(e) => handleMouseEnter(e, b, room)}
                        onMouseLeave={handleMouseLeave}
                        className={`absolute top-2 h-6 text-xs text-white flex items-center justify-center rounded-md shadow-sm cursor-pointer transition-all ${
                          b.status === 1
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-blue-400/70 border border-blue-500 border-dashed text-blue-900 hover:bg-blue-400/90'
                        }`}
                        style={{ left: `${left}px`, width: `${width}px` }}
                      >
                        {b.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip interaktif */}
      <AnimatePresence>
        {tooltip.visible && tooltip.booking && tooltip.room && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm w-60 pointer-events-none"
            style={{ top: tooltip.y, left: tooltip.x }}
          >
            <div className="font-semibold text-gray-800 mb-1">{tooltip.booking.name}</div>
            <div className="text-xs text-gray-500 mb-1">
              {tooltip.room.name} — {tooltip.room.type}
            </div>
            <div className="text-xs text-gray-600">
              {tooltip.booking.start} → {tooltip.booking.end}
            </div>
            <div
              className={`mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                tooltip.booking.status === 1
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {tooltip.booking.status === 1 ? 'Terisi' : 'Booking'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
