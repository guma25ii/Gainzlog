using GainzlogBackend.Data;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Repositories;

public class MealRepository : IMealRepository
{
    private readonly AppDbContext _context;

    public MealRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Meal> CreateMealAsync(Meal meal)
    {
         _context.Meals.Add(meal);
         await _context.SaveChangesAsync();
         return meal;
    }

    public async Task<Meal?> DeleteItemAsync(int mealId, int itemId)
    {
        var meal = await _context.Meals.Include(i => i.Items).FirstOrDefaultAsync(m => m.Id == mealId);
        if(meal == null)
        {
            return null;
        }
        var item = meal.Items.FirstOrDefault(i => i.Id == itemId);
        if(item == null)
        {
            return null;
        }
        meal.Items.Remove(item);
        await _context.SaveChangesAsync();
        return meal;
    }

    public async Task<Meal?> DeleteMealAsync(int mealId)
    {
        var meal = await _context.Meals.Include(m => m.Items).FirstOrDefaultAsync(m => m.Id == mealId);
        if(meal == null)
        {
            return null;
        }
        _context.Meals.Remove(meal);
        await _context.SaveChangesAsync();
        return meal;
    }
}
