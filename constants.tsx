
import React from 'react';
import { GameMap, TileType, ItemType, PlayerAppearance, NPCData } from './types';

export const TILE_SIZE = 48; 
export const MOVEMENT_SPEED = 180; 

export const HAIR_COLORS = ['#5C4033', '#E6C229', '#2A2B2D', '#D9514E', '#989788', '#F472B6'];
export const DRESS_COLORS = ['#e83e8c', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#1f2937'];

const C = {
  grassMain: '#5fa052', grassLight: '#8cd665', grassDark: '#3e743b',
  waterMain: '#4fa4b8', waterLight: '#92e8fb', waterDark: '#2c6d86',
  wallStone: '#757161', wallDark: '#4a483d', wood: '#8f563b', woodDark: '#5d3221',
  floor: '#d9a066', floorDark: '#ac723e'
};

// Component for rendering background tiles
export const FloorTile = ({ type }: { type: TileType }) => {
  if (type === 'grass') return (
    <svg width="100%" height="100%" viewBox="0 0 16 16">
      <rect width="16" height="16" fill={C.grassMain} />
      <rect x="2" y="3" width="1" height="1" fill={C.grassLight} />
      <rect x="11" y="9" width="1" height="1" fill={C.grassLight} />
      <rect x="6" y="13" width="2" height="1" fill={C.grassDark} />
    </svg>
  );
  if (type === 'water') return (
    <svg width="100%" height="100%" viewBox="0 0 16 16">
      <rect width="16" height="16" fill={C.waterMain} />
      <path d="M2 4h3 M9 4h4 M4 10h5" stroke={C.waterLight} strokeWidth="1" />
    </svg>
  );
  if (type === 'floor') return (
    <svg width="100%" height="100%" viewBox="0 0 16 16">
      <rect width="16" height="16" fill={C.floor} />
      <rect x="0" y="5" width="16" height="1" fill={C.floorDark} opacity="0.3"/>
      <rect x="5" y="0" width="1" height="16" fill={C.floorDark} opacity="0.1"/>
    </svg>
  );
  if (type === 'wall') return (
    <svg width="100%" height="100%" viewBox="0 0 16 16">
      <rect width="16" height="16" fill={C.wallStone} />
      <rect x="0" y="7" width="16" height="1" fill={C.wallDark} />
      <rect x="4" y="0" width="1" height="16" fill={C.wallDark} opacity="0.3"/>
    </svg>
  );
  return <rect width="100%" height="100%" fill="#1a1a1a" />;
};

// Main player character sprite
export const PrincessSprite = ({ direction, appearance }: { direction: string, appearance?: PlayerAppearance }) => {
  const dressColor = appearance?.dressColor || '#e83e8c';
  const hairColor = appearance?.hairColor || '#5C4033';
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform={direction === 'left' ? 'scale(-1, 1) translate(-24, 0)' : ''}>
        <ellipse cx="12" cy="21.5" rx="8" ry="3" fill="black" opacity="0.2" />
        <path d="M6 16 L2 23 H22 L18 16 Z" fill={dressColor} />
        <path d="M7 16 L4 23 H20 L17 16 Z" fill="black" opacity="0.1" />
        <path d="M10 16 L10 23 H14 L14 16 Z" fill="white" opacity="0.2" />
        <rect x="11" y="16" width="2" height="7" fill="white" opacity="0.3" />
        <rect x="9" y="10" width="6" height="7" fill={dressColor} />
        <rect x="11" y="10" width="2" height="7" fill="white" opacity="0.2" />
        <rect x="7" y="12" width="2" height="5" fill="#FFE0BD" />
        <rect x="15" y="12" width="2" height="5" fill="#FFE0BD" />
        <rect x="8" y="4" width="8" height="8" fill="#FFE0BD" />
        <path d="M6 4 H18 V12 H16 V6 H8 V12 H6 V4" fill={hairColor} />
        <rect x="5" y="5" width="2" height="8" fill={hairColor} />
        <rect x="17" y="5" width="2" height="8" fill={hairColor} />
        <rect x="4" y="8" width="2" height="4" fill={hairColor} />
        <rect x="18" y="8" width="2" height="4" fill={hairColor} />
        <rect x="10" y="8" width="1" height="2" fill="black" />
        <rect x="13" y="8" width="1" height="2" fill="black" />
        <rect x="11" y="10" width="2" height="1" fill="#f472b6" opacity="0.4" />
        <path d="M8 3 L8 1 L10 3 L12 0 L14 3 L16 1 L16 3 Z" fill="#FFD700" stroke="#b8860b" strokeWidth="0.5" />
        <rect x="11.5" y="1.5" width="1" height="1" fill="#ef4444" />
      </g>
    </svg>
  );
};

