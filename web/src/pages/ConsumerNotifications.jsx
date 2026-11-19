import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Bell, Check, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ConsumerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notifications');
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => n.notification_id === id ? { ...n, is_read: 1 } : n)
      );
    } catch (err) {
      console.error('Error marking read:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System & In-App Notifications</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time alerts regarding community grid disruptions and ticket updates</p>
        </div>
        <button
          onClick={fetchNotifications}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
          <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">No Notifications Yet</h3>
          <p className="text-xs text-slate-400 mt-1">You will receive notifications when outages or repair updates occur in your area.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.notification_id}
              className={`p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${
                n.is_read
                  ? 'bg-white border-slate-200/80 text-slate-600'
                  : 'bg-sky-50/60 border-sky-200 text-slate-900 ring-1 ring-sky-300/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${
                  n.is_read ? 'bg-slate-100 text-slate-500' : 'bg-sky-500 text-white shadow-sm'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                  <span className="block text-[11px] text-slate-400 mt-2 font-mono">
                    {new Date(n.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {!n.is_read && (
                <button
                  onClick={() => markAsRead(n.notification_id)}
                  className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-100 transition shrink-0"
                  title="Mark as Read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
