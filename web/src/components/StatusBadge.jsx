import React from 'react';

export const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();

  const styles = {
    open: 'bg-red-50 text-red-700 border-red-200',
    active: 'bg-red-50 text-red-700 border-red-200',
    restored: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dismissed: 'bg-slate-100 text-slate-600 border-slate-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    assigned: 'bg-blue-50 text-blue-700 border-blue-200',
    investigating: 'bg-purple-50 text-purple-700 border-purple-200',
    repairing: 'bg-orange-50 text-orange-700 border-orange-200',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    busy: 'bg-amber-50 text-amber-700 border-amber-200',
    off: 'bg-slate-100 text-slate-500 border-slate-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    unpaid: 'bg-red-50 text-red-700 border-red-200',
  };

  const currentStyle = styles[s] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider ${currentStyle}`}>
      {status}
    </span>
  );
};
