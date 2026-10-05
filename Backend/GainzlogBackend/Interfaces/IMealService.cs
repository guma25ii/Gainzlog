using GainzlogBackend.Dto;
using GainzlogBackend.Models;

namespace GainzlogBackend.Interfaces;

public interface IMealService
{

    Task<MealResponse>CreateMealAsync(CreateMealRequest createMealRequest);
    Task<MealResponse?>DeleteMealAsync(int mealId);
    Task<MealDetailResponse?> DeleteItemAsync(int mealId, int itemId);

}
