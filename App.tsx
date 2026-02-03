
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMapRender } from './components/GameMap';
import { MAPS, HAIR_COLORS, DRESS_COLORS, PrincessSprite } from './constants';
import { Position, Direction, GameState, MapObject } from './types';
import { generateRoomDescription } from './services/geminiService';
import { logger } from './services/logger';
import { Heart, Coins, Terminal, X } from 'lucide-react';

const INITIAL_STATE: GameState = {
  currentMapId: 'village',
  playerPos: { x: 12, y: 12 }, 
  direction: 'down',
  isMoving: false,
  messages: ["¡Bienvenida, Alteza! Usa las flechas para caminar."],
  inventory: {},
  collectedObjectIds: [],
  coins: 100,
  appearance: {
      hairColor: HAIR_COLORS[0],
      dressColor: DRESS_COLORS[0]
  },
  activeQuests: [],
  completedQuests: []
};

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState(logger.getLogs());
  
  const [activeNPC, setActiveNPC] = useState<MapObject | null>(null);
  const [currentDialogueStep, setCurrentDialogueStep] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const [customHairIndex, setCustomHairIndex] = useState(0);
  const [customDressIndex, setCustomDressIndex] = useState(0);

  const currentMap = MAPS[gameState.currentMapId] || MAPS['village'];

  // Actualizar logs visuales cada vez que el logger cambie
  useEffect(() => {
    const interval = setInterval(() => {
        if (showLogs) setLogs(logger.getLogs());
    }, 1000);
    return () => clearInterval(interval);
  }, [showLogs]);

  const addMessage = (msg: string) => {
    setGameState(prev => ({ ...prev, messages: [msg] }));
  };

  const movePlayer = useCallback((dx: number, dy: number, newDir: Direction) => {
    if (activeNPC) return;
    const now = Date.now();
    if (now - lastActionTime < 150) return;
    
    setGameState(prev => {
      const map = MAPS[prev.currentMapId];
      const newX = prev.playerPos.x + dx;
      const newY = prev.playerPos.y + dy;

      if (newX < 0 || newX >= map.width || newY < 0 || newY >= map.height) return { ...prev, direction: newDir };
      
      const targetTile = map.tiles[newY][newX];
      const blocked = ['wall', 'water', 'fountain', 'bookshelf', 'oven', 'counter'].includes(targetTile);
      const npcInWay = map.objects.some(obj => obj.type === 'npc' && obj.position.x === newX && obj.position.y === newY);

      if (blocked || npcInWay) {
          logger.info(`Movimiento bloqueado en (${newX}, ${newY}) por ${targetTile || 'NPC'}`);
          return { ...prev, direction: newDir };
      }

      setLastActionTime(now);
      return { ...prev, playerPos: { x: newX, y: newY }, direction: newDir };
    });
  }, [lastActionTime, activeNPC]);

  const handleInteraction = useCallback(async () => {
    const { playerPos, currentMapId, direction } = gameState;
    const map = MAPS[currentMapId];
    
    let targetX = playerPos.x;
    let targetY = playerPos.y;
    if (direction === 'up') targetY--;
    else if (direction === 'down') targetY++;
    else if (direction === 'left') targetX--;
    else if (direction === 'right') targetX++;

    const activeObj = map.objects.find(obj => obj.position.x === targetX && obj.position.y === targetY);
    
    if (activeObj) {
        logger.info(`Interactuando con objeto ID: ${activeObj.id}, Tipo: ${activeObj.type}`);
        if (activeObj.type === 'npc' && activeObj.npcData) {
            setActiveNPC(activeObj);
            setCurrentDialogueStep(activeObj.npcData.initialStep);
            return;
        }
        if (activeObj.type === 'warp' && activeObj.targetMap) {
            logger.info(`Warp: ${currentMapId} -> ${activeObj.targetMap}`);
            setGameState(prev => ({
                ...prev,
                currentMapId: activeObj.targetMap!,
                playerPos: activeObj.targetPos || { x: 5, y: 5 }
            }));
            generateRoomDescription(activeObj.targetMap, ['muebles']).then(addMessage);
            return;
        }
    }
  }, [gameState]);

  useEffect(() => {
    if (!isGameStarted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'l') { setShowLogs(!showLogs); return; }
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "Enter", " "].indexOf(e.key) > -1) e.preventDefault();
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
  }, [isGameStarted, movePlayer, handleInteraction, showLogs]);

  if (!isGameStarted) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
             <div className="bg-[#222] p-8 pixel-shadow text-center">
                <h1 className="text-pink-400 mb-8 text-sm">PRINCESS LEGEND 16-BIT</h1>
                <div className="w-16 h-20 bg-black mx-auto mb-6 border-2 border-gray-600 p-2">
                    <PrincessSprite direction="down" appearance={{ hairColor: HAIR_COLORS[customHairIndex], dressColor: DRESS_COLORS[customDressIndex] }} />
                </div>
                <button 
                  onClick={() => { logger.info("Iniciando aventura..."); setIsGameStarted(true); }}
                  className="bg-pink-600 px-6 py-3 text-[10px] pixel-button text-white"
                >
                  EMPEZAR
                </button>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center relative">
      {/* Botón de Logs Flotante */}
      <button 
        onClick={() => setShowLogs(!showLogs)}
        className="absolute top-4 right-4 z-[100] bg-gray-800 p-2 border-2 border-gray-600 hover:bg-gray-700 text-white"
        title="Ver Logs (Tecla L)"
      >
        <Terminal size={18} />
      </button>

      {/* Modal de Logs */}
      {showLogs && (
        <div className="absolute inset-0 z-[1000] bg-black/90 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                <h2 className="text-yellow-500 text-[10px]">CONSOLA DE REGISTROS DEL SISTEMA</h2>
                <button onClick={() => setShowLogs(false)}><X className="text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[8px] space-y-2">
                {logs.map((log, i) => (
                    <div key={i} className={`p-1 ${log.level === 'ERROR' ? 'text-red-400' : log.level === 'IA' ? 'text-cyan-300' : 'text-gray-300'}`}>
                        <span className="text-gray-500">[{log.timestamp}]</span> [{log.level}] {log.message}
                    </div>
                ))}
            </div>
            <button 
                onClick={() => { logger.clear(); setLogs([]); }}
                className="mt-4 text-[8px] text-red-500 underline"
            >
                LIMPIAR REGISTROS
            </button>
        </div>
      )}

      {/* HUD superior */}
      <div className="flex gap-4 mb-2">
          <div className="flex items-center gap-1 text-red-500"><Heart size={14} fill="currentColor"/> <span className="text-[10px]">3/3</span></div>
          <div className="flex items-center gap-1 text-yellow-500"><Coins size={14} /> <span className="text-[10px]">{gameState.coins}</span></div>
      </div>

      <div className="relative border-4 border-white bg-black pixel-shadow overflow-hidden" style={{ width: '800px', height: '600px' }}>
          <GameMapRender 
            mapData={currentMap} 
            playerPos={gameState.playerPos} 
            playerDir={gameState.direction} 
            collectedObjectIds={gameState.collectedObjectIds}
            appearance={gameState.appearance}
          />
          
          {/* Cuadro de Diálogo */}
          <div className="absolute bottom-4 left-4 right-4 bg-blue-900/90 border-4 border-white p-4 min-h-[80px]">
              <p className="text-white text-[9px] leading-relaxed">
                  {gameState.messages[0]}
              </p>
          </div>
          <div className="scanlines"></div>
      </div>
      
      <p className="mt-4 text-[7px] text-gray-500">Presiona 'L' para ver los registros internos</p>
    </div>
  );
}
