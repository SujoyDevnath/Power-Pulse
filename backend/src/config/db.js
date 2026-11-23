require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'power-pulse-service-power-pulse.l.aivencloud.com',
  port: Number(process.env.DB_PORT) || 24932,
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_tfdJDzju_udulGonQwo',
  database: process.env.DB_NAME || 'defaultdb',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  decimalNumbers: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: { rejectUnauthorized: false }
});

// Helper to normalize SQLite dialect differences to MySQL
function normalizeSql(sql) {
  if (!sql) return sql;
  return sql
    .replace(/datetime\('now',\s*'-(\d+)\s*minutes?'\)/gi, 'DATE_SUB(NOW(), INTERVAL $1 MINUTE)')
    .replace(/datetime\('now',\s*'\+(\d+)\s*days?'\)/gi, 'DATE_ADD(NOW(), INTERVAL $1 DAY)')
    .replace(/datetime\('now',\s*'-(\d+)\s*hours?'\)/gi, 'DATE_SUB(NOW(), INTERVAL $1 HOUR)')
    .replace(/datetime\('now'\)/gi, 'NOW()')
    .replace(/date\('now'\)/gi, 'CURDATE()')
    .replace(/time\('now'\)/gi, 'CURTIME()')
    .replace(/RANDOM\(\)/gi, 'RAND()');
}

/**
 * Universal async MySQL Database Interface
 * Fully connected to Aiven Cloud MySQL with SSL
 */
const db = {
  pool,

  async query(sql, params = []) {
    return pool.query(normalizeSql(sql), params);
  },

  async execute(sql, params = []) {
    return pool.execute(normalizeSql(sql), params);
  },

  prepare(sql) {
    const cleanSql = normalizeSql(sql);
    return {
      async get(...params) {
        let flatParams = params;
        if (params.length === 1 && Array.isArray(params[0])) {
          flatParams = params[0];
        }
        const [rows] = await pool.query(cleanSql, flatParams);
        return rows && rows.length > 0 ? rows[0] : null;
      },

      async all(...params) {
        let flatParams = params;
        if (params.length === 1 && Array.isArray(params[0])) {
          flatParams = params[0];
        }
        const [rows] = await pool.query(cleanSql, flatParams);
        return rows || [];
      },

      async run(...params) {
        let flatParams = params;
        if (params.length === 1 && typeof params[0] === 'object' && !Array.isArray(params[0]) && params[0] !== null) {
          flatParams = Object.values(params[0]);
        } else if (params.length === 1 && Array.isArray(params[0])) {
          flatParams = params[0];
        }
        const [result] = await pool.query(cleanSql, flatParams);
        return {
          changes: result.affectedRows || 0,
          affectedRows: result.affectedRows || 0,
          lastInsertRowid: result.insertId || 0,
          insertId: result.insertId || 0
        };
      }
    };
  },

  transaction(fn) {
    return async (...args) => {
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        const res = await fn(...args);
        await connection.commit();
        return res;
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    };
  },

  pragma() {}
};

module.exports = db;
