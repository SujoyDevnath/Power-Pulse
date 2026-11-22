import React from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, ShieldAlert } from 'lucide-react';

export const ConfidenceBadge = ({ score, classification }) => {
  const normalizedClass = (classification || 'low').toLowerCase();

  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';
  let Icon = HelpCircle;
  let label = 'Low Confidence';

  if (normalizedClass === 'confirmed' || score >= 90) {
    badgeStyle = 'bg-red-50 text-red-700 border-red-300 ring-1 ring-red-400/30';
    Icon = ShieldAlert;
    label = 'Confirmed Outage';
  } else if (normalizedClass === 'probable' || score >= 70) {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-300';
    Icon = AlertTriangle;
    label = 'Probable Outage';
  } else if (normalizedClass === 'possible' || score >= 40) {
    badgeStyle = 'bg-yellow-50 text-yellow-800 border-yellow-300';
    Icon = AlertTriangle;
    label = 'Possible Outage';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label} ({score}%)</span>
    </span>
  );
};
