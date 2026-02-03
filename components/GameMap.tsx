import React, { useMemo } from 'react';
import { GameMap, Position, Direction, PlayerAppearance } from '../types';
import { TILE_SIZE, PrincessSprite, HouseExterior, FloorTile, ItemSprite, NPCSprite } from '../constants';
import { Sparkles, Utensils, BedDouble } from 'lucide-react';

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
    case 'bed': return (
      <div className="relative w-full h-full bg-red-800 rounded-sm border-2 border-red-950 flex items-center justify-center">
         <div className="w-8 h-6 bg-white rounded-sm" /> 
      </div>
    );
    case 'oven': return <Utensils size={24} className="text-gray-200 drop-shadow-md" />;
    case 'sofa': return <div className="w-8 h-6 bg-indigo-700 rounded-lg border-b-4 border-indigo-900 shadow-lg" />;
    case 'table': return <div className="w-8 h-8 bg-amber-700 rounded-full border-4 border-amber-900 shadow-lg" />;
    case 'door': return <div className="w-full h-full bg-black/40" />; 
    default: return null;
  }
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
            style={{ width: TILE_SIZE, height: TILE_SIZE }}
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
    
    if (mapData.id === 'village' && obj.targetMap?.startsWith('house')) {
      let exteriorProps = {};
      
      // Distinct house styles
      if (obj.targetMap === 'house_5') { // The Library
        exteriorProps = { wall: '#757161', roof: '#3b82f6', roofShadow: '#1e3a8a', trim: '#4a483d' };
      } else if (obj.targetMap === 'house_6') { // The Guard Post
        exteriorProps = { wall: '#4a3c31', roof: '#ef4444', roofShadow: '#7f1d1d', trim: '#2d2d2d' };
      } else if (obj.targetMap === 'house_7') { // Magic Shop
        exteriorProps = { wall: '#fef3c7', roof: '#8b5cf6', roofShadow: '#4c1d95', trim: '#d97706' };
      } else if (obj.targetMap === 'house_8') { // Alchemist
        exteriorProps = { wall: '#65a30d', roof: '#f97316', roofShadow: '#c2410c', trim: '#365314' };
      } else if (obj.targetMap === 'house_9') { // Weaver
        exteriorProps = { wall: '#fae8ff', roof: '#ec4899', roofShadow: '#be185d', trim: '#701a75' };
      } else if (obj.targetMap === 'house_10') { // Blacksmith
        exteriorProps = { wall: '#3f3f46', roof: '#18181b', roofShadow: '#09090b', trim: '#000000' };
      } else if (obj.targetMap === 'house_2' || obj.targetMap === 'house_3') {
        exteriorProps = { wall: '#d9a066', roof: '#854d0e', roofShadow: '#451a03', trim: '#ac723e' };
      }

      return (
        <div
          key={obj.id}
          className="absolute z-10 pointer-events-none"
          style={{
            left: obj.position.x * TILE_SIZE - (TILE_SIZE / 2),
            top: obj.position.y * TILE_SIZE - TILE_SIZE,
            width: TILE_SIZE * 2,
            height: TILE_SIZE * 2,
          }}
        >
          <HouseExterior {...exteriorProps} />
        </div>
      );
    }
    
    if (obj.type === 'sign') {
        return (
          <div
             key={obj.id}
             className="absolute z-10 pointer-events-none flex items-center justify-center"
             style={{
               left: obj.position.x * TILE_SIZE,
               top: obj.position.y * TILE_SIZE,
               width: TILE_SIZE,
               height: TILE_SIZE,
             }}
          >
             <div className="w-8 h-6 bg-[#8f563b] border-2 border-[#5d3221] flex items-center justify-center shadow-lg">
                <div className="w-4 h-[2px] bg-[#5d3221]" />
                <div className="w-4 h-[2px] bg-[#5d3221] mt-1" />
             </div>
             <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#5d3221]" />
          </div>
        );
    }

    if (obj.type === 'item' && obj.itemId) {
        return (
          <div
            key={obj.id}
            className="absolute z-10 pointer-events-none animate-bounce"
            style={{
              left: obj.position.x * TILE_SIZE,
              top: obj.position.y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
          >
            <div className="w-full h-full p-2">
               <ItemSprite type={obj.itemId} />
            </div>
          </div>
        );
    }

    if (obj.type === 'npc' && obj.npcData) {
        return (
            <div
                key={obj.id}
                className="absolute z-10 pointer-events-none"
                style={{
                  left: obj.position.x * TILE_SIZE,
                  top: obj.position.y * TILE_SIZE - (TILE_SIZE * 0.2),
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                }}
            >
                <div className="w-full h-full p-1">
                    <NPCSprite type={obj.npcData.spriteType} />
                </div>
            </div>
        );
    }

    return null;
  });

  return (
    <div 
      className="relative overflow-hidden bg-[#1a1a1a]"
      style={{ width: mapWidthPx, height: mapHeightPx }}
    >
      <div className="absolute inset-0">
        {tilesRender}
      </div>

      {objectsRender}

      <div
        className="absolute z-20 transition-all duration-200 ease-linear"
        style={{
          left: playerPos.x * TILE_SIZE,
          top: playerPos.y * TILE_SIZE - (TILE_SIZE * 0.25), 
          width: TILE_SIZE,
          height: TILE_SIZE,
        }}
      >
        <div className="w-full h-full scale-125 origin-bottom">
           <PrincessSprite direction={playerDir} appearance={appearance} />
        </div>
      </div>
      
    </div>
  );
};