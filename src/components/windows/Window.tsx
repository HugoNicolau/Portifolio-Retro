import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  initialPosition?: { x: number; y: number };
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
}

export function Window({
  title,
  children,
  isActive = true,
  initialPosition = { x: 50, y: 50 },
  onClose,
  onMinimize,
  onMaximize,
  className,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);

  // Drag start handler
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    
    // Prevent text selection during drag
    e.preventDefault();
  };

  // Drag handler
  const handleDrag = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  // Drag end handler
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Set up event listeners for drag
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging]);

  // Handle window maximize toggle
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  return (
    <div
      className={cn(
        "absolute shadow-window bg-retro-window border-2 border-retro-border",
        isMaximized ? "inset-0 m-0" : "w-[400px] h-[300px]",
        !isActive && "opacity-90",
        isDragging && "cursor-grabbing",
        className
      )}
      style={isMaximized ? {} : { left: position.x, top: position.y }}
    >
      {/* Window titlebar */}
      <div
        className={cn(
          "bg-retro-taskbar h-7 flex items-center justify-between px-2",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleDragStart}
      >
        <div className="font-bold text-sm">{title}</div>
        <div className="flex gap-1">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="bg-retro-window p-0.5 w-5 h-5 flex items-center justify-center"
            >
              <Minus size={12} />
            </button>
          )}
          <button
            onClick={handleMaximize}
            className="bg-retro-window p-0.5 w-5 h-5 flex items-center justify-center"
          >
            <Square size={12} />
          </button>
          <button
            onClick={onClose}
            className="bg-retro-window p-0.5 w-5 h-5 flex items-center justify-center text-black hover:text-red-600"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      
      {/* Window content */}
      <div className="p-3 h-[calc(100%-28px)] overflow-auto">
        {children}
      </div>
    </div>
  );
}