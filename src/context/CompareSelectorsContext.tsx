import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { chartColors } from "../constants";
import type {
  LenderWithCalculation,
  LenderWithCalculationAndColor,
} from "../types";

interface CompareContextType {
  compareSelectors: LenderWithCalculationAndColor[];
  addToCompare: (item: LenderWithCalculation) => void;
  removeFromCompare: (id: string) => void;
}

const initalValues: CompareContextType = {
  compareSelectors: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
};

const CompareContext = createContext<CompareContextType>(initalValues);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareSelectors, setCompareSelectors] = useState<
    LenderWithCalculationAndColor[]
  >([]);

  const getColorCode = useCallback(() => {
    const usedColors = compareSelectors.map((selector: any) => selector.color);
    const availableColor = chartColors.find(
      (color) => !usedColors.includes(color)
    );
    return availableColor || chartColors[0];
  }, [compareSelectors]);

  const addToCompare = (item: LenderWithCalculation) => {
    const color = getColorCode();
    setCompareSelectors((prev) => [...prev, { ...item, color }]);
  };

  const removeFromCompare = (id: string) => {
    setCompareSelectors((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CompareContext.Provider
      value={{ compareSelectors, addToCompare, removeFromCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
