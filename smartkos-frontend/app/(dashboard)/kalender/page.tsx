'use client';
import GanttChart from '@/components/kalender/GanttChart';

export default function KalenderPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Jadwal Kamar</h1>
      <GanttChart />
    </div>
  );
}