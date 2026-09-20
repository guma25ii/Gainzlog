using System;
using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;

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

}
