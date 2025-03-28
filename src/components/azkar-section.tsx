import { azkarCategories } from "@/constants/azkar";
import { Button } from "./ui/button";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useFetchAzkar } from "@/hooks/useFetchAzkar";

const AzkarSection = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const { loading, azkar, error } = useFetchAzkar();
  const azkarSabah = azkar["أذكار الصباح"];
  console.log(azkarSabah);
  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center h-full my-2 text-black">
        Loading...
      </section>
    );
  }
  if (error) {
    return (
      <section className="flex justify-center items-center h-full my-2 text-black">
        {error}
      </section>
    );
  }
  if (!azkar) {
    return (
      <section className="flex justify-center items-center h-full my-2 text-black">
        No azkar found
      </section>
    );
  }
  return (
    <section>
      <section className="flex overflow-x-auto mx-auto justify-start items-center gap-2 scrollbar-hide py-4">
        {/* categories */}
        {azkarCategories.map((category, index) => (
          <Button
            key={index}
            variant={activeCategory === index ? "secondary" : "outline"}
            onClick={() => handleCategoryClick(index)}
          >
            <p className="text-sm text-center">{category.name}</p>
          </Button>
        ))}
      </section>

      {/* azkar section */}
      <section>
        {/* <ScrollArea className="h-[150px] w-full border rounded-md">
          {azkarSabah.map((azkar: any, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-2 p-4 border-b last:border-b-0"
            >
              <p className="text-sm">{azkar.content}</p>
            </div>
          ))}
        </ScrollArea> */}
      </section>
    </section>
  );
};

export default AzkarSection;
