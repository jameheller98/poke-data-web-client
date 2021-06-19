import { createContext, useContext } from 'react';

export type CollapseContextType = {
  collapsedSider: boolean;
  setCollapsedSider: (collapsed: boolean) => void;
};

export const CollapseContext = createContext<CollapseContextType>({
  collapsedSider: true,
  setCollapsedSider: (collapsed) => console.log('setTheme is ', collapsed),
});
export const useCollapseContext = (): CollapseContextType => useContext(CollapseContext);
