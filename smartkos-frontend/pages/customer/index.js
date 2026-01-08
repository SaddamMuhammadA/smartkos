// pages/customer/index.js
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { useCustomer } from '@/hooks/useCustomer';
import { useRouter } from 'next/router';
import { PlusIcon, MagnifyingGlassIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';

export default function CustomerListPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const { useGetAllCustomers } = useCustomer();
  const { data, isLoading } = useGetAllCustomers({
    page,
    search,
    per_page: 12
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Penyewa</h1>
            <p className="text-gray-600">Kelola data penyewa kos</p>
          </div>
          <button
            onClick={() => router.push('/customer/create')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Penyewa
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau nomor telepon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Customer Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data?.map((customer) => (
                <div
                  key={customer.id_customer}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/customer/${customer.id_customer}`)}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{customer.nama_customer}</h3>
                        <div className="flex items-center mt-1 text-gray-600">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm">{customer.no_telp || 'Belum ada nomor'}</span>
                        </div>
                        <div className="mt-3">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            {customer.total_sewa || 0}x sewa
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        Terdaftar: {new Date(customer.created_at).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data?.meta && (
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Menampilkan {data.meta.from} - {data.meta.to} dari {data.meta.total} penyewa
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={!data.links.prev}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Sebelumnya
                    </button>
                    <span className="px-3 py-1 border rounded bg-blue-50 text-blue-600">
                      {page}
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={!data.links.next}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {(!data?.data || data.data.length === 0) && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="text-gray-400 mb-4">
                  <UserIcon className="h-24 w-24 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Belum ada penyewa terdaftar
                </h3>
                <p className="text-gray-500 mb-4">
                  Tambahkan penyewa pertama Anda
                </p>
                <button
                  onClick={() => router.push('/customer/create')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Tambah Penyewa
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}