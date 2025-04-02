import AzkarCategoriesSection from "@/components/azkar-categories";
import AzkarLoader from "@/components/ui/azkar-loader";
import { Card } from "@/components/ui/card";
import { useFetchAzkar } from "@/hooks/useFetchAzkar";
import { zikrItem } from "@/types/azkarTypes";
import { useState } from "react";

const AzkarPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("morning");
  const { azkar, loading, error } = useFetchAzkar(activeCategory);
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 justify-between p-4 md:py-14 w-full mx-auto">
      <Card className={` shadow-lg p-3 md:p-6 max-w-3xl`}>
        {/* categories  */}
        <section className="flex flex-col items-center justify-center border-b-2">
          <AzkarCategoriesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </section>

        {/* azkar */}
        <section className="flex flex-col w-full gap-4">
          {loading && <AzkarLoader />}
          {error && <p className="text-center text-red-500">{error}</p>}
          {azkar && (
            <div className="flex flex-col gap-4" dir="rtl">
              {azkar.map((item: zikrItem, index: number) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
                  dir="rtl"
                >
                  <h3 className="text-lg font-semibold">{item.content}</h3>
                  {/* <p className="text-sm text-green-300 mt-2">
                    {item?.description}
                  </p> */}
                  <p className="mt-2">{item.count}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </Card>
    </main>
  );
};

export default AzkarPage;
