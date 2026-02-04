
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
village_center.tiles[6][7] = 'fountain'; 
village_center.objects.push(
    { id: 'h_player', type: 'warp', position: { x: 3, y: 3 }, targetMap: 'house_player', targetPos: { x: 5, y: 8 } },
    { id: 'npc_elder', type: 'npc', position: { x: 9, y: 8 }, npcData: {
        name: "Anciano Valerius", role: 'elder', spriteType: 'elder', initialStep: 'start',
        dialogue: { 'start': { text: "Bienvenida a casa, Alteza." } }
    }}
);

// INTERIOR: CASA JUGADOR
const house_player = createBaseMap('house_player', 11, 10);
house_player.tiles = Array(10).fill(0).map(() => Array(11).fill('floor'));
house_player.tiles[1][1] = 'bed';
house_player.tiles[1][9] = 'oven';
house_player.objects.push({ id: 'exit', type: 'warp', position: { x: 5, y: 9 }, targetMap: 'village_center', targetPos: { x: 3, y: 4 } });

export const MAPS: Record<string, GameMap> = { village_center, house_player };
