
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
  wallTexture?: 'none' | 'stone' | 'timber';
  doorColor?: string;
  hasFences?: boolean;
  hasPots?: boolean;
  roofType?: 'classic' | 'flat' | 'steep' | 'thatch';
  stoneBase?: boolean;
}

export const HOUSE_STYLES: Record<string, HouseStyle> = {
  basic: { 
    wall: '#f3e5ab', // Parchment color
    roof: '#5d3221', 
    wallTexture: 'timber', 
    stoneBase: true,
    doorColor: '#3e2723', 
    roofType: 'classic' 
  },
  royal: { 
    wall: '#e2e8f0', 
    roof: '#1e40af', 
    flowerColor: '#fbbf24', 
    hasChimney: true, 
    chimneyPos: 'right', 
    wallTexture: 'stone',
    doorColor: '#fbbf24', 
    hasFences: true, 
    hasPots: true, 
    roofType: 'steep' 
  },
  shop: { 
    wall: '#d1b48c', 
    roof: '#8b4513', 
    hasAwning: true, 
    awningColor: '#7c2d12', 
    doorColor: '#5d4037', 
    wallTexture: 'timber',
    roofType: 'flat' 
  },
  tavern: { 
    wall: '#8b4513', 
    roof: '#4b2510', 
    wallTexture: 'timber', 
    stoneBase: true,
    hasChimney: true, 
    chimneyPos: 'left', 
    doorColor: '#2b1408',
    roofType: 'steep'
  },
  cottage: { 
    wall: '#f5f5dc', 
    roof: '#c2b280', // Thatch color
    ivy: true, 
    doorColor: '#5d4037', 
    roofType: 'thatch',
    hasPots: true
  }
};

