import React, { useState } from 'react';
import { 
  Building, 
  User, 
  Mail, 
  PhoneCall, 
  MessageCircle, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Play, 
  Network, 
  Volume2, 
  Layers 
} from 'lucide-react';
import { useCrmStore } from '../store/useCrmStore';
import { MOCK_CUSTOMERS } from '../data/mockCrmData';
import { WhatsAppIcon, MinioIcon } from './Icons';

export default function Customer360View() {
  const { activeCustomerId, setDialerOpen } = useCrmStore();
  const customer = MOCK_CUSTOMERS.find((c) => c.id === activeCustomerId) || MOCK_CUSTOMERS[0];
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    'Overview',
    'Timeline',
    'Deals',
    'Communications',
    'Calls (MinIO)',
    'Tickets',
    'Relationship Graph',
    'AI Insights',
  ];

  if (!customer) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6 flex items-center justify-center min-h-[400px]">
        <p className="text-slate-500 font-medium text-sm">No customer data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Customer 360 Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {customer.name}
              </h2>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                {customer.tier}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span className="font-semibold text-slate-700">{customer.title}</span> • 
              <span>{customer.company}</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {customer.location} • {customer.industry}
            </p>
          </div>
        </div>

        {/* Vital Score Pills & Quick Trigger */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="p-2.5 px-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <span className="text-[10px] text-emerald-700 font-bold block uppercase tracking-wider">Health Score</span>
            <span className="text-lg font-extrabold text-emerald-800">{customer.healthScore}/100</span>
          </div>

          <div className="p-2.5 px-3 bg-blue-50 border border-blue-200 rounded-2xl text-center">
            <span className="text-[10px] text-blue-700 font-bold block uppercase tracking-wider">Account Value</span>
            <span className="text-lg font-extrabold text-blue-800 font-mono">{customer.accountValue}</span>
          </div>

          <button
            onClick={() => setDialerOpen(true)}
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2 transition-all active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Customer</span>
          </button>
        </div>
      </div>

      {/* NEXT BEST ACTION CARD (Requirement 10) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border border-amber-300 rounded-2xl p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              AI Next Best Action
            </span>
            <span className="text-xs font-bold text-slate-900">
              {customer.nextBestAction?.action}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            <strong>Why:</strong> {customer.nextBestAction?.reason}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setDialerOpen(true)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Now</span>
          </button>
          <button className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200">
            Create Task
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 overflow-x-auto flex items-center gap-2">
        {tabs.map((tab) => {
          const id = tab.toLowerCase().split(' ')[0];
          const isSelected = activeTab === id;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(id)}
              className={`py-2 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Deal Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Active Deal Pipeline
            </span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">{customer.currentDeal?.title}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg font-extrabold text-emerald-600 font-mono">
                  {customer.currentDeal?.value}
                </span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {customer.currentDeal?.stage}
                </span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex justify-between">
              <span>Win Probability: <strong>{customer.currentDeal?.winProbability}</strong></span>
              <span>Target: <strong>{customer.currentDeal?.closeDate}</strong></span>
            </div>
          </div>

          {/* AI Recommended Talking Points */}
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200/80 space-y-2 lg:col-span-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI Recommended Talking Points
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {customer.recommendedTalkingPoints?.map((tp, idx) => (
                <li key={idx} className="leading-relaxed">{tp}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: Unified Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-3">
          {customer.timeline?.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
              <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs">
                {item.type === 'call' && '📞'}
                {item.type === 'whatsapp' && '💬'}
                {item.type === 'email' && '📧'}
                {item.type === 'ticket' && '🎫'}
                {item.type === 'meeting' && '📅'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                {item.audioUri && (
                  <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-xs font-mono">
                    <MinioIcon className="w-3.5 h-3.5" />
                    <span>Saved to MinIO: {item.audioUri}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT 3: Relationship Graph (Visual Entity Tree) */}
      {activeTab === 'relationship' && (
        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <Network className="w-4 h-4" />
            <span>Customer 360° Visual Relationship Graph</span>
          </div>

          <div className="space-y-3 pl-4 border-l-2 border-blue-500/40">
            <div>
              <span className="text-slate-400">Company Node:</span>{' '}
              <strong className="text-white text-sm">{customer.relationshipGraph?.company}</strong>
            </div>
            <div className="pl-4 border-l border-slate-700">
              <span className="text-slate-400">↓ Key Decision Makers:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {customer.relationshipGraph?.people.map((p, i) => (
                  <span key={i} className="bg-slate-800 px-2 py-0.5 rounded text-blue-300">{p}</span>
                ))}
              </div>
            </div>
            <div className="pl-4 border-l border-slate-700">
              <span className="text-slate-400">↓ Active Deals:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {customer.relationshipGraph?.deals.map((d, i) => (
                  <span key={i} className="bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded text-emerald-300">{d}</span>
                ))}
              </div>
            </div>
            <div className="pl-4 border-l border-slate-700">
              <span className="text-slate-400">↓ Communication Logs:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {customer.relationshipGraph?.comms.map((c, i) => (
                  <span key={i} className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{c}</span>
                ))}
              </div>
            </div>
            <div className="pl-4 border-l border-slate-700">
              <span className="text-slate-400">↓ MinIO Document Objects:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {customer.relationshipGraph?.documents.map((doc, i) => (
                  <span key={i} className="bg-blue-950/80 border border-blue-500/40 px-2 py-0.5 rounded text-blue-300">{doc}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
