import { createContext, useContext, useState } from 'react';
import type { SimulationResults, SimulationValueTypes } from '../types';

type SimulationContextType = {
  input: SimulationValueTypes;
  results: SimulationResults | null;
  setInput: (input: SimulationValueTypes) => void;
  setResults: (results: SimulationResults | null) => void;
};

export const defaultValues: SimulationValueTypes = {
  chargePoints: 20,
  arrivalMultiplier: 100,
  consumptionPer100km: 18,
  powerPerCharger: 11,
};

const SimContext = createContext<SimulationContextType | undefined>(undefined);

const SimulationProvider = ({ children }: { children: React.ReactNode }) => {
  const [input, setInput] = useState<SimulationValueTypes>(defaultValues);
  const [results, setResults] = useState<SimulationResults | null>(null);

  return (
    <SimContext.Provider value={{ input, results, setInput, setResults }}>
      {children}
    </SimContext.Provider>
  );
};

const useSimulationContext = () => {
  const context = useContext(SimContext);
  if (!context)
    throw new Error(
      'useSimulationContext must be used within a SimulationProvider',
    );

  return context;
};

export { useSimulationContext, SimulationProvider };
