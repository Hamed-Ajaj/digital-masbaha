import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      target: "Target",
      digitalMasbaha: "Digital Masbaha",
      tasbihCounter: "Tasbih Counter",
      goal: "Goal",
      count: "Count",
      reset: "Reset",
      save: "Save",
      darkMode: "Dark Mode",
      complete: "Complete",
      instruction: "Tap the count button or press spacebar to increment",
      setGoal: "Set Goal",
      customGoal: "Custom Goal",
      noGoal: "No Goal",
      goalReached: "Goal Reached",
    },
  },
  ar: {
    translation: {
      target: "الهدف",
      digitalMasbaha: "مسبحة رقمية",
      tasbihCounter: "عداد التسبيح",
      goal: "الهدف",
      count: "العد",
      reset: "إعادة تعيين",
      save: "حفظ",
      darkMode: "الوضع الليلي",
      complete: "مكتمل",
      instruction: "اضغط على زر العد أو اضغط على مفتاح المسافة لزيادة",
      setGoal: "تعيين الهدف",
      customGoal: "الهدف المخصص",
      noGoal: "لا يوجد هدف",
      goalReached: "تم الوصول إلى الهدف",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    // Enable RTL support for Arabic
    supportedLngs: ["en", "ar"],
    load: "languageOnly",
    // Add this to handle RTL/LTR direction changes
    react: {
      useSuspense: false,
      bindI18n: "languageChanged",
      bindI18nStore: "",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
      bindRootStore: true,
    },
  });

export default i18n;
