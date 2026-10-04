
using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoggedExerciseController : ControllerBase
    {
            private readonly IWorkoutExerciseService _service;

        public LoggedExerciseController(IWorkoutExerciseService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> CreateExercise(CreateExerciseRequest createExerciseRequest)
        {
           var exercise = await _service.CreateExerciseAsync(createExerciseRequest);
            return Ok(exercise);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExerciseById(int id)
        {
            var exercise = await _service.GetExerciseByIdAsync(id);
            if(exercise == null)
            {
                return NotFound("Could Not Find Exercise");
            }
            return Ok(exercise);
        }

        [HttpDelete("{exercieId}")]
        public async Task<IActionResult> DeleteExercise(int exercieId)
        {
            var exercise = await _service.DeleteExerciseAsync(exercieId);
            if(exercise == null)
            {
                return NotFound("Could Not Find Exercise");
            }
            return Ok(exercise);
        }
    }
}