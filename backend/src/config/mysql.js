require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'powerpulse',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});

// Test connection helper
async function checkMySQLConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`[PowerPulse MySQL] Connected successfully to [${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}]`);
    connection.release();
    return true;
  } catch (err) {
    console.warn(`[PowerPulse MySQL] Connection failed: ${err.message}`);
    return false;
  }
}

module.exports = {
  pool,
  checkMySQLConnection
};
