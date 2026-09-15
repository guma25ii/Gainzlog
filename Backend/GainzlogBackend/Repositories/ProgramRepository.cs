using System;
using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Repositories;

public class ProgramRepository : IProgramRepository
{

    private readonly AppDbContext _context;

    public ProgramRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<WorkoutProgram>> GetAllWorkoutProgramsAsync()
    {
        return await _context.WorkoutPrograms.ToListAsync();
    }
}
