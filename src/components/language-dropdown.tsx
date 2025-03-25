import { useState } from "react";
import { Button } from "./ui/button";
import { Earth } from "lucide-react";
import { useLanguageContext } from "@/context/languageContext";

const LanguageDropDown = ({ darkMode }: { darkMode: boolean }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { language, setLanguage } = useLanguageContext();
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
        className={`absolute -right-5 top-2 mt-8 w-20 bg-white border rounded-lg shadow-lg ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex w-full justify-center items-center flex-col gap-2 p-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-full cursor-pointer"
            onClick={() => setLanguage("ar")}
          >
            <p>العربية</p>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-full cursor-pointer"
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
