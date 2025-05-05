import React, { useState } from 'react';
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
  // Track drag vs. click
  const [mouseDownPos, setMouseDownPos] = useState<{ x: number, y: number } | null>(null);
  const clickThreshold = 5; // Pixels of movement before considering it a drag

  const handleIconMouseDown = (e: React.MouseEvent) => {
    // Record starting position
    setMouseDownPos({ x: e.clientX, y: e.clientY });

    // Forward to parent's onMouseDown handler
    if (onMouseDown) {
      onMouseDown(e);
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    // If we don't have a starting position, something went wrong
    if (!mouseDownPos) return;

    // Check if mouse moved more than threshold (means it was a drag, not a click)
    const deltaX = Math.abs(e.clientX - mouseDownPos.x);
    const deltaY = Math.abs(e.clientY - mouseDownPos.y);

    // Only trigger click if movement was minimal
    if (deltaX <= clickThreshold && deltaY <= clickThreshold) {
      if (onClick) onClick();
    }

    // Reset
    setMouseDownPos(null);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center p-1 rounded cursor-pointer w-[70px]",
        "focus:outline-none desktop-icon",
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
      onClick={handleIconClick}
      onMouseDown={handleIconMouseDown}
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