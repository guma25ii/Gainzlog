using GainzlogBackend.Data;
using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using GainzlogBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly FoodService _foodService;
        private readonly AppDbContext _context;
        private readonly IMealService _mealService;

        public MealController(FoodService foodService, AppDbContext context, IMealService mealService)
        {
            _foodService = foodService;
            _context = context;
            _mealService = mealService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMeal(CreateMealRequest request)
        {

            var meal = await _mealService.CreateMealAsync(request);
            return Ok(meal);

        }
        [HttpPost("{mealId}/items")]
        public async Task<IActionResult> AddFoodToMeal(int mealId, AddFoodToMealRequest request)
        {
            var meal = await _context.Meals.Include(m => m.Items).FirstOrDefaultAsync(m => m.Id == mealId);
            

            if (meal == null)
                return NotFound();

            var nutrients = await _foodService.GetNutrition(request.FoodId);

            var foodName = await _foodService.GetFoodName(request.FoodId);

            double factor = request.Grams / 100.0;

            var baseNutrition = new Nutrition
            {
                Protein = GetValue(nutrients, "Protein"),
                Fat = GetValue(nutrients, "Fett, totalt"),
                Carbs = GetValue(nutrients, "Kolhydrater, tillgängliga"),
                Calories = GetValue(nutrients, "Energi (kcal)")
            };

            var item = new MealItem
            {
                FoodId = request.FoodId,
                Name = foodName, 
                Grams = request.Grams,
                BaseNutrition = baseNutrition,
                Nutrition = Scale(baseNutrition, factor)
            };

            meal.Items.Add(item);

            await _context.SaveChangesAsync();

            Console.WriteLine($"MealItem ID: {item.Id}");

            return Ok(item);
        }

        [HttpPatch("{mealId}/items/{itemId}")]
        public async  Task<IActionResult> UpdateGrams(int mealId, int itemId, UpdateGramsRequest request)
        {
             var updatedMeal = await _mealService.UpdateGramsAsync(mealId, itemId, request);
             if(updatedMeal == null)
            {
                return NotFound("Meal or item not found");
            }
             return Ok(updatedMeal);
        }

        [HttpDelete("{mealId}/items/{itemId}")]
        public async Task<IActionResult> DeleteItem(int mealId, int itemId)
        {
            var meal = await _mealService.DeleteItemAsync(mealId, itemId);
            if(meal == null)
            {
                return NotFound("Meal or item not found");
            };
            return Ok(meal);
        }

        [HttpDelete("{mealId}")]
        public async Task<IActionResult> DeleteMeal (int mealId)
        {
            var meal = await _mealService.DeleteMealAsync(mealId);
            if(meal == null)
            {
                return NotFound("Meal Not Found");
            }
            return Ok("Meal Deleted");
        }

        [HttpGet("Daily-totals")]
        public async Task<IActionResult> GetDailyTotals()
        {
            var today = DateTime.UtcNow.Date;

            var meals = await _context.Meals.Include(m => m.Items).Where(m => m.CreatedAt.Date == today).ToListAsync();

            var totals = new
            {
                Protein = meals.Sum(m => m.TotalProtein),
                Fat = meals.Sum(m => m.TotalFat),
                Carbs = meals.Sum(m => m.TotalCarbs),
                Calories = meals.Sum(m => m.TotalCalories)
            };

            return Ok(totals);
        }
        [HttpGet("today")]
        public async Task<IActionResult> GetTodayMeals()
        {
            var today = DateTime.UtcNow.Date;

            var meals = await _context.Meals
                .Include(m => m.Items)
                .Where(m => m.CreatedAt.Date == today)
                .ToListAsync();

            var result = new
            {
                Meals = meals.Select(m => new
                {
                    m.Id,
                    Name = m.Name,
                    Items = m.Items.Select(i => new
                    {
                        i.Id,
                        i.FoodId,
                        i.Name,
                        i.Grams,
                        i.Nutrition
                    }),
                    Totals = new
                    {
                        Protein = m.TotalProtein,
                        Fat = m.TotalFat,
                        Carbs = m.TotalCarbs,
                        Calories = m.TotalCalories
                    }
                }),

                DailyTotals = new
                {
                    Protein = meals.Sum(m => m.TotalProtein),
                    Fat = meals.Sum(m => m.TotalFat),
                    Carbs = meals.Sum(m => m.TotalCarbs),
                    Calories = meals.Sum(m => m.TotalCalories)
                }
            };

            return Ok(result);
        }

        


        private double GetValue(List<Nutrient> nutrients, string name)
        {
            return nutrients
                .FirstOrDefault(n =>
                    n.Name != null &&
                    n.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
                ?.Value ?? 0;
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
}