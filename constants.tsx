
import React from 'react';
import { GameMap, TileType, PlayerAppearance, NPCData } from './types';

export const TILE_SIZE = 48; 
export const HAIR_COLORS = ['#5C4033', '#E6C229', '#2A2B2D', '#D9514E'];
export const DRESS_COLORS = ['#e83e8c', '#3b82f6', '#10b981', '#8b5cf6'];

const createBaseMap = (id: string, width = 15, height = 12): GameMap => ({
  id,
  width,
  height,
  tiles: Array(height).fill(0).map(() => Array(width).fill('grass')),
  objects: [],
  connections: {}
});

const paintNaturalPath = (map: GameMap, isHorizontal: boolean, fixedCoord: number, range: [number, number]) => {
  for (let i = range[0]; i <= range[1]; i++) {
    const x = isHorizontal ? i : fixedCoord;
    const y = isHorizontal ? fixedCoord : i;
    if (y >= 0 && y < map.height && x >= 0 && x < map.width) map.tiles[y][x] = 'path';
    if (Math.random() > 0.4) {
      const offset = Math.random() > 0.5 ? 1 : -1;
      const vx = isHorizontal ? x : x + offset;
      const vy = isHorizontal ? y + offset : y;
      if (vy >= 0 && vy < map.height && vx >= 0 && vx < map.width) map.tiles[vy][vx] = 'path';
    }
  }
};

// --- MAPA CENTRAL: PLAZA DE LA FUENTE ---
const village_center = createBaseMap('village_center');
village_center.connections = { up: 'village_north', right: 'village_east', left: 'village_west' };
paintNaturalPath(village_center, true, 6, [0, 14]);
paintNaturalPath(village_center, true, 7, [0, 14]);
paintNaturalPath(village_center, false, 7, [0, 11]);
paintNaturalPath(village_center, false, 8, [0, 11]);
village_center.tiles[6][7] = 'fountain'; 

village_center.objects.push(
    { id: 'house_player_ent', type: 'warp', position: { x: 3, y: 3 }, targetMap: 'house_player', targetPos: { x: 5, y: 8 } },
    { id: 'house_lib_ent', type: 'warp', position: { x: 11, y: 3 }, targetMap: 'library', targetPos: { x: 5, y: 8 } },
    { id: 'house_extra_1', type: 'warp', position: { x: 3, y: 8 }, targetMap: 'house_generic', targetPos: { x: 5, y: 8 } },
    { id: 'house_extra_2', type: 'warp', position: { x: 11, y: 8 }, targetMap: 'house_generic', targetPos: { x: 5, y: 8 } },
    { id: 'npc_elder', type: 'npc', position: { x: 9, y: 8 }, npcData: {
        name: "Anciano Valerius", role: 'elder', spriteType: 'elder', initialStep: 'start',
        dialogue: { 'start': { text: "Los caminos del reino siempre te traerán de vuelta a casa, Alteza." } }
    }}
);

// --- MAPA ESTE: EL MERCADO ---
const village_east = createBaseMap('village_east');
village_east.connections = { left: 'village_center' };
paintNaturalPath(village_east, true, 6, [0, 14]);
paintNaturalPath(village_east, true, 7, [0, 14]);

village_east.objects.push(
    { id: 'house_shop_1', type: 'warp', position: { x: 4, y: 3 }, targetMap: 'house_shop', targetPos: { x: 5, y: 8 } },
    { id: 'house_shop_2', type: 'warp', position: { x: 10, y: 3 }, targetMap: 'house_shop', targetPos: { x: 5, y: 8 } },
    { id: 'npc_merchant_out', type: 'npc', position: { x: 5, y: 8 }, npcData: {
        name: "Barnaby", role: 'merchant', spriteType: 'merchant', initialStep: 'start',
        dialogue: { 'start': { text: "¡Seguid el camino dorado! Mis ofertas os esperan dentro." } }
    }}
);

// --- MAPA OESTE: EL BOSQUE ---
const village_west = createBaseMap('village_west');
village_west.connections = { right: 'village_center' };
paintNaturalPath(village_west, true, 6, [0, 14]);
paintNaturalPath(village_west, true, 7, [0, 14]);
village_west.objects.push(
    { id: 'house_cottage', type: 'warp', position: { x: 10, y: 2 }, targetMap: 'house_generic', targetPos: { x: 5, y: 8 } }
);

