import { Route, Routes } from "react-router";
import AzkarPage from "./pages/azkar";
import MasbahaPage from "./pages/masbaha";
const App = () => {
  return (
    <main className="font-cairo">
      <Routes>
        <Route path="/" element={<AzkarPage />} />
        <Route path="/masbaha" element={<MasbahaPage />} />
      </Routes>
    </main>
  );
};

export default App;
