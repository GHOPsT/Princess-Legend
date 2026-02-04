
import React from 'react';
import { GameMap, Position } from '../models/types';

interface Props {
  mapData: GameMap;
  playerPos: Position;
}

export const Minimap: React.FC<Props> = ({ mapData, playerPos }) => {
  const cellSize = 4; // Size of each "pixel" on minimap

  return (
    <div 
      className="relative bg-black/90 border border-gray-500 shadow-inner hidden md:block"
      style={{ 
        width: mapData.width * cellSize, 
        height: mapData.height * cellSize 
      }}
      aria-label="Minimap"
    >
      {mapData.tiles.map((row, y) => 
        row.map((tile, x) => {
            let color = '#111';
            switch(tile) {
                case 'grass': color = '#3f6228'; break;
                case 'water': color = '#3b82f6'; break;
                case 'wall': color = '#a8a29e'; break;
                case 'floor': color = '#7c2d12'; break;
                case 'door': color = '#fbbf24'; break;
                case 'bed': color = '#ef4444'; break;
                case 'table': color = '#d97706'; break;
                case 'sofa': color = '#4f46e5'; break;
                case 'flower': color = '#f472b6'; break;
                default: color = '#262626';
            }

            return (
              <div 
                key={`${x}-${y}`}
                className="absolute"
                style={{
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: color
                }}
              />
            );
        })
      )}
      
      {/* Player Marker */}
      <div 
        className="absolute bg-white rounded-full z-10 animate-pulse box-border border-[0.5px] border-red-500"
        style={{
          left: playerPos.x * cellSize,
          top: playerPos.y * cellSize,
          width: cellSize,
          height: cellSize,
          transform: 'scale(1.5)'
        }}
      />
    </div>
  );
};
