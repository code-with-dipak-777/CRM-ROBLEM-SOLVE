import React, { useState } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  Gem, 
  AlertOctagon, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useCrmStore } from '../store/useCrmStore';
import { MOCK_RADAR_DATA } from '../data/mockCrmData';

export default function OpportunityRadar() {
  const { setActiveCustomer, setActiveLead, setDialerOpen } = useCrmStore();
  const [activeFilter, setActiveFilter] = useState('all');

  const stats = [
    { id: 'hot', label: 'HOT LEADS', count: 0, icon: Flame, color: 'text-rose-500 bg-rose-50 border-rose-200', pill: 'bg-rose-500' },
    { id: 'risk', label: 'AT-RISK DEALS', count: 0, icon: AlertTriangle, color: 'text-amber-500 bg-amber-50 border-amber-200', pill: 'bg-amber-500' },
    { id: 'upsell', label: 'UPSELL OPP.', count: 0, icon: Gem, color: 'text-blue-500 bg-blue-50 border-blue-200', pill: 'bg-blue-500' },
    { id: 'churn', label: 'CHURN RISK', count: 0, icon: AlertOctagon, color: 'text-purple-500 bg-purple-50 border-purple-200', pill: 'bg-purple-500' },
    { id: 'followup', label: 'FOLLOW-UPS', count: 0, icon: PhoneCall, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', pill: 'bg-emerald-500' },
  ];

  const radarItems = activeFilter === 'all'
    ? MOCK_RADAR_DATA.items
    : MOCK_RADAR_DATA.items.filter((item) => item.type === activeFilter);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Opportunity Radar & Attention Matrix
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Real-Time AI Telemetry
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Automated prioritization detecting revenue risks, high-velocity leads, and churn precursors
          </p>
        </div>
      </div>

      {/* 5 Big Stat Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map((s) => {
          const Icon = s.icon;
          const isSelected = activeFilter === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setActiveFilter(activeFilter === s.id ? 'all' : s.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                  : 'border-slate-200/80 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-bold tracking-wider ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {s.label}
                </span>
                <span className={`w-2 h-2 rounded-full ${s.pill}`} />
              </div>
              <div className="flex items-baseline justify-between">
                <span className={`text-2xl font-extrabold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {s.count}
                </span>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-300' : 'text-slate-400'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Actionable Records List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Active Radar Targets ({radarItems.length})</span>
          <span className="text-slate-400 font-normal">Click any target to inspect Customer 360 or trigger call</span>
        </div>

        <div className="space-y-2.5">
          {radarItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 whitespace-nowrap ${
                  item.type === 'hot' ? 'bg-rose-100 text-rose-700' :
                  item.type === 'risk' ? 'bg-amber-100 text-amber-700' :
                  item.type === 'upsell' ? 'bg-blue-100 text-blue-700' :
                  item.type === 'churn' ? 'bg-purple-100 text-purple-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {item.category}
                </span>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 font-mono block">
                    {item.value}
                  </span>
                  <span className="text-[10px] font-semibold text-rose-500">
                    {item.urgency}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (item.type === 'followup') setDialerOpen(true);
                    else if (item.type === 'hot') setActiveLead('lead-1');
                    else setActiveCustomer('cust-1');
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Resolve</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
