import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { saveReportOffline, generateUUID } from '../services/offlineQueue';
import { checkRealInternet } from '../services/connectivity';
import { getAutoGpsLocation, triggerAppNotification } from '../services/mobileFeatures';
import {
  OutageReportingCard,
  ComplaintFilingCard,
  PlannedOutagesCard,
  ComplaintHistoryCard,
  SmartMeterCard,
  BillPaymentModal
} from '../features/consumer/components';
import { 
  Zap, 
  MessageSquarePlus, 
  ClipboardList, 
  CreditCard, 
  CalendarClock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/**
 * 🏠 ConsumerPortal Page Orchestrator (Modular Admin-style 4-Menu Architecture)
 * -----------------------------------------------------------------------------
 * Organizes the citizen experience into 4 dedicated, clutter-free modules:
 * 1. ⚡ Outage & Grid Center (Power OFF / Power Back with Auto-GPS & Scheduled Load-Shedding)
 * 2. 📝 File Complaint (Hazard Photo Proof with Camera, Description, Category)
 * 3. 📋 Track Complaints (Live ticket tracking, status badges, assigned tech)
 * 4. 💳 Smart Meter & Bills (Live IoT usage, bKash/Nagad mock payment)
 */
export const ConsumerPortal = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Menu: 'outage', 'complaint', 'tracking', 'billing'
  const currentTab = searchParams.get('tab') || 'outage';
  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab') || 'outage';
    setActiveTab(tabFromUrl);
  }, [searchParams]);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- State: Live Outage, Complaints, Maintenance Schedules ---
  const [activeOutage, setActiveOutage] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);
  const [plannedOutages, setPlannedOutages] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- State: Reporting Action & Real-time Evaluation Result ---
  const [reporting, setReporting] = useState(false);
  const [reportResult, setReportResult] = useState(null);
  const [lastReportType, setLastReportType] = useState(null);

  // --- State: Complaint Submission Form ---
  const [category, setCategory] = useState('power_outage');
  const [description, setDescription] = useState('');
  const [complaintSubmitting, setComplaintSubmitting] = useState(false);
  const [complaintMessage, setComplaintMessage] = useState('');

  // --- State: Smart Meter & Simulated Bill Payment ---
  const [bill, setBill] = useState(null);
  const [meterUsage, setMeterUsage] = useState(null);
  const [paying, setPaying] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  /**
   * Fetch all initial dashboard data in parallel
   */
  const fetchConsumerData = async () => {
    try {
      setLoading(true);
      const [incidentRes, complaintRes, plannedRes, billRes, meterRes, myReportsRes] = await Promise.all([
        api.get(`/incidents/active?location_id=${user?.location_id || 1}`).catch(() => ({ data: { incidents: [] } })),
        api.get('/complaints/mine').catch(() => ({ data: { complaints: [] } })),
        api.get(`/planned?location_id=${user?.location_id || 1}`).catch(() => ({ data: { planned: [] } })),
        api.get('/bills/current').catch(() => ({ data: { bill: null } })),
        api.get('/meter/usage').catch(() => ({ data: null })),
        api.get('/reports/mine').catch(() => ({ data: { reports: [] } }))
      ]);

      const active = incidentRes.data.incidents?.[0] || null;
      setActiveOutage(active);
      setMyComplaints(complaintRes.data.complaints || []);
      setPlannedOutages(plannedRes.data.planned || []);
      setBill(billRes.data.bill || null);
      setMeterUsage(meterRes.data || null);

      const recentReport = myReportsRes.data?.reports?.[0];
      if (recentReport) {
        setLastReportType(recentReport.type);
      }
    } catch (err) {
      console.error('Error fetching consumer data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsumerData();
  }, [user]);

  /**
   * Handle Power OFF / Power Restored Action with Mobile GPS
   */
  const handleReport = async (type) => {
    try {
      setReporting(true);
      setReportResult(null);

      // Auto-capture GPS coordinates on mobile
      const gps = await getAutoGpsLocation();

      // Check real connectivity
      const online = await checkRealInternet();
      if (!online) {
        saveReportOffline({
          type,
          location_id: user?.location_id || 1,
          latitude: gps?.latitude,
          longitude: gps?.longitude
        });
        setReportResult({
          type,
          message: 'Saved to offline queue. Will auto-sync when network returns.',
          isOffline: true,
          gps,
          queuedAt: new Date().toLocaleTimeString()
        });
        triggerAppNotification('⚡ Offline Outage Saved', 'Report queued locally. Will auto-sync when internet returns.');
        return;
      }

      // Online submission with unique client UUID
      const clientUuid = generateUUID();
      const res = await api.post('/reports', {
        type,
        location_id: user?.location_id || 1,
        client_uuid: clientUuid,
        reported_at: new Date().toISOString(),
        latitude: gps?.latitude,
        longitude: gps?.longitude
      });

      setLastReportType(type);

      setReportResult({
        type,
        message: res.data.message,
        isDuplicate: res.data.isDuplicate,
        isSpam: res.data.isSpam,
        evaluation: res.data.evaluation,
        gps
      });

      triggerAppNotification(
        type === 'OFF' ? '⚠️ Power Failure Reported' : '💡 Power Restored Signal',
        `Status recorded for ${user?.area || 'your area'}. Auto-verifying with community grid.`
      );

      fetchConsumerData();
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        saveReportOffline({
          type,
          location_id: user?.location_id || 1
        });
        setReportResult({
          type,
          message: 'Network dropped during submission. Report saved safely to offline queue.',
          isOffline: true,
          queuedAt: new Date().toLocaleTimeString()
        });
      } else {
        alert(err.response?.data?.error || 'Failed to submit report');
      }
    } finally {
      setReporting(false);
    }
  };

  /**
   * Handle Electrical Hazard Ticket Submission
   */
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
      
      // Auto-redirect to tracking tab to see the new ticket
      setTimeout(() => switchTab('tracking'), 1500);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit complaint');
    } finally {
      setComplaintSubmitting(false);
    }
  };

  /**
   * Handle bKash Utility Bill Payment via TrxID
   */
  const handlePayBill = async ({ transaction_id, sender_phone }) => {
    if (!bill) return;
    try {
      setPaying(true);
      const res = await api.post(`/bills/${bill.bill_id}/pay`, {
        transaction_id,
        sender_phone,
        payment_method: 'bKash'
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

  // Menu Definition
  const menuItems = [
    {
      id: 'outage',
      title: 'Outage Center',
      subtitle: 'Power OFF / BACK & Grid Status',
      icon: Zap,
      badge: activeOutage ? 'Outage Active' : 'Grid Normal',
      badgeColor: activeOutage ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      activeGradient: 'from-sky-600 to-blue-600 text-white'
    },
    {
      id: 'complaint',
      title: 'File Complaint',
      subtitle: 'Photo Proof & Hazard Reports',
      icon: MessageSquarePlus,
      badge: 'Camera Enabled',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      activeGradient: 'from-amber-600 to-orange-600 text-white'
    },
    {
      id: 'tracking',
      title: 'Track Tickets',
      subtitle: 'Live Status & Technician',
      icon: ClipboardList,
      badge: `${myComplaints.length} Tickets`,
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      activeGradient: 'from-indigo-600 to-purple-600 text-white'
    },
    {
      id: 'billing',
      title: 'Smart Meter & Pay',
      subtitle: 'IoT Usage & Instant Top-up',
      icon: CreditCard,
      badge: bill ? `Due: ৳${bill.amount}` : 'Paid',
      badgeColor: bill && bill.status !== 'PAID' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      activeGradient: 'from-emerald-600 to-teal-600 text-white'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16 sm:pb-8">
      
      {/* 🧭 Admin-Style Segmented Navigation Cards (4 Clean Modular Menus) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => switchTab(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group shadow-xs ${
                isActive
                  ? `bg-gradient-to-br ${item.activeGradient} shadow-md border-transparent scale-[1.01]`
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl transition ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isActive ? 'bg-white/25 text-white border-white/30' : item.badgeColor
                }`}>
                  {item.badge}
                </span>
              </div>
              <h3 className={`font-bold text-xs sm:text-sm tracking-tight truncate ${
                isActive ? 'text-white' : 'text-slate-900'
              }`}>
                {item.title}
              </h3>
              <p className={`text-[11px] truncate mt-0.5 ${
                isActive ? 'text-white/80' : 'text-slate-500'
              }`}>
                {item.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OUTAGE & GRID CENTER                              */}
      {/* ======================================================== */}
      {activeTab === 'outage' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Power ON / OFF Reporting Card */}
          <OutageReportingCard
            activeOutage={activeOutage}
            reporting={reporting}
            reportResult={reportResult}
            onReport={handleReport}
            lastReportType={lastReportType}
          />

          {/* Scheduled Load-Shedding & Grid Maintenance */}
          <PlannedOutagesCard plannedOutages={plannedOutages} />

          {/* Quick Action Suggestion Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 text-sky-600 rounded-xl shrink-0">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Facing physical electrical damage or spark?</p>
                <p className="text-[11px] text-slate-500">File an instant hazard ticket with camera photo proof for field technicians.</p>
              </div>
            </div>
            <button
              onClick={() => switchTab('complaint')}
              className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
            >
              <span>File Complaint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FILE ELECTRICAL COMPLAINT WITH CAMERA             */}
      {/* ======================================================== */}
      {activeTab === 'complaint' && (
        <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
          <div className="bg-sky-50 border border-sky-200/80 rounded-2xl p-4 flex items-center gap-3 text-sky-900 text-xs">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
            <div>
              <span className="font-bold">Mobile Camera Feature Active:</span> You can take a real-time photo of burnt wires, transformer sparks, or low-voltage meters to give field technicians visual evidence!
            </div>
          </div>

          <ComplaintFilingCard
            category={category}
            onCategoryChange={setCategory}
            description={description}
            onDescriptionChange={setDescription}
            submitting={complaintSubmitting}
            successMessage={complaintMessage}
            onSubmit={handleComplaintSubmit}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: TICKET TRACKING & HISTORY                         */}
      {/* ======================================================== */}
      {activeTab === 'tracking' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Complaint Tracking Desk</h2>
              <p className="text-xs text-slate-500">Real-time status of all your reported electrical tickets & dispatched technicians.</p>
            </div>
            <button
              onClick={() => switchTab('complaint')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>+ New Complaint</span>
            </button>
          </div>

          <ComplaintHistoryCard complaints={myComplaints} />
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: SMART METER & BILL PAYMENT (bKash/Nagad)          */}
      {/* ======================================================== */}
      {activeTab === 'billing' && (
        <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
          <SmartMeterCard
            bill={bill}
            paymentResult={paymentResult}
            onOpenPaymentModal={() => setShowPaymentModal(true)}
          />

          {/* bKash Bill Payment Modal */}
          {showPaymentModal && (
            <BillPaymentModal
              bill={bill}
              paying={paying}
              onPay={handlePayBill}
              onClose={() => setShowPaymentModal(false)}
            />
          )}
        </div>
      )}

    </div>
  );
};
