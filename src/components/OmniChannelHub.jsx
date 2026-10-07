import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Play, 
  Pause, 
  Download, 
  CheckCheck, 
  Send, 
  Paperclip, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Radio, 
  Sparkles 
} from 'lucide-react';
import { WhatsAppIcon, MinioIcon } from './Icons';

export default function OmniChannelHub({ currentRole, onOpenDialer }) {
  const [activeChannel, setActiveChannel] = useState('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [newReply, setNewReply] = useState('');

  const canDownloadRecordings = ['super_admin', 'admin', 'manager'].includes(currentRole);

  const [events, setEvents] = useState([]);

  const filteredEvents = activeChannel === 'all' 
    ? events 
    : events.filter(e => e.channel === activeChannel);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const newEvent = {
      id: `comm-${Date.now()}`,
      channel: activeChannel === 'all' ? 'whatsapp' : activeChannel,
      type: 'outbound',
      title: `${activeChannel === 'email' ? 'Email Sent' : activeChannel === 'sms' ? 'SMS Sent' : 'WhatsApp Message Sent'}`,
      contact: 'Margaret Evans',
      timestamp: 'Just now',
      content: newReply.trim(),
      status: 'Delivered',
    };

    setEvents([newEvent, ...events]);
    setNewReply('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Radio className="w-5 h-5 stroke-[2] animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Omni-Channel Communication Hub
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                All 4 Pipelines Active
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Voice (WebRTC & MinIO S3 Audio Storage), WhatsApp Cloud API, Email (SMTP/IMAP), and SMS Gateway
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDialer}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Launch WebRTC Softphone</span>
        </button>
      </div>

      {/* Channel Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Channels Feed', icon: Sparkles, count: events.length },
          { id: 'voice', label: 'Voice Calls (MinIO)', icon: PhoneCall, count: 1 },
          { id: 'whatsapp', label: 'WhatsApp Cloud API', icon: WhatsAppIcon, isCustomIcon: true, count: 1 },
          { id: 'email', label: 'Email (SMTP/IMAP)', icon: Mail, count: 1 },
          { id: 'sms', label: 'SMS Gateway', icon: MessageSquare, count: 1 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeChannel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveChannel(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {tab.isCustomIcon ? <Icon className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Communications Stream */}
      <div className="space-y-4">
        {filteredEvents.map((item) => (
          <div
            key={item.id}
            className="border border-slate-200/80 rounded-2xl p-4.5 bg-slate-50/40 hover:bg-slate-50/80 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {item.channel === 'voice' && (
                  <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </span>
                )}
                {item.channel === 'whatsapp' && (
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <WhatsAppIcon className="w-4 h-4" />
                  </span>
                )}
                {item.channel === 'email' && (
                  <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </span>
                )}
                {item.channel === 'sms' && (
                  <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                )}

                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    {item.title}
                    {item.type === 'inbound' ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                        <ArrowDownLeft className="w-3 h-3" /> Inbound
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                        <ArrowUpRight className="w-3 h-3" /> Outbound
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Contact: <strong className="text-slate-700">{item.contact}</strong>
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                {item.timestamp}
              </span>
            </div>

            {item.channel === 'voice' && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Call Audio Playback
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {isPlayingAudio ? '01:24' : '00:00'} / {item.duration}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full">
                          AI Sentiment: {item.sentiment}
                        </span>
                      </div>

                      <div className="flex items-center gap-0.5 mt-2 h-4 w-48 sm:w-64">
                        {[40, 60, 20, 80, 95, 45, 70, 85, 30, 90, 65, 50, 75, 40, 85, 95, 30, 60, 80, 45, 90].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`w-1 rounded-full transition-all ${
                              i <= 8
                                ? 'bg-blue-600'
                                : isPlayingAudio
                                ? 'bg-blue-400 animate-pulse'
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {canDownloadRecordings ? (
                      <button
                        onClick={() => alert(`Downloading recording from ${item.storageUri}`)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .wav</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                        Download Restricted
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
                  <div className="flex items-center gap-1.5">
                    <MinioIcon className="w-3.5 h-3.5" />
                    <span>Bucket: <strong className="text-slate-800">crm-recordings</strong></span>
                    <span className="text-slate-300">|</span>
                    <span>Path: {item.storageUri}</span>
                  </div>
                  <div>Size: <strong className="text-slate-800">{item.size}</strong></div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 font-semibold block mb-0.5">Automated Transcription Summary:</strong>
                  {item.summary}
                </div>
              </div>
            )}

            {item.channel === 'whatsapp' && (
              <div className="bg-emerald-50/50 rounded-2xl p-3.5 border border-emerald-100/80 space-y-2">
                <p className="text-xs text-slate-800 leading-relaxed">
                  {item.content}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-emerald-100">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCheck className="w-3.5 h-3.5" />
                    Status: {item.status}
                  </span>
                  <span className="font-mono">Meta Graph API v20.0</span>
                </div>
              </div>
            )}

            {item.channel === 'email' && (
              <div className="bg-purple-50/40 rounded-2xl p-3.5 border border-purple-100/80 space-y-2">
                <div className="text-xs font-semibold text-slate-900">
                  Subject: {item.subject}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {item.content}
                </p>
                {item.attachment && (
                  <div className="inline-flex items-center gap-1.5 bg-white border border-purple-200 text-purple-700 px-3 py-1 rounded-xl text-xs font-medium">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{item.attachment}</span>
                  </div>
                )}
              </div>
            )}

            {item.channel === 'sms' && (
              <div className="bg-amber-50/40 rounded-2xl p-3.5 border border-amber-100/80 space-y-1.5">
                <p className="text-xs text-slate-800 leading-relaxed">
                  {item.content}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-amber-100">
                  <span className="text-amber-800 font-semibold">{item.status}</span>
                  <span className="font-mono">{item.gateway}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Omni-Channel Dispatch Form */}
      <form onSubmit={handleSendReply} className="pt-2">
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 px-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-slate-400 transition-all">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder={`Dispatch omni-channel response via ${activeChannel === 'all' ? 'WhatsApp / Email / SMS' : activeChannel.toUpperCase()}...`}
            className="flex-1 bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Dispatch</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
