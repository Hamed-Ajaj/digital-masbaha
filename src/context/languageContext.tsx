import { createContext, useContext } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const languageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const setLanguage = (language: string) => {
    localStorage.setItem("language", language);
    window.location.reload();
  };

  const language = localStorage.getItem("language") || "en";

  return (
    <languageContext.Provider value={{ language, setLanguage }}>
      {children}
    </languageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(languageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }

  return context;
}
