
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

      {/* Fuente GIGANTE */}
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

export const HouseExterior = ({ wall = '#8f563b', roof = '#5d3221', hasChimney = true }) => {
  // Colores para el sombreado del tejado
  const roofLight = roof === '#5d3221' ? '#7a422e' : '#5a99ff'; // Ajuste simple basado en el base
  const roofDark = roof === '#5d3221' ? '#3e2723' : '#254a8a';

  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ overflow: 'visible' }}>
      {/* Sombras en el suelo */}
      <rect x="4" y="58" width="56" height="4" fill="black" opacity="0.1" />

      {/* Vallas */}
      <g fill="#5d4037" stroke="#3e2723" strokeWidth="0.5">
         <rect x="0" y="52" width="2" height="10" />
         <rect x="4" y="52" width="2" height="10" />
         <rect x="0" y="54" width="8" height="1.5" />
         <rect x="0" y="58" width="8" height="1.5" />
         <rect x="58" y="52" width="2" height="10" />
         <rect x="62" y="52" width="2" height="10" />
         <rect x="56" y="54" width="8" height="1.5" />
         <rect x="56" y="58" width="8" height="1.5" />
      </g>

      {/* Chimenea con Humo */}
      {hasChimney && (
        <g>
          <rect x="44" y="10" width="8" height="12" fill="#555" stroke="#333" strokeWidth="1" />
          <rect x="43" y="10" width="10" height="2" fill="#444" />
          <circle cx="48" cy="6" r="2" fill="#aaa" opacity="0.6">
            <animate attributeName="cy" values="6;-10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="2;5" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* TEJADO REDISEÑADO */}
      <g>
        {/* Lado en Sombra (Derecha) */}
        <path d="M32 4 L62 32 L32 32 Z" fill={roofDark} />
        {/* Lado en Luz (Izquierda) */}
        <path d="M32 4 L32 32 L2 32 Z" fill={roofLight} />
        
        {/* Alero (Borde inferior grueso) */}
        <rect x="2" y="30" width="60" height="3" fill="#2a1814" opacity="0.8" />
        
        {/* TEXTURA DE TEJAS ESCALONADAS */}
        <g opacity="0.4">
          {/* Fila 1 */}
          <rect x="28" y="8" width="8" height="4" rx="1" fill="black" />
          {/* Fila 2 */}
          <rect x="20" y="14" width="8" height="4" rx="1" fill="black" />
          <rect x="36" y="14" width="8" height="4" rx="1" fill="black" />
          {/* Fila 3 */}
          <rect x="12" y="20" width="8" height="4" rx="1" fill="black" />
          <rect x="28" y="20" width="8" height="4" rx="1" fill="black" />
          <rect x="44" y="20" width="8" height="4" rx="1" fill="black" />
          {/* Fila 4 */}
          <rect x="4" y="26" width="8" height="4" rx="1" fill="black" />
          <rect x="20" y="26" width="8" height="4" rx="1" fill="black" />
          <rect x="36" y="26" width="8" height="4" rx="1" fill="black" />
          <rect x="52" y="26" width="8" height="4" rx="1" fill="black" />
        </g>

        {/* Brillos individuales en las tejas */}
        <g opacity="0.3">
           <rect x="29" y="9" width="2" height="1" fill="white" />
           <rect x="21" y="15" width="2" height="1" fill="white" />
           <rect x="37" y="15" width="2" height="1" fill="white" />
           <rect x="13" y="21" width="2" height="1" fill="white" />
           <rect x="29" y="21" width="2" height="1" fill="white" />
        </g>

        {/* Cumbrera (Remate superior) */}
        <rect x="30" y="2" width="4" height="4" fill="#2a1814" rx="1" />
        <path d="M2 32 L32 4 L62 32" fill="none" stroke="#3e2723" strokeWidth="1.5" />
      </g>

      {/* Cuerpo de la casa */}
      <rect x="8" y="32" width="48" height="30" fill={wall} stroke="#3e2723" strokeWidth="1" />
      
      {/* Enredaderas */}
      <g fill="#2d5a27" opacity="0.8">
        <rect x="10" y="34" width="3" height="4" rx="1" />
        <rect x="9" y="37" width="4" height="3" rx="1" />
        <circle cx="54" cy="51" r="1.5" />
      </g>

      {/* Ventanas */}
      <g>
        <rect x="14" y="38" width="8" height="8" fill="#333" rx="1" />
        <rect x="15" y="39" width="6" height="6" fill="#add8e6" />
        <rect x="42" y="38" width="8" height="8" fill="#333" rx="1" />
        <rect x="43" y="39" width="6" height="6" fill="#add8e6" />
      </g>

      {/* Camino de piedra */}
      <g fill="#71717a" opacity="0.5">
         <rect x="25" y="62" width="14" height="2" />
         <circle cx="27" cy="63" r="1" />
         <circle cx="37" cy="63" r="1" />
      </g>

      {/* Puerta GIGANTE */}
      <g>
        <rect x="21" y="36" width="22" height="26" fill="#3e2723" stroke="#1a0f0a" strokeWidth="0.5" />
        <rect x="23" y="38" width="18" height="24" fill="#5d4037" stroke="#3e2723" strokeWidth="1" />
        <g>
          <circle cx="37.5" cy="51.5" r="2.8" fill="#b8860b" />
          <circle cx="37" cy="51" r="2.2" fill="#ffd700" stroke="#8b4513" strokeWidth="0.5">
             <animate attributeName="fill" values="#ffd700;#ffeb3b;#ffd700" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        <rect x="27" y="42" width="10" height="6" fill="#333" rx="0.5" />
        <rect x="28" y="43" width="8" height="4" fill="#add8e6" opacity="0.4" />
      </g>

      {/* Macetas */}
      <g>
        <rect x="16" y="56" width="5" height="6" fill="#8b4513" />
        <circle cx="17.5" cy="54" r="1.5" fill="#f472b6" />
        <rect x="43" y="56" width="5" height="6" fill="#8b4513" />
        <circle cx="44.5" cy="54" r="1.5" fill="#f472b6" />
      </g>
    </svg>
  );
};
