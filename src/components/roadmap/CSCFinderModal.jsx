import React, { useState } from 'react';
import Modal from '../common/Modal';
import { NEARBY_CSC_CENTERS } from '../../data/mockCenters';
import { Building, Phone, MapPin, Search, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CSCFinderModal({ isOpen, onClose }) {
  const { currentProfile, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCenters = NEARBY_CSC_CENTERS.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.villageLocalBody.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-indigo-600" />
          <span>Nearby Common Service Centers (CSC / E-Sevai)</span>
        </div>
      }
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-200 text-xs text-indigo-950">
          Government authorized Village Level Entrepreneur (VLE) kiosks assisting with <strong>Aadhaar biometric KYC, PM Vishwakarma, Udyam registration, and digital document uploads</strong>.
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CSC Center by locality or Panchayat..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
          />
        </div>

        {/* Centers List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {filteredCenters.map((csc) => (
            <div key={csc.id} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{csc.name}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Active VLE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{csc.address} ({csc.distance} away)</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{csc.timing}</span>
                </div>
              </div>

              {/* Services Offered */}
              <div className="py-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  On-Site Assistance Available:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {csc.servicesOffered.map((service, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded text-[11px] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* VLE Contact & Action */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-slate-600">
                  <p className="font-semibold text-slate-800">VLE Lead: {csc.vleName}</p>
                  <p className="text-[11px] flex items-center gap-1 text-slate-500">
                    <Phone className="w-3 h-3 text-slate-400" /> {csc.phone}
                  </p>
                </div>

                <button
                  onClick={() => addToast(`Contact details and navigation SMS sent for ${csc.name}!`, 'success')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-2xs transition"
                >
                  Request VLE Callback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
