using GainzlogBackend.Dto;
using GainzlogBackend.Models;


namespace GainzlogBackend.Interfaces;

public interface IProgramService
{
    Task<List<ProgramResponse>> GetAllAsync();

 // Det som kommer IN i metoden (från controllern)                         Det som skickas UT/retur (till controllern)
 // skickas efter databasen skapat posten → Id finns                       skickas innan något finns i databasen → inget Id att
    Task<ProgramResponse> CreateProgram(CreateProgramRequest request);
}
