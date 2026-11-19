const db = require('../config/db');
const logAudit = require('../utils/auditLogger');

exports.getUsage = (req, res) => {
    try {
        const userId = req.user.user_id;

        // Fetch recent meter readings
        const readings = db.prepare(`
            SELECT * FROM meter_readings 
            WHERE user_id = ? 
            ORDER BY reading_time DESC 
            LIMIT 30
        `).all(userId);

        // Fetch current active bill
        const currentBill = db.prepare(`
            SELECT * FROM smart_meter_bills 
            WHERE user_id = ? AND status = 'unpaid'
            ORDER BY created_at DESC 
            LIMIT 1
        `).get(userId);

        res.json({
            current_kwh: readings[0]?.kwh || 143.2,
            daily_usage: 4.8,
            monthly_usage: currentBill?.consumption_kwh || 143.2,
            current_bill: currentBill || null,
            readings
        });
    } catch (err) {
        console.error('[Meter] Get usage error:', err);
        res.status(500).json({ error: 'Failed to retrieve meter usage' });
    }
};

exports.getBills = (req, res) => {
    try {
        const bills = db.prepare(`
            SELECT * FROM smart_meter_bills 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        `).all(req.user.user_id);

        res.json({ bills });
    } catch (err) {
        console.error('[Meter] Get bills error:', err);
        res.status(500).json({ error: 'Failed to retrieve bills' });
    }
};

exports.getCurrentBill = (req, res) => {
    try {
        let bill = db.prepare(`
            SELECT * FROM smart_meter_bills 
            WHERE user_id = ? AND status = 'unpaid'
            ORDER BY created_at DESC 
            LIMIT 1
        `).get(req.user.user_id);

        // If no bill exists, create a default demo bill matching proposal figure (143.2 kWh / 1280 Tk)
        if (!bill) {
            const insert = db.prepare(`
                INSERT INTO smart_meter_bills (user_id, month, consumption_kwh, amount, status)
                VALUES (?, '2026-11', 143.2, 1280.00, 'unpaid')
            `).run(req.user.user_id);

            bill = db.prepare('SELECT * FROM smart_meter_bills WHERE bill_id = ?').get(insert.lastInsertRowid);
        }

        res.json({ bill });
    } catch (err) {
        console.error('[Meter] Get current bill error:', err);
        res.status(500).json({ error: 'Failed to retrieve current bill' });
    }
};

exports.payBill = (req, res) => {
    try {
        const { id } = req.params;
        const { payment_method } = req.body; // 'bKash (Demo)', 'Nagad (Demo)', 'Card (Demo)'

        const bill = db.prepare('SELECT * FROM smart_meter_bills WHERE bill_id = ? AND user_id = ?').get(id, req.user.user_id);
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        if (bill.status === 'paid') {
            return res.status(400).json({ error: 'This bill is already paid' });
        }

        // Generate demo transaction ID as defined in source: PP2026 + random 6 digits
        const transactionId = 'PP' + Math.floor(1000000000 + Math.random() * 9000000000);

        db.prepare(`
            UPDATE smart_meter_bills 
            SET status = 'paid', transaction_id = ?, paid_at = datetime('now')
            WHERE bill_id = ?
        `).run(transactionId, id);

        logAudit(req.user.user_id, 'PAY_BILL_DEMO', `Demo payment of ৳${bill.amount} confirmed via ${payment_method || 'bKash (Demo)'}. Txn: ${transactionId}`);

        res.json({
            message: 'Payment Successful',
            transaction_id: transactionId,
            status: 'paid',
            amount: bill.amount,
            paid_at: new Date().toISOString()
        });
    } catch (err) {
        console.error('[Meter] Pay bill error:', err);
        res.status(500).json({ error: 'Failed to process demo bill payment' });
    }
};
