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
  const dir = localStorage.getItem("language") === "ar" ? "rtl" : "ltr";
  const reached = goal > 0 && tasbih >= goal;

  const addTasbih = () => {
    const next = tasbih + 1;
    setTasbih(next);
    localStorage.setItem("tasbih", String(next));
  };

  const resetTasbih = () => {
    setTasbih(0);
    localStorage.setItem("tasbih", "0");
  };

  const handleSetGoal = (value: string) => {
    const newGoal = parseInt(value, 10);
    setGoal(newGoal);
    localStorage.setItem("goal", value);
    toast(newGoal > 0 ? `${t("goal")}: ${newGoal}` : t("noGoal"));
  };

  return (
    <div className="flex flex-col gap-4" dir={dir}>
      {/* Goal selector */}
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="w-24 shrink-0">{t("setGoal")}</span>
        <Select
          value={goal.toString()}
          onValueChange={handleSetGoal}
        >
          <SelectTrigger className="flex-1" aria-label={t("setGoal")}>
            <SelectValue placeholder={t("setGoal")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{t("noGoal")}</SelectItem>
            {presetGoals.map((presetGoal) => (
              <SelectItem key={presetGoal} value={presetGoal.toString()}>
                {presetGoal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      {/* Main buttons */}
      <div className="mt-2 grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={resetTasbih}
          className="cursor-pointer touch-manipulation py-6 text-xs md:text-sm"
        >
          <RotateCcw className="size-4" />
          {t("reset")}
        </Button>

        <Button
          onClick={addTasbih}
          disabled={reached}
          className="col-span-2 cursor-pointer touch-manipulation bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90 md:text-base"
        >
          <CirclePlus className="size-5" />
          {t("count")}
        </Button>
      </div>
    </div>
  );
};

export default ZikrControlers;
