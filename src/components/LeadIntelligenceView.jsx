import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  User, 
  Building, 
  TrendingUp,
  Percent
} from 'lucide-react';
import { MOCK_LEADS } from '../data/mockCrmData';
import { WhatsAppIcon } from './Icons';
import { useCrmStore } from '../store/useCrmStore';

export default function LeadIntelligenceView() {
  const { setDialerOpen } = useCrmStore();
  const [selectedLead, setSelectedLead] = useState(MOCK_LEADS[0] || null);
  const [showExplanation, setShowExplanation] = useState(true);

  if (!selectedLead) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6 flex items-center justify-center min-h-[400px]">
        <p className="text-slate-500 font-medium text-sm">No lead intelligence data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            AI Lead Scoring & Intelligence Engine
            <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-600" />
              Machine Learning Predictive Scoring
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Real-time multi-signal scoring based on email clicks, WhatsApp velocity, company size, and budget intent
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Leads Table */}
        <div className="lg:col-span-2 space-y-3">
          <div className="space-y-2.5">
            {MOCK_LEADS.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  selectedLead.id === lead.id
                    ? 'border-blue-500 bg-blue-50/20 shadow-xs ring-2 ring-blue-400/20'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Lead Score Circle */}
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold font-mono text-sm shadow-2xs flex-shrink-0 ${
                    lead.score >= 90 ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                    lead.score >= 70 ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    <span>{lead.score}</span>
                    <span className="text-[8px] uppercase tracking-wider font-sans font-semibold">Score</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{lead.name}</h4>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        lead.status === 'HOT' ? 'bg-rose-100 text-rose-700' :
                        lead.status === 'WARM' ? 'bg-amber-100 text-amber-700' :
                        lead.status === 'COLD' ? 'bg-slate-100 text-slate-600' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{lead.title} • {lead.company}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Assigned to: <strong className="text-slate-700">{lead.assignedTo}</strong></p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-emerald-600 font-mono block">{lead.dealEstimate}</span>
                  <span className="text-[10px] text-slate-500">Conv. Prob: <strong>{lead.conversionProbability}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: AI Score Explanation Inspector */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-900">
                AI Score Explanation: {selectedLead.name}
              </h4>
            </div>
            <span className="text-xs font-bold font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              {selectedLead.score}/100
            </span>
          </div>

          <div className="text-xs text-slate-700">
            <strong>Why is this lead scored {selectedLead.score}?</strong>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Calculated using 42 behavioral telemetry signals across omni-channel engagement and firmographic fit:
            </p>
          </div>

          {/* Factor Breakdown */}
          <div className="space-y-2">
            {selectedLead.scoreExplanation?.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-700 font-medium leading-snug mr-2">{item.factor}</span>
                <span className={`font-mono font-bold whitespace-nowrap ${
                  item.weight.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {item.weight}
                </span>
              </div>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[11px] text-slate-500 block mb-2">
              Recommended Next Step: <strong className="text-slate-800">{selectedLead.nextAction}</strong>
            </span>
            <button
              onClick={() => setDialerOpen(true)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Lead Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
