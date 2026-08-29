import { Skeleton } from "./ui/skeleton";
import { useFetchHijriDate } from "@/hooks/useFetchHijriDate";

const DateComponent = () => {
  const { isLoading: loading, data, isError } = useFetchHijriDate();
  const hijriDate = data?.hijri;

  const dir = localStorage.getItem("language") === "ar" ? "rtl" : "ltr";

  if (loading) {
    return (
      <div className="mb-5 flex h-full items-center justify-between" dir={dir}>
        <div className="space-y-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div
      className="mb-4 flex items-center justify-between"
      dir={dir}
    >
      <div>
        <div className="text-xl font-bold tabular-nums md:text-2xl">
          {hijriDate?.month.ar} {hijriDate?.day}
        </div>
        <div className="text-xs text-muted-foreground sm:text-sm">
          {hijriDate?.month.en} {hijriDate?.year}
        </div>
      </div>

      <div className="text-xs text-muted-foreground sm:text-sm">
        {hijriDate?.weekday.ar} · {hijriDate?.weekday.en}
      </div>
    </div>
  );
};

export default DateComponent;
