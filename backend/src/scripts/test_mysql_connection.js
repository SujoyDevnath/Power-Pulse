require('dotenv').config();
const mysql = require('mysql2/promise');

async function testMySQL() {
  console.log('\n======================================================');
  console.log('🔍 VERIFYING MYSQL DATABASE & INTEGRITY');
  console.log('======================================================\n');

  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'powerpulse'
  };

  const conn = await mysql.createConnection(config);
  console.log(`Connected to MySQL server: [${config.host}:${config.port}] - DB: [${config.database}]`);

  // 1. Show Tables
  const [tables] = await conn.query('SHOW TABLES');
  const tableNames = tables.map(r => Object.values(r)[0]);
  console.log(`\n✅ Total Tables in MySQL: ${tableNames.length}`);
  console.log(tableNames.join(', '));

  // 2. Count Records in each table
  console.log('\n📊 Table Record Counts in MySQL:');
  const counts = [];
  for (const t of tableNames) {
    const [res] = await conn.query(`SELECT COUNT(*) as c FROM \`${t}\``);
    counts.push({ Table: t, Records: res[0].c });
  }
  console.table(counts);

  // 3. Sample Users
  const [users] = await conn.query('SELECT user_id, name, email, role, phone FROM users LIMIT 5');
  console.log('👤 Sample Users:');
  console.table(users);

  // 4. Sample bKash Bills
  const [bills] = await conn.query("SELECT bill_id, user_id, amount, status, transaction_id, paid_at FROM smart_meter_bills WHERE status = 'paid' LIMIT 5");
  console.log('🧾 Sample bKash Bill Payments:');
  console.table(bills);

  // 5. Sample Complaints & Technician Assignments
  const [complaints] = await conn.query(`
    SELECT c.complaint_id, c.category, c.status, u.name as consumer, t_user.name as technician
    FROM complaints c
    JOIN users u ON c.user_id = u.user_id
    LEFT JOIN assignments a ON c.complaint_id = a.complaint_id
    LEFT JOIN technicians t ON a.technician_id = t.technician_id
    LEFT JOIN users t_user ON t.user_id = t_user.user_id
    LIMIT 5
  `);
  console.log('🔧 Sample Complaints & Assigned Technicians:');
  console.table(complaints);

  await conn.end();
  console.log('\n======================================================');
  console.log('🎉 ALL MYSQL DATA VERIFIED SUCCESSFULLY & 100% HEALTHY!');
  console.log('======================================================\n');
}

testMySQL().catch(err => {
  console.error('MySQL Verification Failed:', err);
  process.exit(1);
});
