import React, { useState, useRef } from 'react';
import { MessageSquarePlus, Camera, Image, X, CheckCircle2 } from 'lucide-react';

/**
 * 📝 Feature: Electrical Complaint Filing Card with Camera Photo Proof
 */
export const ComplaintFilingCard = ({
  category,
  onCategoryChange,
  description,
  onDescriptionChange,
  submitting,
  successMessage,
  onSubmit
}) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
    if (!submitting) {
      setTimeout(() => setPhotoPreview(null), 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-sky-600" />
          <span>Submit Electrical Complaint</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          File low voltage, transformer sparks, or damaged wiring issues
        </p>

        {successMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Issue Category *
            </label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            >
              <option value="power_outage">Power Outage</option>
              <option value="low_voltage">Low Voltage</option>
              <option value="transformer">Transformer Sparks / Smoke</option>
              <option value="damaged_wire">Damaged / Hanging Cable</option>
              <option value="pole">Electric Pole Damaged</option>
              <option value="other">Other Concern</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Description / Landmark *
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="e.g. Near House 12, Road 4. The pole transformer is emitting sparks."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* 📸 Camera Photo Proof Feature */}
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Hazard Photo Proof (Camera / Gallery)
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-slate-100 max-h-36">
                <img
                  src={photoPreview}
                  alt="Incident Proof"
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-1 left-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">
                  📸 Photo Attached
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 border border-dashed border-sky-400 bg-sky-50/50 hover:bg-sky-50 text-sky-700 rounded-xl font-medium flex items-center justify-center gap-2 transition"
              >
                <Camera className="w-4 h-4 text-sky-600" />
                <span>Take Photo / Attach Hazard Image</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm transition disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'File Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};
