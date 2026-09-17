using GainzlogBackend.Models;


namespace GainzlogBackend.Interfaces;

public interface IProgramRepository
{
    Task<List<WorkoutProgram>> GetAllWorkoutProgramsAsync();
    Task<WorkoutProgram> CreateProgramAsync(WorkoutProgram workoutProgram);
    Task<WorkoutProgram?> DeleteProgramAsync(int programId);
    Task<WorkoutProgram?> GetProgramByIdAsync(int programId);

}
