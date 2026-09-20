using GainzlogBackend.Models;


namespace GainzlogBackend.Interfaces;


public interface ISessionRepository
{
    Task<Session> CreateSessionAsync(Session session);
}