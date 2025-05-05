import { useState, useEffect } from 'react';
import { Desktop } from './components/desktop/Desktop';
import './App.css';

function App() {
  const [bootPhase, setBootPhase] = useState<'bios' | 'boot' | 'desktop' | 'shutdown'>('bios');
  const [visibleLines, setVisibleLines] = useState<number>(0);

  // Boot sequence simulation
  useEffect(() => {
    const biosTimer = setTimeout(() => {
      setBootPhase('boot');
      
      const bootTimer = setTimeout(() => {
        setBootPhase('desktop');
      }, 2000);
      
      return () => clearTimeout(bootTimer);
    }, 3500); // Increased to allow time for all lines to appear
    
    return () => clearTimeout(biosTimer);
  }, []);

  // Sequential appearance of BIOS lines
  useEffect(() => {
    if (bootPhase !== 'bios') return;

    // Show lines sequentially
    const maxLines = 3; // Number of check lines
    
    if (visibleLines < maxLines) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 500); // 0.5 second interval
      
      return () => clearTimeout(timer);
    }
    
    // Add a delay before showing "Press DEL" and "Starting" messages
    if (visibleLines === maxLines) {
      const finalTimer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 400);
      
      return () => clearTimeout(finalTimer);
    }
    
  }, [bootPhase, visibleLines]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black font-win95">
      {bootPhase === 'bios' && (
        <div className="w-full h-full text-white p-4 flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <div className="text-2xl mb-4">System BIOS</div>
            <div className="text-sm mb-2">Hugo Nicolau OS v1.0</div>
            <div className="text-sm mb-6">© 2025</div>
          </div>
          
          <div className="text-sm text-center">
            {visibleLines >= 1 && <div>Checking memory... OK</div>}
            {visibleLines >= 2 && <div>Detecting drives... OK</div>}
            {visibleLines >= 3 && <div>Loading system... OK</div>}
            {visibleLines >= 4 && (
              <>
                <div className="mt-2">Press DEL to enter setup</div>
                <div className="mt-6 animate-pulse">Starting Hugo Nicolau OS...</div>
              </>
            )}
          </div>
        </div>
      )}
      
      {bootPhase === 'boot' && (
        <div className="absolute inset-0 flex items-center justify-center boot-screen">
          <div className="text-center">
            <div className="bg-win95-blue w-[320px] h-[220px] flex flex-col justify-center items-center p-6 rounded">
              <div className="flex items-center mb-8">
                <div className="text-4xl text-white mr-3">🪟</div>
                <div className="text-white text-2xl font-bold">Hugo Nicolau OS</div>
              </div>
              
              {/* Progress bar with proper margins */}
              <div className="w-[80%] h-6 retro-inset bg-gray-200 mt-4">
                {/* Animated progress bar */}
                <div className="loading-bar bg-win95-blue h-full" style={{width: '0%'}}></div>
              </div>
              
              {/* Loading text below progress bar */}
              <div className="text-white text-sm mt-4">Loading system files...</div>
            </div>
          </div>
        </div>
      )}
      
      {bootPhase === 'desktop' && (
        <div className="crt-on absolute inset-0">
          <Desktop />
        </div>
      )}
    </div>
  );
}

export default App;
