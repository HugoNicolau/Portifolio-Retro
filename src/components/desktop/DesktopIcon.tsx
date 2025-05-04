import React from 'react';
import { cn } from '../../lib/utils';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  className?: string;
  isDragging?: boolean;
  isSelected?: boolean;
}

export function DesktopIcon({ 
  name, 
  icon, 
  onClick,
  onMouseDown,
  className,
  isDragging = false,
  isSelected = false
}: DesktopIconProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center p-1 rounded cursor-pointer w-[70px]", 
        "focus:outline-none",
        {
          "focus:bg-win95-blue focus:text-white": !isDragging,
          "hover:bg-win95-blue/30": !isDragging && !isSelected,
          "active:bg-win95-blue active:text-white": !isDragging,
          "opacity-70": isDragging,
          "z-50": isDragging,
          "bg-win95-blue text-white": isSelected
        },
        className
      )}
      onClick={onClick}
      onMouseDown={onMouseDown}
      tabIndex={0}
      style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
    >
      <div className="w-10 h-10 mb-1 flex items-center justify-center">
        {icon}
      </div>
      <span className={cn(
        "text-center text-xs bg-transparent px-1 w-full break-words shadow-[0_1px_1px_rgba(0,0,0,0.7)]",
        {
          "text-white": isSelected || isDragging,
          "bg-win95-blue": isDragging || isSelected
        }
      )}>
        {name}
      </span>
    </div>
  );
}