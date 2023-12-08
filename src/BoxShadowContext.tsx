import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface BoxShadow {
  shiftRight: number;
  shiftDown: number;
  blur: number;
  spread: number;
  opacity: number;
  inset: boolean;
}

export interface CSSCode {
  id: number;
  rgba: RGBA;
  boxShadow: BoxShadow;
}

export const initValues: CSSCode = {
  id: 0,
  rgba: { r: 0, g: 0, b: 0, a: 0.2 },
  boxShadow: {
    shiftRight: 0,
    shiftDown: 0,
    blur: 5,
    spread: 3,
    opacity: 20,
    inset: false,
  },
};

interface BoxShadowContextProps {
  listBoxShadow: CSSCode[];
  setListBoxShadow: Dispatch<SetStateAction<CSSCode[]>>;
  hasInset: boolean;
  setHasInset: Dispatch<SetStateAction<boolean>>;
}

export const BoxShadowContext = createContext<
  BoxShadowContextProps | undefined
>(undefined);

interface BoxShadowProviderProps {
  children: ReactNode;
}

function BoxShadowProvider({ children }: BoxShadowProviderProps) {
  const [listBoxShadow, setListBoxShadow] = useState<CSSCode[]>([initValues]);
  const [hasInset, setHasInset] = useState(false);

  const value: BoxShadowContextProps = {
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

export { BoxShadowProvider };
