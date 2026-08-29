import { motion, useReducedMotion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Copy, MinusSquare, RotateCcw, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { zikrItem } from "@/types/azkarTypes";

const ZikrCard = ({ azkar }: { azkar: zikrItem[] }) => {
  const [remainingCounts, setRemainingCounts] = useState<Record<number, number>>(
    () =>
      Object.fromEntries(
        azkar.map((item, index) => [index, parseInt(item.count, 10) || 0])
      )
  );
  const reducedMotion = useReducedMotion();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    toast.success("تم النسخ", { description: "تم نسخ الذكر إلى الحافظة" });
  };

  const handleDecrement = (index: number) => {
    setRemainingCounts((prev) => {
      const current = prev[index] ?? 0;
      if (current <= 0) return prev;
      const next = current - 1;
      if (next === 0) {
        if (navigator.vibrate) navigator.vibrate(60);
        toast.success("تم الانتهاء من الذكر");
      }
      return { ...prev, [index]: next };
    });
  };

  const handleReset = (index: number, count: string) => {
    setRemainingCounts((prev) => ({
      ...prev,
      [index]: parseInt(count, 10) || 0,
    }));
    toast.info("تم إعادة تعيين العداد");
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-3">
        {azkar.map((item, index) => {
          const remaining = remainingCounts[index];
          const isCompleted = remaining === 0;

          return (
            <motion.article
              key={`${item.category}-${index}`}
              dir="rtl"
              className={`relative rounded-xl border px-4 py-4 transition-colors duration-300 sm:px-5 ${
                isCompleted
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-card shadow-[0_1px_2px_rgb(23_38_29/0.04)] hover:border-primary/40"
              }`}
              style={{ contentVisibility: "auto" }}
            >
              <button
                type="button"
                onClick={() => handleDecrement(index)}
                disabled={isCompleted}
                aria-label={isCompleted ? "تم إتمام الذكر" : "عد تنازلي"}
                className="block w-full cursor-pointer text-right disabled:cursor-default"
              >
                <motion.div
                  className="flex items-start gap-3"
                  whileHover={reducedMotion ? undefined : { scale: 1.005 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.995 }}
                >
                  <h3
                    className={`min-w-0 flex-1 font-amiri text-xl leading-[1.8] font-semibold sm:text-[1.35rem] ${
                      isCompleted ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.content}
                  </h3>

                  <span
                    className={`flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-2 text-sm font-semibold tabular-nums ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                    aria-hidden="true"
                  >
                    {isCompleted ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      remaining
                    )}
                  </span>
                </motion.div>

                {item.description && (
                  <p className="mt-3 border-s-2 border-primary/30 ps-3 font-amiri text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </button>

              <div className="mt-4 flex justify-end gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="نسخ"
                      onClick={() => handleCopy(item.content)}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>نسخ النص</TooltipContent>
                </Tooltip>

                {isCompleted ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="إعادة تعيين"
                        onClick={() => handleReset(index, item.count)}
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>إعادة تعيين العداد</TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="عد تنازلي"
                        onClick={() => handleDecrement(index)}
                      >
                        <MinusSquare className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>العد التنازلي</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default ZikrCard;
