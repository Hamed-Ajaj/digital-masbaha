import { useThemeContext } from "@/context/useThemeContext";
import { SyncLoader } from "react-spinners";

const AzkarLoader = () => {
  const { darkMode } = useThemeContext();
  const loaderColor = darkMode ? "#ffffff" : "#000000";
  return (
    <div className="flex items-center justify-center w-full min-h-[400px]">
      <SyncLoader color={loaderColor} />
    </div>
  );
};

export default AzkarLoader;
