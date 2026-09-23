using GainzlogBackend.Models;


namespace GainzlogBackend.Interfaces;


public interface ISessionRepository
{
    Task<Session> CreateSessionAsync(Session session);
    Task<List<Session>> GetAllSessionAsync();
    Task<Session?> GetSessionByIdAsync(int sessionId);
    Task<Session?>UpdateSessionAsync(int sessionId, bool isComplete);
    Task<Session?>DeleteSessionAsync(int sessionId);
    }


    // Repository returnerar och tar aldrig emot en dto