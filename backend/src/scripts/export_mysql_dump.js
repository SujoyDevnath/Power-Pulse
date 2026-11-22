const fs = require('fs');
const path = require('path');
const db = require('../config/db');

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 1 : 0;
  // String escaping
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

function generateDump() {
  console.log('[PowerPulse] Generating MySQL Database Dump from SQLite...');

  const schemaPath = path.resolve(__dirname, 'schema.mysql.sql');
  const ddl = fs.readFileSync(schemaPath, 'utf8');

  let dump = `-- ============================================================================\n`;
  dump += `-- PowerPulse MySQL Full Database Dump (Schema + Data)\n`;
  dump += `-- Generated on: ${new Date().toISOString()}\n`;
  dump += `-- Ready to import directly into phpMyAdmin, MySQL Workbench, TiDB, Aiven, Railway\n`;
  dump += `-- ============================================================================\n\n`;
  dump += `CREATE DATABASE IF NOT EXISTS powerpulse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`;
  dump += `USE powerpulse;\n\n`;
  dump += ddl + `\n\n`;
  dump += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

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

  let totalRows = 0;

  for (const tableName of tables) {
    const rows = db.prepare(`SELECT * FROM ${tableName}`).all();
    if (rows.length === 0) continue;

    totalRows += rows.length;
    dump += `--\n-- Dumping data for table \`${tableName}\` (${rows.length} rows)\n--\n`;

    const columns = Object.keys(rows[0]);
    const colsList = columns.map(c => `\`${c}\``).join(', ');

    // Chunk inserts in batches of 50
    for (let i = 0; i < rows.length; i += 50) {
      const batch = rows.slice(i, i + 50);
      const valuesList = batch.map(row => {
        const rowVals = columns.map(c => escapeSql(row[c]));
        return `(${rowVals.join(', ')})`;
      }).join(',\n');

      dump += `INSERT INTO \`${tableName}\` (${colsList}) VALUES\n${valuesList};\n\n`;
    }
  }

  dump += `SET FOREIGN_KEY_CHECKS = 1;\n`;
  dump += `\n-- Dump Completed Successfully (${totalRows} total rows exported).\n`;

  const outputPath = path.resolve(__dirname, '../../powerpulse_mysql_dump.sql');
  fs.writeFileSync(outputPath, dump, 'utf8');

  console.log(`✅ Success! Dump created at: ${outputPath}`);
  console.log(`📊 Total rows exported: ${totalRows}`);
}

generateDump();