// Fix for NPCSprite: Completed the component and added cat and villager variants
export const NPCSprite = ({ type }: { type: NPCData['spriteType'] }) => {
  if (type === 'dog') return (
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <ellipse cx="12" cy="20" rx="6" ry="2" fill="black" opacity="0.2" />
      <rect x="6" y="14" width="10" height="6" fill="#A0522D" rx="1" />
      <rect x="14" y="9" width="6" height="7" fill="#A0522D" rx="1" />
      <rect x="18" y="11" width="1.5" height="1.5" fill="black" />
      <rect x="15" y="8" width="3" height="3" fill="#8B4513" rx="1" />
      <path d="M19 14 C21 14 21 17 19 17" fill="none" stroke="#A0522D" strokeWidth="1.5" />
    </svg>
  );
  if (type === 'cat') return (
    <svg width="100%" height="100%" viewBox="0 0 24 24">
       <ellipse cx="12" cy="20" rx="6" ry="2" fill="black" opacity="0.2" />
       <rect x="7" y="15" width="8" height="5" fill="#555" rx="1" />
       <rect x="13" y="11" width="5" height="6" fill="#555" rx="1" />
       <path d="M14 11 L13 8 L15 11 Z" fill="#555" />
       <path d="M17 11 L18 8 L16 11 Z" fill="#555" />
       <circle cx="15" cy="13" r="0.5" fill="yellow" />
       <circle cx="17" cy="13" r="0.5" fill="yellow" />
    </svg>
  );
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <ellipse cx="12" cy="21" rx="7" ry="2" fill="black" opacity="0.1" />
      <rect x="7" y="12" width="10" height="9" fill={type === 'merchant' ? '#8b5cf6' : '#3b82f6'} rx="1" />
      <rect x="9" y="5" width="6" height="7" fill="#FFE0BD" rx="1" />
      <rect x="8" y="4" width="8" height="2" fill={type === 'elder' ? '#94a3b8' : '#4B2C20'} />
    </svg>
  );
};

// Fix: Added missing ItemSprite component for inventory/map items
export const ItemSprite = ({ type }: { type: ItemType }) => {
  if (type === 'potion') return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <rect x="10" y="4" width="4" height="2" fill="#888" />
      <path d="M8 6 L16 6 L18 18 L6 18 Z" fill="#ef4444" />
      <rect x="10" y="8" width="4" height="4" fill="white" opacity="0.3" />
    </svg>
  );
  if (type === 'sword') return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <rect x="11" y="4" width="2" height="12" fill="#94a3b8" />
      <rect x="8" y="16" width="8" height="2" fill="#4b5563" />
      <rect x="11" y="18" width="2" height="4" fill="#78350f" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <circle cx="12" cy="12" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
    </svg>
  );
};

// Fix: Added missing HouseExterior component for world map house rendering
export const HouseExterior = ({ wall = '#8f563b', roof = '#5d3221' }) => (
  <svg viewBox="0 0 32 32" width="100%" height="100%">
    <path d="M2 16 L16 4 L30 16 Z" fill={roof} />
    <rect x="4" y="16" width="24" height="14" fill={wall} />
    <rect x="13" y="22" width="6" height="8" fill="#3e2723" />
    <rect x="7" y="18" width="4" height="4" fill="#81d4fa" />
    <rect x="21" y="18" width="4" height="4" fill="#81d4fa" />
  </svg>
);

// Helper to initialize map data
const createMap = (id: string, width: number, height: number, baseTile: TileType = 'grass'): GameMap => {
  return {
    id,
    width,
    height,
    tiles: Array(height).fill(0).map(() => Array(width).fill(baseTile)),
    objects: [],
    baseColor: '#5fa052'
  };
};

// Fix: Defined MAPS constant with village and interior locations to resolve App.tsx import error
const village = createMap('village', 25, 25, 'grass');
for(let x=0; x<25; x++) { village.tiles[0][x] = 'wall'; village.tiles[24][x] = 'wall'; }
for(let y=0; y<25; y++) { village.tiles[y][0] = 'wall'; village.tiles[y][24] = 'wall'; }

village.objects.push(
  { id: 'h_player', type: 'warp', position: { x: 5, y: 5 }, targetMap: 'house_player', targetPos: { x: 5, y: 8 } },
  { id: 'lib_warp', type: 'warp', position: { x: 15, y: 5 }, targetMap: 'library', targetPos: { x: 5, y: 8 } },
  { id: 'rest_warp', type: 'warp', position: { x: 5, y: 15 }, targetMap: 'restaurant', targetPos: { x: 5, y: 8 } },
  {
    id: 'village_elder',
    type: 'npc',
    position: { x: 12, y: 10 },
    npcData: {
      name: "Sabio Real",
      spriteType: 'elder',
      initialStep: 'start',
      dialogue: {
        'start': { text: "Bienvenida, Princesa. El pueblo está en calma hoy.", nextStep: 'info' },
        'info': { text: "Dicen que en la biblioteca hay mapas de tierras lejanas." }
      }
    }
  }
);

const house_player = createMap('house_player', 10, 10, 'floor');
for(let x=0; x<10; x++) house_player.tiles[0][x] = 'wall';
house_player.tiles[2][2] = 'bed';
house_player.objects.push({ id: 'exit_house', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village', targetPos: { x: 5, y: 6 } });

const library = createMap('library', 12, 12, 'floor');
for(let x=0; x<12; x++) library.tiles[0][x] = 'wall';
library.tiles[3][3] = 'bookshelf';
library.objects.push({ id: 'exit_lib', type: 'warp', position: { x: 6, y: 11 }, targetMap: 'village', targetPos: { x: 15, y: 6 } });

const restaurant = createMap('restaurant', 10, 10, 'floor');
for(let x=0; x<10; x++) restaurant.tiles[0][x] = 'wall';
restaurant.tiles[3][3] = 'oven';
restaurant.tiles[4][4] = 'table';
restaurant.objects.push({ id: 'exit_rest', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village', targetPos: { x: 5, y: 16 } });

export const MAPS: Record<string, GameMap> = {
  village,
  house_player,
  library,
  restaurant
};
