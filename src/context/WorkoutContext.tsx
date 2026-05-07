import React, { createContext, useState } from "react"
import type { ReactNode } from "react"
type Exercise = {
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
}

type Props = {
  children: ReactNode
}

export const WorkoutContext = createContext<WorkoutContextType | null>(null)

export const WorkoutProvider = ({ children }: Props) => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])

  return (
    <WorkoutContext.Provider value={{ selectedExercises, setSelectedExercises }}>
      {children}
    </WorkoutContext.Provider>
  )
}