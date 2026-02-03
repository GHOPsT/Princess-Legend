
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

// --- MAPA CENTRAL: PLAZA DE LA FUENTE ---
const village_center = createBaseMap('village_center', { 
  up: 'village_north', 
  right: 'village_east',
  left: 'village_west' 
});
village_center.tiles[6][7] = 'fountain';

village_center.objects.push(
    { id: 'house_player_ent', type: 'warp', position: { x: 3, y: 3 }, targetMap: 'house_player' },
    { id: 'house_lib_ent', type: 'warp', position: { x: 11, y: 3 }, targetMap: 'library' },
    { id: 'house_extra_1', type: 'warp', position: { x: 3, y: 8 }, targetMap: 'house_generic' },
    { id: 'house_extra_2', type: 'warp', position: { x: 11, y: 8 }, targetMap: 'house_generic' },
    { id: 'npc_elder', type: 'npc', position: { x: 8, y: 7 }, npcData: {
        name: "Anciano Valerius", role: 'elder', spriteType: 'elder', initialStep: 'start',
        dialogue: { 'start': { text: "La fuente de este pueblo ha fluido por mil años, Alteza." } }
    }}
);

// --- MAPA OESTE: EL BOSQUE SUSURRANTE ---
const village_west = createBaseMap('village_west', { right: 'village_center' });
for(let y=4; y<8; y++) village_west.tiles[y][0] = 'water';
village_west.objects.push(
    { id: 'house_cottage', type: 'warp', position: { x: 10, y: 2 }, targetMap: 'house_generic' },
    { id: 'npc_storyteller', type: 'npc', position: { x: 10, y: 5 }, npcData: {
        name: "Bardo Lute", role: 'storyteller', spriteType: 'villager', initialStep: 'start',
        dialogue: { 'start': { text: "Dicen que hacia el oeste los árboles tienen ojos..." } }
    }}
);
village_west.tiles[3][3] = 'flower';
village_west.tiles[9][10] = 'flower';

// --- MAPA NORTE: CAMINO AL CASTILLO ---
const village_north = createBaseMap('village_north', { down: 'village_center' });
for(let x=0; x<15; x++) village_north.tiles[0][x] = 'wall';
village_north.objects.push(
    { id: 'house_guard', type: 'warp', position: { x: 3, y: 2 }, targetMap: 'house_generic' },
    { id: 'house_guard_2', type: 'warp', position: { x: 12, y: 2 }, targetMap: 'house_generic' },
    { id: 'npc_guard', type: 'npc', position: { x: 7, y: 2 }, npcData: {
        name: "Guardia Real", role: 'guard', spriteType: 'villager', initialStep: 'start',
        dialogue: { 'start': { text: "Nadie pasa al castillo sin el sello real." } }
    }}
);

// --- MAPA ESTE: MERCADO ---
const village_east = createBaseMap('village_east', { left: 'village_center' });
village_east.objects.push(
    { id: 'house_shop_1', type: 'warp', position: { x: 4, y: 3 }, targetMap: 'house_generic' },
    { id: 'house_shop_2', type: 'warp', position: { x: 10, y: 3 }, targetMap: 'house_generic' },
    { id: 'npc_merchant', type: 'npc', position: { x: 5, y: 5 }, npcData: {
        name: "Mercader Barnaby", role: 'merchant', spriteType: 'merchant', initialStep: 'start',
        dialogue: { 'start': { text: "¿Buscáis joyas? Mis precios son... razonables." } }
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

export const MAPS: Record<string, GameMap> = { village_center, village_north, village_east, village_west, house_player, house_generic };

export { FloorTile, PrincessSprite, NPCSprite, HouseExterior } from './constants_sprites';
