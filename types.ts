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

export type ItemType = 'potion' | 'key' | 'sword';

export interface MapObject {
  id: string;
  type: 'npc' | 'item' | 'warp' | 'sign';
  position: Position;
  targetMap?: string; // If warp
  targetPos?: Position; // If warp
  itemId?: ItemType; // If item
  message?: string; // If sign
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

export interface PlayerAppearance {
  hairColor: string;
  dressColor: string;
}

export interface GameState {
  currentMapId: string;
  playerPos: Position;
  direction: Direction;
  isMoving: boolean;
  messages: string[];
  inventory: Record<string, number>;
  collectedObjectIds: string[];
  coins: number;
  appearance: PlayerAppearance;
}