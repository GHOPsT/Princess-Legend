import React from 'react';
import { GameMap, TileType, ItemType, PlayerAppearance } from './types';

export const TILE_SIZE = 48; 
export const MOVEMENT_SPEED = 180; 

// --- Customization Options ---
export const HAIR_COLORS = [
  '#5C4033', // Brown
  '#E6C229', // Blonde
  '#2A2B2D', // Black
  '#D9514E', // Red
  '#989788', // Grey/Silver
  '#F472B6', // Pink
];

export const DRESS_COLORS = [
  '#e83e8c', // Classic Pink
  '#3b82f6', // Blue
  '#10b981', // Green
  '#8b5cf6', // Purple
  '#f59e0b', // Orange
  '#ef4444', // Red
  '#1f2937', // Black/Goth
];

// --- 16-bit Colors ---
const C = {
  grassMain: '#5fa052',
  grassLight: '#8cd665',
  grassDark: '#3e743b',
  waterMain: '#4fa4b8',
  waterLight: '#92e8fb',
  waterDark: '#2c6d86',
  wallStone: '#757161',
  wallDark: '#4a483d',
  wood: '#8f563b',
  woodDark: '#5d3221',
  floor: '#d9a066',
  floorDark: '#ac723e'
};

// --- Complex Textures (simulating pixel art via SVG) ---

export const FloorTile = ({ type }: { type: TileType }) => {
  if (type === 'grass') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <rect width="16" height="16" fill={C.grassMain} />
        {/* Grass tufts */}
        <rect x="2" y="3" width="1" height="1" fill={C.grassLight} />
        <rect x="3" y="2" width="1" height="2" fill={C.grassDark} />
        <rect x="11" y="9" width="1" height="1" fill={C.grassLight} />
        <rect x="12" y="8" width="1" height="2" fill={C.grassDark} />
        <rect x="7" y="12" width="1" height="1" fill={C.grassLight} />
        <rect x="6" y="13" width="2" height="1" fill={C.grassDark} />
      </svg>
    );
  }
  if (type === 'water') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <rect width="16" height="16" fill={C.waterMain} />
        <path d="M2 4h3 M9 4h4 M4 10h5 M1 13h3" stroke={C.waterLight} strokeWidth="1" />
        <path d="M3 5h2 M10 5h2 M5 11h3" stroke={C.waterDark} strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'floor') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <rect width="16" height="16" fill={C.floor} />
        {/* Wood planks pattern */}
        <rect x="0" y="0" width="16" height="1" fill={C.floorDark} opacity="0.5"/>
        <rect x="0" y="5" width="16" height="1" fill={C.floorDark} opacity="0.5"/>
        <rect x="0" y="10" width="16" height="1" fill={C.floorDark} opacity="0.5"/>
        <rect x="0" y="15" width="16" height="1" fill={C.floorDark} opacity="0.5"/>
        <rect x="5" y="1" width="1" height="4" fill={C.floorDark} opacity="0.3"/>
        <rect x="12" y="6" width="1" height="4" fill={C.floorDark} opacity="0.3"/>
        <rect x="3" y="11" width="1" height="4" fill={C.floorDark} opacity="0.3"/>
      </svg>
    );
  }
  if (type === 'wall') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <rect width="16" height="16" fill={C.wallStone} />
        {/* Bricks */}
        <rect x="0" y="3" width="16" height="1" fill={C.wallDark} />
        <rect x="0" y="7" width="16" height="1" fill={C.wallDark} />
        <rect x="0" y="11" width="16" height="1" fill={C.wallDark} />
        <rect x="0" y="15" width="16" height="1" fill={C.wallDark} />
        <rect x="4" y="4" width="1" height="3" fill={C.wallDark} />
        <rect x="12" y="4" width="1" height="3" fill={C.wallDark} />
        <rect x="8" y="8" width="1" height="3" fill={C.wallDark} />
        <rect x="2" y="12" width="1" height="3" fill={C.wallDark} />
        <rect x="10" y="12" width="1" height="3" fill={C.wallDark} />
      </svg>
    );
  }
  return <rect width="100%" height="100%" fill="#000" />;
};

