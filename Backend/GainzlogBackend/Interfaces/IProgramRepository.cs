using GainzlogBackend.Models;


namespace GainzlogBackend.Interfaces;

public interface IProgramRepository
{
    Task<List<WorkoutProgram>> GetAllWorkoutProgramsAsync();

}
