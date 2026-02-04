
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
