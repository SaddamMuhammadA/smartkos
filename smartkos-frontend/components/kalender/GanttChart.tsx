'use client';
import GanttChartDesktop from './GanttChartDesktop';
import GanttChartMobile from './GanttChartMobile';

export default function GanttChart() {
  return (
    <div className="w-full">
      {/* Versi Desktop */}
      <div className="hidden md:block">
        <GanttChartDesktop />
      </div>

      {/* Versi Mobile */}
      <div className="block md:hidden">
        <GanttChartMobile />
      </div>
    </div>
  );
}
