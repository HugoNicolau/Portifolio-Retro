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

  // Drag handlers remain unchanged
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    
    e.preventDefault();
  };

  const handleDrag = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

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

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize();
  };

  return (
    <div
      className={cn(
        "absolute",
        isMaximized ? "inset-0 m-0" : "w-[400px] h-[300px]",
        !isActive && "opacity-90",
        isDragging && "cursor-grabbing",
        className
      )}
      style={isMaximized ? {} : { left: position.x, top: position.y }}
    >
      {/* Outer border with classic Win95 beveled look */}
      <div className="w-full h-full flex flex-col border-solid border-[3px] box-border" 
           style={{ 
             borderColor: '#dfdfdf #000 #000 #dfdfdf',
             boxShadow: '1px 1px 0 0 rgba(0,0,0,0.3)'
           }}>
        {/* Inner border - the second bevel */}
        <div className="flex-grow flex flex-col border-solid border-[2px] box-border bg-retro-window"
             style={{ borderColor: '#fff #808080 #808080 #fff' }}>
          {/* Window titlebar */}
          <div
            className={cn(
              "flex items-center justify-between px-1",
              isDragging ? "cursor-grabbing" : "cursor-grab",
              isActive ? "bg-retro-taskbar text-white" : "bg-gray-400 text-gray-200"
            )}
            style={{ height: "22px" }}
            onMouseDown={handleDragStart}
          >
            {/* Windows 95/98 window icon and title */}
            <div className="flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                {/* Window icon would go here if you have one */}
              </div>
              <div className="font-bold text-sm truncate pr-1">{title}</div>
            </div>
            
            <div className="flex">
              {onMinimize && (
                <button
                  onClick={onMinimize}
                  className="w-[16px] h-[14px] flex items-center justify-center mr-1 border-solid border"
                  style={{ 
                    borderColor: '#fff #808080 #808080 #fff',
                    backgroundColor: '#c0c0c0'
                  }}
                >
                  <Minus size={8} className="text-black" />
                </button>
              )}
              <button
                onClick={handleMaximize}
                className="w-[16px] h-[14px] flex items-center justify-center mr-1 border-solid border"
                style={{ 
                  borderColor: '#fff #808080 #808080 #fff',
                  backgroundColor: '#c0c0c0'
                }}
              >
                <Square size={8} className="text-black" />
              </button>
              <button
                onClick={onClose}
                className="w-[16px] h-[14px] flex items-center justify-center border-solid border"
                style={{ 
                  borderColor: '#fff #808080 #808080 #fff',
                  backgroundColor: '#c0c0c0'
                }}
              >
                <X size={8} className="text-black" />
              </button>
            </div>
          </div>
          
          {/* Menu bar - typical in Win95 apps */}
          <div className="h-[20px] border-b border-gray-300 flex items-center px-1 text-xs text-black">
            <span className="mr-4 cursor-pointer hover:underline">File</span>
            <span className="mr-4 cursor-pointer hover:underline">Edit</span>
            <span className="mr-4 cursor-pointer hover:underline">View</span>
            <span className="mr-4 cursor-pointer hover:underline">Help</span>
          </div>
          
          {/* Window content with authentic inset look */}
          <div className="flex-grow p-2 overflow-auto border-solid border-[2px] m-2 bg-white"
               style={{ borderColor: '#808080 #fff #fff #808080' }}>
            {children}
          </div>
          
          {/* Status bar - common in Win95 apps */}
          <div className="h-[18px] px-2 text-xs flex items-center border-t border-gray-300 text-black">
            <div className="border-solid border mr-2 px-2 py-0 text-left flex-grow"
                 style={{ borderColor: '#808080 #fff #fff #808080', fontSize: '10px' }}>
              Ready
            </div>
            <div className="border-solid border px-1"
                 style={{ borderColor: '#808080 #fff #fff #808080', fontSize: '10px', width: '60px' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}