// components/Kamar/KamarTable.js
import { useState } from 'react';
import { useKamar } from '@/hooks/useKamar';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

export const KamarTable = ({ id_kos }) => {
  const [page, setPage] = useState(1);
  const { useGetKamarByKos } = useKamar();
  const { data, isLoading } = useGetKamarByKos(id_kos, { page });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Tersedia': return 'bg-green-100 text-green-800';
      case 'Terisi': return 'bg-red-100 text-red-800';
      case 'Perawatan': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode Kamar</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipe Kamar</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catatan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.data?.map((kamar) => (
            <tr key={kamar.id_kamar}>
              <td className="px-6 py-4 whitespace-nowrap">{kamar.kode_kamar}</td>
              <td className="px-6 py-4 whitespace-nowrap">{kamar.jenis_kamar?.nama_jenis_kamar}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(kamar.status_kamar)}`}>
                  {kamar.status_kamar}
                </span>
              </td>
              <td className="px-6 py-4">{kamar.catatan || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-900">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};