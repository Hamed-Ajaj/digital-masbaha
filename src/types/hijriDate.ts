export type HijriDate = {
  adjustedHolidays: string[];
  date: string;
  day: number;
  designation: {
    abbreviated: string;
    expanded: string;
  };
  format: string;
  method: string;
  month: {
    ar: string;
    days: number;
    en: string;
    number: number;
  };
  weekday: {
    ar: string;
    en: string;
  };
  year: number;
};
