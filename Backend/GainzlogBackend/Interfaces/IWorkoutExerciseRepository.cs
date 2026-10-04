using System;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;

namespace GainzlogBackend.Interfaces;

public interface IWorkoutExerciseRepository
{
Task<WorkoutExercise> CreateExerciseAsync(WorkoutExercise workoutExercise);
Task<WorkoutExercise?>GetExerciseByIdAsync(int id);
Task<WorkoutExercise?>DeleteExerciseAsync(int id);
}