export const HouseModel = ({ style }: { style: HouseStyle }) => {
  const roofLight = style.roof || '#5d3221'; 
  const roofDark = 'rgba(0,0,0,0.3)';

  const renderRoof = () => {
    switch (style.roofType) {
      case 'flat':
        return (
          <g>
            <rect x="2" y="24" width="60" height="8" fill={roofLight} stroke="#3e2723" strokeWidth="1" />
            <line x1="2" y1="28" x2="62" y2="28" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
          </g>
        );
      case 'steep':
        return (
          <g>
            <path d="M32 0 L62 32 L2 32 Z" fill={roofLight} />
            <path d="M32 0 L62 32 L32 32 Z" fill={roofDark} />
            <path d="M2 32 L32 0 L62 32" fill="none" stroke="#3e2723" strokeWidth="1.5" />
          </g>
        );
      case 'thatch':
        return (
          <g>
            <path d="M32 4 L60 32 L4 32 Z" fill={roofLight} />
            <path d="M32 4 L60 32 L32 32 Z" fill={roofDark} />
            <path d="M4 32 L32 4 L60 32" fill="none" stroke="#3e2723" strokeWidth="1" />
            <g opacity="0.3">
              <line x1="20" y1="20" x2="25" y2="25" stroke="black" />
              <line x1="40" y1="20" x2="35" y2="25" stroke="black" />
              <line x1="30" y1="12" x2="30" y2="18" stroke="black" />
            </g>
          </g>
        );
      default:
        return (
          <g>
            <path d="M32 4 L62 32 L2 32 Z" fill={roofLight} />
            <path d="M32 4 L62 32 L32 32 Z" fill={roofDark} />
            <path d="M2 32 L32 4 L62 32" fill="none" stroke="#3e2723" strokeWidth="1.5" />
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ overflow: 'visible' }}>
      {/* Shadow */}
      <ellipse cx="32" cy="62" rx="28" ry="4" fill="black" opacity="0.1" />

      {/* Chimney */}
      {style.hasChimney && (
        <g transform={style.chimneyPos === 'left' ? 'translate(-32, 0)' : ''}>
          <rect x="44" y="10" width="8" height="14" fill="#4a4a4a" stroke="#222" strokeWidth="1" />
          <rect x="43" y="10" width="10" height="3" fill="#333" />
          <circle cx="48" cy="8" r="2.5" fill="#aaa" opacity="0.6">
            <animate attributeName="cy" from="8" to="-8" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* Roof */}
      {renderRoof()}

      {/* Main Body */}
      <rect x="8" y="32" width="48" height="30" fill={style.wall} stroke="#3e2723" strokeWidth="1" />
      
      {/* Stone Base */}
      {style.stoneBase && (
        <g>
          <rect x="8" y="52" width="48" height="10" fill="#757161" stroke="#3e2723" strokeWidth="0.5" />
          <g opacity="0.2">
             <rect x="10" y="54" width="3" height="2" fill="black" />
             <rect x="18" y="57" width="4" height="2" fill="black" />
             <rect x="40" y="55" width="2" height="2" fill="black" />
          </g>
        </g>
      )}

      {/* Timber Texture (Half-timbering) */}
      {style.wallTexture === 'timber' && (
        <g stroke="#3e2723" strokeWidth="1.5" opacity="0.8">
          <line x1="8" y1="32" x2="8" y2="62" />
          <line x1="56" y1="32" x2="56" y2="62" />
          <line x1="32" y1="32" x2="32" y2="62" />
          <line x1="8" y1="32" x2="32" y2="44" />
          <line x1="56" y1="32" x2="32" y2="44" />
          <line x1="8" y1="62" x2="32" y2="44" />
          <line x1="56" y1="62" x2="32" y2="44" />
        </g>
      )}

      {/* Stone Texture */}
      {style.wallTexture === 'stone' && (
        <g opacity="0.1">
          <rect x="12" y="35" width="4" height="2" fill="black" />
          <rect x="22" y="45" width="5" height="3" fill="black" />
          <rect x="45" y="38" width="4" height="2" fill="black" />
          <rect x="50" y="50" width="3" height="2" fill="black" />
        </g>
      )}

      {/* Ivy */}
      {style.ivy && (
        <path d="M8 40 Q15 45 10 55 Q20 58 12 62" fill="none" stroke="#2d5a27" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      )}

      {/* Awning for shops */}
      {style.hasAwning && (
        <g>
          <rect x="15" y="32" width="34" height="8" fill={style.awningColor || '#dc2626'} stroke="#3e2723" strokeWidth="1" />
          <rect x="15" y="32" width="34" height="2" fill="rgba(255,255,255,0.2)" />
        </g>
      )}

      {/* Medieval Pointed Arched Windows (Gothic Style) */}
      <g>
        {/* Left Window */}
        <path d="M12 38 Q16 30 20 38 L20 48 L12 48 Z" fill="#333" />
        <path d="M13 39 Q16 32 19 39 L19 47 L13 47 Z" fill={style.windowColor || '#add8e6'} />
        <line x1="16" y1="33" x2="16" y2="47" stroke="#333" strokeWidth="0.5" opacity="0.5" />
        <line x1="13" y1="42" x2="19" y2="42" stroke="#333" strokeWidth="0.5" opacity="0.5" />

        {/* Right Window */}
        <path d="M44 38 Q48 30 52 38 L52 48 L44 48 Z" fill="#333" />
        <path d="M45 39 Q48 32 51 39 L51 47 L45 47 Z" fill={style.windowColor || '#add8e6'} />
        <line x1="48" y1="33" x2="48" y2="47" stroke="#333" strokeWidth="0.5" opacity="0.5" />
        <line x1="45" y1="42" x2="51" y2="42" stroke="#333" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* Medieval Arched Door - Scaled to character */}
      <g>
        {/* Door Frame */}
        <path d="M21 38 Q32 26 43 38 L43 62 L21 62 Z" fill="#2b1408" opacity="0.3" />
        {/* Actual Door */}
        <path d="M22 40 Q32 28 42 40 L42 62 L22 62 Z" fill={style.doorColor || '#3e2723'} stroke="#222" strokeWidth="1" />
        
        {/* Iron Bands */}
        <line x1="22" y1="46" x2="42" y2="46" stroke="#4a4a4a" strokeWidth="1.5" strokeDasharray="2,2" />
        <line x1="22" y1="56" x2="42" y2="56" stroke="#4a4a4a" strokeWidth="1.5" strokeDasharray="2,2" />

        {/* Door Handle (Medieval Ring) */}
        <g transform="translate(38, 51)">
          <circle cx="0" cy="0" r="2.2" fill="#222" />
          <circle cx="0" cy="0" r="1.4" fill="#ffd700" stroke="#8b4513" strokeWidth="0.5" />
          <circle cx="0" cy="2" r="1.5" fill="none" stroke="#ffd700" strokeWidth="0.8" />
        </g>
      </g>
    </svg>
  );
};
