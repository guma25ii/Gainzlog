export type Set = {
id: number,
reps: number,
weight: number,
workoutExerciseId: number
}
export type WorkoutExercise = {
  id: number,
  workoutId: number,
  exerciseId: string,
  name: string,
  sets: number,
  reps: number,
  weight: number,
  time: null | number,
  loggedSets: Set[]
}
 export type Session = {
  id: number,
  programId: null | number,
  name: string,
  isComplete: boolean,
  exercise: WorkoutExercise[]
}

export type Muscle = {
  name: string
}

export type ExerciseSummary = {
  exerciseId: string,
  name: string,
  gifUrl: string,
  bodyparts: string[]
}

export type ExerciseDetails = {
  exerciseId: string,
  name: string,
  gifUrl: string,
  bodyparts: string[],
  targetMuscles: string[],
  secondaryMuscles: string[],
  instructions: string[]
}