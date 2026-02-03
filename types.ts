
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

export interface DialogueChoice {
  text: string;
  nextStep?: string;
  action?: 'buy_potion' | 'finish_quest' | 'start_quest';
}

export interface DialogueStep {
  text: string;
  choices?: DialogueChoice[];
  nextStep?: string;
  // Fix: Added action property to DialogueStep as it is used in constants.tsx and App.tsx to trigger events after a dialogue step.
  action?: 'buy_potion' | 'finish_quest' | 'start_quest';
}

export interface NPCData {
  name: string;
  spriteType: 'elder' | 'villager' | 'merchant';
  dialogue: Record<string, DialogueStep>;
  initialStep: string;
}

export interface MapObject {
  id: string;
  type: 'npc' | 'item' | 'warp' | 'sign';
  position: Position;
  targetMap?: string;
  targetPos?: Position;
  itemId?: ItemType;
  message?: string;
  npcData?: NPCData;
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
  activeQuests: string[];
  completedQuests: string[];
}
