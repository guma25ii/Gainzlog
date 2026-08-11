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
                return StatusCode((int)response.StatusCode, "Error Calling Muscles");
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

        [HttpGet("getExerciseByBodypart")]

        public async Task<IActionResult> GetExerciseByBodypart([FromQuery] string targetMuscles)
        {
            var url = $"https://oss.exercisedb.dev/api/v1/exercises/muscles?targetMuscles={targetMuscles}";
            var response = await _http.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error Calling Exercises By Bodypart");
            }
            var json = await response.Content.ReadAsStringAsync();

            var doc = JsonDocument.Parse(json);
            var exercises = doc.RootElement.GetProperty("data").EnumerateArray().ToList();
            
            var result = exercises.Select(e => new
            {
                exerciseId = e.GetProperty("exerciseId").GetString(),
                name = e.GetProperty("name").GetString(),
                gifUrl = e.GetProperty("gifUrl").GetString(),
                bodyparts = e.GetProperty("bodyParts").EnumerateArray().Select(a => a.GetString()).ToList()
            }).ToList();
            return Ok(result);
        }

        [HttpGet("searchExercise")]
        public async Task<IActionResult> SearchExercise ([FromQuery] string search)
        {
            var url = $"https://oss.exercisedb.dev/api/v1/exercises/search?search={search}&threshold=0.3";
            var response = await _http.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, " Error Calling Search");
            }

            var json = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(json);
            var searchExercise = doc.RootElement.GetProperty("data").EnumerateArray().ToList();

            var result = searchExercise.Select( s => new
            {
                exerciseId = s.GetProperty("exerciseId").GetString(),
                name = s.GetProperty("name").GetString(),
                gifUrl = s.GetProperty("gifUrl").GetString(),
            }).ToList();
            return Ok(result);

        }



        [HttpGet("{exerciseId}/exerciseinfo")]
        public async Task<IActionResult> ExerciseInfo (string exerciseId)
        {
            var url = $"https://oss.exercisedb.dev/api/v1/exercises/{exerciseId}";
            var response = await _http.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error Calling ExerciseId");
            }
            var json = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(json);
            var exerciseInfo = doc.RootElement.GetProperty("data");
            var result = new {

                exercieId = exerciseInfo.GetProperty("exerciseId").GetString(),
                name = exerciseInfo.GetProperty("name").GetString(),
                gifUrl = exerciseInfo.GetProperty("gifUrl").GetString(),
                bodyparts = exerciseInfo.GetProperty("bodyParts").EnumerateArray().Select(a => a.GetString()).ToList(),
                targetMuscles = exerciseInfo.GetProperty("targetMuscles").EnumerateArray().Select(t => t.GetString()).ToList(),
                secondaryMuscles = exerciseInfo.GetProperty("secondaryMuscles").EnumerateArray().Select(s => s.GetString()).ToList(),
                instructions = exerciseInfo.GetProperty("instructions").EnumerateArray().Select(i => i.GetString()).ToList()
            };
            return Ok(result);
        }
    }
}
