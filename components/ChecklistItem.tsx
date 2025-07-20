import React from 'react';
import { ListItem, CheckState } from '../types';
import ThreeStateSwitch from './ThreeStateSwitch';

interface ChecklistItemProps {
  item: ListItem;
  onChange: (newState: CheckState) => void;
  isReadOnly?: boolean;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onChange, isReadOnly }) => {
  return (
    <li className="flex items-center justify-between p-3 transition-colors hover:bg-slate-700/50">
      <span className="text-lg font-medium text-slate-200">{item.name}</span>
      <ThreeStateSwitch state={item.state} onChange={onChange} isReadOnly={isReadOnly} />
    </li>
  );
};

export default ChecklistItem;