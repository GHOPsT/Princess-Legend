export type Position = {
  x: number;
  y: number;
};

export type TileType = 
  | 'grass' 
  | 'water' 
  | 'wall' 
  | 'floor' 
  | 'door' 
  | 'bed' 
  | 'table' 
  | 'sofa' 
  | 'oven'
  | 'flower';

export interface MapObject {
  id: string;
  type: 'npc' | 'item' | 'warp';
  position: Position;
  targetMap?: string; // If warp
  targetPos?: Position; // If warp
  message?: string;
}

export interface GameMap {
  id: string;
  width: number;
  height: number;
  tiles: TileType[][]; // [y][x]
  objects: MapObject[];
  baseColor: string;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  currentMapId: string;
  playerPos: Position;
  direction: Direction;
  isMoving: boolean;
  messages: string[];
}