const { pool } = require('../config/mysql');
const db = require('../config/db');

async function applyOptimizations() {
  console.log('\n======================================================');
  console.log('⚡ APPLYING DATABASE NORMALIZATIONS & INDEX OPTIMIZATIONS');
  console.log('======================================================\n');

  // ==========================================
  // 1. APPLY TO MYSQL DATABASE
  // ==========================================
  console.log('--- 1. Applying Optimizations to MySQL Database ---');
  try {
    const conn = await pool.getConnection();

    // 1.1 Convert planned_outages start_time & end_time to TIME
    console.log('Converting planned_outages columns to TIME data type...');
    await conn.query(`
      ALTER TABLE planned_outages 
      MODIFY COLUMN start_time TIME NOT NULL,
      MODIFY COLUMN end_time TIME NOT NULL
    `);
    console.log('✅ MySQL: planned_outages start_time & end_time successfully converted to TIME');

    // 1.2 Helper to add MySQL index safely if not exists
    const addIndexIfMissing = async (tableName, indexName, createSql) => {
      const [existing] = await conn.query(
        `SHOW INDEX FROM ${tableName} WHERE Key_name = ?`,
        [indexName]
      );
      if (existing.length === 0) {
        await conn.query(createSql);
        console.log(`✅ MySQL: Created index [${indexName}] on [${tableName}]`);
      } else {
        console.log(`ℹ️ MySQL: Index [${indexName}] already exists on [${tableName}]`);
      }
    };

    // Apply performance indexes
    await addIndexIfMissing(
      'notifications',
      'idx_notifications_user_unread',
      'CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at)'
    );

    await addIndexIfMissing(
      'meter_readings',
      'idx_meter_readings_user_time',
      'CREATE INDEX idx_meter_readings_user_time ON meter_readings(user_id, reading_time DESC)'
    );

    await addIndexIfMissing(
      'reports',
      'idx_reports_user_time',
      'CREATE INDEX idx_reports_user_time ON reports(user_id, reported_at)'
    );

    await addIndexIfMissing(
      'reports',
      'idx_reports_user_received',
      'CREATE INDEX idx_reports_user_received ON reports(user_id, received_at)'
    );

    await addIndexIfMissing(
      'smart_meter_bills',
      'idx_bills_user_status',
      'CREATE INDEX idx_bills_user_status ON smart_meter_bills(user_id, status)'
    );

    await addIndexIfMissing(
      'audit_logs',
      'idx_audit_user_time',
      'CREATE INDEX idx_audit_user_time ON audit_logs(user_id, created_at)'
    );

    await addIndexIfMissing(
      'planned_outages',
      'idx_planned_location_date',
      'CREATE INDEX idx_planned_location_date ON planned_outages(location_id, outage_date)'
    );

    conn.release();
    console.log('🎉 MySQL database successfully optimized!');
  } catch (mysqlErr) {
    console.error('❌ MySQL Optimization error:', mysqlErr.message);
  }

  // ==========================================
  // 2. APPLY TO SQLITE DATABASE
  // ==========================================
  console.log('\n--- 2. Applying Optimizations to SQLite Database ---');
  try {
    const sqliteIndexes = [
      'CREATE INDEX IF NOT EXISTS idx_reports_user_time ON reports(user_id, reported_at);',
      'CREATE INDEX IF NOT EXISTS idx_reports_user_received ON reports(user_id, received_at);',
      'CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at);',
      'CREATE INDEX IF NOT EXISTS idx_meter_readings_user_time ON meter_readings(user_id, reading_time DESC);',
      'CREATE INDEX IF NOT EXISTS idx_bills_user_status ON smart_meter_bills(user_id, status);',
      'CREATE INDEX IF NOT EXISTS idx_audit_user_time ON audit_logs(user_id, created_at);',
      'CREATE INDEX IF NOT EXISTS idx_planned_location_date ON planned_outages(location_id, outage_date);'
    ];

    for (const sql of sqliteIndexes) {
      db.exec(sql);
    }
    console.log('✅ SQLite: All 7 performance composite indexes applied successfully');
  } catch (sqliteErr) {
    console.error('❌ SQLite Optimization error:', sqliteErr.message);
  }

  console.log('\n======================================================');
  console.log('🎉 ALL OPTIMIZATIONS COMPLETED SUCCESSFULLY!');
  console.log('======================================================\n');
  process.exit(0);
}

applyOptimizations();
