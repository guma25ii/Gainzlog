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
    public class SetController : ControllerBase
    {
            private readonly ISetService _service;

        public SetController(ISetService service)
        {
            _service = service;
        }


        [HttpPost]
        public async Task<IActionResult> CreateSet(CreateSetRequest createSetRequest)
        {
            var set = await  _service.CreateSetAsync(createSetRequest);

            return Ok(set);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSet(int id, UpdateSetRequest updateSetRequest)
        {
            var set = await _context.Sets.FirstOrDefaultAsync(s => s.Id == id);
            if(set == null)
            {
                return NotFound("Could Not Find Set");
            }

            set.Reps = updateSetRequest.Reps;
            set.Weight = updateSetRequest.Weight;
            await _context.SaveChangesAsync();
            return Ok(set);
        }

        [HttpDelete("{setId}")]
        public async Task<IActionResult> DeleteSet(int setId)
        {
            var set = await _service.DeleteSetAsync(setId);
            if(set == null)
            {
                return NotFound("Could Not Find Set");
            }
            return Ok(set);
        }
    }
}