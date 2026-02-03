import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMapRender } from './components/GameMap';
import { Minimap } from './components/Minimap';
import { MAPS, ItemSprite, HAIR_COLORS, DRESS_COLORS, PrincessSprite } from './constants';
import { Position, Direction, GameState, ItemType } from './types';
import { generateRoomDescription } from './services/geminiService';
import { Heart, Coins, Map as MapIcon, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const INITIAL_STATE: GameState = {
  currentMapId: 'village',
  playerPos: { x: 7, y: 8 },
  direction: 'down',
  isMoving: false,
  messages: ["¡Bienvenida, Princesa! La aventura comienza..."],
  inventory: {},
  collectedObjectIds: [],
  coins: 0,
  appearance: {
      hairColor: HAIR_COLORS[0],
      dressColor: DRESS_COLORS[0]
  }
};

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastActionTime, setLastActionTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Customization State for Start Screen
  const [customHairIndex, setCustomHairIndex] = useState(0);
  const [customDressIndex, setCustomDressIndex] = useState(0);

  const currentMap = MAPS[gameState.currentMapId];

  const addMessage = (msg: string) => {
    setGameState(prev => ({
      ...prev,
      messages: [msg] // Only show latest message in RPG dialog style
    }));
  };

  const playSound = (type: 'step' | 'warp' | 'bump' | 'item' | 'text' | 'select' | 'start') => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    switch (type) {
        case 'step':
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
            break;
        case 'warp':
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
            break;
        case 'bump':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
            break;
        case 'item':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
            osc.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
            break;
        case 'text':
             osc.type = 'square';
             osc.frequency.setValueAtTime(800, ctx.currentTime);
             gain.gain.setValueAtTime(0.05, ctx.currentTime);
             osc.start();
             osc.stop(ctx.currentTime + 0.05);
             break;
        case 'select':
             osc.type = 'square';
             osc.frequency.setValueAtTime(400, ctx.currentTime);
             gain.gain.setValueAtTime(0.05, ctx.currentTime);
             osc.start();
             osc.stop(ctx.currentTime + 0.05);
             break;
        case 'start':
             osc.type = 'triangle';
             osc.frequency.setValueAtTime(300, ctx.currentTime);
             osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.2);
             osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.4);
             gain.gain.setValueAtTime(0.1, ctx.currentTime);
             gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
             osc.start();
             osc.stop(ctx.currentTime + 0.6);
             break;
    }
    osc.connect(gain);
    gain.connect(ctx.destination);
  };

  const handleStartGame = () => {
      playSound('start');
      setGameState(prev => ({
          ...prev,
          appearance: {
              hairColor: HAIR_COLORS[customHairIndex],
              dressColor: DRESS_COLORS[customDressIndex]
          }
      }));
      setIsGameStarted(true);
  };

  const handleInteraction = useCallback(async () => {
    const { playerPos, currentMapId, collectedObjectIds, inventory } = gameState;
    const map = MAPS[currentMapId];
    
    let targetX = playerPos.x;
    let targetY = playerPos.y;
    // Check warp/item under feet first
    let activeObj = map.objects.find(obj => obj.position.x === targetX && obj.position.y === targetY);
    
    // If nothing under feet, check facing direction
    if (!activeObj) {
        if (gameState.direction === 'up') targetY--;
        if (gameState.direction === 'down') targetY++;
        if (gameState.direction === 'left') targetX--;
        if (gameState.direction === 'right') targetX++;
        activeObj = map.objects.find(obj => obj.position.x === targetX && obj.position.y === targetY);
    }

    if (!activeObj || collectedObjectIds.includes(activeObj.id)) {
        // Flavor text for tiles if no object
        const tileInFront = map.tiles[targetY]?.[targetX];
        if (tileInFront === 'flower') addMessage("Es una flor muy bonita.");
        else if (tileInFront === 'water') addMessage("El agua brilla con el sol.");
        else if (tileInFront === 'bed') addMessage("Una cama suave.");
        else if (tileInFront === 'oven') addMessage("La cocina está limpia.");
        else if (tileInFront === 'table') addMessage("Una mesa de madera robusta.");
        else addMessage("No hay nada interesante aquí.");
        return;
    }

    // Handle Warps
    if (activeObj.type === 'warp' && activeObj.targetMap && activeObj.targetPos) {
      playSound('warp');
      const nextMapId = activeObj.targetMap;
      setGameState(prev => ({
        ...prev,
        currentMapId: nextMapId,
        playerPos: activeObj.targetPos!,
        messages: ["Entrando..."]
      }));

      if (nextMapId !== 'village') {
         const decorators = ['muebles', 'calidez', 'hogar'];
         const desc = await generateRoomDescription(
            nextMapId === 'house_1' ? 'Casa Rustica' : 'Cabaña Pequeña', 
            decorators
         );
         addMessage(desc);
      } else {
         addMessage("Has salido al exterior.");
      }
      return;
    }

    // Handle Items
    if (activeObj.type === 'item' && activeObj.itemId) {
        playSound('item');
        const newItemId = activeObj.itemId;
        
        setGameState(prev => ({
            ...prev,
            collectedObjectIds: [...prev.collectedObjectIds, activeObj.id],
            inventory: {
                ...prev.inventory,
                [newItemId]: (prev.inventory[newItemId] || 0) + 1
            },
            coins: newItemId === 'key' ? prev.coins + 10 : prev.coins // Bonus for key?
        }));
        
        const itemName = newItemId === 'key' ? "LLAVE DORADA" : newItemId === 'potion' ? "POCIÓN ROJA" : "ESPADA DE HIERRO";
        addMessage(`¡Conseguiste: ${itemName}!`);
        return;
    }

    // Handle Signs
    if (activeObj.type === 'sign' && activeObj.message) {
        playSound('text');
        addMessage(activeObj.message);
        return;
    }

  }, [gameState]);

  const movePlayer = useCallback((dx: number, dy: number, newDir: Direction) => {
    const now = Date.now();
    if (now - lastActionTime < 180) return;
    
    setGameState(prev => {
      const map = MAPS[prev.currentMapId];
      const newX = prev.playerPos.x + dx;
      const newY = prev.playerPos.y + dy;

      if (newX < 0 || newX >= map.width || newY < 0 || newY >= map.height) {
        return { ...prev, direction: newDir };
      }

      const targetTile = map.tiles[newY][newX];
      const isWall = targetTile === 'wall' || targetTile === 'water';
      
      if (isWall) {
          playSound('bump');
          return { ...prev, direction: newDir };
      }

      setLastActionTime(now);
      playSound('step');
      return {
        ...prev,
        playerPos: { x: newX, y: newY },
        direction: newDir,
      };
    });
  }, [lastActionTime]);

  useEffect(() => {
    if (!isGameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "Enter", " "].indexOf(e.key) > -1) {
          e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1, 'up'); break;
        case 'ArrowDown': movePlayer(0, 1, 'down'); break;
        case 'ArrowLeft': movePlayer(-1, 0, 'left'); break;
        case 'ArrowRight': movePlayer(1, 0, 'right'); break;
        case 'Enter': case ' ': handleInteraction(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameStarted, movePlayer, handleInteraction]);

  if (!isGameStarted) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
             <div className="relative bg-[#2a2a2a] p-8 rounded-xl shadow-2xl border-t border-gray-600 max-w-md w-full">
                <div className="border-4 border-[#111] bg-black rounded-sm p-6 text-center">
                    <h1 className="text-3xl text-yellow-400 font-bold mb-8 drop-shadow-[4px_4px_0_rgba(180,83,9,1)] tracking-widest leading-relaxed">
                        PRINCESS<br/>LEGEND
                    </h1>
                    
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-[#1a1a1a] border-4 border-gray-700 rounded-lg p-2 relative">
                             <PrincessSprite 
                                direction="down" 
                                appearance={{
                                    hairColor: HAIR_COLORS[customHairIndex],
                                    dressColor: DRESS_COLORS[customDressIndex]
                                }} 
                             />
                        </div>
                    </div>

                    <div className="space-y-6 mb-8">
                        {/* Hair Selector */}
                        <div className="flex items-center justify-between bg-gray-900 p-2 rounded border border-gray-700">
                             <span className="text-xs text-gray-400">CABELLO</span>
                             <div className="flex items-center gap-2">
                                <button onClick={() => { playSound('select'); setCustomHairIndex(i => (i - 1 + HAIR_COLORS.length) % HAIR_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded">
                                    <ChevronLeft size={16} />
                                </button>
                                <div className="w-6 h-6 rounded border border-white/20" style={{ backgroundColor: HAIR_COLORS[customHairIndex] }} />
                                <button onClick={() => { playSound('select'); setCustomHairIndex(i => (i + 1) % HAIR_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded">
                                    <ChevronRight size={16} />
                                </button>
                             </div>
                        </div>

                        {/* Dress Selector */}
                        <div className="flex items-center justify-between bg-gray-900 p-2 rounded border border-gray-700">
                             <span className="text-xs text-gray-400">VESTIDO</span>
                             <div className="flex items-center gap-2">
                                <button onClick={() => { playSound('select'); setCustomDressIndex(i => (i - 1 + DRESS_COLORS.length) % DRESS_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded">
                                    <ChevronLeft size={16} />
                                </button>
                                <div className="w-6 h-6 rounded border border-white/20" style={{ backgroundColor: DRESS_COLORS[customDressIndex] }} />
                                <button onClick={() => { playSound('select'); setCustomDressIndex(i => (i + 1) % DRESS_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded">
                                    <ChevronRight size={16} />
                                </button>
                             </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleStartGame}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                        <Play size={16} fill="white" />
                        START GAME
                    </button>
                </div>
                <div className="scanlines"></div>
             </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      
      {/* Console Frame */}
      <div className="relative bg-[#2a2a2a] p-4 rounded-xl shadow-2xl border-t border-gray-600">
        
        {/* Screen Container */}
        <div className="relative border-4 border-[#111] bg-black rounded-sm overflow-hidden shadow-inner">
            
            {/* HUD */}
            <div className="absolute top-0 left-0 w-full h-16 bg-black/80 z-40 flex items-center justify-between px-4 border-b-2 border-white/10 font-sans">
                {/* Life */}
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-red-400 font-bold tracking-widest">LIFE</span>
                    <div className="flex gap-1">
                        <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={16} />
                        <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={16} />
                        <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={16} />
                    </div>
                </div>

                {/* Inventory & Minimap Display */}
                <div className="flex items-center gap-4">
                    {/* Items Slot */}
                    <div className="flex items-center gap-2 bg-black/50 p-1 rounded border border-white/20">
                         {Object.keys(gameState.inventory).length === 0 && <span className="text-[8px] text-gray-500 px-2">VACÍO</span>}
                         {Object.entries(gameState.inventory).map(([item, count]) => (
                             <div key={item} className="relative w-8 h-8 bg-gray-800 rounded flex items-center justify-center border border-gray-600">
                                 <div className="w-6 h-6"><ItemSprite type={item as ItemType} /></div>
                                 <span className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] px-1 rounded">{count}</span>
                             </div>
                         ))}
                    </div>

                    {/* Minimap */}
                    <div className="hidden md:block">
                        <Minimap mapData={currentMap} playerPos={gameState.playerPos} />
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col gap-1 text-right">
                        <div className="flex items-center gap-1 justify-end text-yellow-400 text-xs font-bold">
                            <Coins size={12} /> 
                            <span>{gameState.coins.toString().padStart(3, '0')}</span>
                        </div>
                         <div className="flex items-center gap-1 justify-end text-green-400 text-[10px] font-bold">
                            <MapIcon size={12} /> 
                            <span>{gameState.currentMapId === 'village' ? 'VILLA' : 'CASA'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game World */}
            <div className="mt-12"> {/* Spacer for HUD */}
                <GameMapRender 
                    mapData={currentMap} 
                    playerPos={gameState.playerPos} 
                    playerDir={gameState.direction} 
                    collectedObjectIds={gameState.collectedObjectIds}
                    appearance={gameState.appearance}
                />
            </div>

            {/* RPG Dialog Box Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-50">
                <div className="bg-blue-900/95 border-2 border-white rounded p-4 shadow-lg min-h-[80px]">
                    <p className="text-white text-sm leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300 font-serif tracking-wide">
                        {gameState.messages[0]}
                    </p>
                    <div className="absolute bottom-2 right-2 animate-bounce text-white text-[10px]">▼</div>
                </div>
            </div>

            {/* Scanlines Effect */}
            <div className="scanlines"></div>
        </div>

        {/* Console Branding */}
        <div className="mt-2 flex justify-between items-center text-gray-500 text-xs px-2 font-sans font-bold">
            <span>NINTENDO-LIKE SYSTEM</span>
            <span className="flex gap-2">
                <span className="w-12 h-3 bg-gray-800 rounded-full block"></span>
                <span className="w-12 h-3 bg-gray-800 rounded-full block"></span>
            </span>
        </div>

      </div>
    </div>
  );
}