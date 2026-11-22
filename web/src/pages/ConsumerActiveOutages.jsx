import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { StatusBadge } from '../components/StatusBadge';
import { OutageMap } from '../components/OutageMap';
import { 
  AlertOctagon, RefreshCw, CheckCircle2, Clock, 
  MapPin, Users, Map as MapIcon, LayoutGrid, Search
} from 'lucide-react';

export const ConsumerActiveOutages = () => {
  const [incidents, setIncidents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('both'); // 'both', 'map', 'list'

  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [sortBy, setSortBy] = useState('confidence-desc');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [incRes, locRes] = await Promise.all([
        api.get('/incidents/active'),
        api.get('/locations')
      ]);
      setIncidents(incRes.data.incidents || []);
      setLocations(locRes.data.locations || []);
    } catch (err) {
      console.error('Error fetching active outages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter(i => {
      if (classFilter !== 'all' && (i.classification || '').toLowerCase() !== classFilter.toLowerCase()) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = String(i.incident_id || '').toLowerCase().includes(q);
        const matchArea = (i.area || '').toLowerCase().includes(q);
        const matchDistrict = (i.district || '').toLowerCase().includes(q);
        const matchZone = (i.zone || '').toLowerCase().includes(q);
        if (!matchId && !matchArea && !matchDistrict && !matchZone) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'confidence-desc') return (b.confidence_score || 0) - (a.confidence_score || 0);
      if (sortBy === 'reports-desc') return (b.total_reports || 0) - (a.total_reports || 0);
      if (sortBy === 'newest') return new Date(b.start_time) - new Date(a.start_time);
      if (sortBy === 'area-asc') return (a.area || '').localeCompare(b.area || '');
      return 0;
    });
  }, [incidents, searchQuery, classFilter, sortBy]);

  const hasActiveFilters = searchQuery.trim() !== '' || classFilter !== 'all' || sortBy !== 'confidence-desc';

  const clearFilters = () => {
    setSearchQuery('');
    setClassFilter('all');
    setSortBy('confidence-desc');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Outages Nearby</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time interactive municipal map of corroborated power failures across Dhaka
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs text-xs font-semibold text-slate-600">
            <button
              onClick={() => setViewMode('both')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                viewMode === 'both' ? 'bg-sky-50 text-sky-700 font-bold' : 'hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition ${
                viewMode === 'map' ? 'bg-sky-50 text-sky-700 font-bold' : 'hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-sky-50 text-sky-700 font-bold' : 'hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>

          <button
            onClick={fetchData}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs transition"
            title="Refresh Grid Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 🗺️ 1. Interactive Leaflet Map View */}
      {(viewMode === 'both' || viewMode === 'map') && (
        <div className="space-y-2">
          <OutageMap
            locations={locations}
            activeIncidents={incidents}
            height="390px"
          />
        </div>
      )}

      {/* 📋 2. Incidents Cards Grid */}
      {(viewMode === 'both' || viewMode === 'list') && (
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 text-base">All Municipal Zones Online</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                There are currently no active community-wide electricity outages detected across Dhaka.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by area, district, zone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                    />
                  </div>

                  <div>
                    <select
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 capitalize font-medium transition"
                    >
                      <option value="all">All Classifications</option>
                      <option value="confirmed">Confirmed Outages</option>
                      <option value="probable">Probable Outages</option>
                      <option value="possible">Possible Outages</option>
                      <option value="low">Low Severity</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700 font-medium transition"
                    >
                      <option value="confidence-desc">Highest Confidence</option>
                      <option value="reports-desc">Most Reports</option>
                      <option value="newest">Recently Detected</option>
                      <option value="area-asc">Area (A-Z)</option>
                    </select>

                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition whitespace-nowrap"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Showing <strong>{filteredIncidents.length}</strong> of <strong>{incidents.length}</strong> active outages</span>
                {hasActiveFilters && <span className="text-sky-600 font-medium">Filters active</span>}
              </div>

              {filteredIncidents.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm">
                  <p className="font-semibold text-slate-600 mb-0.5 text-xs">No active outages match your filter</p>
                  <p className="text-[11px] text-slate-400">Try adjusting your search query or reset the filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredIncidents.map((incident) => (
                    <div
                      key={incident.incident_id}
                      className="bg-white rounded-2xl p-5 border border-red-200/80 shadow-sm space-y-4 hover:border-red-300 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                            <AlertOctagon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{incident.area}</h3>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{incident.district} • {incident.zone}</span>
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={incident.type} />
                      </div>

                      <div className="pt-2">
                        <ConfidenceBadge
                          score={incident.confidence_score}
                          classification={incident.classification}
                        />
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Users className="w-4 h-4 text-sky-600" />
                          <span>{incident.total_reports} reports ({incident.reporting_users} users)</span>
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            Started:{' '}
                            {new Date(incident.start_time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
