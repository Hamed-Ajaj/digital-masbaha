import AzkarCategoriesSection from "@/components/azkar-categories";
import AzkarLoader from "@/components/ui/azkar-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetchAzkar } from "@/hooks/useFetchAzkar";
import ZikrCard from "@/components/zikr-card";
import { useState } from "react";

const AzkarPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("morning");
  const {
    data: azkar,
    isLoading: loading,
    isError: error,
    refetch,
  } = useFetchAzkar(activeCategory);

  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center bg-background px-4 pb-16 pt-8 sm:px-6 md:py-10">
      <h1 className="sr-only">الأذكار</h1>

      <Card className="w-full max-w-3xl gap-0 overflow-hidden border-border py-0 shadow-sm">
        <div className="border-b border-border bg-card px-4 py-5 sm:px-6">
          <AzkarCategoriesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <section className="w-full bg-background/45 p-3 sm:p-5">
          {loading && <AzkarLoader />}

          {error && (
            <div className="py-10 text-center" dir="rtl">
              <p className="mb-3 text-sm text-muted-foreground">
                تعذّر تحميل الأذكار، حاول مرة أخرى.
              </p>
              <Button variant="outline" onClick={() => refetch()}>
                إعادة المحاولة
              </Button>
            </div>
          )}

          {azkar && azkar.length > 0 && (
            <ZikrCard key={activeCategory} azkar={azkar} />
          )}

          {azkar && azkar.length === 0 && !loading && !error && (
            <div className="py-10 text-center" dir="rtl">
              <p className="text-sm text-muted-foreground">
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
