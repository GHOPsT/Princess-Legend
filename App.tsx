
import React, { useState, useEffect, useCallback } from 'react';
import { GameMapRender } from './ui/GameMap';
import { MAPS, HAIR_COLORS, DRESS_COLORS } from './maps/world';
import { Direction, GameState } from './models/types';
import { generateNPCDialogue } from './utils/gemini';
import { logger } from './utils/logger';
import { Heart, Coins } from 'lucide-react';

const INITIAL_STATE: GameState = {
  currentMapId: 'village_center',
  playerPos: { x: 7, y: 8 }, 
  direction: 'down',
  messages: ["¡Bienvenida! Presiona Espacio sobre una puerta para entrar."],
  coins: 100,
  appearance: { hairColor: HAIR_COLORS[0], dressColor: DRESS_COLORS[0] },
  collectedObjectIds: []
};

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [isTalking, setIsTalking] = useState(false);

  const currentMap = MAPS[gameState.currentMapId];

  const addMessage = (msg: string) => setGameState(prev => ({ ...prev, messages: [msg] }));

  const movePlayer = useCallback((dx: number, dy: number, newDir: Direction) => {
    if (isTalking) return;
    const now = Date.now();
    if (now - lastActionTime < 140) return;
    
    setGameState(prev => {
      const map = MAPS[prev.currentMapId];
      let newX = prev.playerPos.x + dx;
      let newY = prev.playerPos.y + dy;

      // Colisiones básicas
      if (newX < 0 || newX >= map.width || newY < 0 || newY >= map.height) return { ...prev, direction: newDir };
      
      const tile = map.tiles[newY][newX];
      const blockedTiles = ['wall', 'water', 'fountain', 'bed', 'sofa', 'table', 'bookshelf', 'oven', 'counter'];
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

  if (!isGameStarted) return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
          <div className="bg-[#1a1a1a] p-10 border-4 border-white pixel-shadow text-center">
              <h1 className="text-pink-500 text-xl mb-6 tracking-widest uppercase">Princess Legend</h1>
              <p className="text-white text-[10px] mb-8 leading-loose">Flechas para mover.<br/>Espacio para entrar o hablar.</p>
              <button onClick={() => setIsGameStarted(true)} className="bg-pink-600 text-white px-10 py-5 pixel-button text-[12px] hover:bg-pink-500 transition-colors">START</button>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative border-8 border-[#333] bg-black p-2 pixel-shadow scale-[1.1]">
          <GameMapRender 
            mapData={currentMap} playerPos={gameState.playerPos} playerDir={gameState.direction} 
            collectedObjectIds={gameState.collectedObjectIds} appearance={gameState.appearance} 
          />
          
          <div className="absolute bottom-6 left-6 right-6 bg-blue-900/90 border-4 border-white p-4 min-h-[90px] z-50">
              <p className="text-white text-[10px] leading-relaxed">
                  {gameState.messages[0]}
              </p>
          </div>
          <div className="scanlines"></div>
      </div>
      <div className="mt-8 flex gap-12 text-white text-[10px] uppercase tracking-widest font-bold">
          <div className="flex items-center gap-3 bg-red-900/40 px-4 py-2 border-2 border-red-500/30 rounded"><Heart className="text-red-500 fill-red-500" size={14}/> <span>3 / 3</span></div>
          <div className="flex items-center gap-3 bg-yellow-900/40 px-4 py-2 border-2 border-yellow-500/30 rounded"><Coins className="text-yellow-500" size={14}/> <span>{gameState.coins}</span></div>
          <div className="bg-pink-900/40 px-4 py-2 border-2 border-pink-500/30 rounded">ZONA: <span className="text-pink-400">{gameState.currentMapId.replace('_', ' ')}</span></div>
      </div>
    </div>
  );
}
