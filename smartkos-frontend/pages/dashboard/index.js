// pages/dashboard/index.js
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { RecentBookings } from '@/components/Dashboard/RecentBookings';
import { OccupancyChart } from '@/components/Dashboard/OccupancyChart';
import { BuildingOfficeIcon, HomeIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useDashboardStats } from '@/hooks/useDashboard';

export default function DashboardPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('month');

  const { data: stats, isLoading } = useDashboardStats(timeRange);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat Datang, {user?.name} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Kos"
            value={stats?.total_kos || 0}
            icon={BuildingOfficeIcon}
            color="blue"
          />
          <StatsCard
            title="Kamar Tersedia"
            value={stats?.available_rooms || 0}
            icon={HomeIcon}
            color="green"
          />
          <StatsCard
            title="Total Penyewa"
            value={stats?.total_customers || 0}
            icon={UserGroupIcon}
            color="purple"
          />
          <StatsCard
            title="Pendapatan Bulan Ini"
            value={`Rp ${stats?.monthly_revenue?.toLocaleString('id-ID') || 0}`}
            icon={CurrencyDollarIcon}
            color="orange"
          />
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Statistik</h2>
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm rounded ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === 'week' ? 'Minggu' : range === 'month' ? 'Bulan' : 'Tahun'}
                </button>
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-gray-900 mb-4">Tingkat Okupansi</h3>
              <OccupancyChart data={stats?.occupancy_data || []} />
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-gray-900 mb-4">Pendapatan</h3>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Chart pendapatan akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Penyewaan Terbaru</h2>
          </div>
          <RecentBookings bookings={stats?.recent_bookings || []} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/kos/create')}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">➕</div>
                <p className="font-medium">Tambah Kos Baru</p>
              </div>
            </button>
            <button
              onClick={() => router.push('/jadwal/create')}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📅</div>
                <p className="font-medium">Buat Jadwal Sewa</p>
              </div>
            </button>
            <button
              onClick={() => router.push('/laporan')}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <p className="font-medium">Lihat Laporan</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}