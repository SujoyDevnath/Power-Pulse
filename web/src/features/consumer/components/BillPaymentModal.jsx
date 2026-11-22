import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Zap, Copy, Check, Sparkles, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * 💳 Feature: bKash Manual / TrxID Bill Payment Modal
 * ----------------------------------------------------
 * Allows citizens to pay utility bills by transferring to the official
 * bKash merchant account and submitting their bKash Transaction ID (TrxID).
 */
export const BillPaymentModal = ({
  bill,
  paying,
  onPay,
  onClose
}) => {
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const BKASH_MERCHANT_NUMBER = '01712-345678';

  // Lock body scroll and handle Escape key while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const copyMerchantNumber = () => {
    navigator.clipboard.writeText('01712345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoFillDemo = () => {
    // Generates realistic bKash TrxID (e.g. BK8J92Q4LP)
    const randomChars = Math.random().toString(36).substring(2, 10).toUpperCase();
    const demoTrx = `BK${randomChars}`;
    setTransactionId(demoTrx);
    if (!senderPhone) {
      setSenderPhone('01712998877');
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanTrx = transactionId.trim().toUpperCase();
    if (!cleanTrx) {
      setError('Please enter your bKash Transaction ID (TrxID).');
      return;
    }

    if (cleanTrx.length < 6) {
      setError('Transaction ID must be at least 6 alphanumeric characters.');
      return;
    }

    onPay({
      transaction_id: cleanTrx,
      sender_phone: senderPhone.trim() || null
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden text-xs">
        {/* bKash Signature Header */}
        <div className="bg-[#E2136E] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 shadow-xs">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight">bKash</span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Bill Pay</span>
              </div>
              <p className="text-[11px] text-pink-100 font-medium">PowerPulse Grid Utility Billing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-sm font-bold p-1 rounded-lg hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Bill Overview Card */}
          <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider block">Total Payable Amount</span>
              <span className="text-xl font-extrabold text-slate-900">৳ {bill?.amount || '1,280'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-medium block">Consumption</span>
              <span className="font-bold text-slate-700">{bill?.consumption_kwh || '143.2'} kWh</span>
            </div>
          </div>

          {/* Payment Instructions & Merchant Details */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Official bKash Account
              </span>
              <button
                type="button"
                onClick={copyMerchantNumber}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-600 hover:text-pink-700"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Number'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-sm font-bold text-slate-900">
              <span>{BKASH_MERCHANT_NUMBER}</span>
              <span className="text-[10px] font-sans font-semibold text-slate-400 uppercase">Merchant</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              1. Open bKash app → <strong>Send Money</strong> or <strong>Make Payment</strong> to the number above.<br />
              2. Use Reference: <strong className="font-mono text-slate-800">PP{bill?.bill_id || '1'}</strong>.<br />
              3. Enter your bKash Mobile No. and received <strong>Transaction ID (TrxID)</strong> below.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium">
              {error}
            </div>
          )}

          {/* Input Fields */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-1">
                Your bKash Mobile Number (Optional)
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="e.g. 017XXXXXXXX"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  bKash Transaction ID (TrxID) *
                </label>
                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-700 transition"
                  title="Generate a realistic demo TrxID for instant testing"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-Fill Demo TrxID</span>
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="e.g. BKG89X12KL"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold tracking-widest text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Found in your bKash payment confirmation SMS or statement.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={paying}
              className="w-full py-3 rounded-xl bg-[#E2136E] hover:bg-[#c90f61] text-white font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {paying ? (
                <span>Verifying bKash Transaction...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Confirm Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={paying}
              className="w-full py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
