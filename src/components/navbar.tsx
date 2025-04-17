import { useThemeContext } from "@/context/useThemeContext";
import LanguageDropDown from "./language-dropdown";
import { NavLink } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
const Navbar = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const { t } = useTranslation(); // For translation support

  return (
    <nav
      className={`flex items-center justify-between p-4 border-b-2 z-10 transition-colors duration-200 ${
        darkMode
          ? "bg-slate-900 border-slate-700 text-white"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div
        className="max-w-4xl mx-auto flex items-center justify-between w-full"
        dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
      >
        <div className="sm:text-lg font-bold">
          <NavLink
            to="/"
            className="hover:opacity-80 transition-opacity"
            dir="rtl"
          >
            <img
              src="/digital-tasbeeh.webp"
              alt="Logo"
              className="h-8 w-8 rounded-2xl inline-block ml-2"
            />
            <span
              className={`${
                darkMode ? "text-white" : "text-slate-900"
              } text-[14px] sm:text-[16px] hidden sm:inline-block`}
            >
              المسبحة الرقمية
            </span>
          </NavLink>
        </div>

        <ul className="flex gap-3 sm:gap-6 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-green-600 font-medium underline underline-offset-4"
                    : darkMode
                    ? "text-white hover:text-green-400"
                    : "text-slate-900 hover:text-green-600"
                }`
              }
            >
              الأذكار{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/masbaha"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-green-600 font-medium underline underline-offset-4"
                    : darkMode
                    ? "text-white hover:text-green-400"
                    : "text-slate-900 hover:text-green-600"
                }`
              }
            >
              {t("masbaha") || "Masbaha"}
            </NavLink>
          </li>
          {/* <li>
            <LanguageDropDown />
          </li> */}
          <li>
            <Button
              onClick={toggleDarkMode}
              variant={"ghost"}
              size="icon"
              className={`rounded-full cursor-pointer ${
                darkMode ? "text-white" : "text-black"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon className="text-slate-700" size={20} />
              )}
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
