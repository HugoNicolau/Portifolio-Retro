import React, { useEffect, useState } from 'react';
import { useWindows } from '../../hooks/useWindows';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { Window } from '../windows/Window';
import wallpaper1 from '../../assets/wallpapers/wallpaper1.jpg';
import wallpaper2 from '../../assets/wallpapers/wallpaper2.jpg';
import wallpaper3 from '../../assets/wallpapers/wallpaper.jpg'; // Add your wallpaper image

const wallpapers = [
  { id: 'default', name: 'Win95 Teal', src: wallpaper1 },
  { id: 'retro', name: 'Retro Wallpaper', src: wallpaper2 },
  { id: 'hills', name: 'Rolling Hills', src: wallpaper3 },
];

// Sample project data - in a real app, you might want to move this to a separate file
const projects = [
  {
    id: 'project1',
    title: 'Portfolio Site',
    icon: '🌐',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-4">Portfolio Site</h2>
        <p>This is the site you're currently viewing! A retro-styled portfolio inspired by Windows 95.</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Built with React + Vite</li>
          <li>Styled with Tailwind CSS</li>
          <li>Pixelated retro aesthetics</li>
        </ul>
      </div>
    )
  },
  {
    id: 'project2',
    title: 'Todo App',
    icon: '📝',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-4">Todo App</h2>
        <p>A simple task management application with retro UI.</p>
        <ul className="list-disc pl-5 mt-2">
          <li>React state management</li>
          <li>Local storage persistence</li>
          <li>Drag and drop functionality</li>
        </ul>
        <button className="bg-retro-accent text-white px-3 py-1 mt-4">View Demo</button>
      </div>
    )
  },
  // Add more projects here
];

