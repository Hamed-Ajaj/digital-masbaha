import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const themeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

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
