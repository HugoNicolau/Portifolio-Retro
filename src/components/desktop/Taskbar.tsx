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
      "fixed bottom-0 left-0 right-0 h-[42px] bg-retro-taskbar border-t-2 border-white flex items-center z-50",
      className
    )}>
      {/* Start button - made significantly larger */}
      <button 
        className="h-[36px] flex items-center mx-1 px-3 font-bold text-base border-solid border-[2px]"
        style={{ borderColor: '#fff #808080 #808080 #fff', backgroundColor: '#c0c0c0' }}
      >
        <img 
          src="/windows-logo.png" 
          alt="Start" 
          className="w-6 h-6 mr-2" 
        />
        Start
      </button>

      {/* Taskbar buttons */}
      <div className="flex-grow flex items-center">
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

      {/* System tray with clock - larger and more readable */}
      <div 
        className="h-[36px] min-w-[110px] flex items-center justify-end px-3 border-solid border-[2px] mx-1"
        style={{ borderColor: '#808080 #fff #fff #808080', backgroundColor: '#c0c0c0' }}
      >
        <div className="text-black text-base font-medium">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}