export const PrincessSprite = ({ 
  direction, 
  appearance 
}: { 
  direction: string, 
  appearance?: PlayerAppearance 
}) => {
  const dressColor = appearance?.dressColor || '#e83e8c';
  const hairColor = appearance?.hairColor || '#5C4033';

  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform={direction === 'left' ? 'scale(-1, 1) translate(-24, 0)' : ''}>
        {/* Shadow */}
        <ellipse cx="12" cy="21" rx="6" ry="2" fill="black" opacity="0.3" />
        
        {/* Dress Bottom Base */}
        <path d="M6 16 L4 21 H20 L18 16 Z" fill={dressColor} />
        {/* Dress Bottom Shade (Black overlay) */}
        <path d="M6 16 L4 21 H20 L18 16 Z" fill="black" opacity="0.2" />
        
        {/* Dress Top Base */}
        <path d="M6 16 H18 L16 12 H8 Z" fill={dressColor} />
        
        {/* Dress Detail (White overlay for highlight) */}
        <rect x="11" y="14" width="2" height="8" fill="white" opacity="0.3" />
        
        {/* Torso/Arms */}
        <rect x="9" y="9" width="6" height="4" fill={dressColor} />
        <rect x="7" y="10" width="2" height="3" fill="#FFE0BD" /> {/* Arm L */}
        <rect x="15" y="10" width="2" height="3" fill="#FFE0BD" /> {/* Arm R */}
        
        {/* Head */}
        <rect x="8" y="4" width="8" height="6" fill="#FFE0BD" />
        
        {/* Hair */}
        <path d="M8 4 H16 V6 H17 V10 H15 V6 H9 V6 H7 V10 H8 V4" fill={hairColor} />
        <rect x="6" y="5" width="2" height="6" fill={hairColor} />
        <rect x="16" y="5" width="2" height="6" fill={hairColor} />

        {/* Face details */}
        <rect x="10" y="6" width="1" height="2" fill="black" /> {/* Eye */}
        <rect x="13" y="6" width="1" height="2" fill="black" /> {/* Eye */}
        <rect x="11" y="8" width="2" height="1" fill="#cc8e68" opacity="0.5" /> {/* Mouth */}

        {/* Crown */}
        <path d="M9 3 L9 1 L11 3 L12 1 L13 3 L15 1 L15 3 Z" fill="#FFD700" stroke="#b8860b" strokeWidth="0.5"/>
      </g>
    </svg>
  );
};

export const HouseExterior = () => (
  <svg width="100%" height="100%" viewBox="0 0 32 32">
    {/* Shadow */}
    <rect x="2" y="28" width="28" height="4" fill="black" opacity="0.3" />
    
    {/* Main Wall */}
    <rect x="4" y="12" width="24" height="18" fill="#f0e6d2" />
    <rect x="4" y="12" width="1" height="18" fill="#d1c4a8" /> {/* Shade */}
    <rect x="27" y="12" width="1" height="18" fill="#d1c4a8" />

    {/* Roof */}
    <path d="M2 14 L16 2 L30 14" fill="#a52a2a" />
    <path d="M3 14 L16 3 L29 14" fill="#cd5c5c" /> {/* Highlight */}
    <rect x="13" y="6" width="6" height="6" fill="#7a2a2a" opacity="0.5" /> {/* Window attic */}

    {/* Door */}
    <rect x="12" y="18" width="8" height="12" fill="#5d3221" />
    <rect x="13" y="19" width="6" height="11" fill="#8f563b" />
    <circle cx="18" cy="24" r="1" fill="#FFD700" />

    {/* Windows */}
    <rect x="6" y="16" width="4" height="6" fill="#4a3c31" />
    <rect x="7" y="17" width="2" height="4" fill="#87ceeb" />
    <rect x="22" y="16" width="4" height="6" fill="#4a3c31" />
    <rect x="23" y="17" width="2" height="4" fill="#87ceeb" />
  </svg>
);

export const ItemSprite = ({ type }: { type: ItemType }) => {
  if (type === 'potion') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <path d="M6 3 L10 3 L10 5 L12 7 L12 13 L11 14 L5 14 L4 13 L4 7 L6 5 Z" fill="#e11d48" stroke="#881337" strokeWidth="1" />
        <rect x="7" y="1" width="2" height="2" fill="#9ca3af" />
        <rect x="7" y="8" width="2" height="2" fill="white" opacity="0.5" />
      </svg>
    );
  }
  if (type === 'key') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <circle cx="6" cy="6" r="3" fill="none" stroke="#fbbf24" strokeWidth="2" />
        <rect x="8" y="5" width="6" height="2" fill="#fbbf24" />
        <rect x="12" y="7" width="2" height="3" fill="#fbbf24" />
        <rect x="10" y="7" width="2" height="2" fill="#fbbf24" />
      </svg>
    );
  }
  if (type === 'sword') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16" transform="rotate(45 8 8)">
        <rect x="7" y="2" width="2" height="10" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
        <rect x="5" y="12" width="6" height="2" fill="#854d0e" />
        <rect x="7" y="12" width="2" height="4" fill="#854d0e" />
        <circle cx="8" cy="13" r="1" fill="#fbbf24" />
      </svg>
    );
  }
  return null;
};

// --- Map Generators ---

const createEmptyGrid = (width: number, height: number, fill: TileType): TileType[][] => 
  Array(height).fill(null).map(() => Array(width).fill(fill));

// Village Map
const villageTiles = createEmptyGrid(15, 11, 'grass');
// Lake
villageTiles[6][5] = 'water'; villageTiles[6][6] = 'water';
villageTiles[7][5] = 'water'; villageTiles[7][6] = 'water';
villageTiles[7][7] = 'water'; villageTiles[6][7] = 'water';

// Main Path
for(let i=0; i<15; i++) villageTiles[8][i] = 'floor'; 

