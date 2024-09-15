import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface GlobalContextProps {
  season: number;
  setSeason: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [season, setSeason] = useState(new Date().getFullYear());

  return <GlobalContext.Provider value={{ season, setSeason }}>{children}</GlobalContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
