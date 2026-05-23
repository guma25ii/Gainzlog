export type Gender = "male" | "female";

export type ActivityLevel = 
"sedentary"|
"light"|
"moderate"|
"active"|
"very_active";



export type Goal = "lose_weight" | "maintain" | "gain_muscle";


export function calculateBMR({
    weight,
    height,
    age,
    gender
}: {
weight: number;
height: number;
age: number;
gender: Gender;
}){
    const base = 10 * weight + 6.25 * height - 5 * age;
    return gender === "male" ? base + 5 : base - 161;
};

const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
};

export function calculateTDEE(bmr: number, activity: ActivityLevel){
    return bmr * activityMultipliers[activity];
}

export function calculateGoalCalories(tdee: number, goal: Goal){
    switch (goal){
        case "lose_weight":
            return tdee - 500;

        case "gain_muscle":
            return tdee + 300;

        case "maintain":
            default:
                return tdee;
    }
}