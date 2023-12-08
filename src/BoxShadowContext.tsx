import { useState, createContext } from "react";

const BoxShadowContext = createContext({});
type CSSCode = {
  id: number;
  rgba: { r: number; g: number; b: number; a: number };
  boxShadow: {
    shiftRight: number;
    shiftDown: number;
    blur: number;
    spread: number;
    inset: boolean;
  };
}[];
export const initValues = {
  id: 0,
  rgba: { r: 0, g: 0, b: 0, a: 0.2 },
  boxShadow: {
    shiftRight: 0,
    shiftDown: 0,
    blur: 5,
    spread: 3,
    inset: false,
  },
};
function BoxShadowProvider({ children }) {
  const [listBoxShadow, setListBoxShadow] = useState<CSSCode>([initValues]);
  const [hasInset, setHasInset] = useState(false);
  const value = {
    listBoxShadow,
    setListBoxShadow,
    hasInset,
    setHasInset,
  };
  return (
    <BoxShadowContext.Provider value={value}>
      {children}
    </BoxShadowContext.Provider>
  );
}
export { BoxShadowContext, BoxShadowProvider };
