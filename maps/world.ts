
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

// --- DEFINICIÓN DE MAPAS EXTERIORES (GRID 3x3) ---

// 1. CENTRO (Ya existente, modificado)
const village_center = createBaseMap('village_center');
// Caminos
for(let i=0; i<15; i++) { village_center.tiles[6][i] = 'path'; village_center.tiles[7][i] = 'path'; }
for(let i=0; i<12; i++) { village_center.tiles[i][7] = 'path'; village_center.tiles[i][8] = 'path'; }
village_center.tiles[6][7] = 'fountain'; 
village_center.objects.push(
    { id: 'h_player', type: 'warp', position: { x: 3, y: 3 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } },
    { id: 'h_villager_1', type: 'warp', position: { x: 11, y: 3 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } },
    { id: 'h_villager_2', type: 'warp', position: { x: 3, y: 10 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } },
    { id: 'h_villager_3', type: 'warp', position: { x: 11, y: 10 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } },
    { id: 'npc_elder', type: 'npc', position: { x: 9, y: 8 }, npcData: { name: "Anciano Valerius", role: 'elder', spriteType: 'elder', initialStep: 'start', dialogue: { 'start': { text: "Bienvenida a casa, Alteza." } } }},
    { id: 'npc_dog', type: 'npc', position: { x: 5, y: 7 }, npcData: { name: "Perrito", role: 'animal', spriteType: 'dog', initialStep: 'start', dialogue: { 'start': { text: "¡Guau! ¡Guau!" } } }},
    { id: 'npc_cat', type: 'npc', position: { x: 8, y: 4 }, npcData: { name: "Gatito", role: 'animal', spriteType: 'cat', initialStep: 'start', dialogue: { 'start': { text: "¡Miau! *Prrr*" } } }}
);

// 2. NORTE (Camino hacia arriba, zona residencial)
const village_north = createBaseMap('village_north');
for(let i=0; i<12; i++) { village_north.tiles[i][7] = 'path'; village_north.tiles[i][8] = 'path'; } // Camino vertical
village_north.objects.push(
    { id: 'h_n_1', type: 'warp', position: { x: 4, y: 5 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } },
    { id: 'h_n_2', type: 'warp', position: { x: 10, y: 5 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } }
);

// 3. SUR (Salida del pueblo, más naturaleza)
const village_south = createBaseMap('village_south');
for(let i=0; i<12; i++) { village_south.tiles[i][7] = 'path'; village_south.tiles[i][8] = 'path'; } // Camino vertical
village_south.objects.push(
    { id: 'npc_guard', type: 'npc', position: { x: 6, y: 8 }, npcData: { name: "Guardia Real", role: 'guard', spriteType: 'guard', initialStep: 'start', dialogue: { 'start': { text: "Más allá del sur hay peligros." } } }}
);

// 4. ESTE (Mercado)
const village_east = createBaseMap('village_east');
for(let i=0; i<15; i++) { village_east.tiles[6][i] = 'path'; village_east.tiles[7][i] = 'path'; } // Camino horizontal
village_east.objects.push(
    { id: 'shop_1', type: 'warp', position: { x: 7, y: 4 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } },
    { id: 'npc_merch', type: 'npc', position: { x: 8, y: 8 }, npcData: { name: "Mercader", role: 'merchant', spriteType: 'merchant', initialStep: 'start', dialogue: { 'start': { text: "¿Buscas pociones raras?" } } }}
);

// 5. OESTE (Bosque/Granja)
const village_west = createBaseMap('village_west');
for(let i=0; i<15; i++) { village_west.tiles[6][i] = 'path'; village_west.tiles[7][i] = 'path'; } // Camino horizontal
village_west.objects.push(
    { id: 'h_w_1', type: 'warp', position: { x: 6, y: 5 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } }
);

// 6. NORESTE (Rincón tranquilo - AHORA CON CASTILLO)
const village_ne = createBaseMap('village_ne');
village_ne.tiles[6][0] = 'path'; // Conexión visual
village_ne.tiles[11][7] = 'path'; 
// Camino hacia el castillo
for(let y=6; y<12; y++) village_ne.tiles[y][8] = 'path';
village_ne.tiles[11][8] = 'path';

