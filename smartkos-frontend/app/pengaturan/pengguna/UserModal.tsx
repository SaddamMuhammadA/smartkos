'use client';

import { useEffect, useState } from 'react';

/* ===== EXPORT INTERFACE ===== */
export interface UserFormData {
  name: string;
  email: string;
  role: 'Admin' | 'SuperAdmin';
}

interface Props {
  show: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
  editingData?: Partial<UserFormData> | null;
}

export default function UserModal({
  show,
  onClose,
  onSave,
  editingData,
}: Props) {
  const [form, setForm] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'Admin',
  });

  useEffect(() => {
    if (editingData) {
      setForm({
        name: editingData.name || '',
        email: editingData.email || '',
        role: editingData.role || 'Admin',
      });
    }
  }, [editingData]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5">
        <h2 className="text-lg font-semibold mb-1">
          {editingData ? 'Edit Pengguna' : 'Tambah Pengguna'}
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Password akan dikirim melalui email kepada pengguna
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value as 'Admin' | 'SuperAdmin',
                })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
            >
              Simpan & Kirim Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
