import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameMapRender } from './components/GameMap';
import { Minimap } from './components/Minimap';
import { MAPS, ItemSprite, HAIR_COLORS, DRESS_COLORS, PrincessSprite } from './constants';
import { Position, Direction, GameState, ItemType, MapObject, DialogueStep } from './types';
import { generateRoomDescription } from './services/geminiService';
import { Heart, Coins, Map as MapIcon, ChevronLeft, ChevronRight, Play, Save, RotateCcw, ScrollText } from 'lucide-react';

const SAVE_KEY = 'princess_legend_save_v1';

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
  },
  activeQuests: [],
  completedQuests: []
};

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [hasSaveData, setHasSaveData] = useState(false);
  const [activeNPC, setActiveNPC] = useState<MapObject | null>(null);
  const [currentDialogueStep, setCurrentDialogueStep] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const [customHairIndex, setCustomHairIndex] = useState(0);
  const [customDressIndex, setCustomDressIndex] = useState(0);

  const currentMap = MAPS[gameState.currentMapId];

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) setHasSaveData(true);
  }, []);

  const addMessage = (msg: string) => {
    setGameState(prev => ({
      ...prev,
      messages: [msg]
    }));
  };

  const playSound = (type: 'step' | 'warp' | 'bump' | 'item' | 'text' | 'select' | 'start' | 'save' | 'quest') => {
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
        case 'save':
             osc.type = 'sine';
             osc.frequency.setValueAtTime(440, ctx.currentTime);
             osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.1);
             osc.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.2);
             gain.gain.setValueAtTime(0.1, ctx.currentTime);
             gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
             osc.start();
             osc.stop(ctx.currentTime + 0.3);
             break;
        case 'quest':
             osc.type = 'sine';
             osc.frequency.setValueAtTime(523, ctx.currentTime);
             osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
             osc.frequency.setValueAtTime(783, ctx.currentTime + 0.2);
             osc.frequency.setValueAtTime(1046, ctx.currentTime + 0.3);
             gain.gain.setValueAtTime(0.1, ctx.currentTime);
             gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
             osc.start();
             osc.stop(ctx.currentTime + 0.5);
             break;
    }
    osc.connect(gain);
    gain.connect(ctx.destination);
  };

  const saveGame = () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    setHasSaveData(true);
    playSound('save');
    addMessage("¡Progreso guardado correctamente!");
  };

  const loadGame = () => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setGameState(data);
      setIsGameStarted(true);
      playSound('start');
    }
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

  const handleDialogueChoice = (action?: string, nextStep?: string) => {
    playSound('select');
    
    if (action === 'buy_potion') {
        if (gameState.coins >= 5) {
            setGameState(prev => ({
                ...prev,
                coins: prev.coins - 5,
                inventory: { ...prev.inventory, potion: (prev.inventory.potion || 0) + 1 }
            }));
            setCurrentDialogueStep('success');
        } else {
            setCurrentDialogueStep('no_money');
        }
        return;
    }

    if (action === 'finish_quest') {
        playSound('quest');
        setGameState(prev => ({
            ...prev,
            coins: prev.coins + 50,
            completedQuests: [...prev.completedQuests, 'sword_quest'],
            activeQuests: prev.activeQuests.filter(q => q !== 'sword_quest')
        }));
        setActiveNPC(null);
        setCurrentDialogueStep(null);
        addMessage("¡Misión completada! Has recibido 50 monedas.");
        return;
    }

    if (action === 'start_quest') {
        if (!gameState.activeQuests.includes('sword_quest') && !gameState.completedQuests.includes('sword_quest')) {
            setGameState(prev => ({
                ...prev,
                activeQuests: [...prev.activeQuests, 'sword_quest']
            }));
        }
    }

    if (nextStep) {
        setCurrentDialogueStep(nextStep);
    } else {
        setActiveNPC(null);
        setCurrentDialogueStep(null);
    }
  };

  const handleInteraction = useCallback(async () => {
    if (activeNPC) {
        const step = activeNPC.npcData?.dialogue[currentDialogueStep || ''];
        if (step && !step.choices) {
            if (step.action === 'finish_quest') {
                handleDialogueChoice('finish_quest');
                return;
            }
            if (step.nextStep) {
                setCurrentDialogueStep(step.nextStep);
            } else {
                setActiveNPC(null);
                setCurrentDialogueStep(null);
            }
        }
        return;
    }

    const { playerPos, currentMapId, collectedObjectIds, inventory } = gameState;
    const map = MAPS[currentMapId];
    
    let targetX = playerPos.x;
    let targetY = playerPos.y;
    let activeObj = map.objects.find(obj => obj.position.x === targetX && obj.position.y === targetY);
    
    if (!activeObj) {
        if (gameState.direction === 'up') targetY--;
        if (gameState.direction === 'down') targetY++;
        if (gameState.direction === 'left') targetX--;
        if (gameState.direction === 'right') targetX++;
        activeObj = map.objects.find(obj => obj.position.x === targetX && obj.position.y === targetY);
    }

    if (!activeObj || collectedObjectIds.includes(activeObj.id)) {
        const tileInFront = map.tiles[targetY]?.[targetX];
        if (tileInFront === 'flower') addMessage("Es una flor muy bonita.");
        else if (tileInFront === 'water') addMessage("El agua brilla con el sol.");
        else if (tileInFront === 'bed') addMessage("Una cama suave.");
        else if (tileInFront === 'oven') addMessage("La cocina está limpia.");
        else if (tileInFront === 'table') addMessage("Una mesa de madera robusta.");
        else addMessage("No hay nada interesante aquí.");
        return;
    }

    if (activeObj.type === 'npc' && activeObj.npcData) {
        playSound('text');
        setActiveNPC(activeObj);
        
        let step = activeObj.npcData.initialStep;
        if (activeObj.id === 'elder_npc') {
            if (gameState.completedQuests.includes('sword_quest')) {
                step = 'farewell';
            } else if (gameState.inventory['sword']) {
                step = 'quest_complete';
            } else {
                // If interacting with Elder, automatically start quest if not started
                if (!gameState.activeQuests.includes('sword_quest')) {
                     setGameState(prev => ({ ...prev, activeQuests: [...prev.activeQuests, 'sword_quest'] }));
                }
            }
        }

        setCurrentDialogueStep(step);
        return;
    }

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
            nextMapId.replace('_', ' '), 
            decorators
         );
         addMessage(desc);
      } else {
         addMessage("Has salido al exterior.");
      }
      return;
    }

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
            coins: newItemId === 'key' ? prev.coins + 10 : prev.coins
        }));
        const itemName = newItemId === 'key' ? "LLAVE DORADA" : newItemId === 'potion' ? "POCIÓN ROJA" : "ESPADA DE HIERRO";
        addMessage(`¡Conseguiste: ${itemName}!`);
        return;
    }

    if (activeObj.type === 'sign' && activeObj.message) {
        playSound('text');
        addMessage(activeObj.message);
        return;
    }
  }, [gameState, activeNPC, currentDialogueStep]);

  const movePlayer = useCallback((dx: number, dy: number, newDir: Direction) => {
    if (activeNPC) return;
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
  }, [lastActionTime, activeNPC]);

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
        case 's': case 'S': saveGame(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameStarted, movePlayer, handleInteraction, gameState, activeNPC]);

  if (!isGameStarted) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
             <div className="relative bg-[#2a2a2a] p-8 pixel-shadow max-w-md w-full font-serif">
                <div className="border-4 border-[#111] bg-black rounded-sm p-6 text-center overflow-hidden">
                    <h1 className="text-3xl text-yellow-400 font-bold mb-8 drop-shadow-[4px_4px_0_rgba(180,83,9,1)] tracking-widest leading-relaxed">
                        PRINCESS<br/>LEGEND
                    </h1>
                    
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-[#1a1a1a] border-4 border-gray-700 rounded-none p-2 relative">
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
                        <div className="flex items-center justify-between bg-gray-900 p-2 rounded-none border border-gray-700">
                             <span className="text-[10px] text-gray-400">CABELLO</span>
                             <div className="flex items-center gap-2">
                                <button onClick={() => { playSound('select'); setCustomHairIndex(i => (i - 1 + HAIR_COLORS.length) % HAIR_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded-none">
                                    <ChevronLeft size={16} />
                                </button>
                                <div className="w-6 h-6 rounded-none border border-white/20" style={{ backgroundColor: HAIR_COLORS[customHairIndex] }} />
                                <button onClick={() => { playSound('select'); setCustomHairIndex(i => (i + 1) % HAIR_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded-none">
                                    <ChevronRight size={16} />
                                </button>
                             </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-900 p-2 rounded-none border border-gray-700">
                             <span className="text-[10px] text-gray-400">VESTIDO</span>
                             <div className="flex items-center gap-2">
                                <button onClick={() => { playSound('select'); setCustomDressIndex(i => (i - 1 + DRESS_COLORS.length) % DRESS_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded-none">
                                    <ChevronLeft size={16} />
                                </button>
                                <div className="w-6 h-6 rounded-none border border-white/20" style={{ backgroundColor: DRESS_COLORS[customDressIndex] }} />
                                <button onClick={() => { playSound('select'); setCustomDressIndex(i => (i + 1) % DRESS_COLORS.length) }} className="p-1 hover:bg-gray-800 rounded-none">
                                    <ChevronRight size={16} />
                                </button>
                             </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={handleStartGame}
                            className="w-full bg-blue-700 hover:bg-blue-600 text-white text-[10px] font-bold py-4 px-4 pixel-button flex items-center justify-center gap-2"
                        >
                            <Play size={16} fill="white" />
                            NUEVA PARTIDA
                        </button>

                        {hasSaveData && (
                            <button 
                                onClick={loadGame}
                                className="w-full bg-green-700 hover:bg-green-600 text-white text-[10px] font-bold py-4 px-4 pixel-button flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={16} />
                                CONTINUAR
                            </button>
                        )}
                    </div>
                </div>
                <div className="scanlines"></div>
             </div>
        </div>
      )
  }

  const dialogue = activeNPC?.npcData?.dialogue[currentDialogueStep || ''];

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="relative bg-[#2a2a2a] p-4 pixel-shadow border-t border-gray-600">
        <div className="relative border-4 border-[#111] bg-black rounded-none overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 w-full h-16 bg-black/80 z-40 flex items-center justify-between px-4 border-b-2 border-white/10">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-red-400 font-bold tracking-widest">LIFE</span>
                    <div className="flex gap-1">
                        <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={16} />
                        <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={16} />
                        <Heart className="fill-red-500 text-red-500 drop-shadow-md" size={16} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-black/50 p-1 rounded-none border border-white/20">
                         {Object.keys(gameState.inventory).length === 0 && <span className="text-[8px] text-gray-500 px-2">VACÍO</span>}
                         {Object.entries(gameState.inventory).map(([item, count]) => (
                             <div key={item} className="relative w-8 h-8 bg-gray-800 rounded-none flex items-center justify-center border border-gray-600">
                                 <div className="w-6 h-6"><ItemSprite type={item as ItemType} /></div>
                                 <span className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] px-1 rounded-none">{count}</span>
                             </div>
                         ))}
                    </div>

                    <div className="hidden md:block">
                        <Minimap mapData={currentMap} playerPos={gameState.playerPos} />
                    </div>

                    <div className="flex flex-col gap-1 items-end">
                        <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                            <Coins size={12} /> 
                            <span>{gameState.coins.toString().padStart(3, '0')}</span>
                        </div>
                        <button 
                            onClick={saveGame}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[8px] px-2 py-1 rounded-none border-b-2 border-indigo-900 flex items-center gap-1 active:border-b-0 active:translate-y-[1px]"
                        >
                            <Save size={10} /> GUARDAR
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <GameMapRender 
                    mapData={currentMap} 
                    playerPos={gameState.playerPos} 
                    playerDir={gameState.direction} 
                    collectedObjectIds={gameState.collectedObjectIds}
                    appearance={gameState.appearance}
                />
            </div>

            {/* RPG Dialog Box Overlay with pixel-shadow */}
            <div className="absolute bottom-4 left-4 right-4 z-50">
                <div className="bg-blue-900/95 border-4 border-white pixel-shadow p-4 min-h-[100px] flex flex-col justify-between">
                    <div>
                        {activeNPC && <p className="text-yellow-400 text-[10px] mb-2 font-bold">{activeNPC.npcData?.name}:</p>}
                        <p className="text-white text-[12px] leading-relaxed drop-shadow-md font-serif tracking-wide">
                            {dialogue ? dialogue.text : gameState.messages[0]}
                        </p>
                    </div>
                    
                    {dialogue?.choices ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {dialogue.choices.map((choice, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleDialogueChoice(choice.action, choice.nextStep)}
                                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white text-[8px] px-2 py-1 transition-colors"
                                >
                                    {choice.text}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-between items-center mt-2">
                           <div className="flex gap-2">
                               {gameState.activeQuests.length > 0 && (
                                   <div className="flex items-center gap-1 text-[8px] text-green-300">
                                       <ScrollText size={10} /> BUSCANDO ESPADA
                                   </div>
                               )}
                           </div>
                           <div className="animate-bounce text-white text-[10px]">▼</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="scanlines"></div>
        </div>

        <div className="mt-4 flex justify-between items-center text-gray-500 text-[8px] px-2 font-sans font-bold">
            <span>BIT-GENESIS SYSTEM 16</span>
            <span className="flex gap-4">
                <span className="w-8 h-2 bg-gray-800 rounded-none block"></span>
                <span className="w-8 h-2 bg-gray-800 rounded-none block"></span>
            </span>
        </div>
      </div>
    </div>
  );
}