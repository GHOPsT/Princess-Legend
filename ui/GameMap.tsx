
import React, { useMemo } from 'react';
import { GameMap, Position, Direction, PlayerAppearance } from '../models/types';
import { TILE_SIZE } from '../maps/world';
import { FloorTile, FountainModel, FurnitureIcon } from '../sprites/environment';
import { PrincessModel, NPCModel } from '../sprites/characters';
import { HouseModel, HOUSE_STYLES, HouseStyle } from '../sprites/buildings';

interface Props {
  mapData: GameMap;
  playerPos: Position;
  playerDir: Direction;
  collectedObjectIds: string[];
  appearance: PlayerAppearance;
}

/**
 * Deterministically picks a house style based on its ID string.
 */
const getHouseStyle = (id: string): HouseStyle => {
  if (id === 'h_player') return HOUSE_STYLES.royal;
  if (id.includes('castle')) return HOUSE_STYLES.castle; // NEW CASTLE LOGIC
  
  const styles = Object.keys(HOUSE_STYLES).filter(k => k !== 'royal' && k !== 'castle');
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % styles.length;
  return HOUSE_STYLES[styles[index]];
};

export const GameMapRender: React.FC<Props> = ({ mapData, playerPos, playerDir, collectedObjectIds, appearance }) => {
  return (
    <div className="relative overflow-hidden bg-[#1a1a1a]" style={{ width: mapData.width * TILE_SIZE, height: mapData.height * TILE_SIZE }}>
      
      {/* 1. FLOOR LAYER */}
      <div className="absolute inset-0 z-0">
        {mapData.tiles.map((row, y) => (
          <div key={y} className="flex absolute" style={{ top: y * TILE_SIZE }}>
            {row.map((tile, x) => (
              <div key={x} style={{ width: TILE_SIZE, height: TILE_SIZE }} className="relative">
                <FloorTile type={tile} />
                <div className="absolute inset-0 flex items-center justify-center">
                  {FurnitureIcon({type: tile})}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 2. MONUMENT LAYER (Fountain) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-visible">
        {mapData.tiles.map((row, y) => 
          row.map((tile, x) => tile === 'fountain' ? (
            <div 
              key={`fountain-${x}-${y}`} 
              className="absolute overflow-visible flex items-center justify-center" 
              style={{ left: x * TILE_SIZE, top: y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}
            >
              <FountainModel />
            </div>
          ) : null)
        )}
      </div>

      {/* 3. OBJECTS & BUILDINGS LAYER */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {mapData.objects.map((obj) => {
          if (obj.type === 'warp' && mapData.id.startsWith('village')) {
            const style = getHouseStyle(obj.id);
            const isCastle = style.buildingType === 'castle';
            
            // Adjust size and offset for the massive castle
            // Castle is approx 6 tiles wide, door is roughly centered (so ~3 tiles offset X)
            const width = isCastle ? TILE_SIZE * 6 : TILE_SIZE * 3;
            const height = isCastle ? TILE_SIZE * 5 : TILE_SIZE * 3;
            
            // Positioning Logic:
            // Standard House (3x3): Door is at index (1, 2) inside the grid.
            // Map pos is where player stands. We want door to be at 'obj.position'.
            // If house top-left is (X, Y), door is at (X+1, Y+2) tiles.
            // So X = pos.x - 1, Y = pos.y - 2. (Current code uses -1, -1 for simplicity/visuals, let's stick to that for normal houses)
            
            // Castle: Door is roughly at center bottom. In SVG 0-120, door is at 60 (center).
            // In tiles (width 6), center is tile 3.
            // Height 5 tiles. Door is at bottom (tile 4).
            // So X = pos.x - 3, Y = pos.y - 4 ?
            
            const leftOffset = isCastle ? 3 : 1;
            const topOffset = isCastle ? 3.8 : 1; 

            return (
              <div key={obj.id} className="absolute pointer-events-none" 
                   style={{ 
                     left: (obj.position.x - leftOffset) * TILE_SIZE, 
                     top: (obj.position.y - topOffset) * TILE_SIZE, 
                     width, height 
                   }}>
                <HouseModel style={style} />
              </div>
            );
          }
          if (obj.type === 'npc' && obj.npcData) {
            return (
              <div key={obj.id} className="absolute pointer-events-auto" style={{ left: obj.position.x * TILE_SIZE, top: obj.position.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}>
                <NPCModel type={obj.npcData.spriteType} />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* 4. PLAYER LAYER */}
      <div className="absolute z-30 transition-all duration-150" style={{ left: playerPos.x * TILE_SIZE, top: playerPos.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}>
        <PrincessModel appearance={appearance} />
      </div>
    </div>
  );
};
