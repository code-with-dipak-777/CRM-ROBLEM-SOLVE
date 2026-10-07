import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  PhoneCall, 
  Copy, 
  Check, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Clock, 
  MessageSquare,
  Zap
} from 'lucide-react';
import { useCrmStore } from '../store/useCrmStore';
import { WhatsAppIcon, MinioIcon } from './Icons';

export default function AiCopilotPanel() {
  const { 
    isCopilotOpen, 
    setCopilotOpen, 
    copilotMessages, 
    addCopilotMessage, 
    setDialerOpen, 
    setActiveTab, 
    setActiveCustomer 
  } = useCrmStore();

  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  if (!isCopilotOpen) {
    return (
      <button
        onClick={() => setCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform border-2 border-white group"
      >
        <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
      </button>
    );
  }

  const handleSendPrompt = (promptText) => {
    const query = promptText || inputVal;
    if (!query.trim()) return;

    // Add user message
    addCopilotMessage({
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    });

    setInputVal('');

    // Generate context-aware AI response based on query
    setTimeout(() => {
      addCopilotMessage({
        sender: 'ai',
        text: `Processed query: "${query}". No data available in the current CRM instance.`,
        timestamp: 'Just now',
        actions: [],
      });
    }, 400);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[90vw] sm:w-[420px] h-[550px] bg-white shadow-2xl border border-slate-200 rounded-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-blue-950 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              AI Customer Copilot
              <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                Active
              </span>
            </h3>
            <p className="text-[10px] text-slate-300">
              Context-Aware Customer Intelligence & Next Best Action Engine
            </p>
          </div>
        </div>

        <button
          onClick={() => setCopilotOpen(false)}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 bg-slate-50 border-b border-slate-200/80 overflow-x-auto flex items-center gap-2">
        {[
          'Tell me about the last customer interaction',
          'Which customers need attention today?',
          'Summarize open deals',
          'Show upsell candidates',
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(prompt)}
            className="text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {copilotMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.sender === 'user' ? (
              <div className="bg-slate-900 text-white rounded-2xl rounded-tr-xs p-3 text-xs max-w-[85%] leading-relaxed shadow-sm">
                {msg.text}
              </div>
            ) : msg.isStructured ? (
              /* Structured AI Intelligence Dossier */
              <div className="bg-slate-50 border border-blue-200/80 rounded-2xl p-4 text-xs space-y-3.5 w-full shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-900 text-sm">
                      {msg.customerName}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Sentiment: {msg.sentiment}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-white rounded-xl border border-slate-200/70">
                    <span className="text-slate-400 block text-[10px]">Current Deal:</span>
                    <strong className="text-slate-900">{msg.currentDeal}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200/70">
                    <span className="text-slate-400 block text-[10px]">Deal Value:</span>
                    <strong className="text-emerald-600 font-mono">{msg.dealValue}</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 text-[11px] space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Last Communication:</span>
                  </div>
                  <p className="text-slate-700">{msg.lastComm}</p>
                </div>

                <div className="space-y-1 text-[11px]">
                  <strong className="text-slate-800 block font-semibold">Unresolved Issues:</strong>
                  <p className="text-slate-600">{msg.unresolvedIssues}</p>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <strong className="text-slate-800 block font-semibold">Recommended Talking Points:</strong>
                  <ul className="space-y-1 list-disc list-inside text-slate-700">
                    {msg.talkingPoints.map((tp, idx) => (
                      <li key={idx} className="leading-snug">{tp}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Next Action */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <strong className="text-emerald-900 font-bold block mb-1">
                    🔥 Recommended Next Action:
                  </strong>
                  <p className="text-emerald-800 font-medium mb-2.5">
                    {msg.recommendedAction}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        setCopilotOpen(false);
                        setDialerOpen(true);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call Rahul via WebRTC</span>
                    </button>
                    <button
                      onClick={() => {
                        setCopilotOpen(false);
                        setActiveCustomer('cust-1');
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg text-[11px] border border-slate-200 transition-colors"
                    >
                      <span>View Customer 360°</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Regular Text Response */
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 text-xs text-slate-800 max-w-[95%] space-y-2 leading-relaxed shadow-2xs">
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.actions && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (act.includes('Customer 360')) setActiveCustomer('cust-2');
                          else if (act.includes('Softphone')) setDialerOpen(true);
                          else if (act.includes('Radar')) setActiveTab('radar');
                          else if (act.includes('Inbox')) setActiveTab('inbox');
                        }}
                        className="text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors flex items-center gap-1"
                      >
                        <span>{act}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendPrompt(); }} className="p-3 border-t border-slate-200 bg-white">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 px-3 flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-400">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Copilot about customer, deal, or action..."
            className="flex-1 bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-7 h-7 rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
