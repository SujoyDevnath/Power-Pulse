import React, { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ConfidenceBadge } from './ConfidenceBadge';

/**
 * 🗺️ OutageMap Component (Interactive Leaflet Map)
 * ============================================================================
 * Key Enhancements:
 * 1. ESRI World Street Map: Clean, high-definition English typography without font/box (tofu) errors.
 * 2. AutoFitBounds: Automatically zooms and centers the viewport to frame all Dhaka locations perfectly.
 * 3. Permanent Area Labels: Every marker displays its area name (e.g. "Mirpur-10", "Dhanmondi 32")
 *    directly on the map so users never have to guess or click to see the area name.
 * 4. Pulsing Red Pin with Confidence Score for blackouts vs Green Pin for online feeders.
 * ============================================================================
 */

// Helper component: Automatically frames the map to fit all locations comfortably
function AutoFitBounds({ locations = [] }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const valid = locations.filter((l) => l.latitude && l.longitude);
    if (valid.length > 0) {
      const bounds = L.latLngBounds(valid.map((l) => [l.latitude, l.longitude]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [locations, map]);
  return null;
}

// Helper to create modern SVG HTML markers
const createCustomMarker = (hasOutage, confidenceScore = 0) => {
  if (hasOutage) {
    return L.divIcon({
      className: 'custom-outage-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;">
          <!-- Pulsing Wave Animation -->
          <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: rgba(239, 68, 68, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <!-- Center Pin Icon -->
          <div style="position: relative; width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #ef4444, #b91c1c); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.5); border: 2.5px solid #ffffff; color: white;">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <!-- Tiny Score Pill -->
          <span style="position: absolute; top: -8px; background-color: #ef4444; color: #ffffff; font-size: 10px; font-weight: 800; padding: 1px 5px; border-radius: 9999px; border: 1.5px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;">
            ${confidenceScore}%
          </span>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -22]
    });
  }

  // Normal / Online Pin
  return L.divIcon({
    className: 'custom-online-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
        <div style="width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #047857); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4); border: 2px solid #ffffff; color: white;">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export const OutageMap = ({
  locations = [],
  activeIncidents = [],
  height = '440px',
  center = [23.785, 90.395], // Dhaka center
  zoom = 13
}) => {
  // Map incident lookup by location_id
  const incidentByLocation = useMemo(() => {
    const map = new Map();
    activeIncidents.forEach((inc) => {
      map.set(Number(inc.location_id), inc);
    });
    return map;
  }, [activeIncidents]);

  return (
    <div
      style={{ height, width: '100%' }}
      className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <AutoFitBounds locations={locations} />

        {/* 🗺️ High-Resolution ESRI World Street Map (Clean English typography, no boxes/tofu, no watermark) */}
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Street Map'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
        />

        {locations.map((loc) => {
          if (!loc.latitude || !loc.longitude) return null;

          const activeOutage = incidentByLocation.get(Number(loc.location_id));
          const hasOutage = Boolean(activeOutage);
          const icon = createCustomMarker(hasOutage, activeOutage?.confidence_score || 0);

          return (
            <Marker
              key={loc.location_id}
              position={[loc.latitude, loc.longitude]}
              icon={icon}
            >
              {/* 🏷️ Permanent Area Name Tag on the Map */}
              <Tooltip
                permanent
                direction="bottom"
                offset={[0, 14]}
                className="powerpulse-area-tooltip"
              >
                <div className="flex items-center gap-1">
                  {hasOutage && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                  <span className={hasOutage ? 'text-red-700 font-bold' : 'text-slate-800 font-semibold'}>
                    {loc.area}
                  </span>
                </div>
              </Tooltip>

              <Popup className="powerpulse-map-popup">
                <div className="p-1 space-y-2 text-xs" style={{ minWidth: '190px' }}>
                  <div className="border-b border-slate-100 pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {loc.district} • {loc.zone}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                      {loc.area}
                    </h4>
                  </div>

                  {hasOutage ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          Power Outage
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          #{activeOutage.incident_id}
                        </span>
                      </div>
                      <div className="pt-1">
                        <ConfidenceBadge
                          score={activeOutage.confidence_score}
                          classification={activeOutage.classification}
                        />
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {activeOutage.total_reports || 0} reports from {activeOutage.reporting_users || 0} residents.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold py-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Power Grid Normal & Online</span>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex justify-between font-mono">
                    <span>{loc.latitude?.toFixed(4)}°N</span>
                    <span>{loc.longitude?.toFixed(4)}°E</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200/90 shadow-lg text-[11px] space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-bold text-red-700">Active Outage Area</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="font-medium text-slate-700">Grid Normal (Online)</span>
        </div>
      </div>
    </div>
  );
};