// Reemplazamos la casa simple por un warp identificado como castillo, apuntando a castle_interior
// Updated targetPos to match the new, larger castle entrance
village_ne.objects.push({ id: 'warp_castle', type: 'warp', position: { x: 8, y: 6 }, targetMap: 'castle_interior', targetPos: { x: 15, y: 22 } });

// 7. NOROESTE (Bosque denso)
const village_nw = createBaseMap('village_nw');
village_nw.tiles[11][7] = 'path';
village_nw.objects.push({ id: 'h_nw', type: 'warp', position: { x: 5, y: 5 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } });

// 8. SURESTE (Lago/Agua)
const village_se = createBaseMap('village_se');
for(let x=8; x<15; x++) for(let y=6; y<12; y++) village_se.tiles[y][x] = 'water'; // Un lago
village_se.tiles[0][7] = 'path';
village_se.objects.push({ id: 'h_se', type: 'warp', position: { x: 4, y: 6 }, targetMap: 'house_player', targetPos: { x: 6, y: 10 } });

// 9. SUROESTE (Campo abierto)
const village_sw = createBaseMap('village_sw');
village_sw.tiles[0][7] = 'path';
village_sw.objects.push({ id: 'npc_cat_2', type: 'npc', position: { x: 10, y: 5 }, npcData: { name: "Gato Viajero", role: 'animal', spriteType: 'cat', initialStep: 'start', dialogue: { 'start': { text: "Miau..." } } }});


// --- DEFINICIÓN DE CONEXIONES (SISTEMA DE GRID) ---

// Centro
village_center.connections = { up: 'village_north', down: 'village_south', left: 'village_west', right: 'village_east' };

// Norte
village_north.connections = { down: 'village_center', left: 'village_nw', right: 'village_ne' };

// Sur
village_south.connections = { up: 'village_center', left: 'village_sw', right: 'village_se' };

// Este
village_east.connections = { left: 'village_center', up: 'village_ne', down: 'village_se' };

// Oeste
village_west.connections = { right: 'village_center', up: 'village_nw', down: 'village_sw' };

// Esquinas
village_ne.connections = { left: 'village_north', down: 'village_east' };
village_nw.connections = { right: 'village_north', down: 'village_west' };
village_se.connections = { left: 'village_south', up: 'village_east' };
village_sw.connections = { right: 'village_south', up: 'village_west' };


// --- INTERIORES ---
const house_player = createBaseMap('house_player', 12, 12);
house_player.tiles = Array(12).fill(0).map(() => Array(12).fill('floor'));

// Outer Walls
for(let x=0; x<12; x++) { 
    house_player.tiles[0][x] = 'wall'; 
    house_player.tiles[11][x] = 'wall'; 
}
for(let y=0; y<12; y++) { 
    house_player.tiles[y][0] = 'wall'; 
    house_player.tiles[y][11] = 'wall'; 
}

// Bedroom (Top Left)
for(let y=1; y<6; y++) house_player.tiles[y][5] = 'wall'; // Divider
house_player.tiles[4][5] = 'door'; // Internal door
house_player.tiles[1][1] = 'bed';
house_player.tiles[1][2] = 'flower';
house_player.tiles[1][4] = 'bookshelf';
house_player.tiles[5][1] = 'candle'; 

// Kitchen (Top Right)
house_player.tiles[1][10] = 'oven';
house_player.tiles[1][9] = 'counter';
house_player.tiles[1][8] = 'counter';
house_player.tiles[1][7] = 'counter';
house_player.tiles[3][9] = 'table';
house_player.tiles[3][8] = 'flower';

// Living Room (Bottom Left)
house_player.tiles[7][1] = 'bookshelf';
house_player.tiles[7][2] = 'bookshelf';
house_player.tiles[9][2] = 'sofa';
house_player.tiles[9][3] = 'table';
house_player.tiles[9][1] = 'flower';

// Exit Door
house_player.tiles[11][6] = 'door';

house_player.objects.push(
    { id: 'exit', type: 'warp', position: { x: 6, y: 11 }, targetMap: 'village_center', targetPos: { x: 3, y: 4 } },
    { id: 'house_cat', type: 'npc', position: { x: 8, y: 8 }, npcData: { name: "Mishi", role: 'animal', spriteType: 'cat', initialStep: 'start', dialogue: { 'start': { text: "Prrr... *Se frota en tu pierna*" } } }}
);


