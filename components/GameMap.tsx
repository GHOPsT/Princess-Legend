
import React, { useMemo } from 'react';
import { GameMap, Position, Direction, PlayerAppearance } from '../types';
import { TILE_SIZE, PrincessSprite, HouseExterior, FloorTile, NPCSprite, HOUSE_STYLES } from '../constants';
import { Sparkles, Utensils } from 'lucide-react';

interface Props {
  mapData: GameMap;
  playerPos: Position;
  playerDir: Direction;
  collectedObjectIds: string[];
  appearance: PlayerAppearance;
}

const getFurnitureIcon = (type: string) => {
  switch (type) {
    case 'flower': return <div className="animate-bounce"><Sparkles size={20} className="text-pink-500 fill-pink-300" /></div>;
    case 'bed': return <div className="w-full h-full bg-red-800 rounded-sm border-2 border-red-950 flex items-center justify-center"><div className="w-8 h-6 bg-white rounded-t-lg" /></div>;
    case 'oven': return <div className="flex flex-col items-center"><Utensils size={20} className="text-gray-300" /><div className="w-6 h-2 bg-orange-500 blur-[2px] animate-pulse" /></div>;
    case 'sofa': return <div className="w-10 h-6 bg-indigo-700 rounded-lg border-b-4 border-indigo-900 shadow-md" />;
    case 'table': return <div className="w-8 h-8 bg-amber-700 rounded-full border-4 border-amber-900 shadow-lg" />;
    case 'bookshelf': return <div className="w-full h-full bg-amber-900 border-2 border-amber-950 p-1 flex flex-col gap-1"><div className="h-1 bg-blue-400 w-full"/><div className="h-1 bg-red-400 w-full"/><div className="h-1 bg-green-400 w-full"/></div>;
    case 'counter': return <div className="w-full h-full bg-amber-800 border-b-4 border-amber-950 shadow-md" />;
    case 'fountain': return null;
    case 'door': return <div className="w-full h-full bg-black/40 flex items-center justify-center"><div className="text-white text-[8px] animate-pulse">EXIT</div></div>; 
    default: return null;
  }
};

const getStableStyle = (id: string) => {
  const styles = Object.keys(HOUSE_STYLES);
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % styles.length;
  return HOUSE_STYLES[styles[index]];
};

export const GameMapRender: React.FC<Props> = ({ mapData, playerPos, playerDir, collectedObjectIds, appearance }) => {
  const mapWidthPx = mapData.width * TILE_SIZE;
  const mapHeightPx = mapData.height * TILE_SIZE;

  const tilesRender = useMemo(() => {
    return mapData.tiles.map((row, y) => (
      <div key={`row-${y}`} className="flex">
        {row.map((tile, x) => (
          <div 
            key={`tile-${x}-${y}`} 
            style={{ 
              width: TILE_SIZE, 
              height: TILE_SIZE,
              zIndex: ['fountain', 'bed', 'sofa', 'table', 'bookshelf', 'oven'].includes(tile) ? 5 : 0
            }} 
            className="relative"
          >
            <FloorTile type={tile} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {getFurnitureIcon(tile)}
            </div>
          </div>
        ))}
      </div>
    ));
  }, [mapData]);

  const objectsRender = mapData.objects
    .filter(obj => !collectedObjectIds.includes(obj.id)) 
    .map((obj) => {
    if (obj.type === 'warp' && (obj.targetMap?.startsWith('house_') || obj.targetMap === 'library')) {
      // Solo dibujamos el exterior si estamos en un mapa exterior (village_*)
      if (!mapData.id.startsWith('village')) return null;

      let exteriorProps = {};
      if (obj.targetMap === 'library') exteriorProps = HOUSE_STYLES.noble;
      else if (obj.id.includes('shop')) exteriorProps = HOUSE_STYLES.shop;
      else if (obj.id.includes('cottage')) exteriorProps = HOUSE_STYLES.cottage;
      else exteriorProps = getStableStyle(obj.id);
      
      return (
        <div key={obj.id} className="absolute z-10 pointer-events-none" 
             style={{ 
               left: obj.position.x * TILE_SIZE - (TILE_SIZE * 0.75), 
               top: obj.position.y * TILE_SIZE - (TILE_SIZE * 1.5), 
               width: TILE_SIZE * 2.5, 
               height: TILE_SIZE * 2.5 
             }}>
          <HouseExterior {...exteriorProps} />
        </div>
      );
    }
    
    if (obj.type === 'npc' && obj.npcData) {
        return (
            <div key={obj.id} className="absolute z-10" style={{ left: obj.position.x * TILE_SIZE, top: obj.position.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}>
                <NPCSprite type={obj.npcData.spriteType} />
            </div>
        );
    }

    return null;
  });

  return (
    <div className="relative overflow-hidden bg-[#1a1a1a]" style={{ width: mapWidthPx, height: mapHeightPx }}>
      <div className="absolute inset-0">{tilesRender}</div>
      {objectsRender}
      <div className="absolute z-20 transition-all duration-200 ease-linear" style={{ left: playerPos.x * TILE_SIZE, top: playerPos.y * TILE_SIZE - 12, width: TILE_SIZE, height: TILE_SIZE }}>
        <PrincessSprite direction={playerDir} appearance={appearance} />
      </div>
    </div>
  );
};
