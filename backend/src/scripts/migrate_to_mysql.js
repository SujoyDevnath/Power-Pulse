require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const sqliteDb = require('../config/db');

async function migrate() {
  console.log('\n======================================================');
  console.log('🚀 POWERPULSE: LIVE SQLITE TO MYSQL MIGRATOR');
  console.log('======================================================\n');

  const config = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'powerpulse',
    multipleStatements: true,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  };

  console.log(`Connecting to MySQL server at [${config.host}:${config.port}] as '${config.user}'...`);

  let connection;
  try {
    // Connect directly to target database
    connection = await mysql.createConnection(config);
    console.log(`✅ Connected successfully to MySQL database '${config.database}'!\n`);
  } catch (connErr) {
    console.error('\n❌ Could not connect to MySQL server:', connErr.message);
    console.log('\n💡 Please check your MySQL credentials in .env:');
    console.log('   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SSL');
    console.log('   (Or import the generated "powerpulse_mysql_dump.sql" file directly into phpMyAdmin/Cloud Console)\n');
    process.exit(1);
  }

  try {
    // 1. Execute DDL Schema
    console.log('1. Creating MySQL schema tables, constraints, and indexes...');
    const schemaPath = path.resolve(__dirname, 'schema.mysql.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await connection.query(schemaSql);
    console.log('   ✅ All 14 MySQL tables created.\n');

    // 2. Disable Foreign Key checks for batch data transfer
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    const tables = [
      'locations',
      'users',
      'technicians',
      'incidents',
      'reports',
      'complaints',
      'assignments',
      'planned_outages',
      'smart_meter_bills',
      'meter_readings',
      'notifications',
      'audit_logs',
      'refresh_tokens',
      'blacklisted_tokens'
    ];

    console.log('2. Migrating rows from SQLite to MySQL...');
    const migrationSummary = [];

    for (const tableName of tables) {
      const rows = sqliteDb.prepare(`SELECT * FROM ${tableName}`).all();
      if (rows.length === 0) {
        migrationSummary.push({ Table: tableName, Rows: 0, Status: 'Skipped (empty)' });
        continue;
      }

      // Truncate existing data to prevent duplicate key errors
      await connection.query(`TRUNCATE TABLE \`${tableName}\`;`);

      const columns = Object.keys(rows[0]);
      const colsList = columns.map(c => `\`${c}\``).join(', ');

      // Batch insert in chunks of 50 rows
      const chunkSize = 50;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const placeholders = chunk.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ');
        const insertSql = `INSERT INTO \`${tableName}\` (${colsList}) VALUES ${placeholders}`;
        const values = [];
        for (const row of chunk) {
          for (const c of columns) {
            let val = row[c];
            if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
              val = val.replace('T', ' ').replace(/\.\d+Z?$/, '').replace('Z', '');
            }
            values.push(val);
          }
        }
        await connection.query(insertSql, values);
      }

      migrationSummary.push({ Table: tableName, Rows: rows.length, Status: '✅ Migrated' });
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('\n======================================================');
    console.log('🎉 MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('======================================================\n');
    console.table(migrationSummary);

    console.log('\nYour MySQL database is now fully populated and synchronized with PowerPulse data!\n');
  } catch (err) {
    console.error('\n❌ Migration failed during query execution:', err.message);
  } finally {
    if (connection) await connection.end();
  }
}

migrate();
