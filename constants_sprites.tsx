
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
      
      {/* Detalle de hierba natural (solo para tiles de grass) */}
      {type === 'grass' && (
        <>
          <rect x="2" y="3" width="1" height="1" fill="#4b8141" />
          <rect x="10" y="8" width="1" height="1" fill="#4b8141" />
          <rect x="13" y="2" width="1" height="1" fill="#4b8141" />
          <rect x="5" y="12" width="1" height="1" fill="#4b8141" />
        </>
      )}

      {/* Detalle de camino SÓLIDO y CONECTADO */}
      {(type === 'path' || type === 'fountain') && (
        <>
          {/* Textura de tierra/arena base */}
          <rect x="0" y="0" width="16" height="16" fill="#d1b48c" />
          
          {/* Piedras incrustadas (imperfecciones internas) */}
          <rect x="2" y="2" width="3" height="2" fill="#bc9a6c" opacity="0.4" />
          <rect x="10" y="3" width="2" height="2" fill="#bc9a6c" opacity="0.4" />
          <rect x="6" y="7" width="4" height="3" fill="#bc9a6c" opacity="0.3" />
          <rect x="12" y="10" width="2" height="2" fill="#bc9a6c" opacity="0.4" />
          <rect x="3" y="12" width="2" height="1" fill="#bc9a6c" opacity="0.4" />
          
          {/* Bordes sutiles (puntos de hierba pequeños para no crear huecos) */}
          <rect x="0" y="0" width="1" height="1" fill="#5fa052" />
          <rect x="15" y="0" width="1" height="1" fill="#5fa052" />
          <rect x="0" y="15" width="1" height="1" fill="#5fa052" />
          <rect x="15" y="15" width="1" height="1" fill="#5fa052" />
          
          {/* Pequeñas motas de hierba aleatorias en los laterales (no en esquinas críticas) */}
          <rect x="7" y="0" width="2" height="1" fill="#5fa052" opacity="0.2" />
          <rect x="0" y="6" width="1" height="2" fill="#5fa052" opacity="0.2" />
          <rect x="15" y="8" width="1" height="2" fill="#5fa052" opacity="0.2" />
        </>
      )}

      {/* Detalle de agua animada */}
      {type === 'water' && (
        <>
          <rect x="2" y="4" width="6" height="1" fill="#ffffff" opacity="0.3" />
          <rect x="8" y="10" width="4" height="1" fill="#ffffff" opacity="0.3" />
        </>
      )}

      {/* Fuente GIGANTE (Tamaño casa) */}
      {type === 'fountain' && (
        <g transform="translate(-8, -12) scale(2.2)">
          <ellipse cx="8" cy="14" rx="11" ry="3.5" fill="#000" opacity="0.25" />
          <rect x="-2" y="10" width="20" height="5" fill="#999" stroke="#444" strokeWidth="0.5" />
          <rect x="-1" y="10.5" width="18" height="1.5" fill="#bbb" />
          <rect x="6" y="-5" width="4" height="16" fill="#888" stroke="#444" strokeWidth="0.5" />
          <rect x="6.5" y="-5" width="1" height="16" fill="#aaa" />
          <rect x="-1" y="10.5" width="18" height="3.5" fill="#3b82f6" />
          <rect x="0" y="10.8" width="5" height="0.5" fill="white" opacity="0.5" />
          <g>
             <rect x="1.5" y="1" width="2.5" height="10" fill="#60a5fa" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.2s" repeatCount="indefinite" />
             </rect>
             <rect x="12" y="1" width="2.5" height="10" fill="#60a5fa" opacity="0.8">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.2s" repeatCount="indefinite" />
             </rect>
          </g>
          <path d="M4 -3 Q8 -10 12 -3" fill="none" stroke="#60a5fa" strokeWidth="2.5" opacity="0.9">
             <animate attributeName="stroke-width" values="2;4;2" dur="0.9s" repeatCount="indefinite" />
          </path>
          <rect x="5.5" y="-6" width="5" height="3" fill="#2563eb" rx="1" />
          <rect x="6.5" y="-5.5" width="3" height="1" fill="white" opacity="0.7" />
          <circle cx="3" cy="11" r="0.6" fill="white">
            <animate attributeName="cy" values="11;9;11" dur="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="13" cy="11" r="0.6" fill="white">
            <animate attributeName="cy" values="11;10;11" dur="0.6s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  );
};

export const PrincessSprite = ({ direction, appearance }: { direction: string, appearance: PlayerAppearance }) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24">
    <rect x="6" y="8" width="12" height="10" fill={appearance.hairColor} />
    <rect x="5" y="14" width="14" height="9" fill={appearance.dressColor} rx="2" />
    <rect x="5" y="21" width="14" height="2" fill="black" opacity="0.2" />
    <rect x="9" y="14" width="6" height="9" fill="white" opacity="0.2" />
    <rect x="8" y="5" width="8" height="9" fill="#FFE0BD" rx="1" />
    <rect x="10" y="8" width="1.5" height="2" fill="black" />
    <rect x="13" y="8" width="1.5" height="2" fill="black" />
    <rect x="10" y="8" width="0.5" height="0.5" fill="white" />
    <rect x="13" y="8" width="0.5" height="0.5" fill="white" />
    <rect x="9" y="11" width="2" height="1" fill="#ff9999" opacity="0.6" />
    <rect x="14" y="11" width="2" height="1" fill="#ff9999" opacity="0.6" />
    <rect x="7" y="4" width="10" height="4" fill={appearance.hairColor} />
    <rect x="7" y="4" width="2" height="8" fill={appearance.hairColor} />
    <rect x="15" y="4" width="2" height="8" fill={appearance.hairColor} />
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
      <rect x="9" y="12" width="6" height="11" fill="white" opacity="0.1" />
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
      {isMerchant && (
        <>
          <rect x="7" y="4" width="10" height="2" fill="#452719" />
          <rect x="6" y="14" width="3" height="4" fill="#fbbf24" />
          <rect x="8" y="20" width="8" height="2" fill="#fbbf24" />
        </>
      )}
      {!isElder && !isMerchant && <rect x="7" y="4" width="10" height="2" fill="#111" />}
    </svg>
  );
};

