using GainzlogBackend.Dto;

namespace GainzlogBackend.Interfaces;

public interface IWorkoutExerciseService
{
Task<ExerciseResponse>CreateExerciseAsync(CreateExerciseRequest createExerciseRequest);

Task<ExerciseDetailResponse?>GetExerciseByIdAsync(int id);
Task<ExerciseResponse?> DeleteExerciseAsync(int id);

}
