import { AnimatePresence, motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy, MinusSquare, RotateCcw, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { zikrItem } from "@/types/azkarTypes";

const ZikrCard = ({
  azkar,
  activeCategory,
}: {
  azkar: zikrItem[];
  activeCategory: string;
}) => {
  const [remainingCounts, setRemainingCounts] = useState<
    Record<number, number>
  >({});
  const [completedZikrs, setCompletedZikrs] = useState<Set<number>>(new Set());

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم النسخ", {
      description: "تم نسخ الذكر إلى الحافظة",
      duration: 2000,
    });
  };

  // Initialize remaining counts when azkar data changes
  useEffect(() => {
    if (!azkar?.length) return;

    const initialCounts = Object.fromEntries(
      azkar.map((item, index) => [index, parseInt(item.count) || 0])
    );

    setRemainingCounts(initialCounts);
    setCompletedZikrs(new Set());
  }, [azkar, activeCategory]);

  // Handle zikr click with haptic feedback and improved animations
  const handleZikrClick = (index: number) => {
    setRemainingCounts((prev) => {
      // Only decrease if count is greater than 0
      if (!prev[index] || prev[index] <= 0) return prev;

      const newCount = prev[index] - 1;

      if (newCount === 0) {
        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }

        toast.success("تم الانتهاء من الذكر", {
          duration: 1000,
          icon: <CheckCircle className="h-4 w-4" />,
        });

        // Mark this zikr as completed
        setCompletedZikrs((prev) => new Set(prev).add(index));
      }

      return { ...prev, [index]: newCount };
    });
  };

  // Reset a specific zikr count
  const handleResetZikr = (index: number, count: string) => {
    const resetCount = parseInt(count) || 0;
    setRemainingCounts((prev) => ({ ...prev, [index]: resetCount }));

    // Remove from completed set
    setCompletedZikrs((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });

    toast.info("تم إعادة تعيين العداد", { duration: 1000 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <TooltipProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="flex flex-col gap-4"
          dir="rtl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {azkar.map((item: zikrItem, index: number) => {
            const isCompleted = remainingCounts[index] === 0;
            return (
              <motion.div
                key={index}
                className={`bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md relative 
                transition-all duration-300 cursor-pointer ${
                  isCompleted
                    ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                    : "hover:shadow-lg"
                }`}
                dir="rtl"
                variants={itemVariants}
                whileHover={{ scale: isCompleted ? 1.0 : 1.02 }}
                whileTap={{ scale: isCompleted ? 1.0 : 0.98 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => !isCompleted && handleZikrClick(index)}
              >
                {isCompleted && (
                  <div className="absolute -top-2 -left-2 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start gap-2 select-none">
                  {/* zikr  */}
                  <h3
                    className={`text-[16px] sm:text-lg font-semibold leading-relaxed ${
                      isCompleted ? "text-green-700 dark:text-green-300" : ""
                    }`}
                  >
                    {item.content}
                  </h3>
                  <Badge
                    variant={isCompleted ? "success" : "default"}
                    className={`text-sm whitespace-nowrap transform transition-all duration-300 ${
                      isCompleted ? "bg-green-500 text-white" : ""
                    }`}
                  >
                    {/* zikr count */}
                    {remainingCounts[index]}
                  </Badge>
                </div>

                {item.description && (
                  <p className="text-[13px] sm:text-sm text-gray-600 dark:text-gray-400 mt-2 border-r-2 border-green-500 pr-2 select-none">
                    {item.description}
                  </p>
                )}

                {/* action buttons */}
                <div className="flex justify-start gap-2 mt-4 rtl:flex-row-reverse">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyText(item.content);
                        }}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">نسخ</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>نسخ النص</p>
                    </TooltipContent>
                  </Tooltip>

                  {isCompleted ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetZikr(index, item.count);
                          }}
                        >
                          <RotateCcw className="h-4 w-4" />
                          <span className="sr-only">إعادة تعيين</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>إعادة تعيين العداد</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleZikrClick(index);
                          }}
                        >
                          <MinusSquare className="h-4 w-4" />
                          <span className="sr-only">العد</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>العد التنازلي</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default ZikrCard;
