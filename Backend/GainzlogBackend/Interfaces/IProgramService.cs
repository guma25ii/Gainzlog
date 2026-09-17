using GainzlogBackend.Dto;
using GainzlogBackend.Models;


namespace GainzlogBackend.Interfaces;

public interface IProgramService
{
    Task<List<ProgramResponse>> GetAllAsync();

 // Det som skickas ut från metoden här, returtyp                          Metoden tar emot det som är på denna sidan parameter
 // skickas efter databasen skapat posten → Id finns                       
//  Task<VadSomGårUT> MetodNamn(VadSomKommerIN parameter);
    Task<ProgramResponse> CreateProgramAsync(CreateProgramRequest request);

    Task<ProgramResponse?>DeleteProgramAsync(int programId);

    Task<ProgramDetailResponse>GetProgramByIdAsync(int programId);
}
