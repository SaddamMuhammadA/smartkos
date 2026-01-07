// app/(dashboard)/layout.tsx
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8fafc]">
          {children}
        </main>
      </div>
    </div>
  );
}