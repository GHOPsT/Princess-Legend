import React from 'react';
import { GameMap, TileType, ItemType, PlayerAppearance, NPCData } from './types';

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

export const FloorTile = ({ type }: { type: TileType }) => {
  if (type === 'grass') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 16 16">
        <rect width="16" height="16" fill={C.grassMain} />
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
        <ellipse cx="12" cy="21" rx="6" ry="2" fill="black" opacity="0.3" />
        <path d="M6 16 L4 21 H20 L18 16 Z" fill={dressColor} />
        <path d="M6 16 L4 21 H20 L18 16 Z" fill="black" opacity="0.2" />
        <path d="M6 16 H18 L16 12 H8 Z" fill={dressColor} />
        <rect x="11" y="14" width="2" height="8" fill="white" opacity="0.3" />
        <rect x="9" y="9" width="6" height="4" fill={dressColor} />
        <rect x="7" y="10" width="2" height="3" fill="#FFE0BD" />
        <rect x="15" y="10" width="2" height="3" fill="#FFE0BD" />
        <rect x="8" y="4" width="8" height="6" fill="#FFE0BD" />
        <path d="M8 4 H16 V6 H17 V10 H15 V6 H9 V6 H7 V10 H8 V4" fill={hairColor} />
        <rect x="6" y="5" width="2" height="6" fill={hairColor} />
        <rect x="16" y="5" width="2" height="6" fill={hairColor} />
        <rect x="10" y="6" width="1" height="2" fill="black" />
        <rect x="13" y="6" width="1" height="2" fill="black" />
        <rect x="11" y="8" width="2" height="1" fill="#cc8e68" opacity="0.5" />
        <path d="M9 3 L9 1 L11 3 L12 1 L13 3 L15 1 L15 3 Z" fill="#FFD700" stroke="#b8860b" strokeWidth="0.5"/>
      </g>
    </svg>
  );
};

export const NPCSprite = ({ type }: { type: 'elder' | 'villager' | 'merchant' }) => {
    let mainColor = '#4b5563';
    let hairColor = '#ffffff';
    if (type === 'villager') { mainColor = '#10b981'; hairColor = '#d97706'; }
    if (type === 'merchant') { mainColor = '#4f46e5'; hairColor = '#27272a'; }

    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="21" rx="5" ry="1.5" fill="black" opacity="0.2" />
        <rect x="6" y="10" width="12" height="11" fill={mainColor} rx="1" />
        <rect x="8" y="4" width="8" height="7" fill="#FFE0BD" rx="1" />
        <rect x="8" y="4" width="8" height="2" fill={hairColor} />
        <rect x="10" y="7" width="1" height="2" fill="black" />
        <rect x="13" y="7" width="1" height="2" fill="black" />
        {type === 'elder' && <rect x="8" y="9" width="8" height="2" fill="#e5e7eb" />}
        {type === 'merchant' && <rect x="9" y="12" width="6" height="4" fill="#fbbf24" opacity="0.5" />}
      </svg>
    );
};

