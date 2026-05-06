import React, { createContext, useContext, useState, useEffect } from 'react';

// Definiera typer för nutrition-data
export type NutritionGoal = {
  calorieGoal: number;
  proteinGoal: number;
  carbGoal: number;
  fatGoal: number;
  currentCalories: number;
  currentProtein: number;
  currentCarbs: number;
  currentFat: number;
};

type NutritionContextValue = {
  goals: NutritionGoal;
  setGoals: React.Dispatch<React.SetStateAction<NutritionGoal>>;
};

// Skapa context
const NutritionContext = createContext<NutritionContextValue | undefined>(undefined);

// Initialvärden
const initialGoals: NutritionGoal = {
  calorieGoal: 2000,
  proteinGoal: 150,
  carbGoal: 250,
  fatGoal: 70,
  currentCalories: 0,
  currentProtein: 0,
  currentCarbs: 0,
  currentFat: 0,
};

// Provider-komponent
export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<NutritionGoal>(initialGoals);

  // Läs in från localStorage vid start
  useEffect(() => {
    const saved = localStorage.getItem('nutritionGoals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGoals(parsed);
      } catch (error) {
        console.error('Fel vid läsning av nutritionGoals från localStorage:', error);
      }
    }
  }, []);

  // Spara till localStorage när goals ändras
  useEffect(() => {
    localStorage.setItem('nutritionGoals', JSON.stringify(goals));
  }, [goals]);

  return (
    <NutritionContext.Provider value={{ goals, setGoals }}>
      {children}
    </NutritionContext.Provider>
  );
};

// Custom hook för att använda context
export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition måste användas inom NutritionProvider');
  }
  return context;
};