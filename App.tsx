
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMapRender } from './ui/GameMap';
import { MAPS, HAIR_COLORS, DRESS_COLORS, TILE_SIZE } from './maps/world';
import { Direction, GameState } from './models/types';
import { generateNPCDialogue } from './utils/gemini';
import { logger } from './utils/logger';
import { Heart, Coins, MapPin, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hand } from 'lucide-react';

const INITIAL_STATE: GameState = {
  currentMapId: 'village_center',
  playerPos: { x: 7, y: 8 }, 
  direction: 'down',
  messages: ["¡Bienvenida! Presiona Espacio o A para interactuar."],
  coins: 100,
  appearance: { hairColor: HAIR_COLORS[0], dressColor: DRESS_COLORS[0] },
  collectedObjectIds: []
};

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [isTalking, setIsTalking] = useState(false);
  const [viewportSize, setViewportSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  const currentMap = MAPS[gameState.currentMapId];

  // Update viewport size on resize
  useEffect(() => {
    const handleResize = () => setViewportSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addMessage = (msg: string) => setGameState(prev => ({ ...prev, messages: [msg] }));

  const movePlayer = useCallback((dx: number, dy: number, newDir: Direction) => {
    if (isTalking) return;
    const now = Date.now();
    if (now - lastActionTime < 120) return; // Slightly faster for touch feel
    
    setGameState(prev => {
      const map = MAPS[prev.currentMapId];
      let newX = prev.playerPos.x + dx;
      let newY = prev.playerPos.y + dy;

      // --- MAP TRANSITION LOGIC ---
      if (newX < 0) {
        if (map.connections.left) return { ...prev, currentMapId: map.connections.left, playerPos: { x: map.width - 1, y: newY }, direction: newDir, messages: [`Viajando al Oeste...`] };
        else return { ...prev, direction: newDir };
      }
      if (newX >= map.width) {
        if (map.connections.right) return { ...prev, currentMapId: map.connections.right, playerPos: { x: 0, y: newY }, direction: newDir, messages: [`Viajando al Este...`] };
        else return { ...prev, direction: newDir };
      }
      if (newY < 0) {
        if (map.connections.up) return { ...prev, currentMapId: map.connections.up, playerPos: { x: newX, y: map.height - 1 }, direction: newDir, messages: [`Viajando al Norte...`] };
        else return { ...prev, direction: newDir };
      }
      if (newY >= map.height) {
        if (map.connections.down) return { ...prev, currentMapId: map.connections.down, playerPos: { x: newX, y: 0 }, direction: newDir, messages: [`Viajando al Sur...`] };
        else return { ...prev, direction: newDir };
      }
      
      const tile = map.tiles[newY][newX];
      const blockedTiles = ['wall', 'water', 'fountain', 'bed', 'sofa', 'table', 'bookshelf', 'oven', 'counter', 'banner', 'armor', 'candle'];
      if (blockedTiles.includes(tile)) return { ...prev, direction: newDir };
      
      const npcInWay = map.objects.some(obj => obj.type === 'npc' && obj.position.x === newX && obj.position.y === newY);
      if (npcInWay) return { ...prev, direction: newDir };

      setLastActionTime(now);
      return { ...prev, playerPos: { x: newX, y: newY }, direction: newDir };
    });
  }, [lastActionTime, isTalking]);

  const handleInteraction = useCallback(async () => {
    if (isTalking) { setIsTalking(false); return; }

    const { playerPos, currentMapId, direction } = gameState;
    const map = MAPS[currentMapId];
    let tx = playerPos.x, ty = playerPos.y;
    
    if (direction === 'up') ty--; 
    else if (direction === 'down') ty++; 
    else if (direction === 'left') tx--; 
    else if (direction === 'right') tx++;

    const obj = map.objects.find(o => o.position.x === tx && o.position.y === ty);
    const objUnder = map.objects.find(o => o.position.x === playerPos.x && o.position.y === playerPos.y);
    const targetObj = obj || objUnder;

    if (targetObj) {
        if (targetObj.type === 'npc' && targetObj.npcData) {
            setIsTalking(true);
            addMessage("Escuchando...");
            const story = await generateNPCDialogue(targetObj.npcData.role, targetObj.npcData.name);
            addMessage(`${targetObj.npcData.name}: "${story}"`);
            return;
        }
        if (targetObj.type === 'warp' && targetObj.targetMap) {
            logger.info(`Viajando a: ${targetObj.targetMap}`);
            setGameState(prev => ({
                ...prev,
                currentMapId: targetObj.targetMap!,
                playerPos: targetObj.targetPos || { x: 5, y: 5 },
                messages: ["Explorando..."]
            }));
            return;
        }
    }
  }, [gameState, isTalking]);

  useEffect(() => {
    if (!isGameStarted) return;
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"," "].includes(e.key)) e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1, 'up'); break;
        case 'ArrowDown': movePlayer(0, 1, 'down'); break;
        case 'ArrowLeft': movePlayer(-1, 0, 'left'); break;
        case 'ArrowRight': movePlayer(1, 0, 'right'); break;
        case 'Enter': case ' ': handleInteraction(); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isGameStarted, movePlayer, handleInteraction]);

  // --- CAMERA LOGIC ---
  const getCameraTransform = () => {
    // Center of viewport
    const cx = viewportSize.w / 2;
    const cy = viewportSize.h / 2;
    
    // Player position in pixels (center of tile)
    const px = gameState.playerPos.x * TILE_SIZE + (TILE_SIZE / 2);
    const py = gameState.playerPos.y * TILE_SIZE + (TILE_SIZE / 2);
    
    // Desired camera position (centered on player)
    let camX = px - cx;
    let camY = py - cy;

    // Optional: Clamp camera to map bounds (so we don't see black void beyond map)
    const mapW = currentMap.width * TILE_SIZE;
    const mapH = currentMap.height * TILE_SIZE;
    
    // Only clamp if map is larger than screen
    if (mapW > viewportSize.w) {
        camX = Math.max(0, Math.min(camX, mapW - viewportSize.w));
    } else {
        camX = -(viewportSize.w - mapW) / 2; // Center map if smaller than screen
    }

    if (mapH > viewportSize.h) {
        camY = Math.max(0, Math.min(camY, mapH - viewportSize.h));
    } else {
        camY = -(viewportSize.h - mapH) / 2;
    }

    return `translate3d(${-camX}px, ${-camY}px, 0)`;
  };

  if (!isGameStarted) return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono p-4">
          <div className="bg-[#1a1a1a] p-6 md:p-10 border-4 border-white pixel-shadow text-center max-w-lg w-full">
              <h1 className="text-pink-500 text-lg md:text-xl mb-6 tracking-widest uppercase">Princess Legend</h1>
              <p className="text-white text-[10px] md:text-xs mb-8 leading-loose">
                  Escritorio: Flechas y Espacio.<br/>
                  Móvil: Controles táctiles en pantalla.<br/><br/>
                  ¡Explora el reino, habla con aldeanos y encuentra secretos!
              </p>
              <button onClick={() => setIsGameStarted(true)} className="bg-pink-600 text-white px-8 py-4 pixel-button text-[12px] hover:bg-pink-500 transition-colors w-full md:w-auto">JUGAR</button>
          </div>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden select-none touch-none">
      
      {/* GAME WORLD CONTAINER (CAMERA) */}
      <div 
        className="will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: getCameraTransform() }}
      >
        <div className="pixel-shadow inline-block bg-black relative">
            <GameMapRender 
                mapData={currentMap} 
                playerPos={gameState.playerPos} 
                playerDir={gameState.direction} 
                collectedObjectIds={gameState.collectedObjectIds} 
                appearance={gameState.appearance} 
            />
        </div>
      </div>

      {/* --- HUD LAYER (FIXED TO SCREEN) --- */}
      
      {/* Stats - Top Left */}
      <div className="absolute top-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/80 px-3 py-2 border-2 border-white/20 text-white rounded shadow-lg">
            <Heart className="text-red-500 fill-red-500 animate-pulse" size={16}/> 
            <span className="mt-[2px] text-xs font-bold">3/3</span>
          </div>
          <div className="flex items-center gap-2 bg-black/80 px-3 py-2 border-2 border-white/20 text-white rounded shadow-lg">
            <Coins className="text-yellow-500" size={16}/> 
            <span className="mt-[2px] text-xs font-bold">{gameState.coins}</span>
          </div>
      </div>

      {/* Zone Info - Top Right */}
      <div className="absolute top-4 right-4 z-50 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/80 px-3 py-2 border-2 border-white/20 text-white text-[10px] uppercase rounded shadow-lg max-w-[150px] justify-end">
            <MapPin size={12} className="text-pink-400 shrink-0" />
            <span className="text-pink-200 mt-[1px] truncate">{gameState.currentMapId.replace('village_', '').replace('_', ' ')}</span>
          </div>
      </div>

      {/* Dialog Box - Bottom Center (Moved to bottom as requested) */}
      {gameState.messages.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-1/4 md:right-1/4 z-40 pointer-events-none">
            <div className="bg-blue-900/95 border-4 border-white p-4 min-h-[80px] shadow-2xl rounded-sm">
                <p className="text-white text-xs md:text-sm leading-relaxed drop-shadow-md">
                    {gameState.messages[0]}
                </p>
            </div>
          </div>
      )}

      {/* --- VIRTUAL CONTROLS (MOBILE) - Moved higher "a bit in the middle" --- */}
      <div className="absolute bottom-36 left-4 z-50 md:hidden flex flex-col gap-2 opacity-80 hover:opacity-100 transition-opacity">
         <div className="flex justify-center">
             <button 
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center active:bg-white/30 active:scale-95 transition-all"
                onPointerDown={(e) => { e.preventDefault(); movePlayer(0, -1, 'up'); }}
             >
                <ArrowUp size={24} className="text-white"/>
             </button>
         </div>
         <div className="flex gap-4">
             <button 
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center active:bg-white/30 active:scale-95 transition-all"
                onPointerDown={(e) => { e.preventDefault(); movePlayer(-1, 0, 'left'); }}
             >
                <ArrowLeft size={24} className="text-white"/>
             </button>
             <button 
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center active:bg-white/30 active:scale-95 transition-all"
                onPointerDown={(e) => { e.preventDefault(); movePlayer(0, 1, 'down'); }}
             >
                <ArrowDown size={24} className="text-white"/>
             </button>
             <button 
                className="w-14 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center active:bg-white/30 active:scale-95 transition-all"
                onPointerDown={(e) => { e.preventDefault(); movePlayer(1, 0, 'right'); }}
             >
                <ArrowRight size={24} className="text-white"/>
             </button>
         </div>
      </div>

      <div className="absolute bottom-40 right-6 z-50 md:hidden opacity-80 hover:opacity-100 transition-opacity">
         <button 
            className="w-20 h-20 bg-pink-600/80 border-4 border-pink-400 rounded-full flex items-center justify-center active:bg-pink-500 active:scale-95 transition-all shadow-lg"
            onPointerDown={(e) => { e.preventDefault(); handleInteraction(); }}
         >
            <Hand size={32} className="text-white" />
         </button>
      </div>
      
      {/* SCANLINES OVERLAY */}
      <div className="scanlines pointer-events-none fixed inset-0 z-[60]"></div>
    </div>
  );
}
