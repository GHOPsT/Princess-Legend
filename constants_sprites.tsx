
import React from 'react';
import { PlayerAppearance, NPCData, TileType } from './types';

export const FloorTile = ({ type }: { type: TileType }) => {
  const colors: any = { 
    grass: '#5fa052', 
    water: '#4fa4b8', 
    floor: '#d9a066', 
    wall: '#757161',
    fountain: '#d1b48c', 
    path: '#d1b48c' 
  };
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" style={{ overflow: 'visible' }}>
      <rect width="16" height="16" fill={colors[type] || '#111'} />
      
      {type === 'grass' && (
        <>
          <rect x="2" y="3" width="1" height="1" fill="#4b8141" />
          <rect x="10" y="8" width="1" height="1" fill="#4b8141" />
          <rect x="13" y="2" width="1" height="1" fill="#4b8141" />
          <rect x="5" y="12" width="1" height="1" fill="#4b8141" />
        </>
      )}

      {(type === 'path' || type === 'fountain') && (
        <>
          <rect x="0" y="0" width="16" height="16" fill="#d1b48c" />
          <rect x="2" y="2" width="3" height="2" fill="#bc9a6c" opacity="0.4" />
          <rect x="10" y="3" width="2" height="2" fill="#bc9a6c" opacity="0.4" />
          <rect x="6" y="7" width="4" height="3" fill="#bc9a6c" opacity="0.3" />
          <rect x="12" y="10" width="2" height="2" fill="#bc9a6c" opacity="0.4" />
          <rect x="3" y="12" width="2" height="1" fill="#bc9a6c" opacity="0.4" />
          <rect x="0" y="0" width="1" height="1" fill="#5fa052" />
          <rect x="15" y="0" width="1" height="1" fill="#5fa052" />
        </>
      )}

      {type === 'water' && (
        <>
          <rect x="2" y="4" width="6" height="1" fill="#ffffff" opacity="0.3" />
          <rect x="8" y="10" width="4" height="1" fill="#ffffff" opacity="0.3" />
        </>
      )}

      {type === 'fountain' && (
        <g transform="translate(-8, -14) scale(2.2)">
          <ellipse cx="8" cy="14" rx="11" ry="4" fill="#000" opacity="0.2" />
          <rect x="-2" y="8" width="20" height="3" fill="#666" stroke="#333" strokeWidth="0.5" />
          <rect x="-1" y="8.5" width="18" height="5.5" fill="#1e40af" />
          <rect x="4.5" y="4" width="7" height="7" fill="#555" stroke="#333" strokeWidth="0.5" /> 
          <rect x="5.5" y="-2" width="5" height="7" fill="#777" stroke="#444" strokeWidth="0.5" />
          <rect x="4" y="-3.5" width="8" height="1" fill="#3b82f6" opacity="0.8" />
          <rect x="-2" y="11" width="20" height="4" fill="#888" stroke="#333" strokeWidth="0.5" />
          <g>
             <rect x="2.5" y="-2" width="1.2" height="12" fill="#60a5fa" opacity="0.6" />
             <rect x="12.3" y="-2" width="1.2" height="12" fill="#60a5fa" opacity="0.6" />
          </g>
          <path d="M6.5 -5 Q8 -12 9.5 -5" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" strokeLinecap="round">
             <animate attributeName="stroke-dashoffset" values="6;0" dur="0.3s" repeatCount="indefinite" />
          </path>
        </g>
      )}
    </svg>
  );
};

export const PrincessSprite = ({ direction, appearance }: { direction: string, appearance: PlayerAppearance }) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24">
    <rect x="6" y="8" width="12" height="10" fill={appearance.hairColor} />
    <rect x="5" y="14" width="14" height="9" fill={appearance.dressColor} rx="2" />
    <rect x="9" y="14" width="6" height="9" fill="white" opacity="0.2" />
    <rect x="8" y="5" width="8" height="9" fill="#FFE0BD" rx="1" />
    <rect x="10" y="8" width="1.5" height="2" fill="black" />
    <rect x="13" y="8" width="1.5" height="2" fill="black" />
    <path d="M9 2 L10 4 L14 4 L15 2 L12 0 Z" fill="gold" stroke="#b8860b" strokeWidth="0.5" />
    <rect x="11.5" y="1.5" width="1" height="1" fill="cyan">
       <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
    </rect>
  </svg>
);

