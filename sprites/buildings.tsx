
import React from 'react';

export interface HouseStyle {
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

export const HOUSE_STYLES: Record<string, HouseStyle> = {
  basic: { wall: '#8f563b', roof: '#5d3221', flowerColor: '#f472b6', ivy: true, doorColor: '#3e2723', hasPots: true },
  royal: { wall: '#4c1d95', roof: '#fbbf24', flowerColor: '#c084fc', hasChimney: true, chimneyPos: 'right', hasAwning: true, awningColor: '#7c3aed', doorColor: '#fbbf24', hasFences: true, hasPots: true },
  shop: { wall: '#fef3c7', roof: '#f97316', flowerColor: '#fbbf24', windowColor: '#fbbf24', hasChimney: false, hasAwning: true, awningColor: '#dc2626', hasPots: true },
  noble: { wall: '#757161', roof: '#3b82f6', flowerColor: '#60a5fa', hasChimney: true, chimneyPos: 'left', windowColor: '#e0f2fe', doorColor: '#1e40af', hasFences: true },
};

export const HouseModel = ({ style }: { style: HouseStyle }) => {
  const roofLight = style.roof || '#5d3221'; 
  const roofDark = 'rgba(0,0,0,0.2)';

  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ overflow: 'visible' }}>
      <rect x="4" y="58" width="56" height="4" fill="black" opacity="0.1" />

      {/* Fences */}
      {style.hasFences && (
        <g fill="#5d4037" stroke="#3e2723" strokeWidth="0.5">
          <rect x="0" y="48" width="1.5" height="14" />
          <rect x="4" y="48" width="1.5" height="14" />
          <rect x="0" y="50" width="8" height="1.5" />
          <rect x="0" y="56" width="8" height="1.5" />
          <rect x="58.5" y="48" width="1.5" height="14" />
          <rect x="62.5" y="48" width="1.5" height="14" />
          <rect x="56" y="50" width="8" height="1.5" />
          <rect x="56" y="56" width="8" height="1.5" />
        </g>
      )}

      {/* Chimney */}
      {style.hasChimney && (
        <g transform={style.chimneyPos === 'left' ? 'translate(-32, 0)' : ''}>
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
      <rect x="8" y="32" width="48" height="30" fill={style.wall} stroke="#3e2723" strokeWidth="1" />
      
      {/* Windows */}
      <g>
        <rect x="14" y="38" width="8" height="8" fill="#333" rx="1" />
        <rect x="15" y="39" width="6" height="6" fill={style.windowColor || '#add8e6'} />
        <rect x="42" y="38" width="8" height="8" fill="#333" rx="1" />
        <rect x="43" y="39" width="6" height="6" fill={style.windowColor || '#add8e6'} />
      </g>

      {/* Door */}
      <g>
        <rect x="23" y="38" width="18" height="24" fill={style.doorColor || '#3e2723'} stroke="#3e2723" strokeWidth="1" />
        <circle cx="37" cy="51" r="2" fill="#ffd700" stroke="#8b4513" strokeWidth="0.5" />
      </g>

      {/* Pots */}
      {style.hasPots && (
        <g>
          <rect x="16" y="52" width="4" height="6" fill="#8d5b3e" stroke="#3e2723" strokeWidth="0.5" />
          <circle cx="18" cy="50" r="1.5" fill={style.flowerColor || '#f472b6'} />
          <rect x="44" y="52" width="4" height="6" fill="#8d5b3e" stroke="#3e2723" strokeWidth="0.5" />
          <circle cx="46" cy="50" r="1.5" fill={style.flowerColor || '#f472b6'} />
        </g>
      )}
    </svg>
  );
};
