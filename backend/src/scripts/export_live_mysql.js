const fs = require('fs');
const path = require('path');
const db = require('../config/db');

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 1 : 0;
  if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
  const str = String(val)
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0': return '\\0';
        case '\x08': return '\\b';
        case '\x09': return '\\t';
        case '\x1a': return '\\z';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char;
        default:
          return char;
      }
    });
  return `'${str}'`;
}

async function exportLiveDb() {
  console.log('[PowerPulse] Exporting live Aiven Cloud MySQL database dump...');
  const schemaPath = path.resolve(__dirname, 'schema.mysql.sql');
  const ddl = fs.readFileSync(schemaPath, 'utf8');

  let dump = `-- ============================================================================\n`;
  dump += `-- PowerPulse MySQL Live Production Dump (Schema + Live Data)\n`;
  dump += `-- Generated on: ${new Date().toISOString()}\n`;
  dump += `-- Ready to import into local MySQL / phpMyAdmin (XAMPP) / MySQL Workbench\n`;
  dump += `-- ============================================================================\n\n`;
  dump += `CREATE DATABASE IF NOT EXISTS powerpulse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`;
  dump += `USE powerpulse;\n\n`;
  dump += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;
  dump += ddl + `\n\n`;

  const tables = [
    'locations',
    'users',
    'technicians',
    'incidents',
    'reports',
    'assignments',
    'complaints',
    'smart_meter_bills',
    'meter_readings',
    'planned_outages',
    'notifications',
    'audit_logs'
  ];

  for (const table of tables) {
    const [rows] = await db.query(`SELECT * FROM \`${table}\``);
    if (!rows || rows.length === 0) continue;

    dump += `-- ----------------------------------------------------------------------------\n`;
    dump += `-- Data for Table: \`${table}\` (${rows.length} rows)\n`;
    dump += `-- ----------------------------------------------------------------------------\n`;

    const cols = Object.keys(rows[0]).map(c => `\`${c}\``).join(', ');
    dump += `INSERT INTO \`${table}\` (${cols}) VALUES\n`;

    const valueLines = rows.map((row) => {
      const vals = Object.values(row).map(escapeSql).join(', ');
      return `  (${vals})`;
    });

    dump += valueLines.join(',\n') + ';\n\n';
  }

  dump += `SET FOREIGN_KEY_CHECKS = 1;\n`;

  const outputPath = path.resolve(__dirname, '../../database_dump.sql');
  fs.writeFileSync(outputPath, dump, 'utf8');
  console.log(`[PowerPulse] Successfully saved live dump to: ${outputPath} (${(dump.length / 1024).toFixed(1)} KB)`);
  process.exit(0);
}

exportLiveDb().catch(err => {
  console.error('[PowerPulse] Export failed:', err);
  process.exit(1);
});