// House Paths (connecting doors to main path)
// House 1 (10, 3)
for(let y=4; y<=7; y++) villageTiles[y][10] = 'floor';
// House 2 (3, 3)
for(let y=4; y<=7; y++) villageTiles[y][3] = 'floor';
// House 3 (1, 6)
villageTiles[7][1] = 'floor';
// House 4 (13, 6)
villageTiles[7][13] = 'floor';

// Decorative Walls/Bushes
villageTiles[1][1] = 'wall'; villageTiles[1][2] = 'wall'; villageTiles[1][3] = 'wall';
villageTiles[2][1] = 'wall';

villageTiles[1][11] = 'wall'; villageTiles[1][12] = 'wall';
villageTiles[2][12] = 'wall';

export const MAPS: Record<string, GameMap> = {
  village: {
    id: 'village',
    width: 15,
    height: 11,
    baseColor: '#202020',
    tiles: villageTiles,
    objects: [
      {
        id: 'house1_exterior',
        type: 'warp',
        position: { x: 10, y: 3 },
        targetMap: 'house_1',
        targetPos: { x: 3, y: 5 },
      },
      {
        id: 'house2_exterior',
        type: 'warp',
        position: { x: 3, y: 3 },
        targetMap: 'house_2',
        targetPos: { x: 3, y: 5 },
      },
      {
        id: 'house3_exterior',
        type: 'warp',
        position: { x: 1, y: 6 },
        targetMap: 'house_3',
        targetPos: { x: 4, y: 6 },
      },
      {
        id: 'house4_exterior',
        type: 'warp',
        position: { x: 13, y: 6 },
        targetMap: 'house_4',
        targetPos: { x: 5, y: 5 },
      },
      {
        id: 'village_key',
        type: 'item',
        itemId: 'key',
        position: { x: 4, y: 4 },
      },
      {
        id: 'village_potion',
        type: 'item',
        itemId: 'potion',
        position: { x: 13, y: 9 },
      },
      {
        id: 'village_sign',
        type: 'sign',
        position: { x: 8, y: 7 },
        message: "Villa Kakariko - Al norte: Bosque perdido."
      }
    ]
  },
  house_1: {
    id: 'house_1',
    width: 9,
    height: 8,
    baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 8, 'floor');
      // Walls
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      // Door
      t[7][4] = 'door';
      // Rug/Decor
      t[4][4] = 'sofa'; 
      t[4][3] = 'sofa';
      t[4][5] = 'sofa';
      
      t[2][2] = 'bed';
      t[2][6] = 'oven';
      return t;
    })(),
    objects: [
      {
        id: 'exit_h1',
        type: 'warp',
        position: { x: 4, y: 7 },
        targetMap: 'village',
        targetPos: { x: 10, y: 4 },
      },
      {
        id: 'h1_sword',
        type: 'item',
        itemId: 'sword',
        position: { x: 5, y: 2 },
      }
    ]
  },
  house_2: {
    id: 'house_2',
    width: 9,
    height: 8,
    baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 8, 'floor');
      // Walls
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      // Door
      t[7][4] = 'door';
      
      t[2][4] = 'table';
      t[5][2] = 'flower';
      t[5][6] = 'flower';
      t[2][7] = 'bed';
      return t;
    })(),
    objects: [
      {
        id: 'exit_h2',
        type: 'warp',
        position: { x: 4, y: 7 },
        targetMap: 'village',
        targetPos: { x: 3, y: 4 },
      }
    ]
  },
  house_3: {
    id: 'house_3',
    width: 9,
    height: 8,
    baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 8, 'floor');
      // Walls
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      // Door
      t[7][4] = 'door';
      
      // Florist / Nature theme
      t[2][2] = 'flower'; t[2][3] = 'flower'; t[2][6] = 'flower';
      t[3][2] = 'flower'; t[3][6] = 'flower';
      t[4][4] = 'table';
      t[5][2] = 'oven'; // Counter
      return t;
    })(),
    objects: [
      {
        id: 'exit_h3',
        type: 'warp',
        position: { x: 4, y: 7 },
        targetMap: 'village',
        targetPos: { x: 1, y: 7 },
      },
      {
        id: 'h3_potion',
        type: 'item',
        itemId: 'potion',
        position: { x: 6, y: 2 },
      }
    ]
  },
  house_4: {
    id: 'house_4',
    width: 11,
    height: 8,
    baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(11, 8, 'floor');
      // Walls
      for(let x=0; x<11; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][10] = 'wall'; }
      // Door
      t[7][5] = 'door';
      
      // Inn / Large House
      t[2][2] = 'bed'; t[2][4] = 'bed'; t[2][6] = 'bed'; t[2][8] = 'bed';
      t[5][2] = 'sofa'; t[5][3] = 'sofa';
      t[5][8] = 'table';
      return t;
    })(),
    objects: [
      {
        id: 'exit_h4',
        type: 'warp',
        position: { x: 5, y: 7 },
        targetMap: 'village',
        targetPos: { x: 13, y: 7 },
      },
      {
        id: 'h4_key',
        type: 'item',
        itemId: 'key',
        position: { x: 9, y: 5 },
      }
    ]
  }
};