export const HouseExterior = ({ 
  wall = '#f0e6d2', 
  roof = '#a52a2a', 
  roofShadow = '#7a2a2a',
  trim = '#d1c4a8' 
}: { 
  wall?: string, 
  roof?: string, 
  roofShadow?: string, 
  trim?: string 
}) => (
  <svg width="100%" height="100%" viewBox="0 0 32 32">
    <rect x="2" y="28" width="28" height="4" fill="black" opacity="0.3" />
    <rect x="4" y="12" width="24" height="18" fill={wall} />
    <rect x="4" y="12" width="1" height="18" fill={trim} />
    <rect x="27" y="12" width="1" height="18" fill={trim} />
    <path d="M2 14 L16 2 L30 14" fill={roof} />
    <path d="M3 14 L16 3 L29 14" fill={roofShadow} opacity="0.5" />
    <rect x="13" y="6" width="6" height="6" fill={roofShadow} opacity="0.5" />
    <rect x="12" y="18" width="8" height="12" fill="#5d3221" />
    <rect x="13" y="19" width="6" height="11" fill="#8f563b" />
    <circle cx="18" cy="24" r="1" fill="#FFD700" />
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

const createEmptyGrid = (width: number, height: number, fill: TileType): TileType[][] => 
  Array(height).fill(null).map(() => Array(width).fill(fill));

const villageTiles = createEmptyGrid(15, 11, 'grass');
villageTiles[6][5] = 'water'; villageTiles[6][6] = 'water';
villageTiles[7][5] = 'water'; villageTiles[7][6] = 'water';
villageTiles[7][7] = 'water'; villageTiles[6][7] = 'water';

for(let i=0; i<15; i++) villageTiles[8][i] = 'floor'; 
for(let y=4; y<=7; y++) villageTiles[y][3] = 'floor';
for(let y=4; y<=7; y++) villageTiles[y][10] = 'floor';
villageTiles[7][1] = 'floor';
villageTiles[7][13] = 'floor';

// New paths for more accessibility
for(let i=0; i<15; i++) villageTiles[4][i] = 'floor';

export const MAPS: Record<string, GameMap> = {
  village: {
    id: 'village',
    width: 15,
    height: 11,
    baseColor: '#202020',
    tiles: villageTiles,
    objects: [
      { id: 'house1_exterior', type: 'warp', position: { x: 10, y: 3 }, targetMap: 'house_1', targetPos: { x: 3, y: 5 } },
      { id: 'house2_exterior', type: 'warp', position: { x: 3, y: 3 }, targetMap: 'house_2', targetPos: { x: 3, y: 5 } },
      { id: 'house3_exterior', type: 'warp', position: { x: 1, y: 6 }, targetMap: 'house_3', targetPos: { x: 4, y: 6 } },
      { id: 'house4_exterior', type: 'warp', position: { x: 13, y: 6 }, targetMap: 'house_4', targetPos: { x: 5, y: 5 } },
      { id: 'house5_exterior', type: 'warp', position: { x: 7, y: 2 }, targetMap: 'house_5', targetPos: { x: 4, y: 6 } },
      { id: 'house6_exterior', type: 'warp', position: { x: 4, y: 9 }, targetMap: 'house_6', targetPos: { x: 3, y: 5 } },
      { id: 'house7_exterior', type: 'warp', position: { x: 10, y: 9 }, targetMap: 'house_7', targetPos: { x: 3, y: 5 } },
      // 3 New House Exteriors
      { id: 'house8_exterior', type: 'warp', position: { x: 13, y: 2 }, targetMap: 'house_8', targetPos: { x: 4, y: 5 } },
      { id: 'house9_exterior', type: 'warp', position: { x: 1, y: 2 }, targetMap: 'house_9', targetPos: { x: 4, y: 5 } },
      { id: 'house10_exterior', type: 'warp', position: { x: 13, y: 10 }, targetMap: 'house_10', targetPos: { x: 4, y: 5 } },
      
      {
        id: 'elder_npc',
        type: 'npc',
        position: { x: 7, y: 9 },
        npcData: {
            name: "Anciano sabio",
            spriteType: "elder",
            initialStep: "greeting",
            dialogue: {
                greeting: {
                    text: "Ah, Princesa... el Reino está en peligro. La Espada de Hierro se ha perdido en la Casa del Oeste.",
                    choices: [
                        { text: "¿La Espada?", nextStep: "sword_info" },
                        { text: "Ya la buscaré.", nextStep: "farewell" }
                    ]
                },
                sword_info: {
                    text: "Es una reliquia antigua. Sin ella, no podrás cruzar el Bosque Eterno.",
                    nextStep: "greeting"
                },
                farewell: { text: "Ve con cuidado, joven alteza." },
                quest_complete: { text: "¡Has encontrado la espada! Eres la esperanza del Reino.", action: "finish_quest" }
            }
        }
      },
      { id: 'village_sign', type: 'sign', position: { x: 8, y: 7 }, message: "Villa Kakariko - Al norte: Bosque perdido." }
    ]
  },
  house_1: {
    id: 'house_1', width: 9, height: 8, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 8, 'floor');
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      t[7][4] = 'door'; t[4][4] = 'sofa'; t[2][2] = 'bed';
      return t;
    })(),
    objects: [
      { id: 'exit_h1', type: 'warp', position: { x: 4, y: 7 }, targetMap: 'village', targetPos: { x: 10, y: 4 } },
      { id: 'h1_sword', type: 'item', itemId: 'sword', position: { x: 5, y: 2 } }
    ]
  },
  house_2: {
    id: 'house_2', width: 9, height: 8, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 8, 'floor');
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      t[7][4] = 'door'; t[2][4] = 'table';
      return t;
    })(),
    objects: [{ id: 'exit_h2', type: 'warp', position: { x: 4, y: 7 }, targetMap: 'village', targetPos: { x: 3, y: 4 } }]
  },
  house_3: {
    id: 'house_3', width: 9, height: 8, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 8, 'floor');
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      t[7][4] = 'door'; t[4][4] = 'table';
      return t;
    })(),
    objects: [
      { id: 'exit_h3', type: 'warp', position: { x: 4, y: 7 }, targetMap: 'village', targetPos: { x: 1, y: 7 } },
      { id: 'hist_npc', type: 'npc', position: { x: 5, y: 3 }, npcData: { name: "Historiadora", spriteType: "villager", initialStep: "s", dialogue: { s: { text: "El cristal es vida." } } } }
    ]
  },
  house_4: {
    id: 'house_4', width: 11, height: 8, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(11, 8, 'floor');
      for(let x=0; x<11; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][10] = 'wall'; }
      t[7][5] = 'door';
      return t;
    })(),
    objects: [{ id: 'exit_h4', type: 'warp', position: { x: 5, y: 7 }, targetMap: 'village', targetPos: { x: 13, y: 7 } }]
  },
  house_5: {
    id: 'house_5', width: 9, height: 8, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 8, 'floor');
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[7][x] = 'wall'; }
      for(let y=0; y<8; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      t[7][4] = 'door';
      return t;
    })(),
    objects: [{ id: 'exit_h5', type: 'warp', position: { x: 4, y: 7 }, targetMap: 'village', targetPos: { x: 7, y: 3 } }]
  },
  house_6: {
    id: 'house_6', width: 7, height: 7, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(7, 7, 'floor');
      for(let x=0; x<7; x++) { t[0][x] = 'wall'; t[6][x] = 'wall'; }
      for(let y=0; y<7; y++) { t[y][0] = 'wall'; t[y][6] = 'wall'; }
      t[6][3] = 'door';
      return t;
    })(),
    objects: [{ id: 'exit_h6', type: 'warp', position: { x: 3, y: 6 }, targetMap: 'village', targetPos: { x: 4, y: 10 } }]
  },
  house_7: {
    id: 'house_7', width: 7, height: 7, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(7, 7, 'floor');
      for(let x=0; x<7; x++) { t[0][x] = 'wall'; t[6][x] = 'wall'; }
      for(let y=0; y<7; y++) { t[y][0] = 'wall'; t[y][6] = 'wall'; }
      t[6][3] = 'door';
      return t;
    })(),
    objects: [{ id: 'exit_h7', type: 'warp', position: { x: 3, y: 6 }, targetMap: 'village', targetPos: { x: 10, y: 10 } }]
  },
  // --- New Houses 8, 9, 10 ---
  house_8: {
    id: 'house_8', width: 9, height: 7, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 7, 'floor');
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[6][x] = 'wall'; }
      for(let y=0; y<7; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      t[6][4] = 'door'; t[2][2] = 'oven'; t[2][6] = 'flower';
      return t;
    })(),
    objects: [
      { id: 'exit_h8', type: 'warp', position: { x: 4, y: 6 }, targetMap: 'village', targetPos: { x: 13, y: 3 } },
      { id: 'alchemist_npc', type: 'npc', position: { x: 4, y: 2 }, npcData: { 
          name: "Alquimista", spriteType: "merchant", initialStep: "hi", 
          dialogue: { hi: { text: "Mis mezclas son las mejores del sur." } } 
      }}
    ]
  },
  house_9: {
    id: 'house_9', width: 9, height: 7, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 7, 'floor');
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[6][x] = 'wall'; }
      for(let y=0; y<7; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      t[6][4] = 'door'; t[2][2] = 'flower'; t[2][3] = 'flower'; t[2][4] = 'flower';
      return t;
    })(),
    objects: [
      { id: 'exit_h9', type: 'warp', position: { x: 4, y: 6 }, targetMap: 'village', targetPos: { x: 1, y: 3 } },
      { id: 'weaver_npc', type: 'npc', position: { x: 6, y: 3 }, npcData: { 
          name: "Tejedora", spriteType: "villager", initialStep: "hi", 
          dialogue: { hi: { text: "Hago vestidos dignos de una princesa." } } 
      }}
    ]
  },
  house_10: {
    id: 'house_10', width: 9, height: 7, baseColor: '#000000',
    tiles: (() => {
      const t = createEmptyGrid(9, 7, 'floor');
      for(let x=0; x<9; x++) { t[0][x] = 'wall'; t[6][x] = 'wall'; }
      for(let y=0; y<7; y++) { t[y][0] = 'wall'; t[y][8] = 'wall'; }
      t[6][4] = 'door'; t[2][2] = 'table'; t[2][6] = 'bed';
      return t;
    })(),
    objects: [
      { id: 'exit_h10', type: 'warp', position: { x: 4, y: 6 }, targetMap: 'village', targetPos: { x: 13, y: 9 } },
      { id: 'smith_npc', type: 'npc', position: { x: 4, y: 3 }, npcData: { 
          name: "Herrero", spriteType: "elder", initialStep: "hi", 
          dialogue: { hi: { text: "Un buen acero requiere un buen fuego." } } 
      }}
    ]
  }
};