import React from 'react';
import { Search, ArrowUpDown, X, Filter, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getLocalizedSector } from '../../data/sectorTranslations';

export default function SchemeFilterBar({
  searchQuery,
  setSearchQuery,
  selectedSchemeType = 'all',
  setSelectedSchemeType,
  schemeTypeCounts = {},
  selectedSector,
  setSelectedSector,
  selectedFundingRange,
  setSelectedFundingRange,
  selectedMatchLevel,
  setSelectedMatchLevel,
  sortBy,
  setSortBy,
  onResetFilters,
  onSearch,
  totalResults
}) {
  const { t, currentLangCode } = useApp();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  const sectors = [
    'All Sectors',
    'Food Processing & Agro',
    'Textiles & Handloom',
    'Information Technology & Agritech',
    'Food Products & Spices',
    'Manufacturing',
    'Services & Software'
  ];

  const fundingRanges = [
    { label: t('allFundingAmounts') || 'All Funding Amounts', value: 'all' },
    { label: t('microFunding') || 'Micro (Up to ₹5 Lakh)', value: 'up_to_5l' },
    { label: t('mediumFunding') || 'Medium (₹5 Lakh to ₹25 Lakh)', value: '5l_to_25l' },
    { label: t('largeFunding') || 'Large (Above ₹25 Lakh)', value: 'above_25l' },
  ];

  const matchLevels = [
    { label: t('allMatchLevels') || 'All Match Levels', value: 'all' },
    { label: t('strongMatchesOnly') || 'Strong Matches (85%+)', value: 'strong' },
    { label: t('moderateMatchesOnly') || 'Moderate Matches (70-84%)', value: 'moderate' },
  ];

  const hasActiveFilters = searchQuery || selectedSchemeType !== 'all' || selectedSector !== 'All Sectors' || selectedFundingRange !== 'all' || selectedMatchLevel !== 'all';

  return (
    <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl mb-8 space-y-4">
      {/* Top Scheme Type Segmented Buttons: Government vs Private vs CSR */}
      {setSelectedSchemeType && (
        <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            {t('categoryLabel') || 'Category:'}
          </span>
          {[
            { id: 'all', label: t('allOpportunities') || 'All Opportunities', icon: '🌟', count: schemeTypeCounts?.all },
            { id: 'government', label: t('governmentSchemes') || 'Government Schemes', icon: '🏛️', count: schemeTypeCounts?.government },
            { id: 'private', label: t('privatePrograms') || 'Private Programs', icon: '🏢', count: schemeTypeCounts?.private },
            { id: 'csr', label: t('csrInitiatives') || 'CSR Initiatives', icon: '🤝', count: schemeTypeCounts?.csr }
          ].map((tab) => {
            const isActive = selectedSchemeType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSchemeType(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                    : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700/70'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('searchSchemesPrompt') || 'Search schemes by name, keyword, or subsidy...'}
            className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-slate-800/90 text-white border border-slate-700/80 rounded-2xl focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400/60 transition placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 p-1 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Action Button */}
        {onSearch && (
          <button
            type="button"
            onClick={onSearch}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>{t('searchSchemesBtn') || 'Search Schemes'}</span>
          </button>
        )}

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/90 border border-slate-700/80 rounded-2xl text-xs text-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-slate-400 hidden sm:inline">{t('sortByLabel') || 'Sort:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-amber-300 focus:outline-none cursor-pointer"
            >
              <option value="match_desc" className="bg-slate-900 text-white">{t('sortHighestMatch') || 'Highest AI Match'}</option>
              <option value="funding_desc" className="bg-slate-900 text-white">{t('sortFundingHighLow') || 'Max Funding: High to Low'}</option>
              <option value="funding_asc" className="bg-slate-900 text-white">{t('sortFundingLowHigh') || 'Max Funding: Low to High'}</option>
              <option value="name_asc" className="bg-slate-900 text-white">{t('sortNameAZ') || 'Scheme Name (A-Z)'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Badges and Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
        {/* Sector Filter */}
        <div>
          <label className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" />
            <span>{t('businessSectorLabel') || 'Business Sector'}</span>
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full p-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            {sectors.map((sec, idx) => (
              <option key={idx} value={sec} className="bg-slate-900 text-white">
                {getLocalizedSector(sec, currentLangCode)}
              </option>
            ))}
          </select>
        </div>

        {/* Funding Range Filter */}
        <div>
          <label className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            {t('fundingLimitLabel') || 'Funding Limit'}
          </label>
          <select
            value={selectedFundingRange}
            onChange={(e) => setSelectedFundingRange(e.target.value)}
            className="w-full p-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            {fundingRanges.map((range, idx) => (
              <option key={idx} value={range.value} className="bg-slate-900 text-white">
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Match Strength Filter */}
        <div>
          <label className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            {t('aiMatchStrengthLabel') || 'AI Match Strength'}
          </label>
          <select
            value={selectedMatchLevel}
            onChange={(e) => setSelectedMatchLevel(e.target.value)}
            className="w-full p-2.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            {matchLevels.map((lvl, idx) => (
              <option key={idx} value={lvl.value} className="bg-slate-900 text-white">
                {lvl.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Counter and Active Filter Pill Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">
            {t('showingMatchedCount') || 'Showing'}{' '}
            <strong className="text-amber-400 font-extrabold">{totalResults}</strong>{' '}
            {t('schemesMatchedText') || 'schemes matched to your profile'}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('resetAllFilters') || 'Reset all filters'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
