import { useState } from "react";
import { Button } from "./ui/button";
import { Earth } from "lucide-react";
import { useLanguageContext } from "@/context/languageContext";
import { useThemeContext } from "@/context/useThemeContext";

const LanguageDropDown = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { darkMode } = useThemeContext();
  const { setLanguage } = useLanguageContext();
  return (
    <div className="flex flex-col gap-2 relative">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full cursor-pointer ${
          darkMode ? "text-white" : "text-black"
        }`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <Earth size={20} />
      </Button>

      {/* dropdown */}
      <div
        className={`absolute -right-5 top-2 mt-8 w-20 ${
          darkMode
            ? "bg-slate-800 border-slate-700 text-white"
            : "bg-white border text-black"
        } rounded-lg shadow-lg ${dropdownOpen ? "block" : "hidden"}`}
      >
        <div className="flex w-full justify-center items-center flex-col gap-2 p-2">
          <Button
            variant="ghost"
            size="icon"
            className={`w-full cursor-pointer ${
              darkMode ? "hover:bg-slate-700 text-white" : "hover:bg-slate-100"
            }`}
            onClick={() => setLanguage("ar")}
          >
            <p>العربية</p>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-full cursor-pointer ${
              darkMode ? "hover:bg-slate-700 text-white" : "hover:bg-slate-100"
            }`}
            onClick={() => setLanguage("en")}
          >
            <p>English</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageDropDown;
