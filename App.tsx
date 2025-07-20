
import React, { useState } from 'react';
import { ZONA_A_ITEMS, ZONA_B_ITEMS } from './constants';
import { CheckState, ListItem } from './types';
import Checklist from './components/Checklist';

const getInitialState = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Basic validation to ensure the loaded data has the expected shape
      if (Array.isArray(fallback) && Array.isArray(parsed) && parsed.length === fallback.length) {
        return parsed as T;
      }
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
  }
  return fallback;
};


const App: React.FC = () => {
  const initialZonaA = ZONA_A_ITEMS.map(name => ({ name, state: CheckState.Maybe }));
  const initialZonaB = ZONA_B_ITEMS.map(name => ({ name, state: CheckState.Maybe }));

  const [zonaA, setZonaA] = useState<ListItem[]>(() => getInitialState('zonaA', initialZonaA));
  const [zonaB, setZonaB] = useState<ListItem[]>(() => getInitialState('zonaB', initialZonaB));
  const [isEditing, setIsEditing] = useState(true);


  const handleItemChange = (listKey: 'zonaA' | 'zonaB', itemIndex: number, newState: CheckState) => {
    const lists = { zonaA, zonaB };
    const setters = { zonaA: setZonaA, zonaB: setZonaB };

    const currentList = lists[listKey];
    const listSetter = setters[listKey];

    const allAreMaybe = currentList.every(item => item.state === CheckState.Maybe);

    if (allAreMaybe && newState !== CheckState.Maybe) {
      if (newState === CheckState.Yes) {
        const newList = currentList.map((item, index) => ({
          ...item,
          state: index === itemIndex ? CheckState.Yes : CheckState.No,
        }));
        listSetter(newList);
      } else if (newState === CheckState.No) {
        const newList = currentList.map((item, index) => ({
          ...item,
          state: index === itemIndex ? CheckState.No : CheckState.Yes,
        }));
        listSetter(newList);
      }
    } else {
      const newList = [...currentList];
      newList[itemIndex] = { ...newList[itemIndex], state: newState };
      listSetter(newList);
    }
  };

  const handleSetAll = (listKey: 'zonaA' | 'zonaB', state: CheckState) => {
    const setters = { zonaA: setZonaA, zonaB: setZonaB };
    const listSetter = setters[listKey];

    listSetter(prevList => prevList.map(item => ({ ...item, state })));
  };
  
  const handleSave = () => {
    try {
        localStorage.setItem('zonaA', JSON.stringify(zonaA));
        localStorage.setItem('zonaB', JSON.stringify(zonaB));
        setIsEditing(false);
    } catch (e) {
        console.error("Error saving to local storage", e);
        alert("No se pudo guardar el estado.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <header className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            Tren Escoba
          </h1>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checklist 
            title="ZONA A"
            items={zonaA}
            onItemChange={(index, state) => handleItemChange('zonaA', index, state)}
            onSetAll={(state) => handleSetAll('zonaA', state)}
            isReadOnly={!isEditing}
          />
          <Checklist 
            title="ZONA B"
            items={zonaB}
            onItemChange={(index, state) => handleItemChange('zonaB', index, state)}
            onSetAll={(state) => handleSetAll('zonaB', state)}
            isReadOnly={!isEditing}
          />
        </main>
      </div>

      <footer className="mt-auto pt-4">
        <div className="max-w-7xl mx-auto flex justify-center">
            {isEditing ? (
                 <button 
                    onClick={handleSave}
                    className="px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
                 >
                    Guardar
                 </button>
            ) : (
                <button 
                    onClick={handleEdit}
                    className="px-8 py-3 text-lg font-bold text-slate-900 bg-amber-400 rounded-lg shadow-lg hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
                >
                    Editar
                </button>
            )}
        </div>
      </footer>
    </div>
  );
};

export default App;
