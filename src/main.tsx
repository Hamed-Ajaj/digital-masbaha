import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./lib/i18n.ts";
import { LanguageProvider } from "./context/languageContext.tsx";
import Navbar from "./components/navbar.tsx";
import { ThemeProvider } from "./context/useThemeContext.tsx";
import App from "./App.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AzkarPage />,
//   },
//   {
//     path: "/masbaha",
//     element: <MasbahaPage />,
//   },
// ]);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LanguageProvider>
      <ThemeProvider>
        <Navbar />
        <App />
        <Toaster richColors />
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>
);
