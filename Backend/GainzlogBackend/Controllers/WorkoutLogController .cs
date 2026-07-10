using GainzlogBackend.Data;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutLogController : ControllerBase
    {
            private readonly AppDbContext _context;

        public WorkoutLogController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("log")]
        public async Task<IActionResult> CreateWorkoutLog(CreateWorkoutLogRequest createWorkoutLogRequest)
        {
            var workoutLog = new WorkoutLog
            {
                SessionId = createWorkoutLogRequest.SessionId
            };

            _context.WorkoutLogs.Add(workoutLog);
            await _context.SaveChangesAsync();
            return Ok(workoutLog);
        }

        [HttpPost("loggedset")]
        public async Task<IActionResult> CreateLoggedSet (CreateLoggedSetRequest createLoggedSetRequest)
        {
            var loggedSet = new LoggedSet
            {
                ExerciseName = createLoggedSetRequest.ExerciseName,
                Reps = createLoggedSetRequest.Reps,
                Sets = createLoggedSetRequest.Sets,
                Weight = createLoggedSetRequest.Weight
            };
            _context.LoggedSets.Add(loggedSet);
            await _context.SaveChangesAsync();
            return Ok(loggedSet);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLogs()
        {
            var allLogs = await _context.WorkoutLogs.ToListAsync();
            return Ok(allLogs);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetLogById(int id)
        {
            var log = await _context.WorkoutLogs.Include(l => l.LoggedSets).FirstOrDefaultAsync(i => i.Id == id);
            if(log == null)
            {
                return NotFound("Log Not Found");
            }
            return Ok(log);
        }
    }
}