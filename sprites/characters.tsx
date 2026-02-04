
import React from 'react';
import { PlayerAppearance, NPCData } from '../models/types';

export const PrincessModel = ({ appearance }: { appearance: PlayerAppearance }) => (
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

export const NPCModel = ({ type }: { type: NPCData['spriteType'] }) => {
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
