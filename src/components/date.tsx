import { Skeleton } from "./ui/skeleton";
import { useFetchHijriDate } from "@/hooks/useFetchHijriDate";

const DateComponent = ({ darkMode }: { darkMode: boolean }) => {
  const { loading, hijriDate, error } = useFetchHijriDate();

  if (loading) {
    return (
      <div
        className={`flex justify-between items-center h-full mb-5 ${
          darkMode ? "text-white" : "text-black"
        }`}
        dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
      >
        <div className="space-y-2">
          <Skeleton>
            <div className="h-6 w-28"></div>
          </Skeleton>
          <Skeleton className="w-24">
            <div className="h-6 max-w-24"></div>
          </Skeleton>
        </div>
        <div>
          <Skeleton>
            <div className="h-6 w-28"></div>
          </Skeleton>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-full my-2 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="flex justify-between items-center mb-4"
      dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
    >
      {/* Month with date */}
      <div>
        <div
          className={`text-xl md:text-2xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {hijriDate?.month.ar} {hijriDate?.day}
        </div>
        <div
          className={`text-[11px] sm:text-sm ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {hijriDate?.month.en} {hijriDate?.year}
        </div>
      </div>

      {/* Weekday */}
      <div
        className={`text-[11px] sm:text-sm ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {hijriDate?.weekday.ar} | {hijriDate?.weekday.en}
      </div>
    </div>
  );
};

export default DateComponent;
