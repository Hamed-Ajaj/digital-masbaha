import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  darkMode: string;
  toggleDarkMode: () => void;
};
const themeContext = createContext<ThemeContextType>({
  darkMode: "light",
  toggleDarkMode: () => {},
});
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<string>(
    localStorage.getItem("darkMode") || "false"
  );
  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === "true" ? "false" : "true"));
    const newTheme = darkMode === "true" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
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