export function Desktop() {
  const {
    windows,
    visibleWindows,
    activeWindowId,
    minimizedWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow
  } = useWindows();
  
  // Clock state
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(wallpapers[0]);
  
  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Close start menu when clicking outside
    const handleDocumentClick = (e: MouseEvent) => {
      if (showStartMenu && !(e.target as Element).closest('.start-button, .start-menu')) {
        setShowStartMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, [showStartMenu]);
  
  const handleWallpaperChange = (wallpaperId) => {
    const newWallpaper = wallpapers.find(w => w.id === wallpaperId);
    if (newWallpaper) {
      setSelectedWallpaper(newWallpaper);
    }
  };

  // Function to open the display properties window
  const openDisplayProperties = () => {
    openWindow(
      'display-properties',
      'Display Properties',
      <div className="p-2">
        <h2 className="text-lg font-bold mb-2">Wallpaper</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {wallpapers.map(wallpaper => (
            <div 
              key={wallpaper.id}
              className={`border-2 cursor-pointer ${selectedWallpaper.id === wallpaper.id ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleWallpaperChange(wallpaper.id)}
            >
              <img src={wallpaper.src} alt={wallpaper.name} className="w-full h-20 object-cover" />
              <div className="text-center text-sm py-1">{wallpaper.name}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button className="retro-button" onClick={() => closeWindow('display-properties')}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${selectedWallpaper.src})` }}
    >
      {/* CRT scan effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
        <div className="scanline"></div>
      </div>
      
      {/* Desktop icons */}
      <div className="grid grid-cols-6 gap-1 p-1 sm:grid-cols-8 md:p-2">
        {projects.map(project => (
          <DesktopIcon
            key={project.id}
            name={project.title}
            icon={<span className="text-3xl">{project.icon}</span>}
            onClick={() => openWindow(project.id, project.title, project.content)}
          />
        ))}
        
        <DesktopIcon
          name="My Computer"
          icon={<span className="text-3xl">💻</span>}
          onClick={() => openWindow(
            'computer',
            'My Computer',
            <div>
              <h2 className="text-xl font-win95 font-bold mb-4">My Computer</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl">💿</span>
                  <span className="text-sm">(C:)</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl">🖨️</span>
                  <span className="text-sm">Printers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl">🌐</span>
                  <span className="text-sm">Network</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl">⚙️</span>
                  <span className="text-sm">Control Panel</span>
                </div>
              </div>
            </div>
          )}
        />
        
        <DesktopIcon
          name="About Me"
          icon={<span className="text-3xl">👤</span>}
          onClick={() => openWindow(
            'about',
            'About Me',
            <div className="font-win95">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="mb-2">Hi there! I'm a web developer passionate about creating engaging user interfaces.</p>
              <p className="mb-2">This portfolio showcases my love for retro computing aesthetics combined with modern web technologies.</p>
              
              <div className="retro-outset p-2 mt-4">
                <h3 className="font-bold mb-2">Skills:</h3>
                <ul className="list-disc pl-5">
                  <li>React & TypeScript</li>
                  <li>UI/UX Design</li>
                  <li>Frontend Architecture</li>
                  <li>Responsive Layouts</li>
                </ul>
              </div>
              
              <button className="retro-button mt-4">Contact Me</button>
            </div>
          )}
        />

        <DesktopIcon
          name="Display Properties"
          icon={<span className="text-3xl">🖼️</span>}
          onClick={openDisplayProperties}
        />
      </div>
      
      {/* Windows */}
      {visibleWindows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          isActive={activeWindowId === window.id}
          initialPosition={{ x: 50 + Math.random() * 100, y: 50 + Math.random() * 50 }}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => toggleMaximize(window.id)}
          className={`z-[${window.zIndex}]`}
        >
          {window.content}
        </Window>
      ))}
      
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-win95-gray border-t-2 retro-outset flex items-center z-50">
        <button 
          className={`h-6 px-2 mx-1 retro-button ${showStartMenu ? 'active' : ''} flex items-center start-button`}
          onClick={() => setShowStartMenu(!showStartMenu)}
        >
          <span className="mr-1 text-sm">🪟</span>
          <span className="font-bold">Start</span>
        </button>
        
        {/* Start menu */}
        {showStartMenu && (
          <div className="start-menu absolute left-0 bottom-8 w-56 bg-win95-gray retro-outset border border-black flex">
            <div className="w-8 bg-win95-blue h-full writing-vertical flex flex-col justify-end items-center p-2">
              <span className="text-white font-bold transform -rotate-90 origin-center mb-16">
                Windows95
              </span>
            </div>
            <div className="flex-grow p-1">
              <div className="hover:bg-win95-blue hover:text-white p-1 flex items-center">
                <span className="mr-2">👤</span>
                <span>About Me</span>
              </div>
              <div className="hover:bg-win95-blue hover:text-white p-1 flex items-center">
                <span className="mr-2">📂</span>
                <span>My Projects</span>
              </div>
              <div className="hover:bg-win95-blue hover:text-white p-1 flex items-center">
                <span className="mr-2">📝</span>
                <span>Resume</span>
              </div>
              <div className="hover:bg-win95-blue hover:text-white p-1 flex items-center">
                <span className="mr-2">📱</span>
                <span>Contact</span>
              </div>
              <div className="border-t border-gray-500 my-1"></div>
              <div 
                className="hover:bg-win95-blue hover:text-white p-1 flex items-center"
                onClick={() => {
                  openDisplayProperties();
                  setShowStartMenu(false);
                }}
              >
                <span className="mr-2">🖼️</span>
                <span>Display Properties</span>
              </div>
              <div className="hover:bg-win95-blue hover:text-white p-1 flex items-center">
                <span className="mr-2">⚙️</span>
                <span>Settings</span>
              </div>
              <div className="hover:bg-win95-blue hover:text-white p-1 flex items-center">
                <span className="mr-2">ℹ️</span>
                <span>Help</span>
              </div>
              <div className="border-t border-gray-500 my-1"></div>
              <div className="hover:bg-win95-blue hover:text-white p-1 flex items-center">
                <span className="mr-2">🚪</span>
                <span>Shut Down...</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-l-2 border-t-2 border-gray-400 h-full mx-1"></div>
        
        {/* Window buttons in taskbar */}
        <div className="flex gap-1 flex-grow h-6 overflow-hidden">
          {windows.map(window => (
            <button
              key={window.id}
              className={`retro-button min-w-[120px] max-w-[200px] h-full text-left truncate text-xs flex items-center ${activeWindowId === window.id ? 'bg-gray-300 retro-inset' : ''}`}
              onClick={() => focusWindow(window.id)}
            >
              <span className="mr-1">📄</span>
              {window.title}
            </button>
          ))}
        </div>
        
        {/* Clock */}
        <div className="retro-inset h-6 px-2 mx-1 text-xs flex items-center">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {/* System tooltip to show first-time users what to do */}
      <div 
        className="fixed bottom-10 right-10 bg-yellow-100 text-black p-3 border-2 border-black shadow-lg max-w-xs text-sm z-50"
        style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}
      >
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">💡</span>
          <span className="font-bold">Welcome to My Portfolio OS</span>
        </div>
        <p>Click on desktop icons to open applications and learn more about my projects.</p>
        <button 
          className="retro-button mt-2"
          onClick={(e) => (e.target as HTMLElement).parentElement?.remove()}
        >
          OK
        </button>
      </div>
    </div>
  );
}