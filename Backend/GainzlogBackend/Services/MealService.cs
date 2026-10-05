
using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;

namespace GainzlogBackend.Services;

public class MealService : IMealService
{
    private readonly IMealRepository _repository;

    public MealService(IMealRepository repository)
    {
        _repository = repository;
    }

    public async Task<MealResponse> CreateMealAsync(CreateMealRequest createMealRequest)
    {
        var meal = new Meal
        {
            Name = createMealRequest.Name,
            CreatedAt = DateTime.UtcNow
        };
        var createdMeal = await _repository.CreateMealAsync(meal);

        var mealResponse = new MealResponse
        {
            Name = createdMeal.Name,
            Id = createdMeal.Id,
            CreatedAt = createdMeal.CreatedAt
        };
        return mealResponse;
    }

    public async Task<MealDetailResponse?> DeleteItemAsync(int mealId, int itemId)
    {
        var meal = await _repository.DeleteItemAsync(mealId, itemId);
        if(meal == null)
        {
            return null;
        }
        var deletedMeal = new MealDetailResponse
        {
            Id = meal.Id,
            Name = meal.Name,
            CreatedAt = meal.CreatedAt,
            Items = meal.Items.Select(i => new MealItemDto
            {
                Id = i.Id,
                FoodId = i.FoodId,
                Name = i.Name,
                Grams = i.Grams,
                Nutrition = i.Nutrition
            }).ToList()

        };
        return deletedMeal;
    } 

    public async Task<MealResponse?> DeleteMealAsync(int mealId)
    {
        var meal = await _repository.DeleteMealAsync(mealId);
        if(meal == null)
        {
            return null;
        }
        var response = new MealResponse
        {
            Id = meal.Id,
            Name = meal.Name,
            CreatedAt = meal.CreatedAt,
        };
        return response;
    }
}
