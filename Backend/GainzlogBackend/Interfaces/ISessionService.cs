using System;
using GainzlogBackend.Dto;

namespace GainzlogBackend.Interfaces;

public interface ISessionService
{
    Task<SessionDto>CreateSessionAsync(CreateWorkoutRequest request);

}
