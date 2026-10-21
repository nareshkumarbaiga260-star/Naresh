import React from 'react';
import { useApp } from '../context/AppContext';
import { Filter, RotateCcw, ArrowUpDown } from 'lucide-react';
import { STATES_LIST, QUALIFICATIONS_LIST } from '../data/initialData';

export const FiltersBar: React.FC = () => {
  const {
    filterState,
    setFilterState,
    filterQualification,
    setFilterQualification,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    resetFilters
  } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>सटीक फ़िल्टर (Refine Search)</span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
          title="सभी फ़िल्टर साफ़ करें"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>फ़िल्टर रीसेट</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* State Filter */}
        <div>
          <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">
            राज्य / क्षेत्र (State):
          </label>
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {STATES_LIST.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Qualification Filter */}
        <div>
          <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">
            न्यूनतम योग्यता (Qualification):
          </label>
          <select
            value={filterQualification}
            onChange={(e) => setFilterQualification(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {QUALIFICATIONS_LIST.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Application Status Filter */}
        <div>
          <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">
            आवेदन स्थिति (Application Status):
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="सभी">सभी स्थितियाँ (All)</option>
            <option value="Open">आवेदन चालू (Open)</option>
            <option value="Upcoming">आगामी (Upcoming)</option>
            <option value="Closed">समाप्त (Closed)</option>
          </select>
        </div>

        {/* Sorting Filter */}
        <div>
          <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">
            क्रमबद्ध करें (Sort By):
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="newest">नवीनतम अपडेट (Newest First)</option>
              <option value="ending-soon">अंतिम तिथि नजदीक (Ending Soon)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
