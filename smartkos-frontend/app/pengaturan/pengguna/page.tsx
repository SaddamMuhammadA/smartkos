'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Mail } from 'lucide-react';
import UserModal, { UserFormData } from './UserModal';

/* ===== TYPE ===== */
interface User extends UserFormData {
  id: number;
}

/* ===== SIMULASI USER LOGIN ===== */
const currentUser = {
  id: 1,
  role: 'SuperAdmin' as 'SuperAdmin' | 'Admin',
};

/* ===== DUMMY DATA ===== */
const dummyUsers: User[] = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'superadmin@smartkos.id',
    role: 'SuperAdmin',
  },
  {
    id: 2,
    name: 'Admin Kos',
    email: 'admin@smartkos.id',
    role: 'Admin',
  },
];

export default function ManajemenPenggunaPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  /* ===== HELPER ===== */
  const isSelfSuperAdmin = (u: User) =>
    currentUser.role === 'SuperAdmin' &&
    u.role === 'SuperAdmin' &&
    u.id === currentUser.id;

  /* ===== ACTION ===== */
  const handleSave = (data: UserFormData) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...data } : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
        },
      ]);
    }

    setShowModal(false);
    setEditingUser(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Hapus pengguna ini?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Manajemen Pengguna
          </h1>
          <p className="text-sm text-gray-500">
            Kelola akun Admin & SuperAdmin
          </p>
        </div>

        {/* BUTTON (CENTER ON MOBILE) */}
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="
              flex items-center justify-center gap-2
              px-4 py-2
              bg-blue-600 text-white
              rounded-lg
              shadow-sm
              hover:bg-blue-700
              transition-colors
              w-full md:w-auto
            "
          >
            <Plus size={18} />
            <span className="font-medium">Tambah Pengguna</span>
          </button>
        </div>
      </div>

      {/* ===== MOBILE CARD ===== */}
      <div className="block md:hidden space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{u.name}</h3>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  u.role === 'SuperAdmin'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {u.role}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingUser(u);
                  setShowModal(true);
                }}
                className="flex-1 bg-amber-100 text-amber-700 rounded-lg py-2 text-xs flex items-center justify-center gap-1"
              >
                <Edit size={14} /> Edit
              </button>

              <button
                disabled={isSelfSuperAdmin(u)}
                onClick={() => handleDelete(u.id)}
                className={`
                  flex-1 rounded-lg py-2 text-xs flex items-center justify-center gap-1
                  ${
                    isSelfSuperAdmin(u)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }
                `}
              >
                <Trash2 size={14} /> Hapus
              </button>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
              <Mail size={12} />
              Password dikirim via email
            </div>
          </div>
        ))}
      </div>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      u.role === 'SuperAdmin'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setEditingUser(u);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      disabled={isSelfSuperAdmin(u)}
                      onClick={() => handleDelete(u.id)}
                      className={`
                        px-3 py-1 rounded-md
                        ${
                          isSelfSuperAdmin(u)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }
                      `}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      <UserModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSave={handleSave}
        editingData={editingUser}
      />
    </div>
  );
}
