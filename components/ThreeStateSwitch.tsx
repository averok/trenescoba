import React from 'react';
import { CheckState } from '../types';

interface ThreeStateSwitchProps {
  state: CheckState;
  onChange: (newState: CheckState) => void;
  isReadOnly?: boolean;
}

const ThreeStateSwitch: React.FC<ThreeStateSwitchProps> = ({ state, onChange, isReadOnly = false }) => {
  const baseStyle = "w-12 h-8 flex items-center justify-center text-sm font-bold transition-all duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed";
  const inactiveStyle = `bg-slate-600 text-slate-400 ${!isReadOnly ? 'hover:bg-slate-500' : ''}`;
  
  const activeEffect = !isReadOnly ? 'scale-110 shadow-lg ring-2' : '';
  
  const noStyle = state === CheckState.No 
    ? `bg-red-600 text-white ${activeEffect} ring-red-500` 
    : inactiveStyle;
    
  const maybeStyle = state === CheckState.Maybe 
    ? `bg-amber-500 text-white ${activeEffect} ring-amber-400` 
    : inactiveStyle;
    
  const yesStyle = state === CheckState.Yes 
    ? `bg-emerald-500 text-white ${activeEffect} ring-emerald-500`
    : inactiveStyle;

  return (
    <div className="flex bg-slate-700 rounded-lg p-1 space-x-1">
      <button 
        onClick={() => onChange(CheckState.No)} 
        className={`${baseStyle} ${noStyle} rounded-md`}
        aria-pressed={state === CheckState.No}
        aria-label="Marcar como No"
        disabled={isReadOnly}
      >
        No
      </button>
      <button 
        onClick={() => onChange(CheckState.Maybe)} 
        className={`${baseStyle} ${maybeStyle} rounded-md`}
        aria-pressed={state === CheckState.Maybe}
        aria-label="Marcar como ?"
        disabled={isReadOnly}
      >
        ?
      </button>
      <button 
        onClick={() => onChange(CheckState.Yes)} 
        className={`${baseStyle} ${yesStyle} rounded-md`}
        aria-pressed={state === CheckState.Yes}
        aria-label="Marcar como Si"
        disabled={isReadOnly}
      >
        Si
      </button>
    </div>
  );
};

export default ThreeStateSwitch;