import AzkarCategoriesSection from "@/components/azkar-categories";
import AzkarLoader from "@/components/ui/azkar-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetchAzkar } from "@/hooks/useFetchAzkar";
import ZikrCard from "@/components/zikr-card";
import { useState } from "react";
import { useThemeContext } from "@/context/useThemeContext";

const AzkarPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("morning");
  const {
    data: azkar,
    isLoading: loading,
    isError: error,
  } = useFetchAzkar(activeCategory);
  const { darkMode } = useThemeContext();

  return (
    <main
      className={`flex min-h-screen font-amiri flex-col items-center ${
        darkMode ? "dark bg-slate-900" : "bg-slate-50"
      } justify-between sm:p-4 md:py-14 w-full mx-auto`}
    >
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
            // zikr card
            <ZikrCard azkar={azkar} activeCategory={activeCategory} />
          )}

          {/* No Azkar Message */}
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
