using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;

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

    public async Task<ProgramResponse> CreateProgramAsync(CreateProgramRequest request)
    {
        // Bygger en WorkoutProgram-entitet utifrån det klienten skickade in (bara Name, inget Id än)
        var program = new WorkoutProgram
        {
            Name = request.Name
        };
            // Skickar entiteten till Repository för att sparas i databasen.
            // Det som kommer tillbaka har nu ett Id, ifyllt av databasen
        var savedProgram = await _repository.CreateProgramAsync(program);
         // Bygger en ProgramResponse (med Id) utifrån den sparade entiteten,
        // för att bara skicka tillbaka det klienten faktiskt ska se
        var response = new ProgramResponse
        {
            Id = savedProgram.Id,
            Name = savedProgram.Name
        };
        // Skickas tillbaka till Controller, som i sin tur skickar det vidare till klienten
        return response;
    }

    public async Task<ProgramResponse?>DeleteProgramAsync(int programId)
    {
        var program = await  _repository.DeleteProgramAsync(programId);
        if(program == null)
        {
            return null;
        }
        var response = new ProgramResponse
        {
            Id = program.Id,
            Name = program.Name
        };
        return response;
        
    }
    public async Task<ProgramDetailResponse?>GetProgramByIdAsync(int programId)
    {
        var program = await _repository.GetProgramByIdAsync(programId);
        if(program == null)
        {
            return null;
        }
        var response = new ProgramDetailResponse
        {
            Id = program.Id,
            Name = program.Name,
            Sessions = program.Sessions.Select(s => new SessionDto
            {
                Id = s.Id,
                ProgramId = s.ProgramId,
                Name = s.Name,
                IsComplete = s.IsComplete
            }).ToList()
        };
        return response;
    }
}
