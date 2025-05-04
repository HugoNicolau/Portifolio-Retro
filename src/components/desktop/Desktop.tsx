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
  const [grid, setGrid] = useState<{[key: string]: string}>({});
  const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0 });

  // Add these updates to your Desktop component

  // 1. Define margins to keep icons away from edges
  const EDGE_MARGIN = 5; // pixels from the edge of the screen

  // 2. Track original position during drag for fallback
  const [dragStartPosition, setDragStartPosition] = useState<{x: number, y: number} | null>(null);

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
    const newGrid: {[key: string]: string} = {};
    
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

  // Add drag handlers for desktop icons
  // 4. Update handleIconDragStart to track original position
  const handleIconDragStart = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault(); // Prevent default browser dragging
    
    const position = iconPositions.find(pos => pos.id === iconId);
    if (!position) return;
    
    // Store the original position for potential fallback
    setDragStartPosition({ x: position.x, y: position.y });
    setDraggingIcon(iconId);
    
    // Calculate offset from click position to icon corner
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
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
    
    // Now snap to grid for final position
    const { col, row } = positionToGridCell(draggedIcon.x, draggedIcon.y);
    
    // Check if this grid position is within allowed bounds
    const isWithinBounds = 
      col >= Math.ceil(EDGE_MARGIN / GRID_CELL_WIDTH) && 
      row >= Math.ceil(EDGE_MARGIN / GRID_CELL_HEIGHT) &&
      col < gridDimensions.cols - Math.ceil(EDGE_MARGIN / GRID_CELL_WIDTH) &&
      row < gridDimensions.rows - Math.ceil(EDGE_MARGIN / GRID_CELL_HEIGHT);
    
    // Check if cell is already occupied by another icon
    const cellKey = `${col},${row}`;
    const occupiedBy = grid[cellKey];
    
    if (!isWithinBounds || (occupiedBy && occupiedBy !== draggingIcon)) {
      // Position is invalid - return to original position
      setIconPositions(prev => prev.map(pos => 
        pos.id === draggingIcon ? { ...pos, x: dragStartPosition.x, y: dragStartPosition.y } : pos
      ));
      
      // No need to update grid since we're returning to the original position
    } else {
      // Position is valid - update grid and snap to grid cell
      const newGrid = { ...grid };
        
      // Remove icon from old position
      Object.keys(newGrid).forEach(key => {
        if (newGrid[key] === draggingIcon) {
          delete newGrid[key];
        }
      });
      
      // Place in new position
      newGrid[cellKey] = draggingIcon;
      setGrid(newGrid);
      
      // Snap to grid cell
      const { x, y } = gridCellToPosition(col, row);
      setIconPositions(prev => prev.map(pos => 
        pos.id === draggingIcon ? { ...pos, x, y } : pos
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
    const newGrid: {[key: string]: string} = {};
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Monitor frame */}
      <div className="relative w-[96%] h-[94%] bg-[#222] rounded-lg p-4 shadow-2xl monitor-frame">
        {/* Monitor screen with bezel */}
        <div className="relative w-full h-full overflow-hidden border-8 border-[#333] rounded-md monitor-screen"
             style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
          {/* Screen content - this div contains both desktop and taskbar */}
          <div 
            className="absolute inset-0 overflow-hidden flex flex-col"
            onContextMenu={handleDesktopContextMenu}
          >
            {/* Desktop area (flex-grow to take available space) */}
            <div 
              className="flex-grow relative overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedWallpaper.src})` }}
            >
              {/* Desktop icons */}
              <div className="absolute inset-0">
                {/* Your existing icon rendering code */}
                {/* Projects */}
                {projects.map(project => {
                  const position = iconPositions.find(pos => pos.id === project.id);
                  return position && (
                    <div
                      key={project.id}
                      className="absolute"
                      style={{ left: `${position.x}px`, top: `${position.y}px` }}
                    >
                      <DesktopIcon
                        name={project.title}
                        icon={<span className="text-3xl">{project.icon}</span>}
                        onMouseDown={(e) => handleIconDragStart(e, project.id)}
                        onClick={() => openWindow(project.id, project.title, project.content)}
                        isDragging={draggingIcon === project.id}
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
                      className="absolute"
                      style={{ left: `${position.x}px`, top: `${position.y}px` }}
                    >
                      <DesktopIcon
                        name="My Computer"
                        icon={<span className="text-3xl">💻</span>}
                        onMouseDown={(e) => handleIconDragStart(e, 'computer')}
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
                        isDragging={draggingIcon === 'computer'}
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
                      className="absolute"
                      style={{ left: `${position.x}px`, top: `${position.y}px` }}
                    >
                      <DesktopIcon
                        name="About Me"
                        icon={<span className="text-3xl">👤</span>}
                        onMouseDown={(e) => handleIconDragStart(e, 'about')}
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
                        isDragging={draggingIcon === 'about'}
                      />
                    </div>
                  );
                })()}

                {/* Display Properties icon */}
                {(() => {
                  const position = iconPositions.find(pos => pos.id === 'display-properties');
                  return position && (
                    <div
                      key="display-properties"
                      className="absolute"
                      style={{ left: `${position.x}px`, top: `${position.y}px` }}
                    >
                      <DesktopIcon
                        name="Display Properties"
                        icon={<span className="text-3xl">🖼️</span>}
                        onMouseDown={(e) => handleIconDragStart(e, 'display-properties')}
                        onClick={openDisplayProperties}
                        isDragging={draggingIcon === 'display-properties'}
                      />
                    </div>
                  );
                })()}
              </div>
              
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