import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
const themeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = localStorage.getItem("theme");

  const [darkMode, setDarkMode] = useState<boolean>(theme === "dark");
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (darkMode) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <themeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </themeContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext() {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}
