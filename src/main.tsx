import { StrictMode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./lib/i18n.ts";
import App from "./App.tsx";
import { LanguageProvider } from "./context/languageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <Toaster />
    </LanguageProvider>
  </StrictMode>
);
