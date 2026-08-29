import { useThemeContext } from "@/context/useThemeContext";
import { SyncLoader } from "react-spinners";

const AzkarLoader = () => {
  const { darkMode } = useThemeContext();
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center">
      <SyncLoader color={darkMode ? "#2fb98b" : "#0e7a5c"} />
    </div>
  );
};

export default AzkarLoader;
