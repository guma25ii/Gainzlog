using GainzlogBackend.Dto;


namespace GainzlogBackend.Interfaces;

public interface IProgramService
{
    Task<List<ProgramResponse>> GetAllAsync();
}
