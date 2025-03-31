import { FormEvent, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CirclePlus, RotateCcw, Save, Moon, Sun, Plus } from "lucide-react";
import DateComponent from "./components/date";
import { Input } from "./components/ui/input";
import { useTranslation } from "react-i18next";
import LanguageDropDown from "./components/language-dropdown";
import { useFetchAzkar } from "./hooks/useFetchAzkar";
import AzkarSection from "./components/azkar-section";

const App = () => {
  const [tasbih, setTasbih] = useState<number>(
    parseInt(localStorage.getItem("tasbih") || "0") || 0,
  );
  const [goal, setGoal] = useState<number>(33);
  const [presetGoals, setPresetGoals] = useState<number[]>([33, 34, 99, 100]);
  const [customGoal, setCustomGoal] = useState<number>(0);
  const [savedCounts, setSavedCounts] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { t } = useTranslation();
  
  // Add to counter
  const addTasbih = () => {
    setTasbih(tasbih + 1);
    localStorage.setItem("tasbih", (tasbih + 1).toString());
  };

  const addCustomGoal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGoal(customGoal);
    setPresetGoals([...presetGoals, customGoal]);
    setCustomGoal(0);
  };

  // Reset counter
  const resetTasbih = () => {
    setTasbih(0);
    localStorage.setItem("tasbih", "0");
  };

  // Save current count
  const saveCount = () => {
    if (tasbih === 0) {
      toast.warning("No count to save");
      return;
    } else {
      setSavedCounts([...savedCounts, tasbih]);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Card
        className={`w-full max-w-md shadow-lg ${
          darkMode ? "bg-slate-800 border-slate-700" : "bg-white"
        }`}
      >
        <CardHeader className="text-center border-b pb-1 md:pb-3">
          <div
            className="flex justify-between items-center"
            dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
          >
            <CardTitle
              className={`text-xl md:text-2xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {t("digitalMasbaha")}
            </CardTitle>
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={`rounded-full cursor-pointer ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              {/* languages button */}
              <LanguageDropDown darkMode={darkMode} />
            </div>
          </div>
        </CardHeader>

        <CardContent className=" flex flex-col gap-4 pt-1">
          {/* Azkar section */}
          <AzkarSection />

          {/* date display */}
          <DateComponent darkMode={darkMode} />

          {/* Counter display */}
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
                  (tasbih / goal) * 100,
                )}% ${t("complete")}`}
            </div>

            {tasbih === goal && tasbih !== 0 && (
              <div className="text-green-600 dark:text-green-400 text-sm mt-2 font-medium">
                {t("goalReached")}! ✓
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4">
            {/* Goal selector */}
            <div
              className="flex gap-2 items-center"
              dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
            >
              <span
                className={`w-20 text-sm ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {t("setGoal")}:
              </span>
              <Select
                value={goal.toString()}
                defaultValue={goal.toString()}
                onValueChange={(value) => setGoal(parseInt(value))}
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
                    dir={
                      localStorage.getItem("language") === "ar" ? "rtl" : "ltr"
                    }
                  >
                    {t("noGoal")}
                  </SelectItem>
                  {presetGoals.map((presetGoal) => (
                    <SelectItem
                      key={presetGoal}
                      value={presetGoal.toString()}
                      dir={
                        localStorage.getItem("language") === "ar"
                          ? "rtl"
                          : "ltr"
                      }
                    >
                      {presetGoal}
                    </SelectItem>
                  ))}
                  <form onSubmit={addCustomGoal}>
                    <div
                      className="flex mx-auto items-center px-2 my-2"
                      dir={
                        localStorage.getItem("language") === "ar"
                          ? "rtl"
                          : "ltr"
                      }
                    >
                      <Input
                        type="number"
                        onChange={(e) =>
                          setCustomGoal(parseInt(e.target.value))
                        }
                        value={customGoal}
                        placeholder="Custom goal"
                      />
                      <Button
                        variant="ghost"
                        className="text-emerald-600"
                        size="sm"
                      >
                        <Plus size={15} />
                      </Button>
                    </div>
                  </form>
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
                  goal > 0 && tasbih === goal
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={goal > 0 && tasbih === goal}
              >
                <CirclePlus className="mr-2" size={20} />
                {t("count")}
              </Button>
            </div>

            {/* Save button */}
            <Button
              variant="secondary"
              onClick={saveCount}
              className={`w-full cursor-pointer ${
                darkMode ? "bg-slate-200 hover:bg-slate-300" : ""
              }`}
            >
              <Save className="mr-2" size={16} />
              Save Current Count
            </Button>

            {/* Saved counts display */}
            {savedCounts.length > 0 && (
              <div
                className={`mt-4 space-y-4 p-3 rounded text-sm ${
                  darkMode ? "bg-slate-600" : "bg-slate-100"
                }`}
              >
                <div
                  className={`font-medium mb-1 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Saved counts:
                </div>
                <div className="flex flex-wrap gap-2">
                  {savedCounts.map((count, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded font-medium ${
                        darkMode ? "bg-slate-500 text-white" : "bg-white border"
                      }`}
                    >
                      {count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-xs opacity-70 text-center">
        Tap the count button or press spacebar to increment
      </div>
    </div>
  );
};

export default App;
