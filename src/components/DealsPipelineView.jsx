import React, { useState } from 'react';
import { 
  Plus, 
  PhoneCall, 
  Mail, 
  ArrowRight, 
  Building, 
  User 
} from 'lucide-react';
import { WhatsAppIcon } from './Icons';

const initialDeals = [];

const STAGES = [
  { id: 'qualification', label: '1. Lead Qualification', color: 'border-blue-400 bg-blue-50/20' },
  { id: 'proposal', label: '2. Proposal Sent', color: 'border-purple-400 bg-purple-50/20' },
  { id: 'negotiation', label: '3. Negotiation & Security', color: 'border-amber-400 bg-amber-50/20' },
  { id: 'closed_won', label: '4. Closed Won (Signed)', color: 'border-emerald-400 bg-emerald-50/20' },
];

export default function DealsPipelineView({ onOpenDialer }) {
  const [deals, setDeals] = useState(initialDeals);

  const moveDealStage = (dealId, currentStage) => {
    const stageIds = STAGES.map(s => s.id);
    const currIdx = stageIds.indexOf(currentStage);
    const nextIdx = (currIdx + 1) % stageIds.length;
    const nextStage = stageIds[nextIdx];

    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: nextStage } : d));
  };

  const totalPipelineValue = deals.reduce((acc, d) => acc + d.rawAmount, 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Pipeline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Opportunity & Deal Pipeline
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Total Value: ${totalPipelineValue.toLocaleString()}
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            5-Stage opportunity conversion tracking linked to omni-channel customer touchpoints
          </p>
        </div>

        <button 
          onClick={() => {
            const newTitle = prompt('Enter Deal Title:', 'New Cloud Infrastructure Deal');
            if (newTitle) {
              const newDeal = {
                id: `deal-${Date.now()}`,
                title: newTitle,
                company: 'Acme Global',
                contact: 'Alex Rivera',
                amount: '$50,000',
                rawAmount: 50000,
                stage: 'qualification',
                probability: '30%',
                dueDate: '15 June, 2026',
                owner: 'Megan Norton',
              };
              setDeals([...deals, newDeal]);
            }
          }}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Opportunity</span>
        </button>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.rawAmount, 0);

          return (
            <div key={stage.id} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200/60">
                  <span className="text-xs font-bold text-slate-800">
                    {stage.label}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.2 rounded-full">
                    ${(stageTotal / 1000).toFixed(0)}k
                  </span>
                </div>

                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-shadow space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {deal.title}
                        </h4>
                        <span className="text-xs font-bold text-emerald-600 font-mono whitespace-nowrap">
                          {deal.amount}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span className="font-semibold text-slate-700">{deal.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{deal.contact}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={onOpenDialer}
                            className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                            title="Call customer via WebRTC"
                          >
                            <PhoneCall className="w-3 h-3" />
                          </button>
                          <button
                            className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                            title="Message on WhatsApp Cloud API"
                          >
                            <WhatsAppIcon className="w-3 h-3" />
                          </button>
                          <button
                            className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 flex items-center justify-center transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => moveDealStage(deal.id, deal.stage)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <span>Next</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="py-6 text-center text-xs text-slate-400 italic">
                      No deals in this stage
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
