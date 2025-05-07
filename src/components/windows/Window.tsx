import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { VscChromeMinimize, VscChromeClose, VscChromeRestore } from "react-icons/vsc";

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
  // Store previous position before maximizing to restore when un-maximizing
  const [preMaximizePosition, setPreMaximizePosition] = useState(initialPosition);

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

  // Update handleMaximize to save the current position before maximizing
  const handleMaximize = () => {
    if (!isMaximized) {
      // Save current position before maximizing
      setPreMaximizePosition(position);
    }
    console.log(preMaximizePosition);
    // Toggle maximized state
    setIsMaximized(!isMaximized);
    
    // Call the onMaximize callback if provided
    if (onMaximize) onMaximize();
  };

  return (
    <div
      className={`absolute window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''} ${className}`}
      style={{
        // When maximized, position at 0,0 and take full desktop width/height 
        // (excluding the taskbar height)
        ...(isMaximized 
          ? { 
              left: 0, 
              top: 0, 
              width: '100%', 
              height: 'calc(100% - 32px)', // Leave space for taskbar
              transition: 'all 0.2s ease'
            }
          : { 
              left: position.x, 
              top: position.y,
              transition: 'all 0.2s ease'
            }
        )
      }}
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
              "flex items-center justify-between px-2", // increased padding
              isDragging ? "cursor-grabbing" : "cursor-grab",
              isActive ? "bg-retro-taskbar text-white" : "bg-gray-400 text-gray-200"
            )}
            style={{ height: "28px" }} // increased from 22px to 28px
            onMouseDown={handleDragStart}
          >
            {/* Windows 95/98 window icon and title */}
            <div className="flex items-center">
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                {/* Window icon would go here if you have one */}
              </div>
              <div className="font-bold text-base truncate pr-1">{title}</div> {/* Increased from text-sm to text-base */}
            </div>
            
            <div className="flex">
              {onMinimize && (
                <button
                  onClick={onMinimize}
                  className="w-[22px] h-[20px] flex items-center justify-center mr-2 border-solid border" // increased size
                  style={{ 
                    borderColor: '#fff #808080 #808080 #fff',
                    backgroundColor: '#c0c0c0'
                  }}
                >
                  <VscChromeMinimize 
                    size={12} // increased from 8
                    className="text-black" 
                    style={{ 
                      display: 'block',
                      margin: '0 auto',
                      minWidth: '12px', // increased from 8px
                      minHeight: '12px', // increased from 8px
                      strokeWidth: 1,
                      fill: 'currentColor',
                      opacity: 1
                    }} 
                  />
                </button>
              )}
              <button
                onClick={handleMaximize}
                className="w-[22px] h-[20px] flex items-center justify-center mr-2 border-solid border" // increased size
                style={{ 
                  borderColor: '#fff #808080 #808080 #fff',
                  backgroundColor: '#c0c0c0'
                }}
              >
                <VscChromeRestore 
                  size={14} // increased from 10
                  className="text-black" 
                  style={{ 
                    display: 'block', 
                    margin: '0 auto',
                    minWidth: '14px', // increased from 10px
                    minHeight: '14px', // increased from 10px
                    strokeWidth: 1,
                    fill: 'currentColor',
                    opacity: 1
                  }} 
                />
              </button>
              <button
                onClick={onClose}
                className="w-[22px] h-[20px] flex items-center justify-center border-solid border" // increased size
                style={{ 
                  borderColor: '#fff #808080 #808080 #fff',
                  backgroundColor: '#c0c0c0'
                }}
              >
                <VscChromeClose 
                  size={12} // increased from 8
                  className="text-black" 
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    minWidth: '12px', // increased from 8px
                    minHeight: '12px', // increased from 8px
                    strokeWidth: 1,
                    fill: 'currentColor',
                    opacity: 1
                  }}
                />
              </button>
            </div>
          </div>
          
          {/* Menu bar - typical in Win95 apps */}
          <div className="h-[32px] border-b border-gray-300 flex items-center px-3 text-black">
            {/* Using inline styles instead of Tailwind classes for precise control */}
            <span className="cursor-pointer hover:underline text-base" style={{ marginRight: '24px' }}>File</span>
            <span className="cursor-pointer hover:underline text-base" style={{ marginRight: '24px' }}>Edit</span>
            <span className="cursor-pointer hover:underline text-base" style={{ marginRight: '24px' }}>View</span>
            <span className="cursor-pointer hover:underline text-base">Help</span>
          </div>
          
          {/* Window content with authentic inset look */}
          <div className="window-content p-3 overflow-auto retro-inset bg-white text-black" style={{ height: 'calc(100% - 28px)' }}> {/* adjusted padding and height calculation */}
            {children}
          </div>
          
          {/* Status bar - common in Win95 apps */}
          <div className="h-[28px] px-3 flex items-center border-t border-gray-300 text-black"> {/* increased height and padding */}
            <div className="border-solid border-[2px] mr-3 px-3 py-1 text-left flex-grow"
                 style={{ borderColor: '#808080 #fff #fff #808080', fontSize: '14px' }}> {/* increased font size, border, padding */}
              Ready
            </div>
            <div className="border-solid border-[2px] px-3 py-1"
                 style={{ borderColor: '#808080 #fff #fff #808080', fontSize: '14px', width: '90px' }}> {/* increased font size, width, border, padding */}
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}