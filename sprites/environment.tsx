
import React from 'react';
import { TileType } from '../models/types';
import { Sparkles, Utensils } from 'lucide-react';

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
    </svg>
  );
};

export const FountainModel = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" style={{ overflow: 'visible' }}>
    <g transform="translate(80, 80) scale(3.5)">
      {/* Shadow */}
      <ellipse cx="0" cy="9" rx="18" ry="6" fill="#000" opacity="0.2" />

      {/* --- LEVEL 1: BASE BASIN --- */}
      {/* Stone Rim */}
      <ellipse cx="0" cy="6" rx="16" ry="8" fill="#4b5563" stroke="#1f2937" strokeWidth="0.5" />
      {/* Water Surface */}
      <ellipse cx="0" cy="5" rx="14" ry="6.5" fill="#1e40af" />
      
      {/* Water Ripples */}
      {[0, 1.2].map((delay, i) => (
        <ellipse key={i} cx="0" cy="5.5" rx="1" ry="0.5" fill="none" stroke="#93c5fd" strokeWidth="0.2" opacity="0">
          <animate attributeName="rx" from="1" to="13" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="ry" from="0.5" to="5" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.6;0" dur="2.4s" begin={`${delay}s`} repeatCount="indefinite" />
        </ellipse>
      ))}

      {/* --- LEVEL 2: MIDDLE BASIN --- */}
      {/* Central lower pillar */}
      <rect x="-3" y="-1" width="6" height="7" fill="#64748b" stroke="#334155" strokeWidth="0.4" />
      {/* Middle basin */}
      <ellipse cx="0" cy="-2" rx="9" ry="4" fill="#64748b" stroke="#334155" strokeWidth="0.4" />
      <ellipse cx="0" cy="-2.5" rx="8" ry="3.2" fill="#2563eb" />

      {/* --- LEVEL 3: TOP SPIRE --- */}
      {/* Top pillar */}
      <rect x="-2" y="-6" width="4" height="5" fill="#94a3b8" stroke="#475569" strokeWidth="0.4" />
      {/* Spire tip */}
      <circle cx="0" cy="-6" r="2.5" fill="#cbd5e1" stroke="#475569" strokeWidth="0.4" />

      {/* --- WATER EFFECTS --- */}
      <g>
        {/* Top spout */}
        <rect x="-0.8" y="-10" width="1.6" height="4" fill="#fff" opacity="0.8">
          <animate attributeName="height" values="2;5;2" dur="0.5s" repeatCount="indefinite" />
          <animate attributeName="y" values="-9;-11;-9" dur="0.5s" repeatCount="indefinite" />
        </rect>

        {/* Falling water to base */}
        <path d="M-8 -2 Q-11 2 -11 5" fill="none" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="3,2">
          <animate attributeName="stroke-dashoffset" from="5" to="0" dur="0.6s" repeatCount="indefinite" />
        </path>
        <path d="M8 -2 Q11 2 11 5" fill="none" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="3,2">
          <animate attributeName="stroke-dashoffset" from="5" to="0" dur="0.6s" repeatCount="indefinite" />
        </path>

        {/* Splashes at base */}
        {[-11, 11].map((x, i) => (
          <g key={i} transform={`translate(${x}, 5)`}>
            <circle r="0.8" fill="#fff">
              <animate attributeName="cy" values="0;-3;0" dur="0.6s" begin={`${i*0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="0.6s" begin={`${i*0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </g>

      {/* Magic sparkle atop spire */}
      <circle cx="0" cy="-10.5" r="1" fill="#fff">
        <animate attributeName="r" values="0.5;1.5;0.5" dur="0.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="0.4s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

export const FurnitureIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'flower': return <div className="animate-bounce"><Sparkles size={20} className="text-pink-500 fill-pink-300" /></div>;
    case 'bed': return <div className="w-full h-full bg-red-800 rounded-sm border-2 border-red-950 flex items-center justify-center"><div className="w-8 h-6 bg-white rounded-t-lg" /></div>;
    case 'oven': return <div className="flex flex-col items-center"><Utensils size={20} className="text-gray-300" /><div className="w-6 h-2 bg-orange-500 blur-[2px] animate-pulse" /></div>;
    case 'sofa': return <div className="w-10 h-6 bg-indigo-700 rounded-lg border-b-4 border-indigo-900 shadow-md" />;
    case 'table': return <div className="w-8 h-8 bg-amber-700 rounded-full border-4 border-amber-900 shadow-lg" />;
    case 'bookshelf': return <div className="w-full h-full bg-amber-900 border-2 border-amber-950 p-1 flex flex-col gap-1"><div className="h-1 bg-blue-400 w-full"/><div className="h-1 bg-red-400 w-full"/><div className="h-1 bg-green-400 w-full"/></div>;
    case 'counter': return <div className="w-full h-full bg-amber-800 border-b-4 border-amber-950 shadow-md" />;
    case 'door': return <div className="w-full h-full bg-black/40 flex items-center justify-center"><div className="text-white text-[8px] animate-pulse">EXIT</div></div>; 
    default: return null;
  }
};
