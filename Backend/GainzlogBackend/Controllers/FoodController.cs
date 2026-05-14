using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly HttpClient _http;

        public FoodController(HttpClient http)
        {
            _http = http;
        }


        [HttpGet("search")]
        public async Task<IActionResult> SearchFood([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Query is required");
            }

            var url = "https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=2000&sprak=1";
            var response = await _http.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Error Calling External API");
            }

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);
            var foods = doc.RootElement.GetProperty("livsmedel").EnumerateArray().ToList(); 

                var result = foods.Where(f => f.GetProperty("namn").GetString()?.Contains(query, StringComparison.OrdinalIgnoreCase) == true).Select(f => new
                {
                id = f.GetProperty("nummer").GetInt32(),
                name = f.GetProperty("namn").GetString()
                }).ToList();;

                return Ok(result);
        }


        [HttpGet("{id}/nutrients")]
        public async Task<IActionResult> FoodDetails(int id)
        {
            var url =
                $"https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/{id}/naringsvarden?sprak=1";

            var response = await _http.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error Calling External API");

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);

            var nutrients = doc.RootElement.EnumerateArray();

            var result = nutrients.Select(n => new
            {
                name = n.GetProperty("namn").GetString(),
                value = n.GetProperty("varde").GetDouble(),
                unit = n.GetProperty("enhet").GetString()
            });

            return Ok(result);
        }
    }
}
