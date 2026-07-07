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

        [HttpPost] 
        public async Task<IActionResult> CreateProgram(CreateProgramRequest request)
        {
            var program  = new WorkoutProgram {
                Name = request.Name
            };
            _context.WorkoutPrograms.Add(program);
            await _context.SaveChangesAsync();

            return Ok(program);  
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPrograms()
        {
            var programs =  await _context.WorkoutPrograms.ToListAsync();

            return Ok(programs);
        }

    }
}