import React from 'react';
import { ListItem, CheckState } from '../types';
import ChecklistItem from './ChecklistItem';

interface ChecklistProps {
  title: string;
  items: ListItem[];
  onItemChange: (index: number, newState: CheckState) => void;
  onSetAll: (state: CheckState) => void;
  isReadOnly?: boolean;
}

const Checklist: React.FC<ChecklistProps> = ({ title, items, onItemChange, onSetAll, isReadOnly = false }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-center text-white mb-4">{title}</h2>
        {!isReadOnly && (
            <div className="flex justify-center space-x-2">
            <button
                onClick={() => onSetAll(CheckState.No)}
                className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-red-600/80 hover:bg-red-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                aria-label="Marcar todo como No"
            >
                Todos No
            </button>
            <button
                onClick={() => onSetAll(CheckState.Maybe)}
                className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-amber-500/80 hover:bg-amber-500 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                aria-label="Marcar todo como ?"
            >
                Todos ?
            </button>
            <button
                onClick={() => onSetAll(CheckState.Yes)}
                className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-emerald-500/80 hover:bg-emerald-500 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                aria-label="Marcar todo como Si"
            >
                Todos Si
            </button>
            </div>
        )}
      </div>
      <ul className="divide-y divide-slate-700/50 p-2">
        {items.map((item, index) => (
          <ChecklistItem
            key={item.name}
            item={item}
            onChange={(newState) => onItemChange(index, newState)}
            isReadOnly={isReadOnly}
          />
        ))}
      </ul>
    </div>
  );
};

export default Checklist;