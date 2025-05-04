import React, { useEffect, useState } from 'react';
import { useWindows } from '../../hooks/useWindows';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { Window } from '../windows/Window';

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
  
  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative h-screen w-screen bg-retro-dark overflow-hidden">
      {/* CRT scan effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-50">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-white to-transparent 
                      animate-[scan_8s_linear_infinite]"></div>
      </div>
      
      {/* Desktop icons */}
      <div className="grid grid-cols-6 gap-2 p-4">
        {projects.map(project => (
          <DesktopIcon
            key={project.id}
            name={project.title}
            icon={<span className="text-3xl">{project.icon}</span>}
            onClick={() => openWindow(project.id, project.title, project.content)}
          />
        ))}
        
        {/* About Me icon */}
        <DesktopIcon
          name="About Me"
          icon={<span className="text-3xl">👤</span>}
          onClick={() => openWindow(
            'about',
            'About Me',
            <div>
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="mb-2">Hi there! I'm a web developer passionate about creating engaging user interfaces.</p>
              <p className="mb-2">This portfolio showcases my love for retro computing aesthetics combined with modern web technologies.</p>
              <p>Feel free to check out my projects by clicking on the desktop icons!</p>
            </div>
          )}
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
      <Taskbar
        windows={windows}
        activeWindow={activeWindowId}
        onWindowClick={focusWindow}
      />
    </div>
  );
}