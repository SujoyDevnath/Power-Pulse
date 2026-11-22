import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { OutageMap } from '../components/OutageMap';
import { MapPin, Plus, RefreshCw, CheckCircle2, AlertOctagon, Search } from 'lucide-react';

export const AdminLocations = () => {
  const [locations, setLocations] = useState([]);
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state for table
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('area-asc');

  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [zone, setZone] = useState('Zone A');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const [locRes, incRes] = await Promise.all([
        api.get('/locations'),
        api.get('/incidents/active')
      ]);
      setLocations(locRes.data.locations || []);
      setActiveIncidents(incRes.data.incidents || []);
    } catch (err) {
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!area.trim() || !zone.trim()) {
      alert('Area and zone are required');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/locations', {
        district: district.trim(),
        area: area.trim(),
        zone: zone.trim(),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null
      });

      setMessage(`Location '${area}' added successfully.`);
      setArea('');
      setLatitude('');
      setLongitude('');
      fetchLocations();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add location');
    } finally {
      setSubmitting(false);
    }
  };

  const availableZones = useMemo(() => {
    return Array.from(new Set(locations.map(l => l.zone).filter(Boolean)));
  }, [locations]);

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      if (zoneFilter !== 'all' && loc.zone !== zoneFilter) return false;
      if (statusFilter === 'outage' && (loc.active_outages || 0) <= 0) return false;
      if (statusFilter === 'normal' && (loc.active_outages || 0) > 0) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(loc.location_id || '').toLowerCase().includes(q);
        const matchArea = (loc.area || '').toLowerCase().includes(q);
        const matchDistrict = (loc.district || '').toLowerCase().includes(q);
        const matchZone = (loc.zone || '').toLowerCase().includes(q);
        if (!matchId && !matchArea && !matchDistrict && !matchZone) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'area-asc') return (a.area || '').localeCompare(b.area || '');
      if (sortBy === 'area-desc') return (b.area || '').localeCompare(a.area || '');
      if (sortBy === 'outages-desc') return (b.active_outages || 0) - (a.active_outages || 0);
      if (sortBy === 'id-asc') return (a.location_id || 0) - (b.location_id || 0);
      return 0;
    });
  }, [locations, searchQuery, zoneFilter, statusFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || zoneFilter !== 'all' || statusFilter !== 'all' || sortBy !== 'area-asc';

  const clearFilters = () => {
    setSearchQuery('');
    setZoneFilter('all');
    setStatusFilter('all');
    setSortBy('area-asc');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Municipal Locations & Grid Zones</h2>
        <p className="text-xs text-slate-500 mt-1">Configure municipal sectors, districts, and substation zones for crowd clustering</p>
      </div>

      {/* 🗺️ Live Dhaka Substation & Grid Feeder Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Dhaka Municipal Grid Topology (OpenStreetMap)
          </span>
          <span className="text-[11px] text-slate-400">
            {locations.length} Registered Locations • {activeIncidents.length} Active Incidents
          </span>
        </div>
        <OutageMap
          locations={locations}
          activeIncidents={activeIncidents}
          height="360px"
        />
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-sky-600" />
            <span>Add New Municipal Zone</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                District Name *
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Dhaka"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Area / Sector Name *
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Gulshan-2 or Badda"
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Substation Grid Zone *
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              >
                <option value="Zone A">Zone A (North-West Feeder)</option>
                <option value="Zone B">Zone B (Central-South Feeder)</option>
                <option value="Zone C">Zone C (North Substation)</option>
                <option value="Zone D">Zone D (East Substation)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="e.g. 23.8103"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="e.g. 90.4125"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
            >
              {submitting ? 'Registering Location...' : 'Add Location to System'}
            </button>
          </form>
        </div>

        {/* Right Column: Locations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Registered Municipal Sectors</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Showing {filteredLocations.length} of {locations.length} locations</p>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition"
                >
                  Reset
                </button>
              )}
              <button
                onClick={fetchLocations}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900"
                title="Refresh locations"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table Filters */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="relative sm:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search area, district, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
              />
            </div>

            <div>
              <select
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="all">All Zones</option>
                {availableZones.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
              >
                <option value="area-asc">Area (A-Z)</option>
                <option value="area-desc">Area (Z-A)</option>
                <option value="outages-desc">Most Active Outages</option>
                <option value="id-asc">Location ID</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Loc ID</th>
                  <th className="py-3 px-4">Area / Sector</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Grid Zone</th>
                  <th className="py-3 px-4">Coordinates</th>
                  <th className="py-3 px-4 text-right">Active Outages</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLocations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      <p className="font-semibold text-slate-600 mb-0.5">No municipal sectors found</p>
                      <p className="text-[11px] text-slate-400">Try adjusting your search criteria or register a new location.</p>
                    </td>
                  </tr>
                ) : (
                  filteredLocations.map((loc) => (
                  <tr key={loc.location_id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      #{loc.location_id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {loc.area}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {loc.district}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                        {loc.zone}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {loc.latitude ? `${loc.latitude}, ${loc.longitude}` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {loc.active_outages > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          <span>{loc.active_outages} ACTIVE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Normal</span>
                        </span>
                      )}
                    </td>
                  </tr>
                )))
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