export const HouseExterior = ({ wall = '#8f563b', roof = '#5d3221' }) => (
  <svg viewBox="0 0 32 32" width="100%" height="100%">
    <rect x="2" y="28" width="28" height="4" fill="black" opacity="0.1" />
    <path d="M1 16 L16 2 L31 16 Z" fill={roof} stroke="#3e2723" strokeWidth="0.5" />
    <path d="M6 12 L16 5 L26 12" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
    <path d="M10 9 L16 6 L22 9" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
    <rect x="4" y="16" width="24" height="15" fill={wall} stroke="#3e2723" strokeWidth="0.5" />
    <rect x="4" y="16" width="2" height="15" fill="black" opacity="0.1" />
    <rect x="7" y="19" width="6" height="6" fill="#333" rx="0.5" />
    <rect x="7.5" y="19.5" width="5" height="5" fill="#add8e6" />
    <rect x="8" y="20" width="1" height="1" fill="white" opacity="0.8" />
    <rect x="19" y="19" width="6" height="6" fill="#333" rx="0.5" />
    <rect x="19.5" y="19.5" width="5" height="5" fill="#add8e6" />
    <rect x="20" y="20" width="1" height="1" fill="white" opacity="0.8" />
    <rect x="13" y="23" width="6" height="8" fill="#5d4037" stroke="#3e2723" strokeWidth="0.5" />
    <rect x="14" y="23" width="1" height="8" fill="black" opacity="0.1" />
    <circle cx="17.5" cy="27" r="0.8" fill="gold" />
  </svg>
);
