import React, { useState } from 'react';
import Modal from '../common/Modal';
import { NEARBY_BANKS } from '../../data/mockCenters';
import { Building2, Phone, Mail, MapPin, Search, Star, ExternalLink, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BankFinderModal({ isOpen, onClose }) {
  const { currentProfile, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBanks = NEARBY_BANKS.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.supportedSchemes.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span>Nearby Participating Banks ({currentProfile.district})</span>
        </div>
      }
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-950">
          Showing accredited Lead MSME branches and Regional Rural Banks authorized to disburse <strong>PMEGP, Stand-Up India, MUDRA, and PMFME</strong> loans in <strong>{currentProfile.district}, {currentProfile.state}</strong>.
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bank by name or scheme (e.g. SBI, PMEGP, MUDRA)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30"
          />
        </div>

        {/* Bank List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {filteredBanks.map((bank) => (
            <div key={bank.id} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{bank.name}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {bank.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{bank.address} ({bank.distance} away)</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{bank.rating} / 5.0</span>
                </div>
              </div>

              {/* Supported Schemes */}
              <div className="py-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Supported Scheme Desks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {bank.supportedSchemes.map((scheme, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold">
                      {scheme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Branch Contact Details */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5 text-slate-600">
                  <p className="font-semibold text-slate-800">Desk Officer: {bank.contactPerson}</p>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {bank.phone}</span>
                    <span className="flex items-center gap-1 hidden md:flex"><Mail className="w-3 h-3 text-slate-400" /> {bank.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToast(`Appointment requested with ${bank.name}! Reference: BK-${Date.now().toString().slice(-4)}`, 'success')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-2xs transition"
                >
                  Book MSME Counseling
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
