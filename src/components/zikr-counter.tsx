import { useState } from "react";
import { useTranslation } from "react-i18next";
import ZikrControlers from "./ui/zikr-controlers";
import { useThemeContext } from "@/context/useThemeContext";

const ZikrCounter = () => {
  const [tasbih, setTasbih] = useState<number>(
    parseInt(localStorage.getItem("tasbih") || "0") || 0
  );
  const [goal, setGoal] = useState<number>(
    localStorage.getItem("goal")
      ? parseInt(localStorage.getItem("goal") || "33")
      : 33
  );
  const { t } = useTranslation();
  const { darkMode } = useThemeContext();

  return (
    <section>
      <div
        className={`text-center mb-8 p-6 rounded-lg ${
          tasbih === goal
            ? "bg-green-100 dark:bg-green-900"
            : darkMode
            ? "bg-slate-700"
            : "bg-slate-100"
        }`}
      >
        <div
          className={`text-6xl font-bold mb-2
                ${
                  tasbih === goal
                    ? "text-green-600"
                    : darkMode
                    ? "text-white"
                    : "text-black"
                }
              `}
        >
          {tasbih}
        </div>
        <div
          className={`text-sm opacity-70 ${
            tasbih === goal
              ? "text-green-600 dark:text-green-400"
              : darkMode
              ? "text-white"
              : "text-black"
          }`}
          dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
        >
          {goal > 0 &&
            `${t("target")}: ${goal} | ${Math.round(
              (tasbih / goal) * 100
            )}% ${t("complete")}`}
        </div>

        {tasbih === goal && tasbih !== 0 && (
          <div className="text-green-600 dark:text-green-400 text-sm mt-2 font-medium">
            {t("goalReached")}! ✓
          </div>
        )}
      </div>
      <ZikrControlers
        goal={goal}
        setGoal={setGoal}
        setTasbih={setTasbih}
        tasbih={tasbih}
      />
    </section>
  );
};

export default ZikrCounter;
