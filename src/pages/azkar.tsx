import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Share2, Copy } from "lucide-react";

import AzkarCategoriesSection from "@/components/azkar-categories";
import AzkarLoader from "@/components/ui/azkar-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetchAzkar } from "@/hooks/useFetchAzkar";
import { zikrItem } from "@/types/azkarTypes";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const AzkarPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("morning");
  const { azkar, loading, error } = useFetchAzkar(activeCategory);
  // const [isSpeaking, setIsSpeaking] = useState<number | null>(null);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم النسخ", {
      description: "تم نسخ الذكر إلى الحافظة",
      duration: 2000,
    });
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "أذكار",
          text: text,
        });
        toast("تمت المشاركة", {
          description: "تم مشاركة الذكر بنجاح",
          duration: 2000,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          toast("خطأ في المشاركة", {
            description: "تعذرت مشاركة الذكر",
            duration: 2000,
          });
        }
      }
    } else {
      // Only if Web Share API is not available, show a different UI option
      toast("خطأ في المشاركة", {
        description: "ميزة المشاركة غير متوفرة على هذا المتصفح",
        duration: 2000,
        action: (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopyText(text)}
          >
            نسخ النص بدلاً
          </Button>
        ),
      });
    }
  };

  // const speakText = (text: string, index: number) => {
  //   if (!window.speechSynthesis) {
  //     toast("خطأ", {
  //       description: "قراءة النص غير مدعومة في هذا المتصفح",
  //       duration: 2000,
  //     });
  //     return;
  //   }

  //   if (isSpeaking === index) {
  //     window.speechSynthesis.cancel();
  //     setIsSpeaking(null);
  //     return;
  //   }

  //   // Cancel any ongoing speech
  //   window.speechSynthesis.cancel();

  //   const utterance = new SpeechSynthesisUtterance(text);

  //   // Try to find an Arabic voice
  //   const voices = window.speechSynthesis.getVoices();
  //   const arabicVoice = voices.find(
  //     (voice) => voice.lang.includes("ar") || voice.name.includes("Arabic")
  //   );

  //   if (arabicVoice) {
  //     utterance.voice = arabicVoice;
  //   }

  //   utterance.lang = "ar";
  //   utterance.rate = 0.9; // Slightly slower
  //   utterance.pitch = 1;

  //   utterance.onend = () => setIsSpeaking(null);
  //   utterance.onerror = (event) => {
  //     console.error("Speech synthesis error:", event);
  //     setIsSpeaking(null);
  //     toast("خطأ", {
  //       description: "حدث خطأ أثناء قراءة النص",
  //       duration: 2000,
  //     });
  //   };

  //   window.speechSynthesis.speak(utterance);
  //   setIsSpeaking(index);
  // };

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
    <main className="flex min-h-screen font-amiri flex-col items-center bg-slate-50 dark:bg-slate-900 justify-between p-4 md:py-14 w-full mx-auto">
      <Card className="shadow-lg p-3 md:p-6 max-w-3xl w-full">
        {/* Category Selection */}
        <section className="flex flex-col items-center justify-center border-b-2 border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <AzkarCategoriesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </section>

        {/* Azkar Content */}
        <section className="flex flex-col w-full gap-4">
          {loading && <AzkarLoader />}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="mx-auto"
              >
                إعادة المحاولة
              </Button>
            </div>
          )}

          {azkar && azkar.length > 0 && (
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
                      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md relative"
                      dir="rtl"
                      variants={itemVariants}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                        <h3 className="text-[14px] sm:text-lg font-semibold leading-relaxed">
                          {item.content}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-sm whitespace-nowrap"
                        >
                          {item.count}
                        </Badge>
                      </div>

                      {item.description && (
                        <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-400 mt-2 border-r-2 border-green-500 pr-2">
                          {item.description}
                        </p>
                      )}

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

                        {/* <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleShare(item.content)}
                            >
                              <Share2 className="h-4 w-4" />
                              <span className="sr-only">مشاركة</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>مشاركة</p>
                          </TooltipContent>
                        </Tooltip> */}

                        {/* <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                isSpeaking === index ? "secondary" : "ghost"
                              }
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => speakText(item.content, index)}
                            >
                              {isSpeaking === index ? (
                                <VolumeX className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {isSpeaking === index
                                  ? "إيقاف القراءة"
                                  : "قراءة النص"}
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {isSpeaking === index
                                ? "إيقاف القراءة"
                                : "قراءة النص"}
                            </p>
                          </TooltipContent>
                        </Tooltip> */}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TooltipProvider>
          )}

          {azkar && azkar.length === 0 && !loading && !error && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                لا توجد أذكار متاحة في هذه الفئة
              </p>
            </div>
          )}
        </section>
      </Card>
    </main>
  );
};

export default AzkarPage;
