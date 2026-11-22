const db = require('../config/db');

const args = process.argv.slice(2);
const tableName = args[0]?.toLowerCase().trim();

if (!tableName) {
  console.log('\n======================================================');
  console.log('📊 POWERPULSE DATABASE OVERVIEW (powerpulse.db)');
  console.log('======================================================\n');

  const tables = db.prepare(`
    SELECT tbl_name as name 
    FROM sqlite_master 
    WHERE type='table' AND tbl_name NOT LIKE 'sqlite_%' 
    ORDER BY tbl_name
  `).all();

  const overview = tables.map(t => {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${t.name}`).get().count;
    return {
      'Table Name': t.name,
      'Total Records': count,
      'Command to View': `node src/scripts/view_db.js ${t.name}`
    };
  });

  console.table(overview);
  console.log('\n💡 Tip: To view data in any specific table, run:');
  console.log('   node src/scripts/view_db.js <table_name>');
  console.log('   Example: node src/scripts/view_db.js users');
  console.log('            node src/scripts/view_db.js smart_meter_bills');
  console.log('            node src/scripts/view_db.js complaints\n');
  process.exit(0);
}

try {
  const rows = db.prepare(`SELECT * FROM ${tableName} ORDER BY 1 DESC LIMIT 30`).all();
  console.log(`\n======================================================`);
  console.log(`📋 Showing latest records from table: [${tableName}] (Max 30)`);
  console.log(`======================================================\n`);
  if (rows.length === 0) {
    console.log(`(No records found in table '${tableName}')\n`);
  } else {
    console.table(rows);
    console.log(`Total retrieved: ${rows.length} row(s)\n`);
  }
} catch (err) {
  console.error(`❌ Error querying table '${tableName}':`, err.message);
}