// --- CASTLE INTERIOR (GRANDIOSE) ---
// Increased size to 30x24 to accommodate wings
const castle_interior = createBaseMap('castle_interior', 30, 24);
castle_interior.tiles = Array(24).fill(0).map(() => Array(30).fill('floor'));

const W = 30;
const H = 24;

// 1. WALLS & STRUCTURE
// Outer walls
for(let x=0; x<W; x++) { castle_interior.tiles[0][x] = 'wall'; castle_interior.tiles[H-1][x] = 'wall'; }
for(let y=0; y<H; y++) { castle_interior.tiles[y][0] = 'wall'; castle_interior.tiles[y][W-1] = 'wall'; }

// Internal Walls (dividing wings)
// Vertical dividers at x=9 and x=20
for(let y=2; y<H-1; y++) { 
    castle_interior.tiles[y][9] = 'wall'; 
    castle_interior.tiles[y][20] = 'wall'; 
}
// Horizontal dividers for wings (separating top/bottom rooms)
for(let x=1; x<9; x++) castle_interior.tiles[12][x] = 'wall'; // West Wing Divider
for(let x=21; x<W-1; x++) castle_interior.tiles[12][x] = 'wall'; // East Wing Divider

// DOORS (gaps in walls)
castle_interior.tiles[6][9] = 'door';  // To Kitchen (West Top)
castle_interior.tiles[18][9] = 'door'; // To Barracks (West Bottom)
castle_interior.tiles[6][20] = 'door'; // To Library (East Top)
castle_interior.tiles[18][20] = 'door';// To Armory (East Bottom)
castle_interior.tiles[12][4] = 'door'; // Connect Kitchen/Barracks internal?
castle_interior.tiles[12][25] = 'door'; // Connect Library/Armory internal?

// Main Entrance (Double Door)
castle_interior.tiles[H-1][14] = 'door';
castle_interior.tiles[H-1][15] = 'door';

// 2. MAIN HALL (Center)
// Red Carpet
for(let y=4; y<H-1; y++) { 
    castle_interior.tiles[y][14] = 'path'; 
    castle_interior.tiles[y][15] = 'path'; 
}
// Throne Area (Top Center)
castle_interior.tiles[2][14] = 'sofa'; // Throne
castle_interior.tiles[2][15] = 'sofa'; // Throne
castle_interior.tiles[2][13] = 'flower'; 
castle_interior.tiles[2][16] = 'flower';

// --- DECORATIONS (NEW) ---
// Banners on the back wall
castle_interior.tiles[0][13] = 'banner';
castle_interior.tiles[0][16] = 'banner';

// Candelabras near throne
castle_interior.tiles[2][12] = 'candle';
castle_interior.tiles[2][17] = 'candle';

// Suits of Armor lining the carpet
castle_interior.tiles[5][12] = 'armor';
castle_interior.tiles[5][17] = 'armor';
castle_interior.tiles[9][12] = 'armor';
castle_interior.tiles[9][17] = 'armor';
castle_interior.tiles[13][12] = 'armor';
castle_interior.tiles[13][17] = 'armor';

// 3. KITCHEN (West Wing - Top: x 1-8, y 1-11)
for(let y=1; y<4; y++) for(let x=1; x<9; x++) castle_interior.tiles[y][x] = 'counter'; // Cabinets
castle_interior.tiles[2][2] = 'oven';
castle_interior.tiles[2][4] = 'oven';
castle_interior.tiles[2][6] = 'oven';
castle_interior.tiles[6][4] = 'table'; // Prep table
castle_interior.tiles[6][5] = 'table'; 

// 4. BARRACKS (West Wing - Bottom: x 1-8, y 13-22)
castle_interior.tiles[14][1] = 'bed'; castle_interior.tiles[14][3] = 'bed'; castle_interior.tiles[14][5] = 'bed';
castle_interior.tiles[17][1] = 'bed'; castle_interior.tiles[17][3] = 'bed'; castle_interior.tiles[17][5] = 'bed';
castle_interior.tiles[20][1] = 'bed'; castle_interior.tiles[20][3] = 'bed'; castle_interior.tiles[20][5] = 'bed';

