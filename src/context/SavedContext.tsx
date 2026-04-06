import React, { createContext, useContext, useState } from 'react';
import { Location } from '../data/locations';

type SavedContextType = {
  saved: Location[];
  toggleSaved: (location: Location) => void;
  isSaved: (id: string) => boolean;
};

const SavedContext = createContext<SavedContextType>({
  saved: [],
  toggleSaved: () => {},
  isSaved: () => false,
});

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<Location[]>([]);

  const toggleSaved = (location: Location) => {
    setSaved(prev =>
      prev.find(l => l.id === location.id)
        ? prev.filter(l => l.id !== location.id)
        : [...prev, location]
    );
  };

  const isSaved = (id: string) => saved.some(l => l.id === id);

  return (
    <SavedContext.Provider value={{ saved, toggleSaved, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export const useSaved = () => useContext(SavedContext);