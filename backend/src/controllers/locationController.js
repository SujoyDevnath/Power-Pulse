const db = require('../config/db');

exports.getAllLocations = async (req, res) => {
    try {
        const locations = await db.prepare(`
            SELECT l.*, 
                   (SELECT COUNT(*) FROM incidents i WHERE i.location_id = l.location_id AND i.status = 'open') as active_outages
            FROM locations l
            ORDER BY l.district, l.area
        `).all();

        res.json({ locations });
    } catch (err) {
        console.error('[Locations] Fetch error:', err);
        res.status(500).json({ error: 'Failed to retrieve locations' });
    }
};

exports.createLocation = async (req, res) => {
    try {
        const { district, area, zone, latitude, longitude } = req.body;
        if (!district || !area || !zone) {
            return res.status(400).json({ error: 'District, area, and zone are required' });
        }

        const stmt = db.prepare(`
            INSERT INTO locations (district, area, zone, latitude, longitude)
            VALUES (?, ?, ?, ?, ?)
        `);

        const result = await stmt.run(district.trim(), area.trim(), zone.trim(), latitude || null, longitude || null);
        res.status(201).json({
            message: 'Location added successfully',
            location_id: result.lastInsertRowid
        });
    } catch (err) {
        console.error('[Locations] Create error:', err);
        res.status(500).json({ error: 'Failed to create location' });
    }
};
