
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
  const isDog = type === 'dog';
  const isCat = type === 'cat';
  const isGuard = type === 'guard';

  if (isDog) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24">
        {/* Body */}
        <rect x="6" y="14" width="12" height="6" fill="#8d5b3e" rx="1" />
        {/* Head */}
        <rect x="14" y="10" width="6" height="6" fill="#8d5b3e" rx="1" />
        {/* Ear */}
        <rect x="18" y="10" width="3" height="4" fill="#5d4037" rx="1" />
        {/* Nose */}
        <rect x="20" y="13" width="1.5" height="1.5" fill="black" />
        {/* Eye */}
        <rect x="16" y="11.5" width="1" height="1" fill="black" />
        {/* Legs */}
        <rect x="7" y="20" width="2" height="3" fill="#5d4037" />
        <rect x="15" y="20" width="2" height="3" fill="#5d4037" />
        {/* Tail */}
        <rect x="4" y="14" width="3" height="2" fill="#8d5b3e">
          <animateTransform attributeName="transform" type="rotate" from="0 6 15" to="20 6 15" dur="0.2s" repeatCount="indefinite" />
        </rect>
      </svg>
    );
  }

  if (isCat) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24">
        {/* Body */}
        <rect x="8" y="15" width="8" height="6" fill="#333" rx="1" />
        {/* Head */}
        <rect x="10" y="10" width="7" height="7" fill="#333" rx="1" />
        {/* Ears */}
        <path d="M10 10 L12 7 L14 10 Z" fill="#333" />
        <path d="M14 10 L16 7 L18 10 Z" fill="#333" />
        {/* Eyes */}
        <rect x="12" y="12" width="1" height="1" fill="#ccff00" />
        <rect x="15" y="12" width="1" height="1" fill="#ccff00" />
        {/* Tail */}
        <path d="M8 18 Q4 18 4 12" fill="none" stroke="#333" strokeWidth="1.5">
          <animate attributeName="d" values="M8 18 Q4 18 4 12; M8 18 Q4 22 4 12; M8 18 Q4 18 4 12" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>
    );
  }

  // --- GUARD SPRITE ---
  if (isGuard) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24">
        {/* Body Armor */}
        <rect x="6" y="12" width="12" height="11" fill="#94a3b8" stroke="#475569" strokeWidth="0.5" rx="1" />
        <rect x="8" y="14" width="8" height="7" fill="#cbd5e1" opacity="0.5" />
        
        {/* Head / Helmet */}
        <rect x="8" y="5" width="8" height="8" fill="#FFE0BD" rx="1" />
        <path d="M8 5 L16 5 L16 8 L8 8 Z" fill="#64748b" /> {/* Helmet Top */}
        <rect x="9" y="4" width="6" height="2" fill="#64748b" /> {/* Helmet Crest Base */}
        <rect x="11" y="2" width="2" height="2" fill="#dc2626" /> {/* Plume */}

        {/* Face */}
        <rect x="10" y="8" width="1.5" height="1.5" fill="black" />
        <rect x="13" y="8" width="1.5" height="1.5" fill="black" />
        
        {/* Weapon/Shield hint */}
        <rect x="18" y="14" width="2" height="10" fill="#9ca3af" /> {/* Spear Shaft */}
        <path d="M17 14 L19 10 L21 14 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.5" /> {/* Spear Tip */}
      </svg>
    );
  }

  // --- GENERIC VILLAGER / ELDER / MERCHANT ---
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
