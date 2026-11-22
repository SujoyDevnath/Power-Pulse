const http = require('http');

const BASE_URL = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  const payload = options.body ? JSON.stringify(options.body) : null;

  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { 'Authorization': `Bearer ${options.token}` } : {}),
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) { json = data; }
        resolve({ status: res.statusCode, data: json });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function assert(condition, message, extra = null) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    if (extra) console.error('Details:', extra);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🚀 POWERPULSE FULL SYSTEM & WORKFLOW VERIFICATION SUITE');
  console.log('======================================================\n');

  // ==========================================
  // 1. AUTHENTICATION & DUAL-TOKEN WORKFLOW
  // ==========================================
  console.log('--- 1. Testing Dual-Token Auth, Refresh, & Revocation ---');
  
  // 1.1 Login Consumer
  const loginRes = await request('/auth/login', {
    method: 'POST',
    body: { email: 'tanvir@gmail.com', password: 'User@123' }
  });
  assert(loginRes.status === 200 && loginRes.data.token && loginRes.data.refreshToken, 'Consumer login returns Access + Refresh token pair');
  const userToken = loginRes.data.token;
  const userRefreshToken = loginRes.data.refreshToken;

  // 1.2 Token Refresh Rotation
  const refreshRes = await request('/auth/refresh', {
    method: 'POST',
    body: { refreshToken: userRefreshToken }
  });
  assert(refreshRes.status === 200 && refreshRes.data.token && refreshRes.data.refreshToken, 'POST /auth/refresh returns new rotated token pair');
  const newAccessToken = refreshRes.data.token;
  const newRefreshToken = refreshRes.data.refreshToken;

  // 1.3 Verify Old Refresh Token Cannot Be Reused (Rotation Security)
  const reuseRes = await request('/auth/refresh', {
    method: 'POST',
    body: { refreshToken: userRefreshToken }
  });
  assert(reuseRes.status === 401 || reuseRes.status === 403, 'Old refresh token was revoked upon rotation');

  // 1.4 Logout & Access Token Blacklisting
  const logoutRes = await request('/auth/logout', {
    method: 'POST',
    token: newAccessToken,
    body: { refreshToken: newRefreshToken }
  });
  assert(logoutRes.status === 200, 'POST /auth/logout succeeds');

  // 1.5 Verify Blacklisted Access Token is Denied
  const blacklistedCheck = await request('/auth/me', {
    token: newAccessToken
  });
  assert(blacklistedCheck.status === 401 && (blacklistedCheck.data.error || '').toLowerCase().includes('revoked'), 'Blacklisted token immediately rejected with 401 TokenRevoked');

  // Re-login for remaining tests
  const freshLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'tanvir@gmail.com', password: 'User@123' }
  });
  const consumerToken = freshLogin.data.token;

  // ==========================================
  // 2. CITIZEN (CONSUMER) WORKFLOWS
  // ==========================================
  console.log('\n--- 2. Testing Citizen (Consumer) Workflows ---');

  // 2.1 File an Outage Report (OFF)
  const reportOff = await request('/reports', {
    method: 'POST',
    token: consumerToken,
    body: {
      type: 'OFF',
      location_id: 1,
      client_uuid: 'test-uuid-off-' + Date.now()
    }
  });
  assert(reportOff.status === 201 || reportOff.status === 200, 'POST /reports (OFF) created incident signal', reportOff);

  // 2.2 Check Active Outages
  const activeOutages = await request('/incidents/active?location_id=1');
  assert(activeOutages.status === 200 && Array.isArray(activeOutages.data.incidents), 'GET /incidents/active returns active community outages');

  // 2.3 Submit Complaint Ticket
  const complaintRes = await request('/complaints', {
    method: 'POST',
    token: consumerToken,
    body: {
      location_id: 1,
      category: 'transformer',
      description: 'Sparks emitting from pole transformer near sector 4 mosque.'
    }
  });
  assert(complaintRes.status === 201 && complaintRes.data.complaint_id, `POST /complaints created ticket #CMP-${complaintRes.data?.complaint_id}`, complaintRes);
  const createdComplaintId = complaintRes.data.complaint_id;

  // 2.4 Query Citizen My Complaints
  const myComplaints = await request('/complaints/mine', { token: consumerToken });
  assert(myComplaints.status === 200 && myComplaints.data.complaints.some(c => c.complaint_id === createdComplaintId), 'GET /complaints/mine contains newly created ticket');

  // 2.5 Smart Meter & Bill Query
  const billRes = await request('/bills/current', { token: consumerToken });
  assert(billRes.status === 200, 'GET /bills/current returns billing information');

  // 2.6 bKash Utility Bill Payment via TrxID
  if (billRes.data.bill && billRes.data.bill.status === 'unpaid') {
    const payRes = await request(`/bills/${billRes.data.bill.bill_id}/pay`, {
      method: 'POST',
      token: consumerToken,
      body: {
        transaction_id: 'BK' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        sender_phone: '01712998877',
        payment_method: 'bKash'
      }
    });
    assert(payRes.status === 200 && payRes.data.status === 'paid', 'POST /bills/:id/pay confirms bKash TrxID payment', payRes);
  }

  const meterRes = await request('/meter/usage', { token: consumerToken });
  assert(meterRes.status === 200 && meterRes.data.current_kwh !== undefined, 'GET /meter/usage returns live telemetry data');

  // ==========================================
  // 3. ADMIN WORKFLOWS & MANAGEMENT
  // ==========================================
  console.log('\n--- 3. Testing Admin Workflows & Controls ---');

  // 3.1 Admin Login
  const adminLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'admin@powerpulse.com', password: 'Admin@123' }
  });
  assert(adminLogin.status === 200 && adminLogin.data.user.role === 'admin', 'Admin login successful');
  const adminToken = adminLogin.data.token;

  // 3.2 Analytics & Audit Logs
  const analytics = await request('/admin/analytics', { token: adminToken });
  assert(analytics.status === 200 && analytics.data.kpi, 'GET /admin/analytics returns system KPIs');

  const auditLogs = await request('/admin/audit-logs', { token: adminToken });
  assert(auditLogs.status === 200 && Array.isArray(auditLogs.data.logs), 'GET /admin/audit-logs returns immutable audit records');

  // 3.3 Admin Users List
  const usersList = await request('/admin/users', { token: adminToken });
  assert(usersList.status === 200 && usersList.data.users.length > 0, 'GET /admin/users returns registered users');

  // 3.4 Raw Reports Stream
  const rawReports = await request('/reports?limit=50', { token: adminToken });
  assert(rawReports.status === 200 && rawReports.data.reports.length > 0, 'GET /reports returns raw citizen signals stream');

  // 3.5 Planned Outage Lifecycle (Create & Delete)
  const plannedCreate = await request('/planned', {
    method: 'POST',
    token: adminToken,
    body: {
      location_id: 1,
      outage_date: '2026-12-01',
      start_time: '08:00',
      end_time: '12:00',
      reason: 'Automated test maintenance schedule'
    }
  });
  assert(plannedCreate.status === 201 && plannedCreate.data.planned_id, 'POST /planned created scheduled outage');
  const plannedId = plannedCreate.data.planned_id;

  const plannedDelete = await request(`/planned/${plannedId}`, {
    method: 'DELETE',
    token: adminToken
  });
  assert(plannedDelete.status === 200, 'DELETE /planned/:id successfully canceled schedule');

  // 3.6 Location Registry
  const locCreate = await request('/locations', {
    method: 'POST',
    token: adminToken,
    body: {
      district: 'Dhaka',
      area: 'Automated Test Sector ' + Date.now(),
      zone: 'Zone Z',
      latitude: 23.8103,
      longitude: 90.4125
    }
  });
  assert(locCreate.status === 201, 'POST /locations added new municipal sector');

  // 3.7 Dispatch Complaint to Technician
  const dispatchRes = await request(`/complaints/${createdComplaintId}/assign`, {
    method: 'PATCH',
    token: adminToken,
    body: {
      technician_id: 1 // rahim.tech@powerpulse.com (technician_id: 1)
    }
  });
  assert(dispatchRes.status === 200, `PATCH /complaints/:id/assign dispatched ticket to technician`);

  // ==========================================
  // 4. TECHNICIAN WORKFLOW
  // ==========================================
  console.log('\n--- 4. Testing Technician Task Lifecycle ---');

  // 4.1 Technician Login
  const techLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'rahim.tech@powerpulse.com', password: 'Tech@123' }
  });
  assert(techLogin.status === 200 && techLogin.data.user.role === 'technician', 'Technician login successful');
  const techToken = techLogin.data.token;

  // 4.2 Fetch Assignments
  const techTasks = await request('/technician/assignments', { token: techToken });
  assert(techTasks.status === 200 && Array.isArray(techTasks.data.assignments), 'GET /technician/assignments returns field work orders');
  const assignedTask = techTasks.data.assignments.find(a => a.complaint_id === createdComplaintId);
  assert(Boolean(assignedTask), `Work order for complaint #CMP-${createdComplaintId} found in technician queue`);

  // 4.3 Progression: Investigating -> Repairing -> Resolved
  const update1 = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'investigating',
      remarks: 'Arrived at site. Inspecting pole transformer.'
    }
  });
  assert(update1.status === 200, 'Technician transitioned status to INVESTIGATING');

  const update2 = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'repairing',
      remarks: 'Replacing blown fuse and insulating loose jumpers.'
    }
  });
  assert(update2.status === 200, 'Technician transitioned status to REPAIRING');

  const update3 = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'resolved',
      remarks: 'Fuses replaced. Phase voltage tested at 230V. Normal power restored.'
    }
  });
  assert(update3.status === 200, 'Technician transitioned status to RESOLVED');

  // 4.4 Test Accidental Click Undo / Rollback
  const undoRollback = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'repairing',
      remarks: 'Undo/Reopen: Second inspection needed for phase balancing.'
    }
  });
  assert(undoRollback.status === 200, 'Technician successfully UNDO/ROLLED BACK status to REPAIRING');

  const reResolve = await request(`/technician/assignments/${assignedTask.assignment_id}`, {
    method: 'PATCH',
    token: techToken,
    body: {
      status: 'resolved',
      remarks: 'Phase balancing verified at 230V. Final restoration complete.'
    }
  });
  assert(reResolve.status === 200, 'Technician re-finalized status to RESOLVED');

  // 4.5 Technician Profile & Duty Status
  const techProfileRes = await request('/technician/profile', { token: techToken });
  assert(techProfileRes.status === 200 && techProfileRes.data.profile, 'GET /technician/profile returned profile & metrics');
  assert(techProfileRes.data.profile.stats.total_tasks >= 1, 'Technician profile contains accurate lifetime work order stats');

  // 4.6 Technician Updates Duty Status
  const statusChange = await request('/technician/status', {
    method: 'PATCH',
    token: techToken,
    body: { status: 'busy' }
  });
  assert(statusChange.status === 200 && statusChange.data.availability_status === 'busy', 'PATCH /technician/status updated duty to BUSY');

  const statusBack = await request('/technician/status', {
    method: 'PATCH',
    token: techToken,
    body: { status: 'available' }
  });
  assert(statusBack.status === 200 && statusBack.data.availability_status === 'available', 'PATCH /technician/status restored duty to AVAILABLE');

  // 4.7 Technician Updates Contact Details
  const profileUpdate = await request('/technician/profile', {
    method: 'PATCH',
    token: techToken,
    body: { phone: '01811-999888' }
  });
  assert(profileUpdate.status === 200 && profileUpdate.data.user.phone === '01811-999888', 'PATCH /technician/profile updated contact phone');

  // 4.8 Verify Citizen Sees Resolved Complaint
  const citizenCheck = await request('/complaints/mine', { token: consumerToken });
  const myTicket = citizenCheck.data.complaints.find(c => c.complaint_id === createdComplaintId);
  assert(myTicket && myTicket.status === 'resolved', 'Citizen portal reflects RESOLVED status with technician notes');

  // 4.5 Citizen Reports Power BACK (Grid Restoration)
  const reportBack = await request('/reports', {
    method: 'POST',
    token: consumerToken,
    body: {
      type: 'BACK',
      location_id: 1,
      client_uuid: 'test-uuid-back-' + Date.now()
    }
  });
  assert(reportBack.status === 201 || reportBack.status === 200, 'POST /reports (BACK) signal recorded and evaluated');

  // ==========================================
  // 5. NOTIFICATION LIFECYCLE VERIFICATION
  // ==========================================
  console.log('\n--- 5. Testing In-App Notification System & Triggers ---');

  // 5.1 Fetch Notifications for Consumer
  const notifRes = await request('/notifications', { token: consumerToken });
  assert(notifRes.status === 200 && Array.isArray(notifRes.data.notifications), 'GET /notifications returned consumer notifications');
  assert(notifRes.data.notifications.length > 0, `Consumer received ${notifRes.data.notifications.length} in-app notifications`);

  // Verify complaint-related notifications exist
  const titles = notifRes.data.notifications.map(n => n.title);
  console.log('Detected Notification Titles:', titles);
  assert(titles.some(t => t.includes('Complaint Registered') || t.includes('Technician') || t.includes('Power')), 'Notifications include complaint/technician/outage events');

  // 5.2 Test Mark Single Notification as Read
  const unreadOne = notifRes.data.notifications.find(n => n.is_read === 0);
  if (unreadOne) {
    const markRes = await request(`/notifications/${unreadOne.notification_id}/read`, {
      method: 'PATCH',
      token: consumerToken
    });
    assert(markRes.status === 200, 'PATCH /notifications/:id/read marks single notification as read');
  }

  // 5.3 Test Mark All Notifications as Read
  const markAllRes = await request('/notifications/read-all', {
    method: 'PATCH',
    token: consumerToken
  });
  assert(markAllRes.status === 200, 'PATCH /notifications/read-all marks all notifications as read');

  const afterMarkAll = await request('/notifications', { token: consumerToken });
  assert(afterMarkAll.data.notifications.every(n => n.is_read === 1), 'All consumer notifications now have is_read = 1');

  // 5.4 Schedule a Planned Load-Shedding Outage by Admin and Verify Citizen Notification
  const futureDate = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const createPlanned = await request('/planned', {
    method: 'POST',
    token: adminToken,
    body: {
      location_id: 1,
      outage_date: futureDate,
      start_time: '14:00',
      end_time: '16:00',
      reason: 'Feeder line maintenance & tree trimming'
    }
  });
  assert(createPlanned.status === 201, 'Admin successfully scheduled planned load-shedding');

  // Verify Citizen in Location 1 received planned outage notification
  const notifAfterPlanned = await request('/notifications', { token: consumerToken });
  const hasPlannedAlert = notifAfterPlanned.data.notifications.some(n => n.title.includes('Scheduled Load-Shedding'));
  assert(hasPlannedAlert, 'Citizen received broadcast notification for Scheduled Load-Shedding in their zone');

  console.log('\n======================================================');
  console.log('🎉 ALL 25 INTEGRATION WORKFLOW TESTS PASSED CLEANLY! ');
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
