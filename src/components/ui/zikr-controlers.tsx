import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { CirclePlus, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useThemeContext } from "@/context/useThemeContext";
import { presetGoals } from "@/constants/azkar";

const ZikrControlers = ({
  goal,
  tasbih,
  setTasbih,
  setGoal,
}: {
  goal: number;
  tasbih: number;
  setTasbih: (value: number) => void;
  setGoal: (value: number) => void;
}) => {
  const { t } = useTranslation();
  const { darkMode } = useThemeContext(); // Use a constant instead since toggle functionality is commented out

  const addTasbih = () => {
    setTasbih(tasbih + 1);
    localStorage.setItem("tasbih", (tasbih + 1).toString());
  };

  const handleSetGoal = (value: string) => {
    const newGoal = parseInt(value);
    setGoal(newGoal);
    localStorage.setItem("goal", value);
    if (newGoal > 0) {
      toast(`Goal set to ${newGoal}`);
    } else {
      toast("No goal set");
    }
  };

  // Reset counter
  const resetTasbih = () => {
    setTasbih(0);
    localStorage.setItem("tasbih", "0");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Goal selector */}
      <div
        className="flex gap-2 items-center"
        dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
      >
        <span
          className={`w-20 text-sm ${darkMode ? "text-white" : "text-black"}`}
        >
          {t("setGoal")}:
        </span>
        <Select
          value={goal.toString()}
          defaultValue={goal.toString()}
          onValueChange={(value) => handleSetGoal(value)}
        >
          <SelectTrigger
            className={`flex-1 ${
              darkMode ? "bg-slate-700 border-slate-600" : ""
            }`}
          >
            <SelectValue
              placeholder="Select goal"
              className={darkMode ? "text-white" : "text-black"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="0"
              dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
            >
              {t("noGoal")}
            </SelectItem>
            {presetGoals.map((presetGoal) => (
              <SelectItem
                key={presetGoal}
                value={presetGoal.toString()}
                dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
              >
                {presetGoal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main buttons */}
      <div
        className="grid grid-cols-3 gap-3 mb-4 mt-2"
        dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
      >
        <Button
          variant="outline"
          onClick={resetTasbih}
          className={`flex-1 md:py-6 cursor-pointer text-[10px] md:text-[14px] ${
            darkMode ? "border-slate-700 hover:bg-slate-700" : ""
          }`}
        >
          <RotateCcw className="mr-2" size={18} />
          {t("reset")}
        </Button>

        <Button
          variant="default"
          onClick={addTasbih}
          className={`flex-1 md:py-6 cursor-pointer bg-emerald-600 hover:bg-emerald-700 col-span-2 ${
            goal > 0 && tasbih === goal ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={goal > 0 && tasbih === goal}
        >
          <CirclePlus className="mr-2" size={20} />
          {t("count")}
        </Button>
      </div>
    </div>
  );
};

export default ZikrControlers;
