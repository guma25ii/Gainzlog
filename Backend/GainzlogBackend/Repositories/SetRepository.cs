using System;
using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;

namespace GainzlogBackend.Repositories;

public class SetRepository : ISetRepository
{

    private readonly AppDbContext _context;

    public  SetRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Set> CreateSetAsync(Set set)
    {
        _context.Sets.Add(set);
        await _context.SaveChangesAsync();
        return set;
    }
}
