import LanguageDropDown from "./language-dropdown";
import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-transparent border-b-2 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between w-full">
        <div className="text-lg font-bold">
          <NavLink to="/" className="hover:text-gray-400">
            <img
              src="/digital-tasbeeh.webp"
              alt="Logo"
              className="h-8 w-8 rounded-2xl inline-block mr-2"
            />
          </NavLink>
        </div>
        <ul className="flex gap-6 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 underline"
                  : "text-black hover:text-gray-500"
              }
            >
              Azkar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/masbaha"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 underline"
                  : "text-black hover:text-gray-500"
              }
            >
              Masbaha
            </NavLink>
          </li>
          <li>
            <LanguageDropDown />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
