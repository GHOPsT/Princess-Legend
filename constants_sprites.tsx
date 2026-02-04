
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
      
      {/* Detalle de hierba natural */}
      {type === 'grass' && (
        <>
          <rect x="2" y="3" width="1" height="1" fill="#4b8141" />
          <rect x="10" y="8" width="1" height="1" fill="#4b8141" />
          <rect x="13" y="2" width="1" height="1" fill="#4b8141" />
          <rect x="5" y="12" width="1" height="1" fill="#4b8141" />
        </>
      )}

      {/* Detalle de camino */}
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
          <rect x="0" y="15" width="1" height="1" fill="#5fa052" />
          <rect x="15" y="15" width="1" height="1" fill="#5fa052" />
        </>
      )}

      {/* Detalle de agua animada */}
      {type === 'water' && (
        <>
          <rect x="2" y="4" width="6" height="1" fill="#ffffff" opacity="0.3" />
          <rect x="8" y="10" width="4" height="1" fill="#ffffff" opacity="0.3" />
        </>
      )}

      {/* Fuente GIGANTE - Perspectiva Corregida */}
      {type === 'fountain' && (
        <g transform="translate(-8, -14) scale(2.2)">
          <ellipse cx="8" cy="14" rx="11" ry="4" fill="#000" opacity="0.2" />
          <rect x="-2" y="8" width="20" height="3" fill="#666" stroke="#333" strokeWidth="0.5" />
          <rect x="-1" y="8.5" width="18" height="5.5" fill="#1e40af" />
          <g fill="white" opacity="0.6">
            <rect x="2" y="10" width="0.5" height="0.5"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></rect>
            <rect x="14" y="12" width="0.5" height="0.5"><animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" /></rect>
          </g>
          <rect x="5.5" y="9" width="6" height="4" fill="#000" opacity="0.25" />
          <rect x="4.5" y="4" width="7" height="7" fill="#555" stroke="#333" strokeWidth="0.5" /> 
          <rect x="5.5" y="-2" width="5" height="7" fill="#777" stroke="#444" strokeWidth="0.5" />
          <rect x="3.5" y="-4" width="9" height="2" fill="#888" stroke="#333" strokeWidth="0.5" rx="0.5" />
          <rect x="4" y="-3.5" width="8" height="1" fill="#3b82f6" opacity="0.8" />
          <rect x="-2" y="11" width="20" height="4" fill="#888" stroke="#333" strokeWidth="0.5" />
          <rect x="-1.5" y="11.2" width="19" height="1" fill="#aaa" />
          <g>
             <rect x="2.5" y="-2" width="1.2" height="12" fill="#60a5fa" opacity="0.6" />
             <rect x="12.3" y="-2" width="1.2" height="12" fill="#60a5fa" opacity="0.6" />
             <rect x="4.8" y="-2" width="0.8" height="11" fill="#3b82f6" opacity="0.8" />
             <rect x="10.4" y="-2" width="0.8" height="11" fill="#3b82f6" opacity="0.8" />
          </g>
          <path d="M6.5 -5 Q8 -12 9.5 -5" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" strokeLinecap="round">
             <animate attributeName="stroke-dashoffset" values="6;0" dur="0.3s" repeatCount="indefinite" />
          </path>
          <g opacity="0.5" fill="none" stroke="white" strokeWidth="0.5">
            <ellipse cx="8" cy="11" rx="3.5" ry="1">
               <animate attributeName="rx" values="3.5;6" dur="2s" repeatCount="indefinite" />
               <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
            </ellipse>
          </g>
          <g fill="white" opacity="0.6">
            <circle cx="3.1" cy="11" r="1.5"><animate attributeName="r" values="1;2.2;1" dur="0.3s" repeatCount="indefinite" /></circle>
            <circle cx="12.9" cy="11" r="1.5"><animate attributeName="r" values="1;2.2;1" dur="0.35s" repeatCount="indefinite" /></circle>
          </g>
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

export const HouseExterior = ({ wall = '#8f563b', roof = '#5d3221', hasChimney = true }) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ overflow: 'visible' }}>
    {/* Sombras en el suelo */}
    <rect x="4" y="58" width="56" height="4" fill="black" opacity="0.1" />

    {/* Chimenea con Humo */}
    {hasChimney && (
      <g>
        <rect x="44" y="10" width="8" height="12" fill="#555" stroke="#333" strokeWidth="1" />
        <rect x="43" y="10" width="10" height="2" fill="#444" />
        {/* Humo Animado */}
        <circle cx="48" cy="6" r="2" fill="#aaa" opacity="0.6">
          <animate attributeName="cy" values="6;-10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="4" r="1.5" fill="#ccc" opacity="0.4">
          <animate attributeName="cy" values="4;-15" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    )}

    {/* Tejado con textura de tejas */}
    <path d="M2 32 L32 4 L62 32 Z" fill={roof} stroke="#3e2723" strokeWidth="1" />
    <g opacity="0.3">
      <path d="M10 24 L54 24" stroke="black" strokeWidth="0.5" />
      <path d="M16 18 L48 18" stroke="black" strokeWidth="0.5" />
      <path d="M22 12 L42 12" stroke="black" strokeWidth="0.5" />
    </g>

    {/* Cuerpo de la casa (Tablones de madera) */}
    <rect x="8" y="32" width="48" height="30" fill={wall} stroke="#3e2723" strokeWidth="1" />
    <g opacity="0.1">
      {[...Array(5)].map((_, i) => (
        <rect key={i} x="8" y={32 + i * 6} width="48" height="1" fill="black" />
      ))}
    </g>

    {/* Ventanas con marcos y brillo */}
    <g>
      {/* Ventana Izquierda */}
      <rect x="14" y="38" width="10" height="10" fill="#333" rx="1" />
      <rect x="15" y="39" width="8" height="8" fill="#add8e6" />
      <rect x="15" y="43" width="8" height="0.5" fill="#333" />
      <rect x="19" y="39" width="0.5" height="8" fill="#333" />
      <rect x="16" y="40" width="2" height="2" fill="white" opacity="0.5" />
      {/* Maceta */}
      <rect x="13" y="48" width="12" height="2" fill="#8b4513" />
      <circle cx="15" cy="47.5" r="1" fill="#f472b6" />
      <circle cx="23" cy="47.5" r="1" fill="#f472b6" />
    </g>

    <g>
      {/* Ventana Derecha */}
      <rect x="40" y="38" width="10" height="10" fill="#333" rx="1" />
      <rect x="41" y="39" width="8" height="8" fill="#add8e6" />
      <rect x="41" y="43" width="8" height="0.5" fill="#333" />
      <rect x="45" y="39" width="0.5" height="8" fill="#333" />
      {/* Contraventanas */}
      <rect x="37" y="38" width="3" height="10" fill="#5d3221" />
      <rect x="50" y="38" width="3" height="10" fill="#5d3221" />
    </g>

    {/* Puerta GIGANTE (Escalada al personaje) */}
    <g>
      <rect x="25" y="42" width="14" height="20" fill="#5d4037" stroke="#3e2723" strokeWidth="1" />
      <rect x="26" y="42" width="2" height="20" fill="black" opacity="0.1" />
      {/* Pomo de oro */}
      <circle cx="36" cy="52" r="1.5" fill="gold" stroke="#b8860b" strokeWidth="0.5" />
      {/* Ventanita en la puerta */}
      <rect x="29" y="45" width="6" height="4" fill="#333" opacity="0.3" rx="0.5" />
    </g>
  </svg>
);
