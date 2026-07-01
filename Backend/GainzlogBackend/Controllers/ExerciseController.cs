using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly HttpClient _http;

        public ExerciseController(HttpClient http)
        {
            _http = http;
        }
        [HttpGet("getAllMuscles")]
        public async Task<IActionResult> GetAllMuscles()
        {

            var url = "https://oss.exercisedb.dev/api/v1/muscles";
            var response = await _http.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error Calling Exercises");
            }
            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);
            var exercises = doc.RootElement.GetProperty("data").EnumerateArray().ToList();
            var result = exercises.Select(e => new
            {
                name = e.GetProperty("name").GetString()
                
            }).ToList();
            return Ok(result);

        }
   
    }
}
