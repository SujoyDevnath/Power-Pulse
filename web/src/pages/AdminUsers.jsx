import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Users, Shield, Wrench, RefreshCw, Edit2, Check } from 'lucide-react';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [editReliability, setEditReliability] = useState(0.5);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUserId(user.user_id);
    setEditRole(user.role);
    setEditReliability(user.reliability_score);
  };

  const saveEdit = async (userId) => {
    try {
      await api.patch(`/admin/users/${userId}`, {
        role: editRole,
        reliability_score: editReliability
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update user');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">User & Technician Directory</h2>
          <p className="text-xs text-slate-500 mt-1">Manage user accounts, roles (RBAC), and reporter reliability scores</p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Name & Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Reliability Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => {
                const isEditing = editingUserId === u.user_id;

                return (
                  <tr key={u.user_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      #{u.user_id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      {u.phone || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 font-medium">
                      {u.area ? `${u.area} (${u.zone})` : 'Unassigned'}
                    </td>
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="p-1 border border-slate-300 rounded text-xs"
                        >
                          <option value="consumer">Consumer</option>
                          <option value="technician">Technician</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          u.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : u.role === 'technician'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.05"
                          min="0.05"
                          max="1.00"
                          value={editReliability}
                          onChange={(e) => setEditReliability(e.target.value)}
                          className="w-16 p-1 border border-slate-300 rounded text-xs font-mono"
                        />
                      ) : (
                        <span className="font-mono font-bold text-slate-900">
                          {u.reliability_score}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <button
                          onClick={() => saveEdit(u.user_id)}
                          className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition"
                          title="Save Changes"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(u)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                          title="Edit User"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