// 5. LIBRARY (East Wing - Top: x 21-28, y 1-11)
for(let x=21; x<29; x++) castle_interior.tiles[1][x] = 'bookshelf'; // Top shelves
for(let y=3; y<8; y+=2) {
    castle_interior.tiles[y][22] = 'bookshelf';
    castle_interior.tiles[y][23] = 'bookshelf';
    castle_interior.tiles[y][26] = 'bookshelf';
    castle_interior.tiles[y][27] = 'bookshelf';
}
castle_interior.tiles[9][25] = 'table'; // Reading table

// 6. ARMORY / DUNGEON ENTRANCE (East Wing - Bottom: x 21-28, y 13-22)
// Armory racks
castle_interior.tiles[14][22] = 'counter'; castle_interior.tiles[14][23] = 'counter'; 
castle_interior.tiles[14][26] = 'counter'; castle_interior.tiles[14][27] = 'counter';
// Dungeon corner
castle_interior.tiles[21][27] = 'water'; castle_interior.tiles[21][28] = 'water';
castle_interior.tiles[22][27] = 'water'; castle_interior.tiles[22][28] = 'water';


// OBJETOS & NPCS
castle_interior.objects.push(
    // Exits
    { id: 'exit_c1', type: 'warp', position: { x: 14, y: 23 }, targetMap: 'village_ne', targetPos: { x: 8, y: 7 } },
    { id: 'exit_c2', type: 'warp', position: { x: 15, y: 23 }, targetMap: 'village_ne', targetPos: { x: 8, y: 7 } },
    
    // Throne Room
    { id: 'king', type: 'npc', position: { x: 14, y: 3 }, npcData: { name: "Rey Aldous", role: 'elder', spriteType: 'elder', initialStep: 'start', dialogue: { 'start': { text: "Bienvenida a casa, Alteza." } } }},
    { id: 'guard_throne_1', type: 'npc', position: { x: 12, y: 5 }, npcData: { name: "Guardia Real", role: 'guard', spriteType: 'guard', initialStep: 'start', dialogue: { 'start': { text: "Protegemos al Rey con nuestras vidas." } } }},
    { id: 'guard_throne_2', type: 'npc', position: { x: 17, y: 5 }, npcData: { name: "Guardia Real", role: 'guard', spriteType: 'guard', initialStep: 'start', dialogue: { 'start': { text: "Todo tranquilo por aquí, Alteza." } } }},

    // Main Entrance Guards (NEW)
    { id: 'guard_entrance_1', type: 'npc', position: { x: 12, y: 20 }, npcData: { name: "Portero Real", role: 'guard', spriteType: 'guard', initialStep: 'start', dialogue: { 'start': { text: "¡Abrid paso a la Princesa!" } } }},
    { id: 'guard_entrance_2', type: 'npc', position: { x: 17, y: 20 }, npcData: { name: "Portero Real", role: 'guard', spriteType: 'guard', initialStep: 'start', dialogue: { 'start': { text: "El castillo es seguro bajo nuestra vigilancia." } } }},

    // Kitchen NPC
    { id: 'chef', type: 'npc', position: { x: 4, y: 5 }, npcData: { name: "Chef Pierre", role: 'villager', spriteType: 'merchant', initialStep: 'start', dialogue: { 'start': { text: "¡Cuidado! ¡La sopa está hirviendo!" } } }},

    // Library NPC
    { id: 'librarian', type: 'npc', position: { x: 25, y: 8 }, npcData: { name: "Sabio Elric", role: 'elder', spriteType: 'elder', initialStep: 'start', dialogue: { 'start': { text: "Shhh... El conocimiento requiere silencio." } } }},

    // Armory/Dungeon NPC
    { id: 'quartermaster', type: 'npc', position: { x: 25, y: 16 }, npcData: { name: "Intendente", role: 'guard', spriteType: 'guard', initialStep: 'start', dialogue: { 'start': { text: "Las espadas están afiladas." } } }},
    { id: 'dungeon_guard', type: 'npc', position: { x: 26, y: 20 }, npcData: { name: "Carcelero", role: 'guard', spriteType: 'guard', initialStep: 'start', dialogue: { 'start': { text: "No te acerques a las celdas, princesa." } } }}
);


export const MAPS: Record<string, GameMap> = { 
    village_center, 
    village_north, village_south, village_east, village_west,
    village_ne, village_nw, village_se, village_sw,
    house_player,
    castle_interior
};
