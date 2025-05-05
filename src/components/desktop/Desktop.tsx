import React, { useEffect, useState } from 'react';
import { useWindows } from '../../hooks/useWindows';
import { DesktopIcon } from './DesktopIcon';
// import { Taskbar } from './Taskbar';
import { Window } from '../windows/Window';
import wallpaper1 from '../../assets/wallpapers/wallpaper1.jpg';
import wallpaper2 from '../../assets/wallpapers/wallpaper2.jpg';
import wallpaper3 from '../../assets/wallpapers/wallpaper.jpg'; // Add your wallpaper image
import ResumeFile from '../../assets/resume/Resume-HugoNicolau.pdf';

const wallpapers = [
  { id: 'retro', name: 'Retro Wallpaper', src: wallpaper2 },
  { id: 'default', name: 'Win95 Teal', src: wallpaper1 },
  { id: 'hills', name: 'Rolling Hills', src: wallpaper3 },
];

// Sample project data - in a real app, you might want to move this to a separate file
const projects = [
  {
    id: 'project1',
    title: 'Portfolio Site',
    icon: '🌐',
    content: (
      <div className='text-black'>
        <h2 className="text-xl font-bold mb-4">Portfolio Site</h2>
        <p className="mb-3">This retro Windows 95-inspired portfolio site demonstrates my frontend skills and passion for creative UI development.</p>

        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-5">
            <li>Authentic Windows 95 UI with pixel-perfect details</li>
            <li>Fully functional window management system</li>
            <li>Draggable windows with maximize, minimize, and close</li>
            <li>Interactive desktop with draggable icons and grid snapping</li>
            <li>Working Start menu and context menus</li>
            <li>CRT monitor effect with screen reflection and scanlines</li>
          </ul>
        </div>

        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>React</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>TypeScript</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Tailwind CSS</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Vite</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>React Icons</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Custom Hooks</span>
          </div>
        </div>

        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technical Highlights:</h3>
          <ul className="list-disc pl-5">
            <li>Custom window management system with stacking context</li>
            <li>Grid-based icon positioning with collision detection</li>
            <li>State management for multiple application windows</li>
            <li>Responsive design that works on different screen sizes</li>
            <li>Authentic retro styling with CSS</li>
          </ul>
        </div>

        <div className="flex mt-4 gap-2">
          <a
            href="https://github.com/HugoNicolau/Portifolio-Retro"
            target="_blank"
            className="retro-button flex items-center"
          >
            <span className="mr-1">🐙</span>
            View Source
          </a>
          <button className="retro-button flex items-center">
            <span className="mr-1">📝</span>
            Development Notes
          </button>
        </div>
      </div>
    )
  },
  {
    id: 'langaimage',
    title: 'LangAImage',
    icon: '🤖',
    content: (
      <div className='text-black'>
        <h2 className="text-xl font-bold mb-4">LangAImage</h2>
        <p className="mb-3">A web application that combines language learning with image recognition AI, creating a more immersive and interactive way to learn vocabulary in new languages.</p>
        
        <div className="retro-inset p-3 mb-3">
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-5">
            <li>AI-powered image recognition to identify objects in user-uploaded images</li>
            <li>Multi-language support for vocabulary learning</li>
            <li>Interactive flashcard system with image associations</li>
            <li>Progress tracking across learning sessions</li>
            <li>User authentication and saved history</li>
          </ul>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>React</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>TypeScript</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Node.js</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Express</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>MongoDB</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>TensorFlow.js</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Google Cloud Vision API</span>
          </div>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technical Highlights:</h3>
          <ul className="list-disc pl-5">
            <li>Integration with machine learning models for image recognition</li>
            <li>RESTful API design for language translation services</li>
            <li>Responsive front-end with drag-and-drop file uploads</li>
            <li>Authentication system with JWT tokens</li>
            <li>Progressive Web App capabilities for offline learning</li>
          </ul>
        </div>
        
        <div className="flex mt-4 gap-2">
          <a 
            href="https://github.com/HugoNicolau/LangAImage" 
            target="_blank" 
            className="retro-button flex items-center"
          >
            <span className="mr-1">🐙</span>
            View Source
          </a>
          <a 
            href="https://langaimage.vercel.app" 
            target="_blank" 
            className="retro-button flex items-center"
          >
            <span className="mr-1">🌐</span>
            Live Demo
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'forca-springboot',
    title: 'Hangman Game',
    icon: '🎮',
    content: (
      <div className='text-black'>
        <h2 className="text-xl font-bold mb-4">Hangman Game (Forca)</h2>
        <p className="mb-3">A classic Hangman game implementation with a modern tech stack, demonstrating my backend development skills with Spring Boot and clean architecture principles.</p>
        
        <div className="retro-inset p-3 mb-3">
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-5">
            <li>RESTful API for the Hangman game logic</li>
            <li>User authentication and game session management</li>
            <li>Word dictionary with multiple categories</li>
            <li>Score tracking and leaderboard functionality</li>
            <li>Comprehensive game state management</li>
          </ul>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Java</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Spring Boot</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Spring Data JPA</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Maven</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>JUnit</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>PostgreSQL</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>RESTful API</span>
          </div>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technical Highlights:</h3>
          <ul className="list-disc pl-5">
            <li>MVC architecture with clean separation of concerns</li>
            <li>Exception handling and custom error responses</li>
            <li>Unit and integration testing with JUnit</li>
            <li>Database schema design with entity relationships</li>
            <li>API documentation with OpenAPI/Swagger</li>
          </ul>
        </div>
        
        <div className="flex mt-4 gap-2">
          <a 
            href="https://github.com/HugoNicolau/Forca-SpringBoot" 
            target="_blank" 
            className="retro-button flex items-center"
          >
            <span className="mr-1">🐙</span>
            View Source
          </a>
          <a 
            href="#" /* Replace with actual demo URL if available */
            className="retro-button flex items-center"
            onClick={(e) => {
              e.preventDefault();
              alert('Demo coming soon!');
            }}
          >
            <span className="mr-1">🎲</span>
            Play Game
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'bubbleman',
    title: 'BubbleMan',
    icon: '🫧',
    content: (
      <div className='text-black'>
        <h2 className="text-xl font-bold mb-4">BubbleMan</h2>
        <p className="mb-3">A creative and addictive bubble-popping game built with modern web technologies. This project demonstrates my game development skills and understanding of interactive web applications.</p>
        
        <div className="retro-inset p-3 mb-3">
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-5">
            <li>Engaging gameplay with increasing difficulty levels</li>
            <li>Dynamic bubble generation and physics-based movement</li>
            <li>Score tracking and high score persistence</li>
            <li>Smooth animations and interactive elements</li>
            <li>Responsive design that works across devices</li>
          </ul>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>JavaScript</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>HTML5 Canvas</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>CSS3</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Web Audio API</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>LocalStorage</span>
          </div>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technical Highlights:</h3>
          <ul className="list-disc pl-5">
            <li>Game loop architecture with optimized rendering</li>
            <li>Collision detection algorithm for bubble interactions</li>
            <li>Particle effects system for visual feedback</li>
            <li>Object-oriented design for game entities</li>
            <li>Event-driven architecture for user interactions</li>
          </ul>
        </div>
        
        <div className="flex mt-4 gap-2">
          <a 
            href="https://github.com/HugoNicolau/bubbleman" 
            target="_blank" 
            className="retro-button flex items-center"
          >
            <span className="mr-1">🐙</span>
            View Source
          </a>
          <a 
            href="https://hugonicolau.github.io/bubbleman/" 
            target="_blank" 
            className="retro-button flex items-center"
          >
            <span className="mr-1">🎮</span>
            Play Game
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'modos-extension',
    title: 'Modos Extension',
    icon: '🧩',
    content: (
      <div className='text-black'>
        <h2 className="text-xl font-bold mb-4">Modos Chrome Extension</h2>
        <p className="mb-3">A productivity-enhancing browser extension that helps users manage and organize their browser workflow through customizable modes for different contexts and activities.</p>
        
        <div className="retro-inset p-3 mb-3">
          <h3 className="font-bold mb-2">Key Features:</h3>
          <ul className="list-disc pl-5">
            <li>Context-based workspace management for browsing</li>
            <li>Quick switching between different "modes" of browsing</li>
            <li>Tab organization and session management</li>
            <li>Customizable interface and preferences</li>
            <li>Productivity tracking and insights</li>
          </ul>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technologies Used:</h3>
          <div className="flex flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>JavaScript</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Chrome Extension API</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>HTML5</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>CSS3</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Chrome Storage API</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2" style={{ marginRight: '6px' }}>Manifest V3</span>
          </div>
        </div>
        
        <div className="retro-outset p-3 mb-3">
          <h3 className="font-bold mb-2">Technical Highlights:</h3>
          <ul className="list-disc pl-5">
            <li>Browser extension architecture with background and content scripts</li>
            <li>Browser API integration for tab and window management</li>
            <li>Persistent storage implementation for user preferences</li>
            <li>Event-driven programming for browser interactions</li>
            <li>User-friendly settings panel and configuration options</li>
          </ul>
        </div>
        
        <div className="flex mt-4 gap-2">
          <a 
            href="https://github.com/HugoNicolau/Modos-chrome-extension" 
            target="_blank" 
            className="retro-button flex items-center"
          >
            <span className="mr-1">🐙</span>
            View Source
          </a>
          <a 
            href="https://chrome.google.com/webstore/search/modos%20extension" 
            target="_blank" 
            className="retro-button flex items-center"
          >
            <span className="mr-1">🌐</span>
            Chrome Store
          </a>
        </div>
      </div>
    )
  },
];

// Add a type for icon position
interface IconPosition {
  id: string;
  x: number;
  y: number;
}

export function Desktop() {
  const {
    windows,
    visibleWindows,
    activeWindowId,
    // minimizedWindows,
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

  // Add state for icon positions and dragging
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);
  const [draggingIcon, setDraggingIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Add this state to Desktop component
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  // Define icon and grid dimensions
  const ICON_WIDTH = 70;
  const ICON_HEIGHT = 80;
  const GRID_CELL_WIDTH = 80; // Slightly wider than icon for spacing
  const GRID_CELL_HEIGHT = 90; // Slightly taller than icon for spacing

  // Grid state to track which cells are occupied
  const [grid, setGrid] = useState<{ [key: string]: string }>({});
  const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0 });

  // Add these updates to your Desktop component

  // 1. Define margins to keep icons away from edges
  const EDGE_MARGIN = 0; // pixels from the edge of the screen

  // 2. Track original position during drag for fallback
  const [dragStartPosition, setDragStartPosition] = useState<{ x: number, y: number } | null>(null);

  // Add these state variables to your Desktop component
  const [selectionBox, setSelectionBox] = useState<{
    isSelecting: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }>({
    isSelecting: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  });

  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);

  // Calculate grid dimensions based on screen size
  useEffect(() => {
    const updateGridDimensions = () => {
      // Get desktop area (excluding taskbar)
      const desktopWidth = window.innerWidth;
      const desktopHeight = window.innerHeight - 40; // 40px for taskbar

      // Calculate number of columns and rows
      const cols = Math.floor(desktopWidth / GRID_CELL_WIDTH);
      const rows = Math.floor(desktopHeight / GRID_CELL_HEIGHT);

      setGridDimensions({ cols, rows });

      // Re-initialize icon positions based on new grid
      initializeIconPositions(cols, rows);
    };

    // Call once to initialize
    updateGridDimensions();

    // Update on window resize
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, []);

  // 3. Update your initializeIconPositions function to respect margins
  const initializeIconPositions = (cols: number, rows: number) => {
    // Reset grid
    const newGrid: { [key: string]: string } = {};

    // Get all icon IDs
    const iconIds = [
      ...projects.map(project => project.id),
      'computer',
      'about',
      'display-properties'
    ];

    // Initialize positions
    const newPositions: IconPosition[] = [];

    // Account for margins by reducing available grid cells
    const usableCols = cols - Math.ceil(EDGE_MARGIN / GRID_CELL_WIDTH) * 2;
    const usableRows = rows - Math.ceil(EDGE_MARGIN / GRID_CELL_HEIGHT) * 2;

    // Start position with margin
    const startCol = Math.ceil(EDGE_MARGIN / GRID_CELL_WIDTH);
    const startRow = Math.ceil(EDGE_MARGIN / GRID_CELL_HEIGHT);

    // Place icons in column-first order (like Windows desktop)
    let col = startCol;
    let row = startRow;

    for (let i = 0; i < iconIds.length; i++) {
      const iconId = iconIds[i];

      // Find next available cell within usable area
      while (newGrid[`${col},${row}`] && row < startRow + usableRows) {
        row++;
        if (row >= startRow + usableRows) {
          row = startRow;
          col++;
          if (col >= startCol + usableCols) break; // No more space
        }
      }

      // If we found a spot
      if (col < startCol + usableCols && row < startRow + usableRows) {
        // Mark cell as occupied
        newGrid[`${col},${row}`] = iconId;

        // Calculate pixel position
        newPositions.push({
          id: iconId,
          x: col * GRID_CELL_WIDTH,
          y: row * GRID_CELL_HEIGHT
        });

        // Move to next row for next icon
        row++;
        if (row >= startRow + usableRows) {
          row = startRow;
          col++;
        }
      }
    }

    setGrid(newGrid);
    setIconPositions(newPositions);
  };

  // Convert grid cell to pixel position
  const gridCellToPosition = (col: number, row: number): { x: number, y: number } => {
    return {
      x: col * GRID_CELL_WIDTH,
      y: row * GRID_CELL_HEIGHT
    };
  };

  // Convert pixel position to grid cell
  const positionToGridCell = (x: number, y: number): { col: number, row: number } => {
    return {
      col: Math.floor(x / GRID_CELL_WIDTH),
      row: Math.floor(y / GRID_CELL_HEIGHT)
    };
  };

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

  // Function to open the Select Wallpaper window
  const openDisplayProperties = () => {
    openWindow(
      'display-properties',
      'Select Wallpaper',
      <div className="p-2">
        <h2 className="text-black text-lg font-bold mb-2">Select Wallpaper</h2>
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
        {/* <div className="flex justify-end gap-2">
          <button className="retro-button" onClick={() => closeWindow('display-properties')}>Close</button>
        </div> */}
      </div>
    );
  };

  // Add drag handlers for desktop icons
  // 4. Update handleIconDragStart to track original position
  const handleIconDragStart = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault(); // Prevent default browser dragging

    const position = iconPositions.find(pos => pos.id === iconId);
    if (!position) return;

    // Don't start dragging immediately - wait for movement threshold
    const initialX = e.clientX;
    const initialY = e.clientY;

    // Store the original position for potential fallback
    setDragStartPosition({ x: position.x, y: position.y });

    // Calculate offset from click position to icon corner
    const dragOffsetTemp = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };

    // Use a threshold check to determine when to actually start dragging
    const checkDragThreshold = (moveEvent: MouseEvent) => {
      const deltaX = Math.abs(moveEvent.clientX - initialX);
      const deltaY = Math.abs(moveEvent.clientY - initialY);

      // If movement exceeds threshold, start dragging
      if (deltaX > 5 || deltaY > 5) {
        window.removeEventListener('mousemove', checkDragThreshold);

        // Start actual drag
        setDraggingIcon(iconId);
        setDragOffset(dragOffsetTemp);

        // Add real drag handlers
        window.addEventListener('mousemove', handleIconDragMove);
        window.addEventListener('mouseup', handleIconDragEnd);
      }
    };

    // Add temporary listener to check for drag threshold
    window.addEventListener('mousemove', checkDragThreshold);

    // If mouse is released without moving much, clean up
    const cancelDragCheck = () => {
      window.removeEventListener('mousemove', checkDragThreshold);
      window.removeEventListener('mouseup', cancelDragCheck);
    };

    window.addEventListener('mouseup', cancelDragCheck);
  };

  const snapToGrid = (x: number, y: number, gridSize: number = 20) => {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  };


  // Check if two icons are overlapping
  const isOverlapping = (pos1: IconPosition, pos2: IconPosition): boolean => {
    return (
      pos1.x < pos2.x + ICON_WIDTH &&
      pos1.x + ICON_WIDTH > pos2.x &&
      pos1.y < pos2.y + ICON_HEIGHT &&
      pos1.y + ICON_HEIGHT > pos2.y
    );
  };

  // Check if a position is valid (not overlapping with any other icon)
  const isValidPosition = (position: IconPosition, existingPositions: IconPosition[]): boolean => {
    return !existingPositions.some(
      existingPos =>
        existingPos.id !== position.id && // Don't check against itself
        isOverlapping(position, existingPos)
    );
  };

  // Find the nearest valid position
  const findNearestValidPosition = (
    desiredPosition: IconPosition,
    existingPositions: IconPosition[]
  ): { x: number, y: number } => {
    // Try the desired position first
    if (isValidPosition(desiredPosition, existingPositions)) {
      return { x: desiredPosition.x, y: desiredPosition.y };
    }

    // If that's not valid, start searching in a spiral pattern
    // This will try positions in expanding rings around the desired position
    const gridSize = 20; // Grid snap size
    const maxAttempts = 100; // Prevent infinite loops

    for (let radius = 1; radius < maxAttempts; radius++) {
      // Try positions in a square around the desired position
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          // Only check positions on the perimeter of the square
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const testPos: IconPosition = {
              id: desiredPosition.id,
              x: desiredPosition.x + dx * gridSize,
              y: desiredPosition.y + dy * gridSize
            };

            if (isValidPosition(testPos, existingPositions)) {
              return { x: testPos.x, y: testPos.y };
            }
          }
        }
      }
    }

    // If we couldn't find a valid position, return original as fallback
    return { x: desiredPosition.x, y: desiredPosition.y };
  };

  // 5. Modify handleIconDragMove to enable fluid movement
  const handleIconDragMove = (e: MouseEvent) => {
    if (!draggingIcon) return;

    // For fluid movement during drag, use raw position without snapping to grid
    const rawX = e.clientX - dragOffset.x;
    const rawY = e.clientY - dragOffset.y;

    // Apply edge constraints
    const boundedX = Math.max(EDGE_MARGIN, Math.min(rawX, window.innerWidth - ICON_WIDTH - EDGE_MARGIN));
    const boundedY = Math.max(EDGE_MARGIN, Math.min(rawY, window.innerHeight - ICON_HEIGHT - 40 - EDGE_MARGIN)); // 40 for taskbar

    // Update position without snapping during drag for fluid movement
    setIconPositions(prev => prev.map(pos =>
      pos.id === draggingIcon ? { ...pos, x: boundedX, y: boundedY } : pos
    ));
  };

  // 6. Update handleIconDragEnd to handle invalid positions and snap to grid
  const handleIconDragEnd = () => {
    if (!draggingIcon || dragStartPosition === null) {
      setDraggingIcon(null);
      setDragStartPosition(null);
      return;
    }

    // Get current position of dragged icon
    const draggedIcon = iconPositions.find(pos => pos.id === draggingIcon);
    if (!draggedIcon) {
      setDraggingIcon(null);
      setDragStartPosition(null);
      return;
    }

    // Use snapToGrid to get final position
    const snappedPosition = snapToGrid(draggedIcon.x, draggedIcon.y, GRID_CELL_WIDTH);

    // Get grid cell from snapped position
    const col = Math.floor(snappedPosition.x / GRID_CELL_WIDTH);
    const row = Math.floor(snappedPosition.y / GRID_CELL_HEIGHT);

    // Check boundaries
    const isWithinBounds =
      col >= Math.ceil(EDGE_MARGIN / GRID_CELL_WIDTH) &&
      row >= Math.ceil(EDGE_MARGIN / GRID_CELL_HEIGHT) &&
      col < gridDimensions.cols - Math.ceil(EDGE_MARGIN / GRID_CELL_WIDTH) &&
      row < gridDimensions.rows - Math.ceil(EDGE_MARGIN / GRID_CELL_HEIGHT);

    const cellKey = `${col},${row}`;
    const occupiedBy = grid[cellKey];

    // Check if position is valid: within bounds AND either unoccupied OR occupied by this icon
    const isValidPos = isWithinBounds && (!occupiedBy || occupiedBy === draggingIcon);

    if (!isValidPos) {
      // Position is invalid - try to find a nearby valid position
      // First, create position objects for all icons
      const allPositions = iconPositions.filter(pos => pos.id !== draggingIcon);

      // Create a position object for the snapped position
      const potentialPosition: IconPosition = {
        id: draggingIcon,
        x: snappedPosition.x,
        y: snappedPosition.y
      };

      // If the position is out of bounds, revert to original position
      if (!isWithinBounds) {
        setIconPositions(prev => prev.map(pos =>
          pos.id === draggingIcon ? { ...pos, x: dragStartPosition.x, y: dragStartPosition.y } : pos
        ));
      } else {
        // Try to find a nearby valid position using our spiral search function
        const { x, y } = findNearestValidPosition(potentialPosition, allPositions);

        // Convert back to grid cell
        const newCol = Math.floor(x / GRID_CELL_WIDTH);
        const newRow = Math.floor(y / GRID_CELL_HEIGHT);
        const newCellKey = `${newCol},${newRow}`;

        // Update grid
        const newGrid = { ...grid };

        // Remove icon from its previous cell
        Object.keys(newGrid).forEach(key => {
          if (newGrid[key] === draggingIcon) {
            delete newGrid[key];
          }
        });

        // Place in new cell
        newGrid[newCellKey] = draggingIcon;
        setGrid(newGrid);

        // Update position
        setIconPositions(prev => prev.map(pos =>
          pos.id === draggingIcon ? { ...pos, x, y } : pos
        ));
      }
    } else {
      // Position is valid - update grid and position
      const newGrid = { ...grid };

      // First, remove the icon from its current cell
      Object.keys(newGrid).forEach(key => {
        if (newGrid[key] === draggingIcon) {
          delete newGrid[key];
        }
      });

      // Then, place it in the new cell
      newGrid[cellKey] = draggingIcon;
      setGrid(newGrid);

      // Use the snapped position for visual consistency
      setIconPositions(prev => prev.map(pos =>
        pos.id === draggingIcon ? { ...pos, x: snappedPosition.x, y: snappedPosition.y } : pos
      ));
    }

    setDraggingIcon(null);
    setDragStartPosition(null);
  };

  // 7. Delete the findNearestAvailableCell function since we don't need it anymore

  // Set up event listeners for icon dragging
  useEffect(() => {
    if (draggingIcon) {
      window.addEventListener('mousemove', handleIconDragMove);
      window.addEventListener('mouseup', handleIconDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleIconDragMove);
      window.removeEventListener('mouseup', handleIconDragEnd);
    };
  }, [draggingIcon, dragOffset]);

  // Icon click handler that differentiates between clicks and drags
  const handleIconClick = (iconId: string, onClick: () => void) => (e: React.MouseEvent) => {
    // If the mouse moved significantly, treat as drag not click
    const iconPos = iconPositions.find(p => p.id === iconId);
    if (!iconPos) return;

    // Store start position to detect if this is a drag or click
    const startX = iconPos.x;
    const startY = iconPos.y;

    // Start dragging
    handleIconDragStart(e, iconId);

    // Create a one-time mouseup handler to check if this was a click
    const checkIfClick = (e: MouseEvent) => {
      window.removeEventListener('mouseup', checkIfClick);

      const endPos = iconPositions.find(p => p.id === iconId);
      if (!endPos) return;

      // If position hasn't moved much, consider it a click
      if (Math.abs(endPos.x - startX) < 5 && Math.abs(endPos.y - startY) < 5) {
        onClick();
      }
    };

    window.addEventListener('mouseup', checkIfClick);
  };

  // Add this function to Desktop component
  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  // Add handler to arrange icons automatically
  const arrangeIcons = () => {
    // Reset grid
    const newGrid: { [key: string]: string } = {};
    const newPositions: IconPosition[] = [];

    // Get all icon IDs
    const iconIds = [
      ...projects.map(project => project.id),
      'computer',
      'about',
      'display-properties'
    ];

    // Place icons in column-first order (like Windows desktop)
    let col = 0;
    let row = 0;

    for (let i = 0; i < iconIds.length; i++) {
      const iconId = iconIds[i];

      // Mark cell as occupied
      newGrid[`${col},${row}`] = iconId;

      // Calculate pixel position
      newPositions.push({
        id: iconId,
        x: col * GRID_CELL_WIDTH,
        y: row * GRID_CELL_HEIGHT
      });

      // Move to next row for next icon
      row++;
      if (row >= gridDimensions.rows) {
        row = 0;
        col++;
      }
    }

    setGrid(newGrid);
    setIconPositions(newPositions);
    setShowContextMenu(false);
  };

  // Add these handlers to manage the selection box
  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    // Only start selection if:
    // 1. It's a left click
    // 2. Not clicking on an icon
    // 3. Not clicking on any window
    // 4. Not clicking on the taskbar
    if (e.button !== 0) return; // Only left click
    if ((e.target as Element).closest('.desktop-icon')) return; // Not on icon
    if ((e.target as Element).closest('.window')) return; // Not on window
    if ((e.target as Element).closest('.taskbar')) return; // Not on taskbar

    // Start selection
    setSelectionBox({
      isSelecting: true,
      startX: e.clientX,
      startY: e.clientY,
      endX: e.clientX,
      endY: e.clientY
    });

    // Clear any previous selections
    setSelectedIcons([]);
  };

  const handleDesktopMouseMove = (e: MouseEvent) => {
    if (!selectionBox.isSelecting) return;

    // Update selection box end coordinates
    setSelectionBox(prev => ({
      ...prev,
      endX: e.clientX,
      endY: e.clientY
    }));

    // Check which icons are within the selection box
    const selectBox = {
      left: Math.min(selectionBox.startX, e.clientX),
      top: Math.min(selectionBox.startY, e.clientY),
      right: Math.max(selectionBox.startX, e.clientX),
      bottom: Math.max(selectionBox.startY, e.clientY)
    };

    // Find which icons are within the selection
    const newSelectedIcons = iconPositions
      .filter(icon => {
        const iconBox = {
          left: icon.x,
          top: icon.y,
          right: icon.x + ICON_WIDTH,
          bottom: icon.y + ICON_HEIGHT
        };

        // Check if boxes overlap
        return !(
          iconBox.right < selectBox.left ||
          iconBox.left > selectBox.right ||
          iconBox.bottom < selectBox.top ||
          iconBox.top > selectBox.bottom
        );
      })
      .map(icon => icon.id);

    // Update selected icons
    setSelectedIcons(newSelectedIcons);
  };

  const handleDesktopMouseUp = () => {
    // End selection
    setSelectionBox(prev => ({
      ...prev,
      isSelecting: false
    }));

    // Keep the selected icons state
  };

  // Add event listeners for selection box
  useEffect(() => {
    if (selectionBox.isSelecting) {
      window.addEventListener('mousemove', handleDesktopMouseMove);
      window.addEventListener('mouseup', handleDesktopMouseUp);
    } else {
      window.removeEventListener('mousemove', handleDesktopMouseMove);
      window.removeEventListener('mouseup', handleDesktopMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleDesktopMouseMove);
      window.removeEventListener('mouseup', handleDesktopMouseUp);
    };
  }, [selectionBox.isSelecting]);

  // Add this handler to clear selection when clicking on empty space
  const handleDesktopClick = (e: React.MouseEvent) => {
    // Don't clear if we're ending a dragging operation
    if (selectionBox.isSelecting) return;

    // Don't clear if clicking on an icon, window, or taskbar
    if ((e.target as Element).closest('.desktop-icon')) return;
    if ((e.target as Element).closest('.window')) return;
    if ((e.target as Element).closest('.taskbar')) return;

    // Clear selection
    setSelectedIcons([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Monitor frame */}
      <div className="relative w-[96%] h-[94%] bg-[#222] rounded-lg p-4 shadow-2xl monitor-frame">
        {/* Monitor screen with bezel */}
        <div className="relative w-full h-full overflow-hidden border-8 border-[#333] rounded-md monitor-screen"
          style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
          {/* Screen content - this div contains both desktop and taskbar */}
          <div
            className="desktop-background w-screen h-screen"
            style={{
              userSelect: 'none', /* Prevents text selection */
              outline: 'none',    /* Removes focus outline */
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden flex flex-col"
              onContextMenu={handleDesktopContextMenu}
              onMouseDown={handleDesktopMouseDown}
              onClick={handleDesktopClick}
            >
              {/* Desktop area (flex-grow to take available space) */}
              <div
                className="flex-grow relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedWallpaper.src})` }}
                onMouseDown={handleDesktopMouseDown}
                onClick={handleDesktopClick}
                onContextMenu={handleDesktopContextMenu}
              >
                {/* Desktop icons */}
                <div className="absolute inset-0">
                  {/* Projects */}
                  {projects.map(project => {
                    const position = iconPositions.find(pos => pos.id === project.id);
                    return position && (
                      <div
                        key={project.id}
                        className="absolute desktop-icon"
                        style={{ left: `${position.x}px`, top: `${position.y}px` }}
                      >
                        <DesktopIcon
                          name={project.title}
                          icon={<span className="text-3xl">{project.icon}</span>}
                          onMouseDown={(e) => handleIconDragStart(e, project.id)}
                          onClick={() => openWindow(project.id, project.title, project.content)}
                          isDragging={draggingIcon === project.id}
                          isSelected={selectedIcons.includes(project.id)}
                        />
                      </div>
                    );
                  })}

                  {/* Computer icon */}
                  {(() => {
                    const position = iconPositions.find(pos => pos.id === 'computer');
                    return position && (
                      <div
                        key="computer"
                        className="absolute desktop-icon"
                        style={{ left: `${position.x}px`, top: `${position.y}px` }}
                      >
                        <DesktopIcon
                          name="My Computer"
                          icon={<span className="text-3xl">💻</span>}
                          onMouseDown={(e) => handleIconDragStart(e, 'computer')}
                          onClick={() => openWindow(
                            'computer',
                            'My Computer',
                            <div className='text-black'>
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
                          isDragging={draggingIcon === 'computer'}
                          isSelected={selectedIcons.includes('computer')}
                        />
                      </div>
                    );
                  })()}

                  {/* About Me icon */}
                  {(() => {
                    const position = iconPositions.find(pos => pos.id === 'about');
                    return position && (
                      <div
                        key="about"
                        className="absolute desktop-icon"
                        style={{ left: `${position.x}px`, top: `${position.y}px` }}
                      >
                        <DesktopIcon
                          name="About Me"
                          icon={<span className="text-3xl">👤</span>}
                          onMouseDown={(e) => handleIconDragStart(e, 'about')}
                          onClick={() => openWindow(
                            'about',
                            'About Me - Hugo Nicolau',
                            <div className="font-win95 text-black p-3 overflow-auto">
                              <h2 className="text-xl font-bold mb-4">Hugo Nicolau</h2>
                              <h3 className="text-base mb-2">Full Stack Engineer</h3>

                              <div className="retro-inset p-3 mb-4">
                                <p className="mb-3">
                                  Full-stack developer passionate about technology. I began my journey in 2016 with Arduino and, since 2021, have specialized in web development focused on TypeScript, JavaScript, React.js, Node.js, Nest.js, and RESTful APIs.
                                </p>
                                <p>
                                  I have experience building intuitive and responsive interfaces, as well as scalable and robust backends. I value communication and teamwork, transforming ideas into efficient and functional solutions.
                                </p>
                              </div>

                              <div className="mb-4">
                                <h3 className="font-bold mb-2 border-b border-gray-400">Key Skills</h3>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="retro-outset p-2">
                                    <div className="font-bold mb-1">💻 Languages</div>
                                    <div>TypeScript, JavaScript, Java,  C++</div>
                                  </div>
                                  <div className="retro-outset p-2">
                                    <div className="font-bold mb-1">🔨 Frameworks</div>
                                    <div>React.js, Vite, Node.js, Nest.js, Express.js</div>
                                  </div>
                                  <div className="retro-outset p-2">
                                    <div className="font-bold mb-1">🗄️ Databases</div>
                                    <div>PostgreSQL, MongoDB, TypeORM, Prisma</div>
                                  </div>
                                  <div className="retro-outset p-2">
                                    <div className="font-bold mb-1">⚙️ Infrastructure & Tools</div>
                                    <div>Docker, AWS, Git, GitHub</div>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h3 className="font-bold mb-2 border-b border-gray-400">Experience</h3>
                                <div className="retro-outset p-2 mb-2">
                                  <div className="font-bold">TeamSoft Technology and Systems</div>
                                  <div className="italic mb-1">Full Stack Developer – Apr 2024 – Present</div>
                                  <ul className="list-disc pl-5 text-sm">
                                    <li>Database query optimization</li>
                                    <li>Development of scalable applications</li>
                                    <li>Worked with React, Node.js, Nest.js, Prisma</li>
                                  </ul>
                                </div>

                                <div className="retro-outset p-2">
                                  <div className="font-bold">Freelancer</div>
                                  <div className="italic mb-1">Full Stack Developer – Mar 2022 – Present</div>
                                  <ul className="list-disc pl-5 text-sm">
                                    <li>Built custom features using Next.js, NestJS, and TypeORM</li>
                                    <li>Designed optimized database queries tailored to client needs</li>
                                  </ul>
                                </div>
                              </div>

                              <div className="mb-4">
                                <h3 className="font-bold mb-2 border-b border-gray-400">Certifications</h3>
                                <ul className="pl-2 list-disc list-inside">
                                  <li>✅ Full Stack Web Development Certificate</li>
                                  <li>🌐 EF SET English Certificate 81/100 (C2 Proficient)</li>
                                  <li>🎓 Harvard CS50 – Introduction to Computer Science</li>
                                </ul>
                              </div>

                              <div className="retro-outset p-2 mb-4">
                                <h3 className="font-bold mb-1">Contact</h3>
                                <div className="grid grid-cols-1 gap-1 text-sm">
                                  <a href="mailto:nicolau.hugogiles@gmail.com" className="flex items-center hover:underline">
                                    <span className="mr-2">📧</span>
                                    <span>nicolau.hugogiles@gmail.com</span>
                                  </a>
                                  <a href="https://linkedin.com/in/hugo-nicolau" target="_blank" className="flex items-center hover:underline">
                                    <span className="mr-2">🔗</span>
                                    <span>linkedin.com/in/hugo-nicolau</span>
                                  </a>
                                  <a href="https://github.com/HugoNicolau" target="_blank" className="flex items-center hover:underline">
                                    <span className="mr-2">🐙</span>
                                    <span>github.com/HugoNicolau</span>
                                  </a>
                                </div>
                              </div>

                              <a href={ResumeFile} download className="retro-button">
                                Download CV
                              </a>
                            </div>
                          )}
                          isDragging={draggingIcon === 'about'}
                          isSelected={selectedIcons.includes('about')}
                        />
                      </div>
                    );
                  })()}

                  {/* Select Wallpaper icon */}
                  {(() => {
                    const position = iconPositions.find(pos => pos.id === 'display-properties');
                    return position && (
                      <div
                        key="display-properties"
                        className="absolute desktop-icon"
                        style={{ left: `${position.x}px`, top: `${position.y}px` }}
                      >
                        <DesktopIcon
                          name="Select Wallpaper"
                          icon={<span className="text-3xl">🖼️</span>}
                          onMouseDown={(e) => handleIconDragStart(e, 'display-properties')}
                          onClick={openDisplayProperties}
                          isDragging={draggingIcon === 'display-properties'}
                          isSelected={selectedIcons.includes('display-properties')}
                        />
                      </div>
                    );
                  })()}
                </div>

                {/* Selection box - render only when actively selecting */}
                {selectionBox.isSelecting && (
                  <div
                    className="absolute border border-dashed border-white bg-blue-500/20 bg-opacity-20% z-10"
                    style={{
                      left: Math.min(selectionBox.startX, selectionBox.endX),
                      top: Math.min(selectionBox.startY, selectionBox.endY),
                      width: Math.abs(selectionBox.endX - selectionBox.startX),
                      height: Math.abs(selectionBox.endY - selectionBox.startY)
                    }}
                  />
                )}

                {/* Context menu */}
                {showContextMenu && (
                  <div
                    className="fixed z-50 bg-win95-gray border-2 border-win95-shadow shadow-md py-1 w-48"
                    style={{
                      left: contextMenuPosition.x,
                      top: contextMenuPosition.y,
                      boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div
                      className="px-4 py-1 hover:bg-win95-blue hover:text-white cursor-pointer"
                      onClick={arrangeIcons}
                    >
                      Arrange Icons
                    </div>
                    <div
                      className="px-4 py-1 hover:bg-win95-blue hover:text-white cursor-pointer"
                      onClick={() => setShowContextMenu(false)}
                    >
                      Refresh
                    </div>
                    <div className="border-t border-win95-shadow my-1"></div>
                    <div
                      className="px-4 py-1 hover:bg-win95-blue hover:text-white cursor-pointer"
                      onClick={() => setShowContextMenu(false)}
                    >
                      Properties
                    </div>
                  </div>
                )}

                {/* Click handler to close context menu when clicking elsewhere */}
                {showContextMenu && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowContextMenu(false)}
                  />
                )}

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
              </div>

              {/* Taskbar (fixed height) */}
              <div className="h-8 bg-win95-gray border-t-2 retro-outset flex items-center z-50">
                {/* Your existing taskbar code */}
                <button
                  className={`h-6 px-2 mx-1 retro-button ${showStartMenu ? 'active' : ''} flex items-center start-button`}
                  onClick={() => setShowStartMenu(!showStartMenu)}
                >
                  <span className="mr-1 text-sm">🪟</span>
                  <span className="font-bold">Start</span>
                </button>

                {/* Start menu */}
                {showStartMenu && (
                  <div
                    className="start-menu absolute left-0 bottom-8 w-64 bg-win95-gray shadow-md border-2 z-[100]"
                    style={{
                      borderColor: '#dfdfdf #000000 #000000 #dfdfdf',
                      boxShadow: 'inset 1px 1px 0 #ffffff, 2px 2px 2px rgba(0,0,0,0.5)'
                    }}
                  >
                    {/* Windows 95 side banner */}
                    <div className="flex h-full">
                      <div className="w-8 bg-win95-blue h-full flex flex-col justify-center items-center relative">
                        <div className="absolute bottom-16 origin-center" style={{ transform: 'rotate(-90deg) translateX(-110px)' }}>
                          <span className="text-black font-bold whitespace-nowrap">
                            Nico OS
                          </span>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="flex-grow p-1">
                        <div
                          className="hover:bg-win95-blue hover:text-white p-1 flex items-center cursor-pointer"
                          onClick={() => {
                            // Open the same About Me window as the desktop icon
                            openWindow(
                              'about',
                              'About Me - Hugo Nicolau',
                              <div className="font-win95 text-black p-3 overflow-auto">
                                <h2 className="text-xl font-bold mb-4">Hugo Nicolau</h2>
                                <h3 className="text-base mb-2">Full Stack Engineer</h3>

                                <div className="retro-inset p-3 mb-4">
                                  <p className="mb-3">
                                    Full-stack developer passionate about technology. I began my journey in 2016 with Arduino and, since 2021, have specialized in web development focused on TypeScript, JavaScript, React.js, Node.js, Nest.js, and RESTful APIs.
                                  </p>
                                  <p>
                                    I have experience building intuitive and responsive interfaces, as well as scalable and robust backends. I value communication and teamwork, transforming ideas into efficient and functional solutions.
                                  </p>
                                </div>

                                <div className="mb-4">
                                  <h3 className="font-bold mb-2 border-b border-gray-400">Key Skills</h3>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="retro-outset p-2">
                                      <div className="font-bold mb-1">💻 Languages</div>
                                      <div>TypeScript, JavaScript, Java,  C++</div>
                                    </div>
                                    <div className="retro-outset p-2">
                                      <div className="font-bold mb-1">🔨 Frameworks</div>
                                      <div>React.js, Vite, Node.js, Nest.js, Express.js</div>
                                    </div>
                                    <div className="retro-outset p-2">
                                      <div className="font-bold mb-1">🗄️ Databases</div>
                                      <div>PostgreSQL, MongoDB, TypeORM, Prisma</div>
                                    </div>
                                    <div className="retro-outset p-2">
                                      <div className="font-bold mb-1">⚙️ Infrastructure & Tools</div>
                                      <div>Docker, AWS, Git, GitHub</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <h3 className="font-bold mb-2 border-b border-gray-400">Experience</h3>
                                  <div className="retro-outset p-2 mb-2">
                                    <div className="font-bold">TeamSoft Technology and Systems</div>
                                    <div className="italic mb-1">Full Stack Developer – Apr 2024 – Present</div>
                                    <ul className="list-disc pl-5 text-sm">
                                      <li>Database query optimization</li>
                                      <li>Development of scalable applications</li>
                                      <li>Worked with React, Node.js, Nest.js, Prisma</li>
                                    </ul>
                                  </div>

                                  <div className="retro-outset p-2">
                                    <div className="font-bold">Freelancer</div>
                                    <div className="italic mb-1">Full Stack Developer – Mar 2022 – Present</div>
                                    <ul className="list-disc pl-5 text-sm">
                                      <li>Built custom features using Next.js, NestJS, and TypeORM</li>
                                      <li>Designed optimized database queries tailored to client needs</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <h3 className="font-bold mb-2 border-b border-gray-400">Certifications</h3>
                                  <ul className="pl-2 list-disc list-inside">
                                    <li>✅ Full Stack Web Development Certificate</li>
                                    <li>🌐 EF SET English Certificate 81/100 (C2 Proficient)</li>
                                    <li>🎓 Harvard CS50 – Introduction to Computer Science</li>
                                  </ul>
                                </div>

                                <div className="retro-outset p-2 mb-4">
                                  <h3 className="font-bold mb-1">Contact</h3>
                                  <div className="grid grid-cols-1 gap-1 text-sm">
                                    <a href="mailto:nicolau.hugogiles@gmail.com" className="flex items-center hover:underline">
                                      <span className="mr-2">📧</span>
                                      <span>nicolau.hugogiles@gmail.com</span>
                                    </a>
                                    <a href="https://linkedin.com/in/hugo-nicolau" target="_blank" className="flex items-center hover:underline">
                                      <span className="mr-2">🔗</span>
                                      <span>linkedin.com/in/hugo-nicolau</span>
                                    </a>
                                    <a href="https://github.com/HugoNicolau" target="_blank" className="flex items-center hover:underline">
                                      <span className="mr-2">🐙</span>
                                      <span>github.com/HugoNicolau</span>
                                    </a>
                                  </div>
                                </div>

                                <a href={ResumeFile} download className="retro-button">
                                  Download CV
                                </a>
                              </div>
                            );
                            setShowStartMenu(false);
                          }}
                        >
                          <span className="mr-2">👤</span>
                          <span>About Me</span>
                        </div>

                        {/* Skip the Projects entry as it seems fine */}

                        {/* Update Resume entry to directly download CV */}
                        <div
                          className="hover:bg-win95-blue hover:text-white p-1 flex items-center cursor-pointer"
                          onClick={() => {
                            // Create a download link for the resume and trigger it
                            const link = document.createElement('a');
                            link.href = ResumeFile;
                            link.download = 'Hugo_Nicolau_Resume.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            setShowStartMenu(false);
                          }}
                        >
                          <span className="mr-2">📝</span>
                          <span>Download Resume</span>
                        </div>

                        {/* Update Contact entry with your actual contact info */}
                        <div
                          className="hover:bg-win95-blue hover:text-white p-1 flex items-center cursor-pointer"
                          onClick={() => {
                            openWindow(
                              'contact',
                              'Contact Me',
                              <div className="font-win95 p-4 text-black">
                                <h2 className="text-xl font-bold mb-4">Contact Me</h2>
                                <div className="retro-outset p-3">
                                  <a href="mailto:nicolau.hugogiles@gmail.com" className="flex items-center mb-3 hover:underline">
                                    <span className="mr-2 text-xl">📧</span>
                                    <span>nicolau.hugogiles@gmail.com</span>
                                  </a>
                                  <a href="https://linkedin.com/in/hugo-nicolau" target="_blank" className="flex items-center mb-3 hover:underline">
                                    <span className="mr-2 text-xl">🔗</span>
                                    <span>linkedin.com/in/hugo-nicolau</span>
                                  </a>
                                  <a href="https://github.com/HugoNicolau" target="_blank" className="flex items-center mb-3 hover:underline">
                                    <span className="mr-2 text-xl">🐙</span>
                                    <span>github.com/HugoNicolau</span>
                                  </a>
                                  <a href="tel:+5524981160258" className="flex items-center hover:underline">
                                    <span className="mr-2 text-xl">📱</span>
                                    <span>+55 24 98116-0258</span>
                                  </a>
                                </div>
                                
                                <div className="mt-4 retro-outset p-3">
                                  <h3 className="font-bold mb-2">Send me a message</h3>
                                  <form className="space-y-2">
                                    <div className="flex flex-col">
                                      <label className="mb-1">Your Name:</label>
                                      <input type="text" className="retro-inset px-2 py-1" />
                                    </div>
                                    <div className="flex flex-col">
                                      <label className="mb-1">Email:</label>
                                      <input type="email" className="retro-inset px-2 py-1" />
                                    </div>
                                    <div className="flex flex-col">
                                      <label className="mb-1">Message:</label>
                                      <textarea className="retro-inset px-2 py-1 h-24 resize-none"></textarea>
                                    </div>
                                    <button type="button" className="retro-button" onClick={() => alert('Message functionality coming soon!')}>
                                      Send Message
                                    </button>
                                  </form>
                                </div>
                              </div>
                            );
                            setShowStartMenu(false);
                          }}
                        >
                          <span className="mr-2">📱</span>
                          <span>Contact Me</span>
                        </div>

                        <div
                          className="hover:bg-win95-blue hover:text-white p-1 flex items-center cursor-pointer"
                          onClick={() => {
                            openWindow(
                              'settings',
                              'Settings',
                              <div className="font-win95 p-2">
                                <h2 className="text-xl font-bold mb-4">Settings</h2>
                                <p>Easter egg: <a href='https://www.youtube.com/@nicolaub' target="_blank"> My Youtube Channel</a>.</p>
                              </div>
                            );
                            setShowStartMenu(false);
                          }}
                        >
                          <span className="mr-2">⚙️</span>
                          <span>Settings</span>
                        </div>
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
            </div>
          </div>

          {/* CRT scan effect overlay */}
          <div className="fixed inset-0 pointer-events-none z-[15] opacity-5">
            <div className="scanline"></div>
          </div>

          {/* Screen reflection overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent z-[14]"></div>
        </div>

        {/* Monitor LED indicator */}
        <div className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-green-500 shadow-lg animate-pulse"></div>

        {/* Monitor bottom stand */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gradient-to-b from-[#444] to-[#222] rounded-b-lg"></div>
      </div>

      {/* System tooltip - place outside the monitor for consistent positioning */}
      <div
        className="fixed bottom-18 right-12 bg-yellow-100 text-black p-3 border-2 border-black shadow-lg max-w-xs text-sm z-[20]"
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