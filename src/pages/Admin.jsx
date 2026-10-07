import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Sparkles, 
  Users, 
  TrendingUp, 
  IndianRupee, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  CheckCircle2, 
  ExternalLink,
  BarChart3,
  PieChart,
  LogOut,
  Sliders,
  Filter,
  X,
  Crown,
  FileCheck2,
  Lock,
  ArrowUpRight,
  Landmark,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import Toast from '../components/common/Toast';
import confetti from 'canvas-confetti';

export default function Admin() {
  const { allSchemes, addScheme, updateScheme, deleteScheme, addToast, logout } = useApp();
  const navigate = useNavigate();

  // Search & Filter for Schemes Management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'schemes' | 'audit'

  // Modal State for Add / Edit Scheme
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchemeId, setEditingSchemeId] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    shortName: '',
    department: 'Ministry of MSME, Govt of India',
    nodalAgency: 'KVIC / State DIC',
    sector: 'Food Processing & Agro',
    maxFunding: '₹25 Lakh',
    subsidyRate: 'Up to 35% Credit-linked Capital Subsidy',
    marginMoney: '5% for SC/ST/Women/OBC; 10% for General',
    description: '',
    officialPortal: 'https://www.jansamarth.in'
  };

  const [formData, setFormData] = useState(initialFormState);

  // Filtered schemes
  const filteredSchemes = allSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.shortName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scheme.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (scheme.provider && scheme.provider.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === 'All' || scheme.sector.includes(selectedSector);
    return matchesSearch && matchesSector;
  });

  const handleOpenAddModal = () => {
    setEditingSchemeId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (scheme) => {
    setEditingSchemeId(scheme.id);
    setFormData({
      name: scheme.name || '',
      shortName: scheme.shortName || '',
      department: scheme.department || '',
      nodalAgency: scheme.nodalAgency || '',
      sector: scheme.sector || '',
      maxFunding: scheme.maxFunding || '',
      subsidyRate: scheme.subsidyRate || '',
      marginMoney: scheme.marginMoney || '',
      description: scheme.description || '',
      officialPortal: scheme.officialPortal || 'https://www.jansamarth.in'
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Please enter a valid scheme name', 'error');
      return;
    }

    if (editingSchemeId) {
      updateScheme(editingSchemeId, formData);
    } else {
      addScheme({
        ...formData,
        id: `scheme-${Date.now()}`
      });
    }

    setIsModalOpen(false);
    setEditingSchemeId(null);
  };

  const handleDeleteScheme = (id, name) => {
    if (window.confirm(`Are you sure you want to remove scheme "${name}"?`)) {
      deleteScheme(id);
    }
  };

  const handleAdminLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col overflow-y-auto overscroll-contain">
      {/* Top Sovereign Tiranga Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF671F] via-[#F59E0B] to-[#046A38] shrink-0"></div>

      {/* DEDICATED GOVERNMENT ADMIN HEADER (ZERO USER DETAILS) */}
      <header className="bg-slate-900 border-b border-amber-500/30 text-white sticky top-0 z-40 shadow-md shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left: Official Government Seal & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md font-bold">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                    SchemeMatch <span className="text-xs bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">AI</span>
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase">
                    Admin Console
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-300 font-medium hidden sm:block">
                  Ministry of MSME · Government of India (SIH26092)
                </p>
              </div>
            </div>

            {/* Right: Live Status & Admin Profile Details */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-300 font-medium">Gateway:</span>
                <span className="text-emerald-400 font-bold">JanSamarth & KVIC Live</span>
              </div>

              {/* Admin Identity (Only Admin details) */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-amber-500/40">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white leading-tight">
                    Rajesh Sharma, Joint Secretary
                  </div>
                  <div className="text-[10px] text-amber-300 font-medium">
                    Directorate of MSME Policy
                  </div>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 rounded-xl transition"
                title="Sign Out of Admin Console"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-24 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'analytics'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>National Impact & Demographics</span>
            </button>

            <button
              onClick={() => setActiveTab('schemes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'schemes'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Scheme Catalog & Parameters ({allSchemes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'audit'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Audit & KYC Linkages</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-semibold px-3 py-1 bg-slate-100 rounded-xl hidden md:inline">
            Admin Jurisdiction: All 28 States & 8 UTs
          </span>
        </div>

        {/* 4 High-Level Key Performance Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Beneficiaries</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">14,820</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+18.4% MoM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Marginalized & rural entrepreneurs onboarded</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subsidies Unlocked</span>
              <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">₹48.60 Cr</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">35% Max Cap</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Capital subsidies sanctioned via Lead Banks</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Schemes</span>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{allSchemes.length} Schemes</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Central & State</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Integrated with JanSamarth & KVIC APIs</p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Match Accuracy</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">94.8%</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Rule Traced</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Zero black-box classification fidelity</p>
          </div>
        </div>

        {/* TAB 1: ANALYTICS & 3 IMPACT GRAPHS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* GRAPH 1: Beneficiary Demographics & Social Category Breakdown */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                        <PieChart className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Graph 1: Beneficiary Profile Demographics</h3>
                        <p className="text-[11px] text-slate-500">Inclusion of marginalized & rural applicants</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Category Bars */}
                  <div className="mt-5 space-y-3.5 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                          Women Entrepreneurs
                        </span>
                        <span className="font-bold text-slate-900">38% (5,631)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
                          SC / ST Entrepreneurs
                        </span>
                        <span className="font-bold text-slate-900">34% (5,038)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '34%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                          OBC & Rural Youth
                        </span>
                        <span className="font-bold text-slate-900">20% (2,964)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-slate-700 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                          General / Minorities / PwD
                        </span>
                        <span className="font-bold text-slate-900">8% (1,187)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Rural vs Urban Split Meter */}
                  <div className="mt-6 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                      <span>Geographic Spread:</span>
                      <span className="text-emerald-700">68% Rural Priority</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 flex overflow-hidden">
                      <div className="bg-emerald-600 h-3" style={{ width: '68%' }} title="Rural: 68%"></div>
                      <div className="bg-blue-600 h-3" style={{ width: '32%' }} title="Urban: 32%"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500 mt-1.5">
                      <span>🌾 Rural Beneficiaries: 68%</span>
                      <span>🏢 Urban Beneficiaries: 32%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Verified via Aadhaar e-KYC</span>
                  <span className="font-bold text-slate-700">100% Social Audit Ready</span>
                </div>
              </div>

              {/* GRAPH 2: Monthly Platform Impact & Subsidy Disbursal Trend */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Graph 2: Platform Impact & Monthly Beneficiary Growth</h3>
                        <p className="text-[11px] text-slate-500">Applications processed vs. Subsidies disbursed (Jan – Aug 2026)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      +142% Annual Growth
                    </span>
                  </div>

                  {/* SVG Visual Bar & Line Trend Chart */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded bg-amber-500 inline-block"></span> Applications Processed
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded bg-blue-600 inline-block"></span> Subsidies Sanctioned (₹ Cr)
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Monthly Run-rate</span>
                    </div>

                    {/* Histogram representation */}
                    <div className="grid grid-cols-8 gap-2 items-end h-44 pt-4 border-b border-slate-200">
                      {[
                        { month: 'Jan', apps: 45, disbursal: 2.8, appCount: '920' },
                        { month: 'Feb', apps: 55, disbursal: 3.4, appCount: '1,140' },
                        { month: 'Mar', apps: 68, disbursal: 4.6, appCount: '1,420' },
                        { month: 'Apr', apps: 72, disbursal: 5.2, appCount: '1,650' },
                        { month: 'May', apps: 80, disbursal: 6.1, appCount: '1,920' },
                        { month: 'Jun', apps: 88, disbursal: 7.8, appCount: '2,210' },
                        { month: 'Jul', apps: 94, disbursal: 8.9, appCount: '2,640' },
                        { month: 'Aug', apps: 100, disbursal: 9.8, appCount: '2,920' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end group relative">
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition bg-slate-900 text-white text-[9.5px] px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                            {item.month}: {item.appCount} applicants (₹{item.disbursal} Cr)
                          </div>
                          <div className="w-full flex items-end justify-center gap-1 h-full">
                            <div 
                              className="w-1/2 bg-amber-400 group-hover:bg-amber-500 rounded-t transition-all" 
                              style={{ height: `${item.apps}%` }}
                            ></div>
                            <div 
                              className="w-1/2 bg-blue-600 group-hover:bg-blue-700 rounded-t transition-all" 
                              style={{ height: `${(item.disbursal / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 mt-1">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Avg. Sanction Time: <strong className="text-slate-800">11.4 Days</strong> (vs 45 Days manual)</span>
                  <span className="text-emerald-700 font-bold">74% Turnaround Acceleration</span>
                </div>
              </div>

            </div>

            {/* GRAPH 3: Sectoral Scheme Utilization & Capital Allocation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Graph 3: Sectoral Adoption & Scheme Utilization Volume</h3>
                    <p className="text-[11px] text-slate-500">Distribution across major manufacturing and service verticals</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700">Total: ₹48.60 Crore</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>🌾 Food & Agro</span>
                    <span className="text-amber-800">₹18.40 Cr</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5">38% total share · PMFME & PMEGP</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>🧵 Textiles & Handloom</span>
                    <span className="text-indigo-800">₹14.20 Cr</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '29%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5">29% total share · Stand-Up India</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>💻 Agritech & IT Services</span>
                    <span className="text-blue-800">₹9.60 Cr</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5">20% total share · MUDRA & CGTMSE</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>⚙️ Micro-Manufacturing</span>
                    <span className="text-emerald-800">₹6.40 Cr</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '13%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5">13% total share · PM Vishwakarma</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SCHEME MANAGEMENT (ADD / UPDATE / DELETE SCHEMES) */}
        {activeTab === 'schemes' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-6 animate-in fade-in duration-150">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-600" />
                  <span>Central & State Scheme Catalog Management</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add new welfare schemes, modify subsidy slabs, or update compliance criteria in real-time.
                </p>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Government Scheme</span>
              </button>
            </div>

            {/* Search & Sector Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search schemes by name, department, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="All">All Sectors</option>
                <option value="Food Processing">Food Processing & Agro</option>
                <option value="Textiles">Textiles & Handloom</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Services">Services & IT</option>
              </select>
            </div>

            {/* Schemes Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Scheme Name & Ministry</th>
                    <th className="py-3 px-4">Eligible Sector</th>
                    <th className="py-3 px-4">Max Funding</th>
                    <th className="py-3 px-4">Capital Subsidy</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSchemes.map((scheme) => (
                    <tr key={scheme.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-xs">{scheme.name}</div>
                        <div className="text-[11px] text-slate-500">{scheme.department}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[10px]">
                          {scheme.sector?.split('&')[0]}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {scheme.maxFunding}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                          {scheme.subsidyRate}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(scheme)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Scheme Details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteScheme(scheme.id, scheme.name)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Remove Scheme"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: AUDIT & KYC VERIFICATION LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-600" />
                  <span>National Compliance & Lead Bank Audit Trail</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated OCR validation, Aadhaar e-KYC tokens, and District Level Task Force (DLTFC) clearance logs.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                100% Immutable Audit
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { time: '10:45 AM Today', district: 'Coimbatore, Tamil Nadu', event: 'PMFME Capital Subsidy DPR clearance', bank: 'Canara Bank Lead Branch', status: 'Approved (₹3.5L Subsidy)' },
                { time: '10:12 AM Today', district: 'Madurai, Tamil Nadu', event: 'Stand-Up India Women Composite Sanction', bank: 'State Bank of India', status: 'Sanctioned (₹18.0L Loan)' },
                { time: '09:30 AM Today', district: 'Bengaluru Urban, Karnataka', event: 'CGTMSE Collateral-Free Guarantee Seed', bank: 'Union Bank of India', status: 'Guarantee Token Issued' },
                { time: 'Yesterday', district: 'Ernakulam, Kerala', event: 'PM-SVANidhi SHG Group Linkage Verified', bank: 'Kerala Gramin Bank', status: 'Disbursed' }
              ].map((log, index) => (
                <div key={index} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <div>
                      <p className="font-bold text-slate-900">{log.event}</p>
                      <p className="text-[11px] text-slate-500">{log.district} · {log.bank}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-medium">{log.time}</span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL: ADD / EDIT SCHEME FACILITY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
            
            <div className="px-6 py-5 bg-gradient-to-r from-slate-950 to-amber-950 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingSchemeId ? 'Edit Scheme Parameters' : 'Add New Government Scheme'}
                </h3>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Changes update eligibility rules & match scores across all active users
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Scheme Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. PM Formalisation of Micro Food Processing Enterprises (PMFME)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Code / Acronym</label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    placeholder="e.g. PMFME Scheme"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Sector</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  >
                    <option value="Food Processing & Agro">Food Processing & Agro</option>
                    <option value="Textiles & Handloom">Textiles & Handloom</option>
                    <option value="Information Technology & Agritech">Information Technology & Agritech</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Services & Software">Services & Software</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nodal Ministry / Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Ministry of Food Processing Industries"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nodal Agency</label>
                  <input
                    type="text"
                    value={formData.nodalAgency}
                    onChange={(e) => setFormData({ ...formData, nodalAgency: e.target.value })}
                    placeholder="e.g. MOFPI & State Nodal Agency (SNA)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Maximum Loan / Funding Limit</label>
                  <input
                    type="text"
                    value={formData.maxFunding}
                    onChange={(e) => setFormData({ ...formData, maxFunding: e.target.value })}
                    placeholder="e.g. Up to ₹50 Lakh"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Capital Subsidy Rate (%)</label>
                  <input
                    type="text"
                    value={formData.subsidyRate}
                    onChange={(e) => setFormData({ ...formData, subsidyRate: e.target.value })}
                    placeholder="e.g. Up to 35% (Max ₹10 Lakh)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Scheme Overview & Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe target beneficiary profile, benefits, and sanction conditions..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Portal URL</label>
                <input
                  type="url"
                  value={formData.officialPortal}
                  onChange={(e) => setFormData({ ...formData, officialPortal: e.target.value })}
                  placeholder="https://www.jansamarth.in"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-extrabold rounded-xl shadow-xs transition"
                >
                  {editingSchemeId ? 'Save Scheme Updates' : 'Publish & Activate Scheme'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <Toast />
    </div>
  );
}
