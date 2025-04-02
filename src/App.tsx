import { Route, Routes } from "react-router";
import AzkarPage from "./pages/azkar";
import MasbahaPage from "./pages/masbaha";
const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<AzkarPage />} />
        <Route path="/masbaha" element={<MasbahaPage />} />
      </Routes>
    </main>
  );
};

export default App;
