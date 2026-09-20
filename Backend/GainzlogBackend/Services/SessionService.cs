using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;

namespace GainzlogBackend.Services;

public class SessionService : ISessionService
{
    private readonly ISessionRepository _repository;

    public SessionService (ISessionRepository repository)
    {
        _repository = repository;
    }

    public async Task<SessionDto>CreateSessionAsync(CreateWorkoutRequest request)
    {
        var session = new Session
        {
            Name = request.Name,
            ProgramId = request.ProgramId
        };

        var savedSession =  await _repository.CreateSessionAsync(session);

        var response = new SessionDto
        {
            Id = savedSession.Id,
            ProgramId = savedSession.ProgramId,
            Name = savedSession.Name,
            IsComplete = savedSession.IsComplete
        };
        return response;
    }

}
