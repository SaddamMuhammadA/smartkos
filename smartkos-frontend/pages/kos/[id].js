// pages/kos/[id].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { useKos } from '@/hooks/useKos';
import { useKamar } from '@/hooks/useKamar';
import { Tabs } from '@/components/Common/Tabs';
import { KamarTable } from '@/components/Kamar/KamarTable';
import { PricingTable } from '@/components/Kamar/PricingTable';
import { ParkingTable } from '@/components/Kamar/ParkingTable';
import { BuildingOfficeIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function KosDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('overview');

  const { useGetKos } = useKos();
  const { useGetKamarByKos } = useKamar();

  const { data: kos, isLoading: kosLoading } = useGetKos(id);
  const { data: kamarData, isLoading: kamarLoading } = useGetKamarByKos(id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'kamar', label: 'Kamar' },
    { id: 'harga', label: 'Harga' },
    { id: 'parkir', label: 'Parkir' },
    { id: 'penyewa', label: 'Penyewa' },
  ];

  if (kosLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!kos) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kos tidak ditemukan</h2>
          <button
            onClick={() => router.push('/kos')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Daftar Kos
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{kos.nama_kos}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPinIcon className="h-5 w-5 mr-1" />
              <span>{kos.alamat_kos}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => router.push(`/kos/${id}/edit`)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => router.push(`/jadwal/create?kos=${id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Buat Penyewaan
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Jenis Kos</p>
                <p className="text-lg font-semibold">{kos.jenis_kos}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">{kamarData?.total || 0}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Kamar</p>
                <p className="text-lg font-semibold">
                  {kamarData?.tersedia || 0} tersedia
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Penyewa Aktif</p>
                <p className="text-lg font-semibold">{kos.penyewa_aktif || 0} orang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Informasi Umum</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Kos</label>
                      <p className="mt-1">{kos.nama_kos}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Jenis Kos</label>
                      <p className="mt-1">{kos.jenis_kos}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                      <p className="mt-1">{kos.alamat_kos}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Statistik Kamar</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{kamarData?.total || 0}</p>
                      <p className="text-sm text-gray-600">Total Kamar</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{kamarData?.tersedia || 0}</p>
                      <p className="text-sm text-gray-600">Tersedia</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{kamarData?.terisi || 0}</p>
                      <p className="text-sm text-gray-600">Terisi</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{kamarData?.perawatan || 0}</p>
                      <p className="text-sm text-gray-600">Perawatan</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'kamar' && (
              <KamarTable id_kos={id} />
            )}

            {activeTab === 'harga' && (
              <PricingTable id_kos={id} />
            )}

            {activeTab === 'parkir' && (
              <ParkingTable id_kos={id} />
            )}

            {activeTab === 'penyewa' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Daftar Penyewa Aktif</h3>
                <p className="text-gray-500">Fitur ini sedang dalam pengembangan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}