export const NPCSprite = ({ type }: { type: NPCData['spriteType'] }) => {
  const isElder = type === 'elder';
  const isMerchant = type === 'merchant';
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <rect x="6" y="12" width="12" height="11" fill={isMerchant ? '#7c2d12' : isElder ? '#4b5563' : '#1e3a8a'} rx="1" />
      <rect x="8" y="5" width="8" height="8" fill="#FFE0BD" rx="1" />
      <rect x="10" y="8" width="1.5" height="1.5" fill="black" />
      <rect x="13" y="8" width="1.5" height="1.5" fill="black" />
      {isElder && (
        <>
          <rect x="7" y="4" width="10" height="3" fill="#e5e7eb" />
          <rect x="8" y="10" width="8" height="4" fill="#e5e7eb" />
          <rect x="16" y="14" width="2" height="9" fill="#452719" />
        </>
      )}
    </svg>
  );
};

export interface HouseStyleProps {
  wall?: string;
  roof?: string;
  hasChimney?: boolean;
  flowerColor?: string;
  chimneyPos?: 'left' | 'right';
  windowColor?: string;
  ivy?: boolean;
  awningColor?: string;
  hasAwning?: boolean;
  wallTexture?: 'none' | 'stone' | 'wood';
  doorColor?: string;
  hasFences?: boolean;
  hasPots?: boolean;
}

export const HOUSE_STYLES: Record<string, HouseStyleProps> = {
  basic: { wall: '#8f563b', roof: '#5d3221', flowerColor: '#f472b6', ivy: true, doorColor: '#3e2723', hasPots: true },
  noble: { wall: '#757161', roof: '#3b82f6', flowerColor: '#60a5fa', hasChimney: true, chimneyPos: 'left', windowColor: '#e0f2fe', doorColor: '#1e40af', hasFences: true },
  cottage: { wall: '#fca5a5', roof: '#8b4513', flowerColor: '#f87171', ivy: false, doorColor: '#ef4444', hasPots: true, hasFences: true },
  shop: { wall: '#fef3c7', roof: '#f97316', flowerColor: '#fbbf24', windowColor: '#fbbf24', hasChimney: false, hasAwning: true, awningColor: '#dc2626', hasPots: true },
  forest: { wall: '#4b3d30', roof: '#2d5a27', flowerColor: '#4ade80', ivy: true, hasChimney: true, wallTexture: 'wood', hasFences: true },
  desert: { wall: '#d4a373', roof: '#bc6c25', flowerColor: '#dda15e', ivy: false, hasChimney: false, windowColor: '#fef3c7', hasPots: true },
  ocean: { wall: '#0077b6', roof: '#00b4d8', flowerColor: '#caf0f8', ivy: false, hasAwning: true, awningColor: '#ffffff', doorColor: '#03045e', hasFences: false },
  royal: { wall: '#4c1d95', roof: '#fbbf24', flowerColor: '#c084fc', hasChimney: true, chimneyPos: 'right', hasAwning: true, awningColor: '#7c3aed', doorColor: '#fbbf24', hasFences: true, hasPots: true },
  tudor: { wall: '#f5f5f5', roof: '#444', flowerColor: '#10b981', ivy: true, wallTexture: 'stone', doorColor: '#27272a', hasFences: true },
  spooky: { wall: '#27272a', roof: '#18181b', flowerColor: '#7c3aed', ivy: true, windowColor: '#4c1d95', hasChimney: true, hasFences: false }
};

