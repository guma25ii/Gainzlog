using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using System.Linq;

namespace GainzlogBackend.Services;

public class ProgramService : IProgramService
{
         // Service pratar bara med Repository-interfacet, aldrig med DbContext direkt
        private readonly IProgramRepository _repository;

    public ProgramService(IProgramRepository repository)
    {
        _repository = repository;
    }
    public async Task<List<ProgramResponse>> GetAllAsync()
    {
        // Hämtar rådata (entiteter) från repository/databasen
        List<WorkoutProgram> workoutProgram = await _repository.GetAllWorkoutProgramsAsync(); 
        // Mappar entiteter -> DTO:er, så vi bara skickar ut det klienten faktiskt ska se
        return workoutProgram.Select(wp => new ProgramResponse
        {
            Id = wp.Id,
            Name = wp.Name
        }).ToList();
    }
}
