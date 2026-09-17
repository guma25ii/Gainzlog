using System;
using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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

    public async Task<WorkoutProgram> CreateProgramAsync(WorkoutProgram workoutProgram)
    {
        _context.WorkoutPrograms.Add(workoutProgram);
        await _context.SaveChangesAsync();
        return  workoutProgram;
    }

    public async Task<WorkoutProgram?> DeleteProgramAsync(int programId)
    {
        var program = await _context.WorkoutPrograms.FirstOrDefaultAsync(p => p.Id == programId);
        if (program == null)
        {
            return null;
        }
         _context.WorkoutPrograms.Remove(program);
        await _context.SaveChangesAsync();
        return program;
    }
}
