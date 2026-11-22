const fs = require('fs');
const path = require('path');
const db = require('../config/db');

function initDb() {
    console.log('[PowerPulse] Initializing database schema...');
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute the complete schema
    db.exec(schemaSql);
    console.log('[PowerPulse] Database schema created successfully (12 tables).');
}

if (require.main === module) {
    initDb();
    process.exit(0);
}

module.exports = initDb;
