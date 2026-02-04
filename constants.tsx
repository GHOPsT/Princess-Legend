
import React from 'react';
import { GameMap, TileType, PlayerAppearance, NPCData } from './types';

export const TILE_SIZE = 48; 
export const HAIR_COLORS = ['#5C4033', '#E6C229', '#2A2B2D', '#D9514E'];
export const DRESS_COLORS = ['#e83e8c', '#3b82f6', '#10b981', '#8b5cf6'];

const createBaseMap = (id: string, connections: any = {}): GameMap => ({
  id,
  width: 15,
  height: 12,
  tiles: Array(12).fill(0).map(() => Array(15).fill('grass')),
  objects: [],
  connections
});

/**
 * Pinta un camino con irregularidades.
 * xRange/yRange son los centros aproximados del camino.
 */
const paintNaturalPath = (map: GameMap, isHorizontal: boolean, fixedCoord: number, range: [number, number]) => {
  for (let i = range[0]; i <= range[1]; i++) {
    const x = isHorizontal ? i : fixedCoord;
    const y = isHorizontal ? fixedCoord : i;
    
    // Pintamos el bloque central del camino
    if (y >= 0 && y < 12 && x >= 0 && x < 15) map.tiles[y][x] = 'path';
    
    // Añadimos variaciones laterales aleatorias
    if (Math.random() > 0.4) {
      const offset = Math.random() > 0.5 ? 1 : -1;
      const vx = isHorizontal ? x : x + offset;
      const vy = isHorizontal ? y + offset : y;
      if (vy >= 0 && vy < 12 && vx >= 0 && vx < 15) map.tiles[vy][vx] = 'path';
    }
  }
};

// --- MAPA CENTRAL: PLAZA DE LA FUENTE ---
const village_center = createBaseMap('village_center', { 
  up: 'village_north', 
  right: 'village_east',
  left: 'village_west' 
});

// Caminos que se cruzan en el centro (x=7-8, y=6-7)
paintNaturalPath(village_center, true, 6, [0, 14]);
paintNaturalPath(village_center, true, 7, [0, 14]);
paintNaturalPath(village_center, false, 7, [0, 11]);
paintNaturalPath(village_center, false, 8, [0, 11]);

// La fuente gigante en el corazón del camino central
village_center.tiles[6][7] = 'fountain'; 

village_center.objects.push(
    { id: 'house_player_ent', type: 'warp', position: { x: 3, y: 3 }, targetMap: 'house_player' },
    { id: 'house_lib_ent', type: 'warp', position: { x: 11, y: 3 }, targetMap: 'library' },
    { id: 'house_extra_1', type: 'warp', position: { x: 3, y: 8 }, targetMap: 'house_generic' },
    { id: 'house_extra_2', type: 'warp', position: { x: 11, y: 8 }, targetMap: 'house_generic' },
    { id: 'npc_elder', type: 'npc', position: { x: 9, y: 8 }, npcData: {
        name: "Anciano Valerius", role: 'elder', spriteType: 'elder', initialStep: 'start',
        dialogue: { 'start': { text: "Los caminos del reino siempre te traerán de vuelta a casa, Alteza." } }
    }}
);

// --- MAPA OESTE: EL BOSQUE SUSURRANTE ---
const village_west = createBaseMap('village_west', { right: 'village_center' });
paintNaturalPath(village_west, true, 6, [0, 14]);
paintNaturalPath(village_west, true, 7, [0, 14]);

for(let y=4; y<8; y++) village_west.tiles[y][0] = 'water'; // Un río al final del camino
village_west.objects.push(
    { id: 'house_cottage', type: 'warp', position: { x: 10, y: 2 }, targetMap: 'house_generic' },
    { id: 'npc_storyteller', type: 'npc', position: { x: 11, y: 5 }, npcData: {
        name: "Bardo Lute", role: 'storyteller', spriteType: 'villager', initialStep: 'start',
        dialogue: { 'start': { text: "Dicen que hacia el oeste los árboles tienen ojos..." } }
    }}
);

