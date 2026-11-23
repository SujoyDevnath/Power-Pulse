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
    const valid = locations.filter((l) => !isNaN(parseFloat(l.latitude)) && !isNaN(parseFloat(l.longitude)));
    if (valid.length > 0) {
      const bounds = L.latLngBounds(valid.map((l) => [parseFloat(l.latitude), parseFloat(l.longitude)]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [locations, map]);
  return null;
}

// Helper to create modern SVG HTML markers
const createCustomMarker = (hasOutage, confidenceScore = 0) => {
  if (hasOutage) {
    // 🔴 1. Critical Blackout / Confirmed Outage (> 80%)
    if (confidenceScore > 80) {
      return L.divIcon({
        className: 'custom-outage-marker-red',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;">
            <!-- Pulsing Wave Animation Red -->
            <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: rgba(239, 68, 68, 0.45); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
            <!-- Center Pin Icon Red -->
            <div style="position: relative; width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #ef4444, #b91c1c); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.5); border: 2.5px solid #ffffff; color: white;">
              <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <!-- Score Pill Red -->
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

    // 🟡 2. Warning / Potential Outage (<= 80%)
    return L.divIcon({
      className: 'custom-outage-marker-warning',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;">
          <!-- Pulsing Wave Animation Amber/Warning -->
          <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: rgba(245, 158, 11, 0.45); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <!-- Center Pin Icon Amber -->
          <div style="position: relative; width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.5); border: 2.5px solid #ffffff; color: white;">
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <!-- Score Pill Amber/Warning -->
          <span style="position: absolute; top: -8px; background-color: #f59e0b; color: #ffffff; font-size: 10px; font-weight: 800; padding: 1px 5px; border-radius: 9999px; border: 1.5px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap;">
            ${confidenceScore}%
          </span>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -22]
    });
  }

  // 🟢 3. Normal / Online Pin
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
          const lat = parseFloat(loc.latitude);
          const lng = parseFloat(loc.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          const activeOutage = incidentByLocation.get(Number(loc.location_id));
          const hasOutage = Boolean(activeOutage);
          const score = Number(activeOutage?.confidence_score || 0);
          const isCriticalOutage = hasOutage && score > 80;
          const isWarningOutage = hasOutage && score <= 80;
          const icon = createCustomMarker(hasOutage, score);

          return (
            <Marker
              key={loc.location_id}
              position={[lat, lng]}
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
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCriticalOutage ? 'bg-red-500' : 'bg-amber-500'
                      } animate-pulse`}
                    ></span>
                  )}
                  <span
                    className={
                      !hasOutage
                        ? 'text-slate-800 font-semibold'
                        : isCriticalOutage
                        ? 'text-red-700 font-bold'
                        : 'text-amber-700 font-bold'
                    }
                  >
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
                        <span
                          className={`${
                            isCriticalOutage ? 'text-red-600' : 'text-amber-600'
                          } font-bold flex items-center gap-1`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCriticalOutage ? 'bg-red-500' : 'bg-amber-500'
                            } animate-pulse`}
                          ></span>
                          {isCriticalOutage ? 'Confirmed Outage' : 'Potential Outage / Warning'}
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
                    <span>{lat.toFixed(4)}°N</span>
                    <span>{lng.toFixed(4)}°E</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-[1000] bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-slate-200/90 shadow-md text-[10px] sm:text-[11px] space-y-1 sm:space-y-1.5 max-w-[85vw] pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
          <span className="font-bold text-red-700">Confirmed (&gt; 80%)</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
          <span className="font-semibold text-amber-700">Warning (&le; 80%)</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
          <span className="font-medium text-slate-700">Grid Normal</span>
        </div>
      </div>
    </div>
  );
};
