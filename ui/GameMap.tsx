
import React from 'react';
import { GameMap, Position, Direction, PlayerAppearance } from '../models/types';
import { TILE_SIZE } from '../maps/world';
import { FloorTile, FountainModel, FurnitureIcon } from '../sprites/environment';
import { PrincessModel, NPCModel } from '../sprites/characters';
import { HouseModel, HOUSE_STYLES } from '../sprites/buildings';

interface Props {
  mapData: GameMap;
  playerPos: Position;
  playerDir: Direction;
  collectedObjectIds: string[];
  appearance: PlayerAppearance;
}

export const GameMapRender: React.FC<Props> = ({ mapData, playerPos, playerDir, collectedObjectIds, appearance }) => {
  return (
    <div className="relative overflow-hidden bg-[#1a1a1a]" style={{ width: mapData.width * TILE_SIZE, height: mapData.height * TILE_SIZE }}>
      {/* CAPA DE FONDO */}
      {mapData.tiles.map((row, y) => (
        <div key={y} className="flex absolute" style={{ top: y * TILE_SIZE }}>
          {row.map((tile, x) => (
            <div key={x} style={{ width: TILE_SIZE, height: TILE_SIZE }} className="relative">
              <FloorTile type={tile} />
              {tile === 'fountain' && <div className="absolute inset-0"><FountainModel /></div>}
              <div className="absolute inset-0 flex items-center justify-center">{FurnitureIcon({type: tile})}</div>
            </div>
          ))}
        </div>
      ))}

      {/* CAPA DE OBJETOS Y EDIFICIOS */}
      {mapData.objects.map((obj) => {
        if (obj.type === 'warp' && mapData.id.startsWith('village')) {
          const style = obj.id === 'h_player' ? HOUSE_STYLES.royal : HOUSE_STYLES.basic;
          return (
            <div key={obj.id} className="absolute z-10" style={{ left: (obj.position.x-1) * TILE_SIZE, top: (obj.position.y-1) * TILE_SIZE, width: TILE_SIZE*3, height: TILE_SIZE*3 }}>
              <HouseModel style={style} />
            </div>
          );
        }
        if (obj.type === 'npc' && obj.npcData) {
          return (
            <div key={obj.id} className="absolute z-10" style={{ left: obj.position.x * TILE_SIZE, top: obj.position.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}>
              <NPCModel type={obj.npcData.spriteType} />
            </div>
          );
        }
        return null;
      })}

      {/* CAPA DEL JUGADOR */}
      <div className="absolute z-20 transition-all duration-150" style={{ left: playerPos.x * TILE_SIZE, top: playerPos.y * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE }}>
        <PrincessModel appearance={appearance} />
      </div>
    </div>
  );
};
