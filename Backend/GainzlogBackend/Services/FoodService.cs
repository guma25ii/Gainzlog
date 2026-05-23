using System;
using System.Text.Json;
using GainzlogBackend.Models;

namespace GainzlogBackend.Services;

public class FoodService
{

    private readonly HttpClient _http;

    public FoodService(HttpClient http)
    {
        _http = http;
    }

    public async Task<List<Nutrient>> GetNutrition(int foodId)
    {
        var url = $"https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/{foodId}/naringsvarden?sprak=1";

        var response = await _http.GetStringAsync(url);

        var doc = JsonDocument.Parse(response);
        var list = new List<Nutrient>();

        foreach(var item in doc.RootElement.EnumerateArray())
        {
            list.Add(new Nutrient
            {
                Name = item.GetProperty("namn").GetString() ?? "",
                Value = item.GetProperty("varde").GetDouble(),
                Unit = item.GetProperty("enhet").GetString() ?? ""
            });
        }

        return list;

    }
    public async Task<string> GetFoodName(int foodId)
        {
            var url = $"https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/{foodId}?sprak=1";

            var response = await _http.GetStringAsync(url);
            var doc = JsonDocument.Parse(response);

            return doc.RootElement.GetProperty("namn").GetString()  ?? "";
        }

}
