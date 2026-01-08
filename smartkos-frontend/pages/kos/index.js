// pages/kos/index.js
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { useKos } from '@/hooks/useKos';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

export default function KosListPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const { useGetAllKos, useDeleteKos } = useKos();
  const { data: kosData, isLoading, refetch } = useGetAllKos({
    page,
    search,
    per_page: 10
  });
  
  const deleteMutation = useDeleteKos();

  const handleDelete = async (id, nama) => {
    const result = await Swal.fire({
      title: 'Hapus Kos?',
      text: `Apakah Anda yakin ingin menghapus ${nama}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(id);
        Swal.fire('Terhapus!', 'Kos berhasil dihapus.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error!', 'Gagal menghapus kos.', 'error');
      }
    }
  };

  const getJenisKosColor = (jenis) => {
    switch (jenis) {
      case 'Putra': return 'bg-blue-100 text-blue-800';
      case 'Putri': return 'bg-pink-100 text-pink-800';
      case 'Campur': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daftar Kos</h1>
            <p className="text-gray-600">Kelola semua kos yang terdaftar</p>
          </div>
          <button
            onClick={() => router.push('/kos/create')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Kos
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama kos atau alamat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">Semua Jenis</option>
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Campur">Campur</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option value="">Urutkan</option>
                <option value="nama">Nama A-Z</option>
                <option value="terbaru">Terbaru</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kos List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Kos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Kamar</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kosData?.data?.map((kos) => (
                      <tr key={kos.id_kos} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{kos.nama_kos}</div>
                          <div className="text-sm text-gray-500">ID: {kos.id_kos}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate">{kos.alamat_kos}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getJenisKosColor(kos.jenis_kos)}`}>
                            {kos.jenis_kos}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{kos.total_kamar || 0}</div>
                          <div className="text-sm text-gray-500">
                            {kos.kamar_tersedia || 0} tersedia
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => router.push(`/kos/${kos.id_kos}`)}
                              className="p-1 text-blue-600 hover:text-blue-900"
                              title="Detail"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => router.push(`/kos/${kos.id_kos}/edit`)}
                              className="p-1 text-yellow-600 hover:text-yellow-900"
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(kos.id_kos, kos.nama_kos)}
                              className="p-1 text-red-600 hover:text-red-900"
                              title="Hapus"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {kosData?.meta && (
                <div className="px-6 py-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Menampilkan <span className="font-medium">{kosData.meta.from}</span> sampai{' '}
                      <span className="font-medium">{kosData.meta.to}</span> dari{' '}
                      <span className="font-medium">{kosData.meta.total}</span> hasil
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={!kosData.links.prev}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {[...Array(kosData.meta.last_page)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPage(i + 1)}
                          className={`px-3 py-1 border rounded ${
                            page === i + 1
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={!kosData.links.next}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && (!kosData?.data || kosData.data.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BuildingOfficeIcon className="h-24 w-24 mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada kos terdaftar
            </h3>
            <p className="text-gray-500 mb-4">
              Mulai dengan menambahkan kos pertama Anda
            </p>
            <button
              onClick={() => router.push('/kos/create')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Tambah Kos Pertama
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}