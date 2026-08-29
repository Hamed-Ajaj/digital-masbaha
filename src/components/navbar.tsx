import { useThemeContext } from "@/context/useThemeContext";
import { NavLink } from "react-router";
import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm sm:text-base font-medium transition-colors ${
      isActive
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <nav className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
      <div
        className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4"
        dir="rtl"
      >
        <NavLink to="/" className="order-2 flex items-center gap-2" dir="rtl">
          <img
            src="/digital-tasbeeh.webp"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full ring-1 ring-border"
          />
          <span
            translate="no"
            className="font-display text-base sm:text-lg text-foreground"
          >
            المسبحة الرقمية
          </span>
        </NavLink>

        <ul className="order-1 flex items-center gap-4 sm:gap-8">
          <li>
            <NavLink to="/" className={linkClass} end>
              الأذكار
            </NavLink>
          </li>
          <li>
            <NavLink to="/masbaha" className={linkClass}>
              المسبحة
            </NavLink>
          </li>
          <li>
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
