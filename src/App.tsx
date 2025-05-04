import { useState, useEffect } from 'react';
import { Desktop } from './components/desktop/Desktop';
import './App.css';

function App() {
  const [bootPhase, setBootPhase] = useState<'bios' | 'boot' | 'desktop' | 'shutdown'>('bios');

  // Boot sequence simulation
  useEffect(() => {
    const biosTimer = setTimeout(() => {
      setBootPhase('boot');
      
      const bootTimer = setTimeout(() => {
        setBootPhase('desktop');
      }, 2000);
      
      return () => clearTimeout(bootTimer);
    }, 1000);
    
    return () => clearTimeout(biosTimer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black font-win95">
      {bootPhase === 'bios' && (
        <div className="w-full h-full text-white p-4 flex flex-col">
          <div className="text-xl mb-4">System BIOS</div>
          <div className="text-sm mb-2">Portfolio OS v1.0</div>
          <div className="text-sm mb-4">© 2025</div>
          
          <div className="mt-auto text-sm">
            <div>Checking memory... OK</div>
            <div>Detecting drives... OK</div>
            <div>Loading system... OK</div>
            <div className="mt-2">Press DEL to enter setup</div>
            <div className="mt-6 animate-pulse">Starting Portfolio OS...</div>
          </div>
        </div>
      )}
      
      {bootPhase === 'boot' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-win95-blue w-[320px] h-[200px] flex flex-col justify-center items-center p-4">
              <div className="flex items-center mb-4">
                <div className="text-4xl text-white mr-2">🪟</div>
                <div className="text-white text-xl font-bold">Portfolio OS</div>
              </div>
              <div className="w-full h-4 retro-inset bg-gray-200 mt-4">
                <div className="bg-win95-blue h-full animate-[progress_3s_ease-in-out]" style={{width: '100%'}}></div>
              </div>
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
