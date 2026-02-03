
import React from 'react';
import { PlayerAppearance, NPCData, TileType } from './types';

export const FloorTile = ({ type }: { type: TileType }) => {
  const colors: any = { grass: '#5fa052', water: '#4fa4b8', floor: '#d9a066', wall: '#757161' };
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16">
      <rect width="16" height="16" fill={colors[type] || '#111'} />
      {/* Detalle de hierba */}
      {type === 'grass' && (
        <>
          <rect x="2" y="3" width="1" height="1" fill="#4b8141" />
          <rect x="10" y="8" width="1" height="1" fill="#4b8141" />
          <rect x="13" y="2" width="1" height="1" fill="#4b8141" />
          <rect x="5" y="12" width="1" height="1" fill="#4b8141" />
        </>
      )}
      {/* Detalle de agua */}
      {type === 'water' && (
        <>
          <rect x="2" y="4" width="6" height="1" fill="#ffffff" opacity="0.3" />
          <rect x="8" y="10" width="4" height="1" fill="#ffffff" opacity="0.3" />
        </>
      )}
      {/* Rediseño de la fuente: Base ancha, pilar y agua azul */}
      {type === 'fountain' && (
        <g transform="scale(0.5) translate(8, 8)">
          {/* Sombra base */}
          <rect x="2" y="12" width="12" height="4" fill="#333" opacity="0.3" />
          {/* Base de piedra ancha */}
          <rect x="1" y="10" width="14" height="4" fill="#999" stroke="#666" strokeWidth="0.5" />
          <rect x="2" y="11" width="12" height="1" fill="#bbb" />
          {/* Pilar central */}
          <rect x="6" y="2" width="4" height="9" fill="#999" stroke="#666" strokeWidth="0.5" />
          <rect x="6.5" y="2" width="1" height="9" fill="#bbb" />
          {/* Agua azul en la base */}
          <rect x="2" y="10.5" width="12" height="1" fill="#3b82f6" />
          {/* Agua cayendo del pilar */}
          <rect x="5" y="4" width="1" height="7" fill="#60a5fa" opacity="0.8">
             <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite" />
          </rect>
          <rect x="10" y="4" width="1" height="7" fill="#60a5fa" opacity="0.8">
             <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite" />
          </rect>
          {/* Brillo del agua arriba */}
          <rect x="6" y="1" width="4" height="2" fill="#3b82f6" />
          <rect x="7" y="1" width="2" height="1" fill="white" opacity="0.6" />
        </g>
      )}
    </svg>
  );
};

export const PrincessSprite = ({ direction, appearance }: { direction: string, appearance: PlayerAppearance }) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24">
    {/* Cabello trasero */}
    <rect x="6" y="8" width="12" height="10" fill={appearance.hairColor} />
    
    {/* Vestido de princesa con capas */}
    <rect x="5" y="14" width="14" height="9" fill={appearance.dressColor} rx="2" />
    <rect x="5" y="21" width="14" height="2" fill="black" opacity="0.2" />
    <rect x="9" y="14" width="6" height="9" fill="white" opacity="0.2" />
    
    {/* Piel */}
    <rect x="8" y="5" width="8" height="9" fill="#FFE0BD" rx="1" />
    
    {/* Ojos detallados */}
    <rect x="10" y="8" width="1.5" height="2" fill="black" />
    <rect x="13" y="8" width="1.5" height="2" fill="black" />
    <rect x="10" y="8" width="0.5" height="0.5" fill="white" />
    <rect x="13" y="8" width="0.5" height="0.5" fill="white" />
    
    {/* Rubor */}
    <rect x="9" y="11" width="2" height="1" fill="#ff9999" opacity="0.6" />
    <rect x="14" y="11" width="2" height="1" fill="#ff9999" opacity="0.6" />
    
    {/* Cabello delantero */}
    <rect x="7" y="4" width="10" height="4" fill={appearance.hairColor} />
    <rect x="7" y="4" width="2" height="8" fill={appearance.hairColor} />
    <rect x="15" y="4" width="2" height="8" fill={appearance.hairColor} />
    
    {/* Corona de oro con joya */}
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
      {/* Cuerpo */}
      <rect x="6" y="12" width="12" height="11" fill={isMerchant ? '#7c2d12' : isElder ? '#4b5563' : '#1e3a8a'} rx="1" />
      <rect x="9" y="12" width="6" height="11" fill="white" opacity="0.1" />
      
      {/* Cara */}
      <rect x="8" y="5" width="8" height="8" fill="#FFE0BD" rx="1" />
      
      {/* Ojos */}
      <rect x="10" y="8" width="1.5" height="1.5" fill="black" />
      <rect x="13" y="8" width="1.5" height="1.5" fill="black" />
      
      {/* Detalles específicos */}
      {isElder && (
        <>
          <rect x="7" y="4" width="10" height="3" fill="#e5e7eb" /> {/* Pelo blanco */}
          <rect x="8" y="10" width="8" height="4" fill="#e5e7eb" /> {/* Barba */}
          <rect x="16" y="14" width="2" height="9" fill="#452719" /> {/* Bastón */}
        </>
      )}
      {isMerchant && (
        <>
          <rect x="7" y="4" width="10" height="2" fill="#452719" /> {/* Sombrero */}
          <rect x="6" y="14" width="3" height="4" fill="#fbbf24" /> {/* Bolsa de oro */}
          <rect x="8" y="20" width="8" height="2" fill="#fbbf24" /> {/* Detalles capa */}
        </>
      )}
      {!isElder && !isMerchant && <rect x="7" y="4" width="10" height="2" fill="#111" />}
    </svg>
  );
};

export const HouseExterior = ({ wall = '#8f563b', roof = '#5d3221' }) => (
  <svg viewBox="0 0 32 32" width="100%" height="100%">
    {/* Sombra proyectada */}
    <rect x="2" y="28" width="28" height="4" fill="black" opacity="0.1" />
    {/* Techo con textura de tejas */}
    <path d="M1 16 L16 2 L31 16 Z" fill={roof} stroke="#3e2723" strokeWidth="0.5" />
    <path d="M6 12 L16 5 L26 12" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
    <path d="M10 9 L16 6 L22 9" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
    
    {/* Fachada principal */}
    <rect x="4" y="16" width="24" height="15" fill={wall} stroke="#3e2723" strokeWidth="0.5" />
    <rect x="4" y="16" width="2" height="15" fill="black" opacity="0.1" />
    
    {/* Ventanas con marcos y brillo */}
    <rect x="7" y="19" width="6" height="6" fill="#333" rx="0.5" />
    <rect x="7.5" y="19.5" width="5" height="5" fill="#add8e6" />
    <rect x="8" y="20" width="1" height="1" fill="white" opacity="0.8" />
    
    <rect x="19" y="19" width="6" height="6" fill="#333" rx="0.5" />
    <rect x="19.5" y="19.5" width="5" height="5" fill="#add8e6" />
    <rect x="20" y="20" width="1" height="1" fill="white" opacity="0.8" />
    
    {/* Puerta de madera con pomo dorado */}
    <rect x="13" y="23" width="6" height="8" fill="#5d4037" stroke="#3e2723" strokeWidth="0.5" />
    <rect x="14" y="23" width="1" height="8" fill="black" opacity="0.1" />
    <circle cx="17.5" cy="27" r="0.8" fill="gold" />
  </svg>
);
