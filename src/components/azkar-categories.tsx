import { azkarCategories } from "@/constants/azkar";
import { Button } from "./ui/button";

const AzkarCategoriesSection = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (categoryValue: string) => void;
}) => {
  const handleCategoryClick = (categoryValue: string) => {
    setActiveCategory(categoryValue);
  };

  return (
    <section>
      <section
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto gap-2 py-4"
        // dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
      >
        {/* categories */}
        {azkarCategories.map((category) => (
          <Button
            key={category.id}
            variant={
              activeCategory === category.value ? "secondary" : "outline"
            }
            onClick={() => handleCategoryClick(category.value)}
            className="cursor-pointer"
          >
            <p className="text-sm text-center">{category.name}</p>
          </Button>
        ))}
      </section>
    </section>
  );
};

export default AzkarCategoriesSection;
