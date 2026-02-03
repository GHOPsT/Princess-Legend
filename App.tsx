
import React, { useState, useEffect, useCallback } from 'react';
import { GameMapRender } from './components/GameMap';
import { MAPS, HAIR_COLORS, DRESS_COLORS } from './constants';
import { Direction, GameState, MapObject } from './types';
import { generateNPCDialogue, generateRoomDescription } from './services/geminiService';
import { logger } from './services/logger';
import { Heart, Coins, Terminal, X } from 'lucide-react';

const INITIAL_STATE: GameState = {
  currentMapId: 'village_center',
  playerPos: { x: 7, y: 8 }, // Al lado de la fuente
  direction: 'down',
  messages: ["¡Bienvenida! Presiona Espacio cerca de un NPC para oír una historia."],
  coins: 100,
  appearance: { hairColor: HAIR_COLORS[0], dressColor: DRESS_COLORS[0] },
  collectedObjectIds: []
};

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [showLogs, setShowLogs] = useState(false);
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

      // --- LOGICA DE TRANSICION DE CUADRICULA ---
      let nextMapId = prev.currentMapId;
      
      if (newX < 0 && map.connections.left) {
          nextMapId = map.connections.left;
          newX = MAPS[nextMapId].width - 1;
      } else if (newX >= map.width && map.connections.right) {
          nextMapId = map.connections.right;
          newX = 0;
      } else if (newY < 0 && map.connections.up) {
          nextMapId = map.connections.up;
          newY = MAPS[nextMapId].height - 1;
      } else if (newY >= map.height && map.connections.down) {
          nextMapId = map.connections.down;
          newY = 0;
      }

      // Si cambió el mapa, registramos y cargamos descripción
      if (nextMapId !== prev.currentMapId) {
          logger.info(`Transición a: ${nextMapId}`);
          generateRoomDescription(nextMapId.replace('_', ' ')).then(addMessage);
          return { ...prev, currentMapId: nextMapId, playerPos: { x: newX, y: newY }, direction: newDir };
      }

      // Colisiones normales
      if (newX < 0 || newX >= map.width || newY < 0 || newY >= map.height) return { ...prev, direction: newDir };
      const tile = map.tiles[newY][newX];
      const blocked = ['wall', 'water', 'fountain'].includes(tile);
      const npcInWay = map.objects.some(obj => obj.type === 'npc' && obj.position.x === newX && obj.position.y === newY);

      if (blocked || npcInWay) return { ...prev, direction: newDir };

      setLastActionTime(now);
      return { ...prev, playerPos: { x: newX, y: newY }, direction: newDir };
    });
  }, [lastActionTime, isTalking]);

  const handleInteraction = useCallback(async () => {
    if (isTalking) { setIsTalking(false); return; }

    const { playerPos, currentMapId, direction } = gameState;
    const map = MAPS[currentMapId];
    let tx = playerPos.x, ty = playerPos.y;
    if (direction === 'up') ty--; else if (direction === 'down') ty++; else if (direction === 'left') tx--; else if (direction === 'right') tx++;

    const obj = map.objects.find(o => o.position.x === tx && o.position.y === ty);
    
    if (obj) {
        if (obj.type === 'npc' && obj.npcData) {
            setIsTalking(true);
            addMessage("Escuchando...");
            const story = await generateNPCDialogue(obj.npcData.role, obj.npcData.name);
            addMessage(`${obj.npcData.name}: "${story}"`);
            return;
        }
        if (obj.type === 'warp' && obj.targetMap) {
            setGameState(prev => ({
                ...prev,
                currentMapId: obj.targetMap!,
                playerPos: obj.targetPos || { x: 5, y: 5 }
            }));
            return;
        }
    }
  }, [gameState, isTalking]);

  useEffect(() => {
    if (!isGameStarted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'l') setShowLogs(!showLogs);
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
  }, [isGameStarted, movePlayer, handleInteraction, showLogs]);

  if (!isGameStarted) return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
          <div className="bg-[#1a1a1a] p-10 border-4 border-white pixel-shadow text-center">
              <h1 className="text-pink-500 text-xl mb-6">PRINCESS JOURNEY</h1>
              <p className="text-white text-[8px] mb-8">Usa las flechas para moverte.<br/>Espacio para hablar con NPCs.</p>
              <button onClick={() => setIsGameStarted(true)} className="bg-pink-600 text-white px-8 py-4 pixel-button text-[10px]">INICIAR</button>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
      {showLogs && (
          <div className="absolute inset-0 z-[200] bg-black/95 p-6 font-mono text-[8px] overflow-y-auto">
              <div className="flex justify-between border-b border-gray-700 mb-4 pb-2">
                  <span className="text-yellow-500">SISTEMA DE LOGS</span>
                  <button onClick={() => setShowLogs(false)} className="text-white">[X] CERRAR</button>
              </div>
              {logger.getLogs().map((l, i) => (
                  <div key={i} className="mb-1">
                      <span className="text-gray-500">[{l.timestamp}]</span> {l.message}
                  </div>
              ))}
          </div>
      )}

      <div className="relative border-8 border-[#222] bg-black p-2 pixel-shadow">
          <GameMapRender 
            mapData={currentMap} playerPos={gameState.playerPos} playerDir={gameState.direction} 
            collectedObjectIds={gameState.collectedObjectIds} appearance={gameState.appearance} 
          />
          
          <div className="absolute bottom-6 left-6 right-6 bg-blue-900/95 border-4 border-white p-4 min-h-[90px] z-50">
              <p className="text-white text-[10px] leading-tight antialiased">
                  {gameState.messages[0]}
              </p>
              {!isTalking && <div className="absolute bottom-2 right-4 animate-bounce text-white text-[8px]">▼</div>}
          </div>
          <div className="scanlines"></div>
      </div>
      <div className="mt-4 flex gap-8 text-white text-[8px] uppercase tracking-tighter">
          <div className="flex items-center gap-2"><Heart className="text-red-500 fill-red-500" size={12}/> <span>3 / 3</span></div>
          <div className="flex items-center gap-2"><Coins className="text-yellow-500" size={12}/> <span>{gameState.coins}</span></div>
          <div>Zona: <span className="text-pink-400">{gameState.currentMapId.replace('_', ' ')}</span></div>
      </div>
    </div>
  );
}
