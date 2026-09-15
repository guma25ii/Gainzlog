using GainzlogBackend.Data;
using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramController : ControllerBase
    {
        //     private readonly AppDbContext _context;

        // public ProgramController(AppDbContext context)
        // {
        //     _context = context;
        // }

private readonly IProgramService _service;
public ProgramController(IProgramService service){
    _service = service;
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
            var programs =  await _service.GetAllAsync();
            return Ok(programs);
        }


        [HttpDelete("{programId}")]
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


        [HttpGet("{programId}")]
        public async Task<IActionResult> GetProgramById(int programId)
        {
            var program = await _context.WorkoutPrograms.Include(p => p.Sessions).FirstOrDefaultAsync(p => p.Id == programId);
            if(program == null)
            {
                return NotFound("Program Not Found");
            }
            return Ok(program);
        }
    }
}