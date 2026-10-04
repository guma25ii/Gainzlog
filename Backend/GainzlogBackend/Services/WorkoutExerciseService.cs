using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;

namespace GainzlogBackend.Services;

public class WorkoutExerciseService : IWorkoutExerciseService
{
    private readonly IWorkoutExerciseRepository _repository;

    public WorkoutExerciseService(IWorkoutExerciseRepository repository)
    {
        _repository = repository;
    }

    public async Task<ExerciseResponse> CreateExerciseAsync(CreateExerciseRequest createExerciseRequest)
    {
        var exercise = new WorkoutExercise
        {
            WorkoutId = createExerciseRequest.SessionId,
            Name = createExerciseRequest.Name,
            ExerciseId = createExerciseRequest.ExerciseId,
            Reps = createExerciseRequest.Reps,
            Sets = createExerciseRequest.Sets,
            Weight = createExerciseRequest.Weight,
            Time = createExerciseRequest.Time,
        };

        var createdExercise = await _repository.CreateExerciseAsync(exercise);

        var response = new ExerciseResponse
        {
            Id = createdExercise.Id,
            WorkoutId = createdExercise.WorkoutId,
            Name = createdExercise.Name,
            ExerciseId = createdExercise.ExerciseId,
            Sets = createdExercise.Sets,
            Reps = createdExercise.Reps,
            Weight = createdExercise.Weight,
            Time = createdExercise.Time
        };
        return response;
    }

    public async Task<ExerciseResponse?> DeleteExerciseAsync(int id)
    {
        var exercise = await _repository.DeleteExerciseAsync(id);
        if(exercise == null)
        {
            return null;
        }
        var deletedExercise = new ExerciseResponse
        {
            Id = exercise.Id,
            WorkoutId = exercise.WorkoutId,
            Name = exercise.Name,
            ExerciseId = exercise.ExerciseId,
            Sets = exercise.Sets,
            Reps = exercise.Reps,
            Weight = exercise.Weight,
            Time = exercise.Time
        };
        return deletedExercise;
    }

    public async Task<ExerciseDetailResponse?> GetExerciseByIdAsync(int id)
    {
        var exercise = await _repository.GetExerciseByIdAsync(id);
        if(exercise == null)
        {
            return null;
        }
        var response = new ExerciseDetailResponse
        {
            Id = exercise.Id,
            Name = exercise.Name,
            Sets = exercise.Sets,
            Reps = exercise.Reps,
            Weight = exercise.Weight,
            ExerciseId = exercise.ExerciseId,
            Time = exercise.Time,
            WorkoutId = exercise.WorkoutId,
            LoggedSets = exercise.LoggedSets.Select(s => new SetDto
                {
                    Id = s.Id,
                    Reps = s.Reps,
                    Weight = s.Weight
                }).ToList()
        };
        return response;
    }
}
   

  