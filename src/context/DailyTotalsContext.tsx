import { createContext, useContext, useEffect, useState } from "react";
import { getTodaysMeals } from "../api/meals";

type DailyTotals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type DailyTotalsContextType = {
  dailyTotals: DailyTotals;
  refreshDailyTotals: () => Promise<void>;
};

const DailyTotalsContext = createContext<DailyTotalsContextType | undefined>(
  undefined
);

export const DailyTotalsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dailyTotals, setDailyTotals] = useState<DailyTotals>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const refreshDailyTotals = async () => {
    try {
      const data = await getTodaysMeals();
      setDailyTotals(data.dailyTotals);
    } catch (err) {
      console.error("Failed To Refresh Totals", err);
    }
  };

  useEffect(() => {
    refreshDailyTotals();
  }, []);

  return (
    <DailyTotalsContext.Provider
      value={{ dailyTotals, refreshDailyTotals }}
    >
      {children}
    </DailyTotalsContext.Provider>
  );
};

export const useDailyTotals = () => {
  const context = useContext(DailyTotalsContext);
  if (!context) {
    throw new Error("useDailyTotals must be used within provider");
  }
  return context;
};