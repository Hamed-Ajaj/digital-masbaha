import { Toaster } from "@/components/ui/sonner";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./lib/i18n.ts";
import { LanguageProvider } from "./context/languageContext.tsx";
import Navbar from "./components/navbar.tsx";
import { ThemeProvider } from "./context/useThemeContext.tsx";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    mutations: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LanguageProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <App />
          <Toaster richColors />
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>
);
