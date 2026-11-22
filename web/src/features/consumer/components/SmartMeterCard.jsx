import React from 'react';
import { CreditCard } from 'lucide-react';
import { StatusBadge } from '../../../components/StatusBadge';

/**
 * 📟 Feature: Smart Meter & Electricity Bill Module
 * ----------------------------------------------------
 * What this does:
 * 1. Simulates an IoT Smart Meter reading energy consumption in kWh.
 * 2. Displays the citizen's current electricity bill amount (in BDT).
 * 3. Shows if the bill is Paid or Unpaid.
 * 4. Lets the user click "PAY BILL" to test mobile banking payment.
 *
 * Analogy for beginners:
 * Think of this as the "Odometer in a Car". It counts every unit of electricity
 * used by lights, fans, and computers, and calculates the pocket money needed to pay!
 */
export const SmartMeterCard = ({
  bill,
  paymentResult,
  onOpenPaymentModal
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-sky-600" />
            <span>Smart Meter & Electricity Bill (Simulation Module)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Track real-time energy consumption and test simulated utility payments
          </p>
        </div>
        {bill && <StatusBadge status={bill.status} />}
      </div>

      {/* Metric Counters: Consumption, Daily Average, Bill Amount */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">
            Current Consumption
          </span>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {bill?.consumption_kwh || 143.2}{' '}
            <span className="text-xs font-normal text-slate-500">kWh</span>
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">
            Daily Average
          </span>
          <p className="text-xl font-bold text-slate-900 mt-1">
            4.8 <span className="text-xs font-normal text-slate-500">kWh/day</span>
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-semibold uppercase">
            Current Bill Amount
          </span>
          <p className="text-xl font-bold text-sky-600 mt-1">
            Tk {bill?.amount || '1,280'}
          </p>
        </div>
      </div>

      {/* Success banner if just paid */}
      {paymentResult && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          <p className="font-bold">Payment Successful ✓</p>
          <p className="mt-0.5 font-mono">
            Transaction ID: {paymentResult.transaction_id} • Status: PAID
          </p>
        </div>
      )}

      {/* Pay Bill button or Paid Confirmation */}
      {bill?.status === 'unpaid' ? (
        <button
          onClick={onOpenPaymentModal}
          className="w-full py-3 rounded-2xl bg-[#E2136E] hover:bg-[#c90f61] text-white font-bold text-sm shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Pay Bill via bKash (৳ {bill.amount})</span>
        </button>
      ) : (
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-800 space-y-1">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Bill Paid via bKash</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              CONFIRMED
            </span>
          </div>
          {bill?.transaction_id && (
            <p className="font-mono text-[11px] text-emerald-900 pt-1">
              bKash TrxID: <strong>{bill.transaction_id}</strong>
            </p>
          )}
          {bill?.paid_at && (
            <p className="text-[10px] text-emerald-600">
              Payment Confirmed: {new Date(bill.paid_at).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
