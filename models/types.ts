
export interface PlayerAppearance {
  hairColor: string;
  dressColor: string;
}

export type Position = { x: number; y: number; };

export type TileType = 'grass' | 'water' | 'wall' | 'floor' | 'door' | 'bed' | 'table' | 'sofa' | 'oven' | 'flower' | 'bookshelf' | 'counter' | 'fountain' | 'path' | 'banner' | 'armor' | 'candle';

export type ItemType = 'potion' | 'key' | 'sword';

export interface NPCData {
  name: string;
  role: 'guard' | 'merchant' | 'elder' | 'villager' | 'storyteller' | 'animal';
  spriteType: 'elder' | 'villager' | 'merchant' | 'dog' | 'cat' | 'guard';
  dialogue: Record<string, { text: string; nextStep?: string }>;
  initialStep: string;
}

export interface MapObject {
  id: string;
  type: 'npc' | 'item' | 'warp' | 'sign';
  position: Position;
  targetMap?: string;
  targetPos?: Position;
  npcData?: NPCData;
}

export interface GameMap {
  id: string;
  width: number;
  height: number;
  tiles: TileType[][];
  objects: MapObject[];
  connections: {
      up?: string;
      down?: string;
      left?: string;
      right?: string;
  };
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  currentMapId: string;
  playerPos: Position;
  direction: Direction;
  messages: string[];
  coins: number;
  appearance: PlayerAppearance;
  collectedObjectIds: string[];
}
