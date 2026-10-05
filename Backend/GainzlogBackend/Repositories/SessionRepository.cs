using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Repositories;

public class SessionRepository: ISessionRepository
{

    private readonly AppDbContext _context;

    public SessionRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Session> CreateSessionAsync(Session session)
    {
        _context.Session.Add(session);
        await _context.SaveChangesAsync();
        return session;
    }

    public async Task<Session?> DeleteSessionAsync(int sessionId)
    {
        var session = await _context.Session.FirstOrDefaultAsync(s => s.Id == sessionId);
        if(session == null)
        {
            return null;
        }
        _context.Session.Remove(session);
        await _context.SaveChangesAsync();
        return session;
    }

    public async Task<List<Session>> GetAllSessionAsync()
    {
        return await _context.Session.ToListAsync();
    }

    public async Task<Session?> GetSessionByIdAsync(int sessionId)
    {
         return await _context.Session.Include(e => e.Exercise).ThenInclude(l => l.LoggedSets).FirstOrDefaultAsync(id => id.Id == sessionId);
    }

    public async Task<Session?> UpdateSessionAsync(int sessionId, bool isComplete)
    {
        var session = await _context.Session.FirstOrDefaultAsync(s => s.Id == sessionId);
        if(session == null)
        {
            return null;
        }
        session.IsComplete = isComplete;
        await _context.SaveChangesAsync();
        return session;
    }
}
