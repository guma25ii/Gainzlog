import React, { createContext, useState } from "react"
import type { ReactNode } from "react"
import type { ExerciseSummary } from "../types/workoutTypes"


type WorkoutContextType = {
  selectedExercises: ExerciseSummary[]
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseSummary[]>>
  addExercise: (exercise: ExerciseSummary) => void;
  removeExercise: (id: string) => void;
  resetWorkout: () => void
}


export type WorkoutExercise = {
  exercise: ExerciseSummary
  sets: number
  reps: number
  weight: number
}




type Props = {
  children: ReactNode
}

export const WorkoutContext = createContext<WorkoutContextType | null>(null)

export const WorkoutProvider = ({ children }: Props) => {
const resetWorkout = () => {
  setSelectedExercises([])
}
const [selectedExercises, setSelectedExercises] = useState<ExerciseSummary[]>([])

const addExercise = (exercise: ExerciseSummary) => {
  setSelectedExercises(prev => {
    const exists = prev.some(
      ex => ex.exerciseId === exercise.exerciseId
    )

    if (exists) return prev 

    return [...prev, exercise]
  })
}

  const removeExercise = (id: string) => {
    setSelectedExercises(prev => prev.filter(ex => ex.exerciseId !== id))
    
  }

  return (
    <WorkoutContext.Provider value={{ selectedExercises, setSelectedExercises, addExercise, removeExercise, resetWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
}

