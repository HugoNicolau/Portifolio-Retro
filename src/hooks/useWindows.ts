import { useState, ReactNode } from 'react';

interface WindowState {
  id: string;
  title: string;
  content: ReactNode;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export function useWindows() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(100);

  // Open a new window or focus an existing one
  const openWindow = (id: string, title: string, content: ReactNode) => {
    // Check if window already exists
    const existingWindowIndex = windows.findIndex(w => w.id === id);
    
    if (existingWindowIndex >= 0) {
      // Window exists, update its content and focus it
      const updatedWindows = [...windows];
      const window = updatedWindows[existingWindowIndex];
      
      // If minimized, restore it
      if (window.isMinimized) {
        updatedWindows[existingWindowIndex] = {
          ...window,
          isMinimized: false,
          zIndex: nextZIndex
        };
        setNextZIndex(nextZIndex + 1);
      } else {
        updatedWindows[existingWindowIndex] = {
          ...window,
          zIndex: nextZIndex,
          content // Update content in case it changed
        };
        setNextZIndex(nextZIndex + 1);
      }
      
      setWindows(updatedWindows);
      setActiveWindowId(id);
    } else {
      // Create new window
      setWindows([
        ...windows, 
        { 
          id, 
          title, 
          content, 
          isMaximized: false,
          isMinimized: false,
          zIndex: nextZIndex
        }
      ]);
      setNextZIndex(nextZIndex + 1);
      setActiveWindowId(id);
    }
  };

  // Close a window
  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    
    // If we closed the active window, activate the top-most remaining window
    if (activeWindowId === id) {
      const remainingWindows = windows.filter(w => w.id !== id && !w.isMinimized);
      if (remainingWindows.length > 0) {
        // Find window with highest zIndex
        const topWindow = remainingWindows.reduce((prev, current) => 
          prev.zIndex > current.zIndex ? prev : current
        );
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Minimize a window
  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    
    // If we minimized the active window, activate the top-most remaining window
    if (activeWindowId === id) {
      const visibleWindows = windows.filter(w => w.id !== id && !w.isMinimized);
      if (visibleWindows.length > 0) {
        // Find window with highest zIndex
        const topWindow = visibleWindows.reduce((prev, current) => 
          prev.zIndex > current.zIndex ? prev : current
        );
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Toggle maximize state for a window
  const toggleMaximize = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
    setActiveWindowId(id);
  };

  // Focus a window and bring it to the front
  const focusWindow = (id: string) => {
    setWindows(windows.map(w => {
      if (w.id === id) {
        return { 
          ...w, 
          zIndex: nextZIndex,
          isMinimized: false // Restore if minimized
        };
      }
      return w;
    }));
    
    setNextZIndex(nextZIndex + 1);
    setActiveWindowId(id);
  };

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    visibleWindows: windows.filter(w => !w.isMinimized),
    minimizedWindows: windows.filter(w => w.isMinimized)
  };
}