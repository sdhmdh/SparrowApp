import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <NavigationContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </NavigationContext.Provider>
  );
};
