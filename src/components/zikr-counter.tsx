import { useState } from "react";
import { useTranslation } from "react-i18next";
import ZikrControlers from "./ui/zikr-controlers";

const ZikrCounter = () => {
  const [tasbih, setTasbih] = useState<number>(() =>
    parseInt(localStorage.getItem("tasbih") || "0", 10) || 0
  );
  const [goal, setGoal] = useState<number>(() => {
    const stored = parseInt(localStorage.getItem("goal") || "33", 10);
    return Number.isNaN(stored) ? 33 : stored;
  });
  const { t } = useTranslation();

  const reached = goal > 0 && tasbih >= goal;
  const beadCount = goal > 0 ? Math.min(goal, 33) : 0;
  const doneBeads = beadCount > 0 ? Math.floor((tasbih / goal) * beadCount) : 0;
  const progress = goal > 0 ? Math.min(100, Math.round((tasbih / goal) * 100)) : 0;

  return (
    <section>
      <div
        className={`mb-6 rounded-2xl border px-6 py-8 text-center transition-colors ${
          reached ? "border-primary/40 bg-primary/10" : "bg-muted/60"
        }`}
      >
        {/* Big number */}
        <div
          className={`mb-3 font-sans text-7xl font-extrabold tabular-nums leading-none ${
            reached ? "text-primary" : "text-foreground"
          }`}
          aria-live="polite"
        >
          {tasbih}
        </div>

        {/* Misbaha beads — the signature */}
        {beadCount > 0 && (
          <div
            className="mx-auto flex max-w-[240px] flex-wrap justify-center gap-1.5"
            aria-hidden="true"
          >
            {Array.from({ length: beadCount }).map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i < doneBeads ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-4 text-sm text-muted-foreground" dir="rtl">
          {goal > 0
            ? `${t("target")}: ${goal} · ${progress}%`
            : t("noGoal")}
        </div>

        {reached && (
          <div
            className="mt-2 font-display text-sm font-semibold text-gold"
            aria-live="polite"
          >
            {t("goalReached")} ✦
          </div>
        )}
      </div>

      <ZikrControlers
        goal={goal}
        setGoal={setGoal}
        setTasbih={setTasbih}
        tasbih={tasbih}
      />
    </section>
  );
};

export default ZikrCounter;
