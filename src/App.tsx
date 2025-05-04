import { useState, useEffect } from 'react';
import { Desktop } from './components/desktop/Desktop';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate boot screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second boot screen
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {isLoading ? (
        // Boot screen
        <div className="bg-black h-full w-full flex flex-col items-center justify-center text-white font-mono animate-pulse">
          <div className="text-2xl mb-4">Starting Windows 95...</div>
          <div>© 2025 - Retro Portfolio OS</div>
        </div>
      ) : (
        // Desktop environment
        <Desktop />
      )}
    </div>
  );
}

export default App;
