import { AnimatePresence, motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy, MinusSquare } from "lucide-react";
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
  }, [azkar, activeCategory]);

  // Handle zikr click
  const handleZikrClick = (index: number) => {
    setRemainingCounts((prev) => {
      // Only decrease if count is greater than 0
      if (!prev[index] || prev[index] <= 0) return prev;

      const newCount = prev[index] - 1;

      if (newCount === 0) {
        toast.success("تم الانتهاء من الذكر", {
          duration: 1000,
        });
      }

      return { ...prev, [index]: newCount };
    });
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
          {azkar.map((item: zikrItem, index: number) => (
            <motion.div
              key={index}
              className={`bg-gray-100 cursor-pointer dark:bg-gray-800 p-4 rounded-lg shadow-md relative ${
                remainingCounts[index] === 0
                  ? "bg-green-200 pointer-events-none"
                  : ""
              }`}
              dir="rtl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-2 select-none">
                {/* zikr  */}
                <h3 className="text-[16px] sm:text-lg font-semibold leading-relaxed">
                  {item.content}
                </h3>
                <Badge variant="outline" className="text-sm whitespace-nowrap">
                  {/* zikr count */}
                  {remainingCounts[index]}
                </Badge>
              </div>

              {item.description && (
                <p className="text-[13px] sm:text-sm text-gray-600 dark:text-gray-400 mt-2 border-r-2 border-green-500 pr-2">
                  {item.description}
                </p>
              )}

              {/* copy button */}
              <div className="flex justify-start gap-2 mt-4 rtl:flex-row-reverse">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 cursor-pointer"
                      onClick={() => handleCopyText(item.content)}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">نسخ</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>نسخ النص</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 cursor-pointer"
                      onClick={() => handleZikrClick(index)}
                    >
                      <MinusSquare className="h-4 w-4" />
                      {/* Remaining count */}
                      <span className="sr-only">العد</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {remainingCounts[index] === 0
                        ? "تم الانتهاء من الذكر"
                        : "العد التنازلي"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default ZikrCard;
