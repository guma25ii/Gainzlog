using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {

        private readonly ISessionService _service;
        public SessionController(ISessionService service)
        {
            _service = service;
        }
        [HttpPost]
        public async Task<IActionResult> CreateSession(CreateWorkoutRequest createWorkoutRequest)
        {

            var saveSession = await _service.CreateSessionAsync(createWorkoutRequest);
            return Ok(saveSession);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSession()
        {
            var sessions = await _service.GetAllSessionAsync();
            return Ok(sessions);
        }

        [HttpGet("{sessionId}")]
        public async Task<IActionResult>GetSessionById(int sessionId)
        {
            var session = await _service.GetSessionByIdAsync(sessionId);
            if(session == null)
            {
                return NotFound("Could Not Find The Session");
            }
            return Ok(session);
        }

        [HttpPatch("{sessionId}")]
        public async Task<IActionResult> UpdateSession(int sessionId, UpdateSessionRequest updateSessionRequest)
        {
            var session = await _service.UpdateSessionAsync(sessionId, updateSessionRequest);
            if(session == null)
            {
                return NotFound("Could Not Find Specific Session Id");
            }
            return Ok(session);
        }

        [HttpDelete("{sessionId}")]
        public async Task<IActionResult> DeleteSession(int sessionId)
        {
            var session = await _service.DeleteSessionAsync(sessionId);
            if(session == null)
            {
                return NotFound("Could Not Find Session");
            }
            return Ok(session);
        }
    }
}