import { azkarCategories } from "@/constants/azkar";
import { Button } from "./ui/button";

const AzkarCategoriesSection = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (categoryValue: string) => void;
}) => {
  return (
    <section dir="rtl" aria-label="فئات الأذكار">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-xl text-foreground">ورد اليوم</p>
          <p className="mt-1 text-xs text-muted-foreground">
            اختر الفئة التي ترغب في قراءتها
          </p>
        </div>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {azkarCategories.length} فئات
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {azkarCategories.map((category) => {
          const isActive = activeCategory === category.value;

          return (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => setActiveCategory(category.value)}
              aria-pressed={isActive}
              className={`min-w-0 cursor-pointer touch-manipulation border py-5 text-sm transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-none hover:bg-primary/90 hover:text-primary-foreground"
                  : "bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="truncate">{category.name}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
};

export default AzkarCategoriesSection;
