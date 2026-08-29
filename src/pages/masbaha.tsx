import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DateComponent from "@/components/date";
import { useTranslation } from "react-i18next";
import ZikrCounter from "@/components/zikr-counter";

const MasbahaPage = () => {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-4 py-10 text-foreground sm:py-14">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="border-b border-border text-center">
          <div
            className="flex items-center justify-between"
            dir={localStorage.getItem("language") === "ar" ? "rtl" : "ltr"}
          >
            <h1 className="font-display text-2xl text-foreground">
              {t("digitalMasbaha")}
            </h1>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 pt-5">
          <DateComponent />
          <ZikrCounter />
        </CardContent>
      </Card>
    </main>
  );
};

export default MasbahaPage;