// --- MAPA NORTE: CAMINO AL CASTILLO ---
const village_north = createBaseMap('village_north', { down: 'village_center' });
paintNaturalPath(village_north, false, 7, [0, 11]);
paintNaturalPath(village_north, false, 8, [0, 11]);

for(let x=0; x<15; x++) village_north.tiles[0][x] = 'wall'; // Muro del castillo
village_north.objects.push(
    { id: 'house_guard', type: 'warp', position: { x: 3, y: 2 }, targetMap: 'house_generic' },
    { id: 'house_guard_2', type: 'warp', position: { x: 12, y: 2 }, targetMap: 'house_generic' },
    { id: 'npc_guard', type: 'npc', position: { x: 6, y: 4 }, npcData: {
        name: "Guardia Real", role: 'guard', spriteType: 'villager', initialStep: 'start',
        dialogue: { 'start': { text: "Este camino lleva directo a la ciudadela real." } }
    }}
);

// --- MAPA ESTE: EL MERCADO ---
const village_east = createBaseMap('village_east', { left: 'village_center' });
paintNaturalPath(village_east, true, 6, [0, 14]);
paintNaturalPath(village_east, true, 7, [0, 14]);

village_east.objects.push(
    { id: 'house_shop_1', type: 'warp', position: { x: 4, y: 3 }, targetMap: 'house_generic' },
    { id: 'house_shop_2', type: 'warp', position: { x: 10, y: 3 }, targetMap: 'house_generic' },
    { id: 'npc_merchant', type: 'npc', position: { x: 5, y: 8 }, npcData: {
        name: "Mercader Barnaby", role: 'merchant', spriteType: 'merchant', initialStep: 'start',
        dialogue: { 'start': { text: "¡Seguid el camino dorado! Mis ofertas os esperan." } }
    }}
);

// --- INTERIORES ---
const house_player = createBaseMap('house_player');
house_player.tiles = Array(10).fill(0).map(() => Array(12).fill('floor'));
for(let x=0; x<12; x++) house_player.tiles[0][x] = 'wall';
house_player.objects.push({ id: 'exit_player', type: 'warp', position: { x: 6, y: 9 }, targetMap: 'village_center', targetPos: { x: 3, y: 4 } });

const house_generic = createBaseMap('house_generic');
house_generic.tiles = Array(10).fill(0).map(() => Array(12).fill('floor'));
for(let x=0; x<12; x++) house_generic.tiles[0][x] = 'wall';
house_generic.objects.push({ id: 'exit_generic', type: 'warp', position: { x: 6, y: 9 }, targetMap: 'village_center', targetPos: { x: 7, y: 7 } });

const library = createBaseMap('library');
library.tiles = Array(10).fill(0).map(() => Array(12).fill('floor'));
for(let x=0; x<12; x++) library.tiles[0][x] = 'wall';
// Decoración de biblioteca
library.tiles[1][2] = 'bookshelf';
library.tiles[1][3] = 'bookshelf';
library.tiles[1][8] = 'bookshelf';
library.tiles[1][9] = 'bookshelf';
library.tiles[4][1] = 'bookshelf';
library.tiles[5][1] = 'bookshelf';
library.tiles[4][10] = 'bookshelf';
library.tiles[5][10] = 'bookshelf';
library.tiles[2][5] = 'table';
library.tiles[2][6] = 'table';
library.objects.push({ id: 'exit_library', type: 'warp', position: { x: 6, y: 9 }, targetMap: 'village_center', targetPos: { x: 11, y: 4 } });

export const MAPS: Record<string, GameMap> = { village_center, village_north, village_east, village_west, house_player, house_generic, library };

// Add HOUSE_STYLES to re-exports from constants_sprites.tsx
export { FloorTile, PrincessSprite, NPCSprite, HouseExterior, HOUSE_STYLES } from './constants_sprites';
