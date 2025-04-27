import { createContext, ReactNode } from "react";
import { tenantThemes } from "../themes";

const ThemeContext = createContext<{ theme: any }>({ theme: tenantThemes.default });

export const ThemeProvider = ({ children, currentTheme }: { children: ReactNode; currentTheme: keyof typeof tenantThemes }) => {
  const theme = tenantThemes[currentTheme] || tenantThemes.default;

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
