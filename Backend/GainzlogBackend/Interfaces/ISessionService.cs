using System;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;

namespace GainzlogBackend.Interfaces;

public interface ISessionService
{
    Task<SessionDto>CreateSessionAsync(CreateWorkoutRequest request);
    Task<List<SessionDto>>GetAllSessionAsync();
    Task<SessionDetailResponse?>GetSessionByIdAsync(int sessionId);
    Task<SessionDto?>UpdateSessionAsync(int sessionId, UpdateSessionRequest updateSessionRequest);
    Task<SessionDto?>DeleteSessionAsync(int sessionId);

}
