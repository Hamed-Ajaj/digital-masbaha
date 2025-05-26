import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DateComponent from "@/components/date";
import { useTranslation } from "react-i18next";
import ZikrCounter from "@/components/zikr-counter";
import { useThemeContext } from "@/context/useThemeContext";

const MasbahaPage = () => {
  // const [customGoal, setCustomGoal] = useState<number>(0);
  const { t } = useTranslation();
  const { darkMode } = useThemeContext();
  console.log("darkMode", darkMode);
  return (
    <div
      className={`min-h-screen flex flex-col items-center  py-14 ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Card
        className={`w-full max-w-md shadow-lg ${
          darkMode ? "bg-slate-800 border-slate-700" : "bg-white"
        }`}
      >
        <CardHeader className="text-center border-b pb-1 md:pb-3">
          <div
            className="flex justify-between items-center"
            dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
          >
            <CardTitle
              className={`text-xl md:text-2xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {t("digitalMasbaha")}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className=" flex flex-col gap-4 pt-1">
          {/* date display */}
          <DateComponent darkMode={darkMode} />
          {/* Counter display */}
          <ZikrCounter />
        </CardContent>
      </Card>
    </div>
  );
};

export default MasbahaPage;
