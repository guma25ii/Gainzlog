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

    public async Task<MealDetailResponse?> UpdateGramsAsync(int mealId, int itemId, UpdateGramsRequest request)
    {
        var meal = await _repository.GetMealByIdAsync(mealId);
        if(meal == null)
        {
            return null;
        }
        var item = meal.Items.FirstOrDefault(i => i.Id == itemId);
        if(item == null)
        {
            return null;
        }
        
    }
    private Nutrition Scale(Nutrition n, double factor)
    {
        return new Nutrition
        {
            Protein = n.Protein * factor,
            Fat = n.Fat * factor,
            Carbs = n.Carbs * factor,
            Calories = n.Calories * factor
        };
    }
}
