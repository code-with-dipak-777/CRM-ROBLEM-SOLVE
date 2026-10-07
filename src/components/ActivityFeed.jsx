import React, { useState, useRef } from 'react';
import { Paperclip, Smile, Mic, ArrowDown, Send } from 'lucide-react';
import { FigmaIcon } from './Icons';
import gsap from 'gsap';

export default function ActivityFeed() {
  const [messages, setMessages] = useState([]);

  const [inputVal, setInputVal] = useState('');
  const feedListRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      user: 'Megan Norton',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
      statusColor: 'bg-[#F43F5E]',
      time: 'Just now',
      action: 'Commented on',
      project: 'Stark Project',
      type: 'comment',
      text: inputVal.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');

    setTimeout(() => {
      if (feedListRef.current) {
        const lastEl = feedListRef.current.lastElementChild;
        if (lastEl) {
          gsap.fromTo(
            lastEl,
            { opacity: 0, y: 15, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }
          );
        }
      }
    }, 50);
  };

  return (
    <div className="mt-6 flex flex-col justify-between flex-1">
      <div>
        {/* Activity Title */}
        <h4 className="text-[13px] font-semibold text-slate-700 text-center mb-5 select-none">
          Activity
        </h4>

        {/* Activity Feed */}
        <div ref={feedListRef} className="space-y-4">
          {messages.map((item) => (
            <div key={item.id} className="group">
              {/* User row */}
              <div className="flex items-start gap-2.5">
                <div className="relative flex-shrink-0 mt-0.5">
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-slate-200">
                    <img
                      src={item.avatar}
                      alt={item.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${item.statusColor} border-2 border-white`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-slate-900 truncate">
                      {item.user}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight truncate">
                    {item.action}{' '}
                    <span className="text-blue-500 font-medium hover:underline cursor-pointer">
                      {item.project}
                    </span>
                  </p>
                </div>
              </div>

              {/* Comment Bubble */}
              {item.type === 'comment' && (
                <div className="ml-10 mt-2 relative">
                  <div className="bg-[#EBF2FC] text-slate-800 text-[12px] leading-relaxed p-3 rounded-2xl rounded-tl-sm relative">
                    {item.text}
                    {item.reaction && (
                      <span className="absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-slate-100/80 flex items-center justify-center text-[11px] select-none">
                        {item.reaction}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* File Attachment */}
              {item.type === 'file' && (
                <div className="ml-10 mt-2">
                  <div className="bg-[#EBF2FC] hover:bg-[#E2EDFA] transition-colors rounded-2xl p-2.5 px-3 flex items-center justify-between group/file cursor-pointer">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#111827] flex items-center justify-center flex-shrink-0">
                        <FigmaIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-[12px] font-bold text-slate-900 block truncate">
                          {item.fileName}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {item.fileSize}
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-6 h-6 rounded-full border border-blue-400 text-blue-500 flex items-center justify-center flex-shrink-0 hover:bg-blue-500 hover:text-white transition-all ml-2"
                      title="Download file"
                    >
                      <ArrowDown className="w-3 h-3 stroke-[2.2]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Write a message input field */}
      <form onSubmit={handleSendMessage} className="mt-6">
        <div className="bg-[#F4F5F7] rounded-full p-2 px-3.5 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-blue-400/30 transition-all">
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4 stroke-[2]" />
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Write a message"
            className="flex-1 bg-transparent text-[12px] text-slate-800 placeholder-slate-400 focus:outline-none min-w-0"
          />

          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
            title="Add emoji"
          >
            <Smile className="w-4 h-4 stroke-[2]" />
          </button>

          {inputVal.trim() ? (
            <button
              type="submit"
              className="text-blue-500 hover:text-blue-600 transition-colors p-0.5"
              title="Send message"
            >
              <Send className="w-4 h-4 stroke-[2]" />
            </button>
          ) : (
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
              title="Voice note"
            >
              <Mic className="w-4 h-4 stroke-[2]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
