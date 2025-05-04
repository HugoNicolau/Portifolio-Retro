import React from 'react';
import { cn } from '../../lib/utils';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function DesktopIcon({ 
  name, 
  icon, 
  onClick,
  className
}: DesktopIconProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center p-2 rounded hover:bg-white/10 transition-colors cursor-pointer w-20", 
        className
      )}
      onClick={onClick}
    >
      <div className="w-12 h-12 mb-1 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-white text-xs text-center bg-black/50 px-1 max-w-[76px] break-words">
        {name}
      </span>
    </div>
  );
}