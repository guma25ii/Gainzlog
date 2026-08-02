using GainzlogBackend.Data;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoggedExerciseController : ControllerBase
    {
            private readonly AppDbContext _context;

        public LoggedExerciseController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<IActionResult> CreateExercise(CreateExerciseRequest createExerciseRequest)
        {
            var exercise = new WorkoutExercise
            {
                WorkoutId = createExerciseRequest.SessionId,
                Name = createExerciseRequest.Name,
                ExerciseId = createExerciseRequest.ExerciseId,
                Reps = createExerciseRequest.Reps,
                Sets = createExerciseRequest.Sets,
                Weight = createExerciseRequest.Weight,
                Time = createExerciseRequest.Time
            };
            _context.WorkoutExercises.Add(exercise);
            await _context.SaveChangesAsync();
            return Ok(exercise);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExerciseById(int id)
        {
            var exercise = await _context.WorkoutExercises.FirstOrDefaultAsync(e => e.Id == id);
            if(exercise == null)
            {
                return NotFound("Could Not Find Exercise");
            }
            return Ok(exercise);
        }

        [HttpDelete("{exercieId}")]
        public async Task<IActionResult> DeleteExercise(int exercieId)
        {
            var exercise = await _context.WorkoutExercises.FirstOrDefaultAsync(e => e.Id == exercieId);
            if(exercise == null)
            {
                return NotFound("Could Not Find Exercise");
            }
            _context.WorkoutExercises.Remove(exercise);
            await _context.SaveChangesAsync();
            return Ok(exercise);
        }
    }
}