import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { saveReportOffline, generateUUID } from '../services/offlineQueue';
import { checkRealInternet } from '../services/connectivity';
import {
  OutageReportingCard,
  ComplaintFilingCard,
  PlannedOutagesCard,
  ComplaintHistoryCard,
  SmartMeterCard,
  BillPaymentModal
} from '../features/consumer/components';

/**
 * 🏠 ConsumerPortal Page Orchestrator
 * ----------------------------------------------------
 * What this page does:
 * This is the central home screen for citizens (consumers).
 * It brings together 5 independent feature modules:
 *
 * 1. OutageReportingCard:
 *    - Real-time power status (ON or OFF) & reporting buttons
 * 2. ComplaintFilingCard:
 *    - Submit electrical hazard or low voltage complaints
 * 3. PlannedOutagesCard:
 *    - View announced city maintenance / load-shedding schedules
 * 4. ComplaintHistoryCard:
 *    - Track previously submitted tickets and technician visits
 * 5. SmartMeterCard & BillPaymentModal:
 *    - IoT smart meter energy usage & simulated bill payments (bKash/Nagad)
 *
 * Analogy for beginners:
 * Think of this page like your smartphone's Dashboard:
 * instead of having one huge mess of wires, each feature is a clean,
 * plug-and-play widget that works together in harmony!
 */
export const ConsumerPortal = () => {
  const { user } = useAuth();

  // --- State: Live Outage, Complaints, Maintenance Schedules ---
  const [activeOutage, setActiveOutage] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);
  const [plannedOutages, setPlannedOutages] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- State: Reporting Action & Real-time Evaluation Result ---
  const [reporting, setReporting] = useState(false);
  const [reportResult, setReportResult] = useState(null);

  // --- State: Complaint Submission Form ---
  const [category, setCategory] = useState('power_outage');
  const [description, setDescription] = useState('');
  const [complaintSubmitting, setComplaintSubmitting] = useState(false);
  const [complaintMessage, setComplaintMessage] = useState('');

  // --- State: Smart Meter & Simulated Bill Payment ---
  const [bill, setBill] = useState(null);
  const [meterUsage, setMeterUsage] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('bKash (Demo)');
  const [paying, setPaying] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  /**
   * Fetch all initial dashboard data in parallel
   */
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

  useEffect(() => {
    fetchConsumerData();

    // Re-fetch data whenever an offline queue sync finishes
    const handleQueueSynced = () => {
      fetchConsumerData();

      // Clear the offline signal card once synced to the grid
      setReportResult((prev) => {
        if (prev?.isOffline) {
          return {
            type: prev.type,
            message: 'Your offline report has been successfully synchronized with the central grid.',
            isSynced: true,
            syncedAt: new Date().toLocaleTimeString()
          };
        }
        return prev;
      });

      // Automatically remove the banner after 4 seconds
      setTimeout(() => {
        setReportResult((prev) => (prev?.isSynced ? null : prev));
      }, 4000);
    };

    window.addEventListener('powerpulse:queue-synced', handleQueueSynced);
    return () => {
      window.removeEventListener('powerpulse:queue-synced', handleQueueSynced);
    };
  }, []);

  /**
   * Handle One-Tap Outage Signal ('OFF' or 'BACK')
   */
  const handleReport = async (type) => {
    try {
      setReporting(true);
      setReportResult(null);

      // 1. Verify real network connectivity immediately
      const isOnline = await checkRealInternet();
      if (!isOnline) {
        saveReportOffline({
          type,
          location_id: user?.location_id || 1
        });
        setReportResult({
          type,
          message: 'You are currently offline. Your report has been saved in your browser queue and will auto-sync when internet returns.',
          isOffline: true,
          queuedAt: new Date().toLocaleTimeString()
        });
        return;
      }

      // 2. Online submission with unique client UUID for idempotency
      const clientUuid = generateUUID();
      const res = await api.post('/reports', {
        type,
        location_id: user?.location_id || 1,
        client_uuid: clientUuid,
        reported_at: new Date().toISOString()
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
      // 3. Fallback: If network dropped while sending request
      if (!err.response || err.code === 'ERR_NETWORK') {
        saveReportOffline({
          type,
          location_id: user?.location_id || 1
        });
        setReportResult({
          type,
          message: 'Network connection lost during submission. Report saved safely to offline queue and will sync automatically once reconnected.',
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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Power Grid Outage Status & Reporting Card */}
      <OutageReportingCard
        activeOutage={activeOutage}
        reporting={reporting}
        reportResult={reportResult}
        onReport={handleReport}
      />

      {/* 2. File Complaint & Scheduled Load-Shedding Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComplaintFilingCard
          category={category}
          onCategoryChange={setCategory}
          description={description}
          onDescriptionChange={setDescription}
          submitting={complaintSubmitting}
          successMessage={complaintMessage}
          onSubmit={handleComplaintSubmit}
        />
        <PlannedOutagesCard plannedOutages={plannedOutages} />
      </div>

      {/* 3. My Complaint Tracking History */}
      <ComplaintHistoryCard complaints={myComplaints} />

      {/* 4. Smart Meter & Electricity Bill Simulation Module */}
      <SmartMeterCard
        bill={bill}
        paymentResult={paymentResult}
        onOpenPaymentModal={() => setShowPaymentModal(true)}
      />

      {/* 5. bKash Bill Payment Modal */}
      {showPaymentModal && (
        <BillPaymentModal
          bill={bill}
          paying={paying}
          onPay={handlePayBill}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};
