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

    public async Task<SessionDto?> DeleteSessionAsync(int sessionId)
    {
        var session = await _repository.DeleteSessionAsync(sessionId);
        if(session == null)
        {
            return null;
        }
        var deleteSession = new SessionDto
        {
            Id = session.Id,
            Name = session.Name,
            ProgramId = session.ProgramId,
            IsComplete = session.IsComplete,
        };
        return deleteSession;
    }

    public async Task<List<SessionDto>> GetAllSessionAsync()
    {
        List<Session> session = await  _repository.GetAllSessionAsync();

        return session.Select(s => new SessionDto
        {
            Id = s.Id,
            Name = s.Name,
            ProgramId = s.ProgramId,
            IsComplete = s.IsComplete
        }).ToList();
    }

    public async Task<SessionDetailResponse?> GetSessionByIdAsync(int sessionId)
    {
        var session = await _repository.GetSessionByIdAsync(sessionId);
        if(session == null)
        {
            return null;
        }
        var response = new SessionDetailResponse
        {
            Id = session.Id,
            ProgramId = session.ProgramId,
            Name = session.Name,
            IsComplete = session.IsComplete,
            Exercises = session.Exercise.Select(e => new WorkoutExerciseDto
            {
                Id = e.Id,
                Name = e.Name,
                ExerciseId = e.ExerciseId,
                Sets = e.Sets,
                Reps = e.Reps,
                Weight = e.Weight,
                Time = e.Time,
                LoggedSets = e.LoggedSets.Select(s => new SetDto
                {
                    Id = s.Id,
                    Reps = s.Reps,
                    Weight = s.Weight
                }).ToList()
            }).ToList()
        };
        return response;
    }

    public async Task<SessionDto?> UpdateSessionAsync(int sessionId, UpdateSessionRequest updateSessionRequest)
    {
        var update = await _repository.UpdateSessionAsync(sessionId, updateSessionRequest.IsComplete);
        if(update == null)
        {
            return null;
        }
        var updatedSession = new SessionDto
        {
            Id = update.Id,
            Name = update.Name,
            ProgramId = update.ProgramId,
            IsComplete = update.IsComplete
        };
        return updatedSession;
    }
}
