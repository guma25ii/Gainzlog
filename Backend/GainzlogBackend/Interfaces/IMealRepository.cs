using GainzlogBackend.Models;

namespace GainzlogBackend.Interfaces;

public interface IMealRepository
{
    Task<Meal>CreateMealAsync(Meal meal);
    Task<Meal?>DeleteMealAsync(int mealId);
    Task<Meal?>DeleteItemAsync(int mealId, int itemId);

}
