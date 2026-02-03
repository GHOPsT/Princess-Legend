import React, { useMemo } from 'react';
import { GameMap, Position, Direction } from '../types';
import { TILE_SIZE, PrincessSprite, HouseExterior, FloorTile } from '../constants';
import { Sparkles, Utensils, BedDouble } from 'lucide-react';

interface Props {
  mapData: GameMap;
  playerPos: Position;
  playerDir: Direction;
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
    case 'door': return <div className="w-full h-full bg-black/40" />; // Shadow for door exit
    default: return null;
  }
};

export const GameMapRender: React.FC<Props> = ({ mapData, playerPos, playerDir }) => {
  
  const mapWidthPx = mapData.width * TILE_SIZE;
  const mapHeightPx = mapData.height * TILE_SIZE;

  // Render static tiles
  const tilesRender = useMemo(() => {
    return mapData.tiles.map((row, y) => (
      <div key={`row-${y}`} className="flex">
        {row.map((tile, x) => (
          <div
            key={`tile-${x}-${y}`}
            style={{ width: TILE_SIZE, height: TILE_SIZE }}
            className="relative"
          >
            {/* Base Texture */}
            <FloorTile type={tile} />
            
            {/* Object Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {getFurnitureIcon(tile)}
            </div>
          </div>
        ))}
      </div>
    ));
  }, [mapData]);

  // Render Objects (Houses, Warps)
  const objectsRender = mapData.objects.map((obj) => {
    if (mapData.id === 'village' && obj.targetMap?.startsWith('house')) {
      return (
        <div
          key={obj.id}
          className="absolute z-10 pointer-events-none"
          style={{
            left: obj.position.x * TILE_SIZE - (TILE_SIZE / 2),
            top: obj.position.y * TILE_SIZE - TILE_SIZE, // Offset for 2x2 look
            width: TILE_SIZE * 2,
            height: TILE_SIZE * 2,
          }}
        >
          <HouseExterior />
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

      {/* Player Layer */}
      <div
        className="absolute z-20 transition-all duration-200 ease-linear"
        style={{
          left: playerPos.x * TILE_SIZE,
          top: playerPos.y * TILE_SIZE - (TILE_SIZE * 0.25), // Slight offset to stand "on" tile
          width: TILE_SIZE,
          height: TILE_SIZE,
        }}
      >
        <div className="w-full h-full scale-125 origin-bottom">
           <PrincessSprite direction={playerDir} />
        </div>
      </div>
      
    </div>
  );
};