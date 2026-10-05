using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Repositories;

public class WorkoutExerciseRepository :IWorkoutExerciseRepository
{
private readonly AppDbContext _context;

public WorkoutExerciseRepository(AppDbContext context)
    {
        _context = context;
    }
public  async Task<WorkoutExercise> CreateExerciseAsync(WorkoutExercise workoutExercise)
    {
         _context.WorkoutExercises.Add(workoutExercise);
         await _context.SaveChangesAsync();
         return workoutExercise;
    }

    public async Task<WorkoutExercise?> DeleteExerciseAsync(int id)
    {
        var exercise = await _context.WorkoutExercises.FirstOrDefaultAsync(s => s.Id == id);
        if(exercise == null)
        {
            return null;
        }
        _context.WorkoutExercises.Remove(exercise);
        await _context.SaveChangesAsync();
        return exercise;
    }

    public async Task<WorkoutExercise?> GetExerciseByIdAsync(int id)
    {
        return await  _context.WorkoutExercises.Include(s => s.LoggedSets).FirstOrDefaultAsync(e => e.Id == id);
    }
}
