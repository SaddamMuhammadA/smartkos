'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  status: 1 | 2; // 1=Terisi, 2=Booking
}

export default function GanttChartMobile() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<{
    booking: Booking;
    room: Room;
  } | null>(null);

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

  const openBookingModal = (booking: Booking, room: Room) => {
    setSelectedBooking({ booking, room });
  };

  const closeBookingModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="relative w-full overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header navigasi bulan */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 sticky top-0 z-20">
        <button
          onClick={() => handleChangeMonth(-1)}
          className="flex items-center px-2 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          <ChevronLeft size={14} /> <span className="ml-1">Sebelumnya</span>
        </button>
        <h2 className="text-base font-semibold text-gray-800">
          {getMonthName(currentMonth)} {currentYear}
        </h2>
        <button
          onClick={() => handleChangeMonth(1)}
          className="flex items-center px-2 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          <span className="mr-1">Berikutnya</span> <ChevronRight size={14} />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-600 py-2 bg-white">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-500 rounded-sm"></span> Terisi
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-400/60 border border-blue-500 border-dashed rounded-sm"></span> Booking
        </div>
      </div>

      {/* Chart utama */}
      <div className="flex border-t border-gray-200">
        {/* Kolom tanggal di sisi kiri */}
        <div className="w-16 flex-shrink-0 bg-gray-50 border-r border-gray-200 text-[11px] text-gray-600 font-medium">
          {daysInMonth.map((day) => (
            <div
              key={day}
              className="h-10 flex items-center justify-center border-b border-gray-100"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Kolom kamar dan bar booking */}
        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[400px] flex">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex-1 border-r border-gray-100 text-[11px] text-gray-700 relative"
              >
                {/* Header nama kamar */}
                <div className="bg-gray-100 text-center font-semibold py-2 border-b border-gray-200 sticky top-0 z-10">
                  {room.name}
                </div>

                {/* Grid hari */}
                {daysInMonth.map((day) => (
                  <div
                    key={day}
                    className="h-10 border-b border-gray-50 relative"
                  ></div>
                ))}

                {/* Booking bar */}
                {bookings
                  .filter((b) => b.roomId === room.id)
                  .map((b, i) => {
                    const start = parseDate(b.start);
                    const end = parseDate(b.end);
                    const startOfMonth = new Date(currentYear, currentMonth, 1);
                    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

                    const visibleStart = start < startOfMonth ? startOfMonth : start;
                    const visibleEnd = end > endOfMonth ? endOfMonth : end;

                    const startDay = visibleStart.getDate();
                    const endDay = visibleEnd.getDate();

                    const top = (startDay - 1) * 40;
                    const height = (endDay - startDay + 1) * 40;

                    return (
                      <motion.div
                        key={i}
                        onClick={() => openBookingModal(b, room)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute left-1 right-1 text-[10px] flex items-center justify-center rounded-md shadow-sm text-white cursor-pointer ${
                          b.status === 1
                            ? 'bg-green-500'
                            : 'bg-blue-400/70 border border-blue-500 border-dashed text-blue-900'
                        }`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        {b.name}
                      </motion.div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Booking Detail */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 relative"
            >
              <button
                onClick={closeBookingModal}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedBooking.booking.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                {selectedBooking.room.name} — {selectedBooking.room.type}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {selectedBooking.booking.start} → {selectedBooking.booking.end}
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedBooking.booking.status === 1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {selectedBooking.booking.status === 1 ? 'Terisi' : 'Booking'}
              </span>

              {/* Tombol aksi cepat */}
              <div className="mt-5 border-t border-gray-100 pt-4">
                <button
                  onClick={() => alert(`Edit sewa ${selectedBooking.booking.name}`)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
                >
                  <Edit3 size={16} />
                  Edit Sewa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