export const HouseExterior = ({ 
  wall = '#8f563b', 
  roof = '#5d3221', 
  hasChimney = true,
  flowerColor = '#f472b6',
  chimneyPos = 'right',
  windowColor = '#add8e6',
  ivy = true,
  awningColor = '#dc2626',
  hasAwning = false,
  wallTexture = 'none',
  doorColor = '#3e2723',
  hasFences = false,
  hasPots = false
}: HouseStyleProps) => {
  const roofLight = roof; 
  const roofDark = 'rgba(0,0,0,0.2)';

  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ overflow: 'visible' }}>
      <rect x="4" y="58" width="56" height="4" fill="black" opacity="0.1" />

      {/* Fences */}
      {hasFences && (
        <g fill="#5d4037" stroke="#3e2723" strokeWidth="0.5">
          {/* Left Fence */}
          <rect x="0" y="48" width="1.5" height="14" />
          <rect x="4" y="48" width="1.5" height="14" />
          <rect x="0" y="50" width="8" height="1.5" />
          <rect x="0" y="56" width="8" height="1.5" />
          {/* Right Fence */}
          <rect x="58.5" y="48" width="1.5" height="14" />
          <rect x="62.5" y="48" width="1.5" height="14" />
          <rect x="56" y="50" width="8" height="1.5" />
          <rect x="56" y="56" width="8" height="1.5" />
        </g>
      )}

      {/* Chimney */}
      {hasChimney && (
        <g transform={chimneyPos === 'left' ? 'translate(-32, 0)' : ''}>
          <rect x="44" y="10" width="8" height="12" fill="#555" stroke="#333" strokeWidth="1" />
          <rect x="43" y="10" width="10" height="2" fill="#444" />
        </g>
      )}

      {/* Roof */}
      <g>
        <path d="M32 4 L62 32 L32 32 Z" fill={roofDark} />
        <path d="M32 4 L32 32 L2 32 Z" fill={roofLight} />
        <rect x="2" y="30" width="60" height="3" fill="rgba(0,0,0,0.3)" />
        <path d="M2 32 L32 4 L62 32" fill="none" stroke="#3e2723" strokeWidth="1.5" />
      </g>

      {/* Main Body */}
      <rect x="8" y="32" width="48" height="30" fill={wall} stroke="#3e2723" strokeWidth="1" />
      
      {/* Wall Texture Overlay */}
      {wallTexture === 'stone' && (
        <g opacity="0.15">
          <rect x="12" y="36" width="6" height="3" fill="black" />
          <rect x="40" y="36" width="6" height="3" fill="black" />
          <rect x="25" y="45" width="6" height="3" fill="black" />
          <rect x="15" y="55" width="6" height="3" fill="black" />
          <rect x="45" y="55" width="6" height="3" fill="black" />
        </g>
      )}
      {wallTexture === 'wood' && (
        <g opacity="0.1">
          {[...Array(5)].map((_, i) => (
            <rect key={i} x="8" y={35 + i * 5} width="48" height="1" fill="black" />
          ))}
        </g>
      )}
      
      {ivy && (
        <g fill="#2d5a27" opacity="0.8">
          <rect x="10" y="34" width="3" height="4" rx="1" />
          <circle cx="54" cy="51" r="1.5" />
        </g>
      )}

      {/* Windows */}
      <g>
        <rect x="14" y="38" width="8" height="8" fill="#333" rx="1" />
        <rect x="15" y="39" width="6" height="6" fill={windowColor} />
        <rect x="42" y="38" width="8" height="8" fill="#333" rx="1" />
        <rect x="43" y="39" width="6" height="6" fill={windowColor} />
        
        {/* Window Awnings */}
        {hasAwning && (
          <>
            <g transform="translate(13, 36)">
              <rect width="10" height="4" fill={awningColor} />
              <rect x="2" width="2" height="4" fill="white" opacity="0.3" />
              <rect x="6" width="2" height="4" fill="white" opacity="0.3" />
            </g>
            <g transform="translate(41, 36)">
              <rect width="10" height="4" fill={awningColor} />
              <rect x="2" width="2" height="4" fill="white" opacity="0.3" />
              <rect x="6" width="2" height="4" fill="white" opacity="0.3" />
            </g>
          </>
        )}
      </g>

      {/* Door */}
      <g>
        <rect x="21" y="36" width="22" height="26" fill="#3e2723" stroke="#1a0f0a" strokeWidth="0.5" />
        <rect x="23" y="38" width="18" height="24" fill={doorColor} stroke="#3e2723" strokeWidth="1" />
        <circle cx="37" cy="51" r="2" fill="#ffd700" stroke="#8b4513" strokeWidth="0.5" />
      </g>

      {/* Flower Pots flaking the door */}
      {hasPots && (
        <g>
          {/* Left Pot */}
          <rect x="16" y="52" width="4" height="6" fill="#8d5b3e" stroke="#3e2723" strokeWidth="0.5" />
          <rect x="15" y="52" width="6" height="1.5" fill="#a67c52" />
          <circle cx="18" cy="50" r="1.5" fill={flowerColor} />
          <rect x="17.5" y="50.5" width="1" height="2" fill="#2d5a27" />
          
          {/* Right Pot */}
          <rect x="44" y="52" width="4" height="6" fill="#8d5b3e" stroke="#3e2723" strokeWidth="0.5" />
          <rect x="43" y="52" width="6" height="1.5" fill="#a67c52" />
          <circle cx="46" cy="50" r="1.5" fill={flowerColor} />
          <rect x="45.5" y="50.5" width="1" height="2" fill="#2d5a27" />
        </g>
      )}

      {/* Decorative Floor Flowers */}
      <g>
        <rect x="10" y="58" width="3" height="4" fill="#8b4513" opacity="0.4" />
        <circle cx="11.5" cy="57" r="1" fill={flowerColor} opacity="0.8" />
        <rect x="51" y="58" width="3" height="4" fill="#8b4513" opacity="0.4" />
        <circle cx="52.5" cy="57" r="1" fill={flowerColor} opacity="0.8" />
      </g>
    </svg>
  );
};
