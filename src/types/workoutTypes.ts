export type Set = {
id: number,
reps: number,
weight: number,
workoutExerciseId: number
}
export type WorkoutExercise = {
  id: number,
  workoutId: number,
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