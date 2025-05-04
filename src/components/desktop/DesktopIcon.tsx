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
        "flex flex-col items-center p-1 rounded cursor-pointer w-[70px]", 
        "focus:outline-none focus:bg-win95-blue focus:text-white",
        "hover:bg-win95-blue/30 active:bg-win95-blue active:text-white",
        className
      )}
      onClick={onClick}
      tabIndex={0}
    >
      <div className="w-10 h-10 mb-1 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-white text-center text-xs bg-transparent px-1 w-full break-words shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
        {name}
      </span>
    </div>
  );
}