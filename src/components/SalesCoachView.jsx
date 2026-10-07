import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  DollarSign, 
  Zap, 
  UserCheck 
} from 'lucide-react';
import { MOCK_SALES_REPS } from '../data/mockCrmData';

export default function SalesCoachView() {
  const [selectedRep, setSelectedRep] = useState(MOCK_SALES_REPS[0] || null);

  if (!selectedRep) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6 flex items-center justify-center min-h-[400px]">
        <p className="text-slate-500 font-medium text-sm">No sales rep data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            AI Sales Coach & Behavioral Performance Analytics
            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Automated Rep Mentorship
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Real-time coaching evaluating response velocity, communication empathy, follow-up discipline, and quota pacing
          </p>
        </div>
      </div>

      {/* Rep Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_SALES_REPS.map((rep) => (
          <div
            key={rep.id}
            onClick={() => setSelectedRep(rep)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              selectedRep.id === rep.id
                ? 'border-purple-500 bg-purple-50/20 shadow-xs ring-2 ring-purple-400/20'
                : 'border-slate-200/80 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                <img src={rep.avatar} alt={rep.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{rep.name}</h4>
                <p className="text-[11px] text-slate-500">{rep.role}</p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full inline-block mt-1">
                  Quota: {rep.quotaAttainment}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-100">
              <div>Win Rate: <strong className="text-slate-900">{rep.winRate}</strong></div>
              <div>Avg Deal: <strong className="text-slate-900">{rep.avgDealSize}</strong></div>
              <div>Response: <strong className="text-slate-900">{rep.responseTime}</strong></div>
              <div>Discipline: <strong className="text-slate-900">{rep.followupDiscipline}</strong></div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed AI Coaching Dossier */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-sm text-slate-900">
              AI Sales Diagnostics: {selectedRep.name}
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700">
            Total Revenue Closed: {selectedRep.revenueGenerated}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Strengths */}
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1.5">
            <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Key Rep Strengths
            </span>
            <p className="text-slate-700 leading-relaxed">{selectedRep.strength}</p>
          </div>

          {/* Growth Area */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1.5">
            <span className="font-bold text-amber-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Area for Improvement
            </span>
            <p className="text-slate-700 leading-relaxed">{selectedRep.improvement}</p>
          </div>
        </div>

        {/* AI Actionable Coaching Recommendation */}
        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-xs space-y-1.5">
          <strong className="text-purple-900 font-bold block flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            AI Coach Recommendation:
          </strong>
          <p className="text-purple-800 leading-relaxed font-medium">
            {selectedRep.aiRecommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
