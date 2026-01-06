'use client';

import { useState } from 'react';
import { Plus, Trash2, RefreshCcw, Pencil } from 'lucide-react';
import UserModal, { UserFormData } from './UserModal';

/* ===== TYPE ===== */
interface User extends UserFormData {
  id: number;
  status: 'Active' | 'Invited';
}

/* ===== SIMULASI LOGIN ===== */
const currentUser = {
  id: 99,
  role: 'MasterAdmin' as 'MasterAdmin' | 'SuperAdmin' | 'Admin',
};

/* ===== DUMMY DATA ===== */
const dummyUsers: User[] = [
  {
    id: 1,
    name: 'Master Admin',
    email: 'master@smartkos.id',
    role: 'MasterAdmin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Super Admin',
    email: 'super@smartkos.id',
    role: 'SuperAdmin',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Admin Kos',
    email: 'admin@smartkos.id',
    role: 'Admin',
    status: 'Invited',
  },
];

export default function ManajemenPenggunaPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const isMasterAdmin = currentUser.role === 'MasterAdmin';

  const handleSave = (data: UserFormData) => {
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editUser.id ? { ...u, ...data } : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          status: 'Invited',
        },
      ]);
    }

    setEditUser(null);
    setShowModal(false);
  };

  const handleDelete = (user: User) => {
    if (confirm(`Hapus pengguna ${user.email}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Manajemen Pengguna
          </h1>
          <p className="text-sm text-gray-500">
            Kelola Admin & SuperAdmin SmartKos
          </p>
        </div>

        {isMasterAdmin && (
          <button
            onClick={() => {
              setEditUser(null);
              setShowModal(true);
            }}
            className="
              flex items-center justify-center gap-2
              px-4 py-2 bg-blue-600 text-white
              rounded-lg shadow-sm hover:bg-blue-700
              transition w-full sm:w-auto
            "
          >
            <Plus size={18} />
            Tambah Pengguna
          </button>
        )}
      </div>

      {/* MOBILE CARD */}
      <div className="block md:hidden space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {u.role}
              </span>
            </div>

            <div className="mt-2 text-xs">
              Status:{' '}
              <span className="font-medium">{u.status}</span>
            </div>

            {isMasterAdmin && u.role !== 'MasterAdmin' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setEditUser(u);
                    setShowModal(true);
                  }}
                  className="flex-1 bg-amber-100 text-amber-700 rounded-lg py-2 text-xs flex items-center justify-center gap-1"
                >
                  <Pencil size={14} /> Edit Role
                </button>

                <button
                  onClick={() => handleDelete(u)}
                  className="flex-1 bg-red-100 text-red-700 rounded-lg py-2 text-xs flex items-center justify-center gap-1"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 text-center">{u.role}</td>
                <td className="px-4 py-3 text-center">{u.status}</td>
                <td className="px-4 py-3 text-center">
                  {isMasterAdmin && u.role !== 'MasterAdmin' && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditUser(u);
                          setShowModal(true);
                        }}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditUser(null);
        }}
        onSave={handleSave}
        defaultValue={editUser}
        isEdit={!!editUser}
      />
    </div>
  );
}
