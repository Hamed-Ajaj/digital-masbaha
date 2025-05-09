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
import { useThemeContext } from "@/context/useThemeContext";

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
  const { darkMode } = useThemeContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم النسخ", {
      description: "تم نسخ الذكر إلى الحافظة",
      duration: 2000,
      className: darkMode ? "dark-toast" : "",
    });
  };

  // Initialize remaining counts when azkar data changes
  useEffect(() => {
    if (!azkar?.length) return;

    const initialCounts = Object.fromEntries(
      azkar.map((item, index) => [index, parseInt(item.count) || 0])
    );

    setRemainingCounts(initialCounts);

    // Skip animation on first render, only animate on subsequent data changes
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [azkar, activeCategory, isFirstRender]);

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
          className: darkMode ? "dark-toast" : "",
        });
      }

      return { ...prev, [index]: newCount };
    });
  };

  // Reset a specific zikr count
  const handleResetZikr = (index: number, count: string) => {
    const resetCount = parseInt(count) || 0;
    setRemainingCounts((prev) => ({ ...prev, [index]: resetCount }));

    toast.info("تم إعادة تعيين العداد", {
      duration: 1000,
      className: darkMode ? "dark-toast" : "",
    });
  };

  // Enhanced animation configurations for motion/react
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <TooltipProvider>
      <AnimatePresence mode="popLayout">
        <motion.div
          className="flex flex-col gap-4"
          dir="rtl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={activeCategory}
        >
          {azkar.map((item: zikrItem, index: number) => {
            const isCompleted = remainingCounts[index] === 0;
            return (
              <motion.div
                key={`${activeCategory}-${index}`}
                className={`${
                  darkMode
                    ? "dark:bg-gray-800/90 dark:hover:bg-gray-800"
                    : "bg-gray-100 hover:bg-gray-50"
                } p-5 rounded-lg shadow-md relative 
                transition-colors duration-300 cursor-pointer ${
                  isCompleted
                    ? darkMode
                      ? "dark:bg-green-900/20 dark:border dark:border-green-700/70"
                      : "bg-green-100 border border-green-300"
                    : "hover:shadow-lg"
                }`}
                dir="rtl"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.2 }}
                onClick={() => !isCompleted && handleZikrClick(index)}
              >
                {isCompleted && (
                  <div
                    className={`absolute -top-2 -left-2 ${
                      darkMode ? "bg-green-600" : "bg-green-500"
                    } text-white rounded-full p-1`}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start gap-2 select-none">
                  {/* zikr  */}
                  <h3
                    className={`text-[16px] sm:text-lg font-semibold leading-relaxed ${
                      isCompleted
                        ? darkMode
                          ? "text-green-400"
                          : "text-green-700"
                        : darkMode
                        ? "text-gray-100"
                        : "text-gray-800"
                    }`}
                  >
                    {item.content}
                  </h3>
                  <Badge
                    variant={isCompleted ? "success" : "default"}
                    className={`text-sm whitespace-nowrap transform transition-all duration-300 ${
                      isCompleted
                        ? darkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-500 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-200"
                        : ""
                    }`}
                  >
                    {/* zikr count */}
                    {remainingCounts[index]}
                  </Badge>
                </div>

                {item.description && (
                  <p
                    className={`text-[13px] sm:text-sm mt-2 border-r-2 border-green-500 pr-2 select-none ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
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
                        className={`h-8 w-8 p-0 cursor-pointer ${
                          darkMode
                            ? "text-gray-300 hover:text-white hover:bg-gray-700"
                            : ""
                        }`}
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
                          className={`h-8 w-8 p-0 cursor-pointer ${
                            darkMode
                              ? "text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                              : "text-yellow-600 hover:text-yellow-700"
                          }`}
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
                          className={`h-8 w-8 p-0 cursor-pointer ${
                            darkMode
                              ? "text-gray-300 hover:text-white hover:bg-gray-700"
                              : ""
                          }`}
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
