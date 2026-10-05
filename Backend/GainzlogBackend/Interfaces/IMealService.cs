using GainzlogBackend.Dto;

namespace GainzlogBackend.Interfaces;

public interface IMealService
{

    Task<MealResponse>CreateMealAsync(CreateMealRequest createMealRequest);
    Task<MealResponse?>DeleteMealAsync(int mealId);

}
