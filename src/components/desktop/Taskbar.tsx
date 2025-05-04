import React from 'react';
import { cn } from '../../lib/utils';

interface WindowItem {
  id: string;
  title: string;
  isMinimized?: boolean;
}

interface TaskbarProps {
  windows: WindowItem[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  className?: string;
}

export function Taskbar({ 
  windows, 
  activeWindow,
  onWindowClick, 
  className 
}: TaskbarProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-10 bg-retro-taskbar border-t-2 border-retro-border flex items-center px-2 z-50",
      className
    )}>
      <div className="flex space-x-1">
        {/* Start button */}
        <button className="bg-retro-window px-3 py-1 font-bold border-2 border-retro-border hover:bg-retro-window/90">
          Start
        </button>
        
        {/* Window buttons */}
        <div className="flex gap-1 ml-2">
          {windows.map((window) => (
            <button
              key={window.id}
              className={cn(
                "bg-retro-window px-3 py-1 border-2 border-retro-border min-w-[120px] text-left text-sm truncate",
                activeWindow === window.id && "bg-white"
              )}
              onClick={() => onWindowClick(window.id)}
            >
              {window.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Clock (right-aligned) */}
      <div className="ml-auto bg-retro-window px-2 py-1 border-2 border-retro-border text-sm">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}