
import React from 'react';

export interface HouseStyle {
  buildingType?: 'house' | 'castle';
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
    buildingType: 'house',
    wall: '#f3e5ab', // Parchment color
    roof: '#5d3221', 
    wallTexture: 'timber', 
    stoneBase: true,
    doorColor: '#3e2723', 
    roofType: 'classic' 
  },
  royal: { 
    buildingType: 'house',
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
    buildingType: 'house',
    wall: '#d1b48c', 
    roof: '#8b4513', 
    hasAwning: true, 
    awningColor: '#7c2d12', 
    doorColor: '#5d4037', 
    wallTexture: 'timber',
    roofType: 'flat' 
  },
  tavern: { 
    buildingType: 'house',
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
    buildingType: 'house',
    wall: '#f5f5dc', 
    roof: '#c2b280', // Thatch color
    ivy: true, 
    doorColor: '#5d4037', 
    roofType: 'thatch',
    hasPots: true
  },
  castle: {
    buildingType: 'castle',
    wall: '#94a3b8', // Stone
    roof: '#1e293b', // Dark Slate
    doorColor: '#451a03',
    wallTexture: 'stone'
  }
};

export const HouseModel = ({ style }: { style: HouseStyle }) => {
  // --- CASTLE RENDER ---
  if (style.buildingType === 'castle') {
    return (
      <svg viewBox="0 0 120 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Shadow */}
        <ellipse cx="60" cy="95" rx="55" ry="10" fill="black" opacity="0.3" />

        {/* --- MAIN KEEP BODY --- */}
        <rect x="35" y="30" width="50" height="65" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
        {/* Battlements Center */}
        <path d="M35 30 L35 25 L40 25 L40 30 L45 30 L45 25 L50 25 L50 30 L55 30 L55 25 L60 25 L60 30 L65 30 L65 25 L70 25 L70 30 L75 30 L75 25 L80 25 L80 30 L85 30 L85 25 L85 30 Z" fill="#64748b" stroke="#1e293b" strokeWidth="1" />

        {/* --- LEFT TOWER --- */}
        <rect x="10" y="20" width="30" height="75" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
        {/* Left Tower Roof */}
        <path d="M8 20 L25 -5 L42 20 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
        {/* Left Tower Window */}
        <rect x="22" y="35" width="6" height="12" rx="3" fill="#1e293b" />
        <rect x="23" y="36" width="4" height="10" rx="2" fill="#0ea5e9" opacity="0.6" />

        {/* --- RIGHT TOWER --- */}
        <rect x="80" y="20" width="30" height="75" fill="#64748b" stroke="#1e293b" strokeWidth="1" />
        {/* Right Tower Roof */}
        <path d="M78 20 L95 -5 L112 20 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
        {/* Right Tower Window */}
        <rect x="92" y="35" width="6" height="12" rx="3" fill="#1e293b" />
        <rect x="93" y="36" width="4" height="10" rx="2" fill="#0ea5e9" opacity="0.6" />

        {/* --- CENTRAL GATE --- */}
        {/* Arch Frame */}
        <path d="M45 95 L45 65 Q60 50 75 65 L75 95 Z" fill="#334155" />
        {/* Wooden Door */}
        <path d="M47 95 L47 66 Q60 53 73 66 L73 95 Z" fill="#451a03" stroke="#000" strokeWidth="0.5" />
        {/* Iron Bars/Details on Door */}
        <line x1="60" y1="53" x2="60" y2="95" stroke="#000" strokeWidth="1" opacity="0.5" />
        <line x1="47" y1="75" x2="73" y2="75" stroke="#000" strokeWidth="1" opacity="0.5" />
        <line x1="47" y1="85" x2="73" y2="85" stroke="#000" strokeWidth="1" opacity="0.5" />

        {/* --- FLAGS --- */}
        {/* Left Flag */}
        <line x1="25" y1="-5" x2="25" y2="-15" stroke="#1e293b" strokeWidth="1" />
        <path d="M25 -15 L40 -10 L25 -5 Z" fill="#dc2626" />
        {/* Right Flag */}
        <line x1="95" y1="-5" x2="95" y2="-15" stroke="#1e293b" strokeWidth="1" />
        <path d="M95 -15 L110 -10 L95 -5 Z" fill="#dc2626" />
        {/* Center Flag (Big) */}
        <line x1="60" y1="25" x2="60" y2="10" stroke="#1e293b" strokeWidth="1" />
        <path d="M60 10 L80 15 L60 20 Z" fill="#2563eb" />

        {/* --- DECORATION --- */}
        {/* Stone texture random */}
        <g opacity="0.2" fill="#000">
           <rect x="15" y="50" width="5" height="3" />
           <rect x="25" y="70" width="5" height="3" />
           <rect x="85" y="60" width="5" height="3" />
           <rect x="50" y="40" width="5" height="3" />
        </g>
        
        {/* Torches by the gate */}
        <circle cx="42" cy="75" r="1.5" fill="#fca5a5" />
        <circle cx="42" cy="73" r="1" fill="#ef4444" className="animate-ping" />
        <circle cx="78" cy="75" r="1.5" fill="#fca5a5" />
        <circle cx="78" cy="73" r="1" fill="#ef4444" className="animate-ping" />

      </svg>
    );
  }

  // --- STANDARD HOUSE RENDER ---
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
