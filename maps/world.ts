
import { GameMap } from '../models/types';

export const TILE_SIZE = 48; 
export const HAIR_COLORS = ['#5C4033', '#E6C229', '#2A2B2D', '#D9514E'];
export const DRESS_COLORS = ['#e83e8c', '#3b82f6', '#10b981', '#8b5cf6'];

const createBaseMap = (id: string, width = 15, height = 12): GameMap => ({
  id, width, height,
  tiles: Array(height).fill(0).map(() => Array(width).fill('grass')),
  objects: [],
  connections: {}
});

// MAPA: PLAZA CENTRAL
const village_center = createBaseMap('village_center');

// 1. Dibujar Caminos primero
for(let i=0; i<15; i++) {
  village_center.tiles[6][i] = 'path';
  village_center.tiles[7][i] = 'path';
}
for(let i=0; i<12; i++) {
  village_center.tiles[i][7] = 'path';
  village_center.tiles[i][8] = 'path';
}

// 2. Colocar la fuente DESPUÉS de los caminos para que sea visible
village_center.tiles[6][7] = 'fountain'; 

village_center.objects.push(
    { id: 'h_player', type: 'warp', position: { x: 3, y: 3 }, targetMap: 'house_player', targetPos: { x: 5, y: 8 } },
    { id: 'h_villager_1', type: 'warp', position: { x: 11, y: 3 }, targetMap: 'house_player', targetPos: { x: 5, y: 8 } },
    { id: 'h_villager_2', type: 'warp', position: { x: 3, y: 10 }, targetMap: 'house_player', targetPos: { x: 5, y: 8 } },
    { id: 'h_villager_3', type: 'warp', position: { x: 11, y: 10 }, targetMap: 'house_player', targetPos: { x: 5, y: 8 } },
    { id: 'npc_elder', type: 'npc', position: { x: 9, y: 8 }, npcData: {
        name: "Anciano Valerius", role: 'elder', spriteType: 'elder', initialStep: 'start',
        dialogue: { 'start': { text: "Bienvenida a casa, Alteza." } }
    }},
    { id: 'npc_dog', type: 'npc', position: { x: 5, y: 7 }, npcData: {
        name: "Perrito", role: 'animal', spriteType: 'dog', initialStep: 'start',
        dialogue: { 'start': { text: "¡Guau! ¡Guau!" } }
    }},
    { id: 'npc_cat', type: 'npc', position: { x: 8, y: 4 }, npcData: {
        name: "Gatito", role: 'animal', spriteType: 'cat', initialStep: 'start',
        dialogue: { 'start': { text: "¡Miau! *Prrr*" } }
    }}
);

// INTERIOR: CASA JUGADOR
const house_player = createBaseMap('house_player', 11, 10);
house_player.tiles = Array(10).fill(0).map(() => Array(11).fill('floor'));
for(let x=0; x<11; x++) house_player.tiles[0][x] = 'wall';
house_player.tiles[1][1] = 'bed';
house_player.tiles[1][9] = 'oven';
house_player.tiles[9][5] = 'door';
house_player.objects.push({ id: 'exit', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village_center', targetPos: { x: 3, y: 4 } });

export const MAPS: Record<string, GameMap> = { village_center, house_player };
