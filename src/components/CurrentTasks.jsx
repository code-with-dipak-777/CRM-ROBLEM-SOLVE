import React, { useState } from 'react';
import { Search, Clock, MoreHorizontal, ChevronDown } from 'lucide-react';
import { AudioWaveIcon, TerminalIcon } from './Icons';
import gsap from 'gsap';

const initialTasks = [];

export default function CurrentTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('Week');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const handleRowHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      backgroundColor: isEnter ? 'rgba(248, 250, 252, 0.9)' : 'transparent',
      x: isEnter ? 2 : 0,
      duration: 0.15,
      ease: 'power1.out',
    });
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const isDone = t.status === 'Done';
          return {
            ...t,
            status: isDone ? 'In progress' : 'Done',
            statusDotColor: isDone ? 'bg-[#F97316]' : 'bg-[#10B981]',
          };
        }
        return t;
      })
    );
  };

  return (
    <div className="mt-7 px-2 sm:px-6 pb-1">
      {/* Header and Filter */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-3">
          <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">
            Current Tasks
          </h3>
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-full px-2.5 py-0.5 select-none">
            Done 30%
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-1 px-3 py-1 bg-slate-100/90 hover:bg-slate-200/80 rounded-full text-[12px] font-semibold text-slate-700 transition-colors cursor-pointer select-none"
          >
            <span>{filter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {openDropdown && (
            <div className="absolute right-0 top-8 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-30 min-w-[100px]">
              {['Today', 'Week', 'Month'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setFilter(opt);
                    setOpenDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-slate-50 transition-colors ${
                    filter === opt ? 'font-bold text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Rows */}
      <div className="space-y-1">
        {tasks.map((task) => {
          const IconComponent = task.icon;
          return (
            <div
              key={task.id}
              onMouseEnter={(e) => handleRowHover(e, true)}
              onMouseLeave={(e) => handleRowHover(e, false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-2xl transition-all duration-150 group cursor-pointer"
            >
              {/* Task Left: Icon & Title */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${task.iconBg}`}
                >
                  <IconComponent className="w-[17px] h-[17px] stroke-[2]" />
                </div>
                <span className="text-[13px] font-semibold text-slate-900 truncate">
                  {task.title}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="w-28 flex items-center gap-2 flex-shrink-0">
                <span className={`w-2 h-2 rounded-full ${task.statusDotColor}`} />
                <span className="text-[12px] text-slate-700 font-medium select-none">
                  {task.status}
                </span>
              </div>

              {/* Time Spent */}
              <div className="flex items-center gap-1.5 text-slate-600 text-[12px] font-medium w-16 justify-end flex-shrink-0">
                <Clock className="w-3.5 h-3.5 stroke-[1.8] text-slate-400" />
                <span>{task.time}</span>
              </div>

              {/* Options */}
              <div className="relative pl-4 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === task.id ? null : task.id);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {activeMenuId === task.id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-8 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-30 min-w-[130px]"
                  >
                    <button
                      onClick={() => {
                        toggleTaskStatus(task.id);
                        setActiveMenuId(null);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[12px] text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Mark as {task.status === 'Done' ? 'In progress' : 'Done'}
                    </button>
                    <button
                      onClick={() => setActiveMenuId(null)}
                      className="w-full text-left px-3 py-1.5 text-[12px] text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Edit details
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
