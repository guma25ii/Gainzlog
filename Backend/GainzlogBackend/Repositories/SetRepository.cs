using System;
using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using Microsoft.EntityFrameworkCore;

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

    public async Task<Set?> DeleteSetAsync(int setId)
    {
        var set = await _context.Sets.FirstOrDefaultAsync(s => s.Id == setId);
        if(set == null)
        {
            return null;
        }
        _context.Sets.Remove(set);
        await _context.SaveChangesAsync();
        return set;
    }
}
