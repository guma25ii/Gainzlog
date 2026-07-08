using GainzlogBackend.Data;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;
using GainzlogBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
            private readonly AppDbContext _context;

        public WorkoutController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("program/CreateProgram")] 
        public async Task<IActionResult> CreateProgram(CreateProgramRequest request)
        {
            var program  = new WorkoutProgram {
                Name = request.Name
            };
            _context.WorkoutPrograms.Add(program);
            await _context.SaveChangesAsync();

            return Ok(program);  
        }


        [HttpGet("program/GetAllPrograms")]
        public async Task<IActionResult> GetAllPrograms()
        {
            var programs =  await _context.WorkoutPrograms.ToListAsync();
            if(programs == null)
            {
                return NotFound("Could Not Find Programs");
            }

            return Ok(programs);
        }


        [HttpDelete("program/{programId}")]
        public async Task<IActionResult> DeleteProgram(int programId)
        {
            var program = await _context.WorkoutPrograms.FirstOrDefaultAsync(p  => p.Id == programId);
            if(program == null)
            {
                return NotFound("Could Not Find Program");
            }
            _context.WorkoutPrograms.Remove(program);
            await _context.SaveChangesAsync();
            return Ok(program);
        }


        [HttpGet("program/{programId}")]
        public async Task<IActionResult> GetProgramById(int programId)
        {
            var program = await _context.WorkoutPrograms.FirstOrDefaultAsync(p => p.Id == programId);
            if(program == null)
            {
                return NotFound("Program Not Found");
            }
            return Ok(program);
        }



        //Enskilda pass

        [HttpPost("workout/CreateWorkout")]
        public async Task<IActionResult> CreateWorkout(CreateWorkoutRequest createWorkoutRequest)
        {
            var workout = new ProgramWorkouts
            {
                Name = createWorkoutRequest.Name,
                ProgramId = createWorkoutRequest.ProgramId
            };
            _context.ProgramWorkouts.Add(workout);
            await _context.SaveChangesAsync();
            return Ok(workout);
        }

        [HttpGet("workout/GetAllWorkouts")]
        public async Task<IActionResult> GetAllWorkouts()
        {
            var workouts = await _context.ProgramWorkouts.ToListAsync();

            return Ok(workouts);
        }

        [HttpDelete("workout/{WorkoutId}")]
        public async Task<IActionResult> DeleteWorkout(int WorkoutId)
        {
            var workout = await _context.ProgramWorkouts.FirstOrDefaultAsync(w => w.Id == WorkoutId);
            if(workout == null)
            {
                return NotFound("Could Not Find Wourkout");
            }
            _context.ProgramWorkouts.Remove(workout);
            await _context.SaveChangesAsync();
            return Ok(workout);
        }

        [HttpPost("exercise/CreateExercise")]
        public async Task<IActionResult> CreateExercise(CreateExerciseRequest createExerciseRequest)
        {
            var exercise = new WorkoutExercise
            {
                WorkoutId = createExerciseRequest.WorkoutId,
                Name = createExerciseRequest.Name,
                Reps = createExerciseRequest.Reps,
                Sets = createExerciseRequest.Sets,
                Weight = createExerciseRequest.Weight,
                Time = createExerciseRequest.Time
            };
            _context.WorkoutExercises.Add(exercise);
            await _context.SaveChangesAsync();
            return Ok(exercise);
        }

        [HttpDelete("exercise/{exercieId}")]
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