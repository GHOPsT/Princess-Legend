import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMapRender } from './components/GameMap';
import { MAPS } from './constants';
import { Position, Direction, GameState } from './types';
import { generateRoomDescription } from './services/geminiService';
import { Heart, Coins, Map as MapIcon } from 'lucide-react';

const INITIAL_STATE: GameState = {
  currentMapId: 'village',
  playerPos: { x: 7, y: 8 },
  direction: 'down',
  isMoving: false,
  messages: ["¡Bienvenida, Princesa! La aventura comienza..."],
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastActionTime, setLastActionTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const currentMap = MAPS[gameState.currentMapId];

  const addMessage = (msg: string) => {
    setGameState(prev => ({
      ...prev,
      messages: [msg] // Only show latest message in RPG dialog style
    }));
  };

  const playSound = (type: 'step' | 'warp' | 'bump') => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    if (type === 'step') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'warp') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } else {
        // bump
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }
  };

  const handleInteraction = useCallback(async () => {
    const { playerPos, currentMapId } = gameState;
    const map = MAPS[currentMapId];
    
    let targetX = playerPos.x;
    let targetY = playerPos.y;
    // Check warp under feet first
    let activeObj = map.objects.find(obj => obj.position.x === targetX && obj.position.y === targetY);
    
    // If nothing under feet, check facing direction
    if (!activeObj) {
        if (gameState.direction === 'up') targetY--;
        if (gameState.direction === 'down') targetY++;
        if (gameState.direction === 'left') targetX--;
        if (gameState.direction === 'right') targetX++;
        activeObj = map.objects.find(obj => obj.position.x === targetX && obj.position.y === targetY);
    }

    if (activeObj && activeObj.type === 'warp' && activeObj.targetMap && activeObj.targetPos) {
      playSound('warp');
      
      const nextMapId = activeObj.targetMap;
      setGameState(prev => ({
        ...prev,
        currentMapId: nextMapId,
        playerPos: activeObj.targetPos!,
        messages: ["Entrando..."]
      }));

      // AI Description
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
    } else {
        const tileInFront = map.tiles[targetY]?.[targetX];
        if (tileInFront === 'flower') addMessage("Es una flor muy bonita.");
        else if (tileInFront === 'water') addMessage("El agua brilla con el sol.");
        else if (tileInFront === 'bed') addMessage("Una cama suave.");
        else if (tileInFront === 'oven') addMessage("La cocina está limpia.");
        else if (tileInFront === 'table') addMessage("Una mesa de madera robusta.");
        else addMessage("No hay nada interesante aquí.");
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
  }, [movePlayer, handleInteraction]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      
      {/* Console Frame */}
      <div className="relative bg-[#2a2a2a] p-4 rounded-xl shadow-2xl border-t border-gray-600">
        
        {/* Screen Container */}
        <div className="relative border-4 border-[#111] bg-black rounded-sm overflow-hidden shadow-inner">
            
            {/* HUD */}
            <div className="absolute top-0 left-0 w-full h-12 bg-black/80 z-40 flex items-center justify-between px-4 border-b-2 border-white/10">
                <div className="flex gap-1">
                    <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={20} />
                    <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={20} />
                    <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={20} />
                </div>
                <div className="flex gap-4 text-xs text-white uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                        <Coins className="text-yellow-400" size={16} /> 005
                    </div>
                    <div className="flex items-center gap-1">
                        <MapIcon className="text-green-400" size={16} /> {gameState.currentMapId === 'village' ? 'VILLA' : 'CASA'}
                    </div>
                </div>
            </div>

            {/* Game World */}
            <div className="mt-8"> {/* Spacer for HUD */}
                <GameMapRender 
                    mapData={currentMap} 
                    playerPos={gameState.playerPos} 
                    playerDir={gameState.direction} 
                />
            </div>

            {/* RPG Dialog Box Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-50">
                <div className="bg-blue-900/95 border-2 border-white rounded p-4 shadow-lg min-h-[80px]">
                    <p className="text-white text-sm leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
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