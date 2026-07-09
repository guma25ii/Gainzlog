using GainzlogBackend.Data;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
            private readonly AppDbContext _context;

        public SessionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSession(CreateWorkoutRequest createWorkoutRequest)
        {
            var session = new Session
            {
                Name = createWorkoutRequest.Name,
                ProgramId = createWorkoutRequest.ProgramId
            };
            _context.Session.Add(session);
            await _context.SaveChangesAsync();
            return Ok(session);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSession()
        {
            var sessions = await _context.Session.ToListAsync();

            return Ok(sessions);
        }

        [HttpGet("{sessionId}")]
        public async Task<IActionResult>GetSessionById(int sessionId)
        {
            var session = await _context.Session.Include(w => w.Exercise).FirstOrDefaultAsync(w => w.Id == sessionId);
            if(session == null)
            {
                return NotFound("Could Not Find The Session");
            }
            return Ok(session);
        }



        [HttpDelete("{SessionId}")]
        public async Task<IActionResult> DeleteSession(int sessionId)
        {
            var session = await _context.Session.FirstOrDefaultAsync(w => w.Id == sessionId);
            if(session == null)
            {
                return NotFound("Could Not Find Session");
            }
            _context.Session.Remove(session);
            await _context.SaveChangesAsync();
            return Ok(session);
        }
    }
}