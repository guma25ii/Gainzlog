import React, { createContext, useState } from "react"
import type { ReactNode } from "react"


export type Exercise = {
  exerciseId: string
  name: string
  gifUrl: string
  bodyParts: string[]
  secondaryMuscles: string[]
  instructions: string[]
}

type WorkoutContextType = {
  selectedExercises: Exercise[]
  setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>
  addExercise: (exercise: Exercise) => void;
  removeExercise: (id: string) => void;
  resetWorkout: () => void
}


export type WorkoutExercise = {
  exercise: Exercise
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
const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])

const addExercise = (exercise: Exercise) => {
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

