import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Zap, ZapOff, CheckCircle2, AlertTriangle, 
  MessageSquarePlus, LogOut, Clock, MapPin, 
  CreditCard, Send, RefreshCw, ShieldCheck 
} from 'lucide-react';

export const ConsumerPortal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeOutage, setActiveOutage] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);
  const [plannedOutages, setPlannedOutages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reporting, setReporting] = useState(false);
  const [reportResult, setReportResult] = useState(null);

  // Complaint Form State
  const [category, setCategory] = useState('power_outage');
  const [description, setDescription] = useState('');
  const [complaintSubmitting, setComplaintSubmitting] = useState(false);
  const [complaintMessage, setComplaintMessage] = useState('');

  // Smart Meter & Demo Bill State
  const [bill, setBill] = useState(null);
  const [meterUsage, setMeterUsage] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('bKash (Demo)');
  const [paying, setPaying] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fetchConsumerData = async () => {
    try {
      setLoading(true);
      const [incidentRes, complaintRes, plannedRes, billRes, meterRes] = await Promise.all([
        api.get(`/incidents/active?location_id=${user?.location_id || 1}`),
        api.get('/complaints/mine'),
        api.get(`/planned?location_id=${user?.location_id || 1}`),
        api.get('/bills/current'),
        api.get('/meter/usage')
      ]);

      const active = incidentRes.data.incidents?.[0] || null;
      setActiveOutage(active);
      setMyComplaints(complaintRes.data.complaints || []);
      setPlannedOutages(plannedRes.data.planned || []);
      setBill(billRes.data.bill || null);
      setMeterUsage(meterRes.data || null);
    } catch (err) {
      console.error('Error fetching consumer data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayBill = async () => {
    if (!bill) return;
    try {
      setPaying(true);
      const res = await api.post(`/bills/${bill.bill_id}/pay`, {
        payment_method: selectedMethod
      });
      setPaymentResult(res.data);
      setShowPaymentModal(false);
      fetchConsumerData();
    } catch (err) {
      alert(err.response?.data?.error || 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  useEffect(() => {
    fetchConsumerData();
  }, []);

  const handleReport = async (type) => {
    try {
      setReporting(true);
      setReportResult(null);

      const res = await api.post('/reports', {
        type,
        location_id: user?.location_id || 1
      });

      setReportResult({
        type,
        message: res.data.message,
        isDuplicate: res.data.isDuplicate,
        isSpam: res.data.isSpam,
        evaluation: res.data.evaluation
      });

      fetchConsumerData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit report');
    } finally {
      setReporting(false);
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      setComplaintSubmitting(true);
      await api.post('/complaints', {
        category,
        description,
        incident_id: activeOutage?.incident_id || null
      });

      setComplaintMessage('Complaint filed successfully. A field technician will be assigned.');
      setDescription('');
      fetchConsumerData();
      setTimeout(() => setComplaintMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit complaint');
    } finally {
      setComplaintSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/20 text-sky-600 rounded-xl">
              <Zap className="w-5 h-5 fill-sky-500" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-slate-900 tracking-tight">PowerPulse Consumer Portal</h1>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-600" />
                <span>{user?.area || 'Dhaka Area'} • {user?.district || 'Dhaka'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
              Reliability: {user?.reliability_score}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Outage Status Card */}
        <div className={`rounded-2xl p-6 border shadow-sm transition ${
          activeOutage
            ? 'bg-red-50/70 border-red-200'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-2xl ${
                activeOutage ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {activeOutage ? <ZapOff className="w-7 h-7" /> : <Zap className="w-7 h-7 fill-white" />}
              </div>
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                  activeOutage ? 'text-red-700' : 'text-emerald-700'
                }`}>
                  Current Area Grid Status
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeOutage ? 'Electricity Outage Detected in Your Area' : 'Power Grid Active & Online'}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {activeOutage
                    ? `Incident #${activeOutage.incident_id} detected with ${activeOutage.total_reports} corroborating reports.`
                    : 'No grid disruptions reported in your neighborhood.'}
                </p>
              </div>
            </div>

            {activeOutage && (
              <ConfidenceBadge
                score={activeOutage.confidence_score}
                classification={activeOutage.classification}
              />
            )}
          </div>

          {/* Large Action Reporting Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleReport('OFF')}
              disabled={reporting}
              className="py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-base shadow-lg shadow-red-500/20 flex items-center justify-center gap-3 transition transform active:scale-98 disabled:opacity-50"
            >
              <ZapOff className="w-6 h-6" />
              <span>Report Electricity OFF</span>
            </button>

            <button
              onClick={() => handleReport('BACK')}
              disabled={reporting}
              className="py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 transition transform active:scale-98 disabled:opacity-50"
            >
              <Zap className="w-6 h-6 fill-white" />
              <span>Report Electricity BACK</span>
            </button>
          </div>
        </div>

        {/* Real-time Reporting Feedback Alert */}
        {reportResult && (
          <div className={`p-4 rounded-2xl border text-xs animate-fadeIn ${
            reportResult.isSpam 
              ? 'bg-rose-50 border-rose-300 text-rose-800'
              : reportResult.isDuplicate
              ? 'bg-amber-50 border-amber-300 text-amber-800'
              : 'bg-sky-50 border-sky-300 text-sky-800'
          }`}>
            <p className="font-bold text-sm">Signal Processed: {reportResult.message}</p>
            {reportResult.isDuplicate && <p className="mt-1">Duplicate note: You previously reported within 10 minutes.</p>}
            {reportResult.isSpam && <p className="mt-1">Spam note: Too many rapid reports; reliability penalized.</p>}
            {reportResult.evaluation && (
              <p className="mt-1 font-semibold">
                Updated Area Confidence: {reportResult.evaluation.score}% ({reportResult.evaluation.classification.toUpperCase()})
              </p>
            )}
          </div>
        )}

        {/* Two-Column Grid: File Complaint & Scheduled Outages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File a Complaint */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-sky-600" />
              <span>Submit Electrical Complaint</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">File low voltage, transformer sparks, or damaged wiring issues</p>

            {complaintMessage && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                {complaintMessage}
              </div>
            )}

            <form onSubmit={handleComplaintSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Issue Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                >
                  <option value="power_outage">Power Outage</option>
                  <option value="low_voltage">Low Voltage</option>
                  <option value="transformer">Transformer Sparks / Smoke</option>
                  <option value="damaged_wire">Damaged / Hanging Cable</option>
                  <option value="pole">Electric Pole Damaged</option>
                  <option value="other">Other Concern</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Landmark *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Near House 12, Road 4. The pole transformer is emitting sparks."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                disabled={complaintSubmitting}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
              >
                {complaintSubmitting ? 'Submitting...' : 'File Ticket'}
              </button>
            </form>
          </div>

          {/* Planned Outages */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Upcoming Scheduled Load-Shedding</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Official maintenance windows announced by utility administration</p>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-64">
              {plannedOutages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-xs text-slate-400 italic">
                  No upcoming maintenance scheduled for your zone.
                </div>
              ) : (
                plannedOutages.map((p) => (
                  <div key={p.planned_id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{p.outage_date}</span>
                      <span className="text-sky-700 font-mono">{p.start_time} - {p.end_time}</span>
                    </div>
                    <p className="text-slate-600 mt-1">{p.reason}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* My Filed Complaints History */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3">My Complaint Tracking History</h3>
          {myComplaints.length === 0 ? (
            <p className="text-xs text-slate-400">You have not submitted any complaints yet.</p>
          ) : (
            <div className="space-y-3">
              {myComplaints.map((c) => (
                <div key={c.complaint_id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span>#CMP-{c.complaint_id}</span>
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-800">
                        {c.category.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">{c.description}</p>
                    {c.technician_name && (
                      <p className="text-[11px] text-sky-700 mt-1">
                        Assigned Tech: <strong>{c.technician_name}</strong> ({c.technician_phone})
                      </p>
                    )}
                    {c.tech_remarks && (
                      <p className="text-[11px] text-slate-500 italic mt-0.5">Note: "{c.tech_remarks}"</p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Smart Meter Simulation & Demo Bill Payment (Source Proposal Sec 2.1 & Page 13) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>Smart Meter & Electricity Bill (Simulation Module)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Track real-time energy consumption and test simulated utility payments</p>
            </div>
            {bill && <StatusBadge status={bill.status} />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Current Consumption</span>
              <p className="text-xl font-bold text-slate-900 mt-1">{bill?.consumption_kwh || 143.2} <span className="text-xs font-normal text-slate-500">kWh</span></p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Daily Average</span>
              <p className="text-xl font-bold text-slate-900 mt-1">4.8 <span className="text-xs font-normal text-slate-500">kWh/day</span></p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-500 font-semibold uppercase">Current Bill Amount</span>
              <p className="text-xl font-bold text-sky-600 mt-1">Tk {bill?.amount || '1,280'}</p>
            </div>
          </div>

          {paymentResult && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
              <p className="font-bold">Payment Successful ✓</p>
              <p className="mt-0.5 font-mono">Transaction ID: {paymentResult.transaction_id} • Status: PAID</p>
            </div>
          )}

          {bill?.status === 'unpaid' ? (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition"
            >
              PAY BILL (Tk {bill.amount})
            </button>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-600 font-medium">
              All outstanding electricity bills for this billing cycle are paid.
            </div>
          )}
        </div>

        {/* Demo Bill Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-xs">
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 fill-sky-600" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Electricity Bill Payment</h4>
                <p className="text-slate-500 text-[11px] mt-0.5">Consumption: {bill?.consumption_kwh} kWh • Amount: Tk {bill?.amount}</p>
              </div>

              <div className="my-4">
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Payment Method (Demo)
                </label>
                <div className="space-y-2">
                  {['bKash (Demo)', 'Nagad (Demo)', 'Card (Demo)'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        selectedMethod === method
                          ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymethod"
                          value={method}
                          checked={selectedMethod === method}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="text-sky-600"
                        />
                        <span className="font-semibold text-slate-900">{method}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={paying}
                  onClick={handlePayBill}
                  className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition disabled:opacity-50"
                >
                  {paying ? 'Processing Simulated Transaction...' : 'CONFIRM PAYMENT'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