// --- MAPA NORTE: CAMINO AL CASTILLO ---
const village_north = createBaseMap('village_north');
village_north.connections = { down: 'village_center' };
paintNaturalPath(village_north, false, 7, [0, 11]);
paintNaturalPath(village_north, false, 8, [0, 11]);
for(let x=0; x<15; x++) village_north.tiles[0][x] = 'wall';

// --- INTERIORES DETALLADOS ---

// Casa de la Princesa
const house_player = createBaseMap('house_player', 11, 10);
house_player.tiles = Array(10).fill(0).map(() => Array(11).fill('floor'));
for(let x=0; x<11; x++) house_player.tiles[0][x] = 'wall';
house_player.tiles[1][1] = 'bed';
house_player.tiles[1][2] = 'table';
house_player.tiles[1][9] = 'oven';
house_player.tiles[2][9] = 'counter';
house_player.tiles[4][1] = 'sofa';
house_player.tiles[4][5] = 'table';
house_player.tiles[5][5] = 'flower';
house_player.objects.push({ id: 'exit_player', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village_center', targetPos: { x: 3, y: 4 } });

// Biblioteca
const library = createBaseMap('library', 11, 10);
library.tiles = Array(10).fill(0).map(() => Array(11).fill('floor'));
for(let x=0; x<11; x++) library.tiles[0][x] = 'wall';
library.tiles[1][2] = 'bookshelf'; library.tiles[1][3] = 'bookshelf';
library.tiles[1][7] = 'bookshelf'; library.tiles[1][8] = 'bookshelf';
library.tiles[4][1] = 'bookshelf'; library.tiles[5][1] = 'bookshelf';
library.tiles[4][9] = 'bookshelf'; library.tiles[5][9] = 'bookshelf';
library.tiles[3][4] = 'table'; library.tiles[3][5] = 'table'; library.tiles[3][6] = 'table';
library.objects.push(
    { id: 'exit_library', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village_center', targetPos: { x: 11, y: 4 } },
    { id: 'npc_librarian', type: 'npc', position: { x: 5, y: 2 }, npcData: {
        name: "Maestro Tidus", role: 'storyteller', spriteType: 'elder', initialStep: 'start',
        dialogue: { 'start': { text: "Silencio, por favor. Los libros guardan los secretos de los antiguos reyes." } }
    }}
);

// Tienda (Shop)
const house_shop = createBaseMap('house_shop', 11, 10);
house_shop.tiles = Array(10).fill(0).map(() => Array(11).fill('floor'));
for(let x=0; x<11; x++) house_shop.tiles[0][x] = 'wall';
for(let x=2; x<9; x++) house_shop.tiles[3][x] = 'counter';
house_shop.tiles[1][2] = 'bookshelf';
house_shop.tiles[1][8] = 'flower';
house_shop.objects.push(
    { id: 'exit_shop', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village_east', targetPos: { x: 4, y: 4 } },
    { id: 'npc_shopkeeper', type: 'npc', position: { x: 5, y: 2 }, npcData: {
        name: "Barnaby", role: 'merchant', spriteType: 'merchant', initialStep: 'start',
        dialogue: { 'start': { text: "¡Bienvenida! ¿Buscáis algo especial para vuestra aventura?" } }
    }}
);

// Casa Genérica (Villager)
const house_generic = createBaseMap('house_generic', 11, 10);
house_generic.tiles = Array(10).fill(0).map(() => Array(11).fill('floor'));
for(let x=0; x<11; x++) house_generic.tiles[0][x] = 'wall';
house_generic.tiles[1][1] = 'bed';
house_generic.tiles[1][5] = 'table';
house_generic.tiles[4][8] = 'sofa';
house_generic.objects.push(
    { id: 'exit_generic', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village_center', targetPos: { x: 11, y: 9 } },
    { id: 'npc_villager_in', type: 'npc', position: { x: 2, y: 4 }, npcData: {
        name: "Aldeano", role: 'villager', spriteType: 'villager', initialStep: 'start',
        dialogue: { 'start': { text: "Es un honor recibir vuestra visita en mi humilde morada." } }
    }}
);

export const MAPS: Record<string, GameMap> = { 
    village_center, village_north, village_east, village_west, 
    house_player, house_generic, library, house_shop 
};

export { FloorTile, PrincessSprite, NPCSprite, HouseExterior, HOUSE_STYLES } from './constants_sprites';
