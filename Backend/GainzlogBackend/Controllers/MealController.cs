using GainzlogBackend.Data;
using GainzlogBackend.Dto;
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

        public MealController(FoodService foodService, AppDbContext context)
        {
            _foodService = foodService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMeal(CreateMealRequest request)
        {
        var meal = new Meal
        {
            Name = request.Name,
            CreatedAt = DateTime.UtcNow
        };

            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();

            return Ok(meal);
        }
        [HttpPost("{mealId}/items")]
        public async Task<IActionResult> AddFoodToMeal(int mealId, AddFoodToMealRequest request)
        {
            var meal = await _context.Meals.Include(m => m.Items).FirstOrDefaultAsync(m => m.Id == mealId);
            

            if (meal == null)
                return NotFound();

            var nutrients = await _foodService.GetNutrition(request.FoodId);
            

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
                Name = nutrients.FirstOrDefault()?.Name ?? "Unknown",
                Grams = request.Grams,
                BaseNutrition = baseNutrition,
                Nutrition = Scale(baseNutrition, factor)
            };

            meal.Items.Add(item);

            await _context.SaveChangesAsync();

            Console.WriteLine($"MealItem ID: {item.Id}");

            return Ok(item);
        }

        [HttpPatch("{mealId}/items/{foodId}")]
        public async  Task<IActionResult> UpdateGrams(int mealId, int foodId, UpdateGramsRequest request)
        {
            var meal = await _context.Meals.Include(m => m.Items).FirstOrDefaultAsync(m => m.Id == mealId);

            if (meal == null)
                return NotFound("Meal Not Found");

            var item = meal.Items.FirstOrDefault(i => i.FoodId == foodId);

            if (item == null)
                return NotFound("Item not Found");

            item.Grams = request.Grams;

            double factor = request.Grams / 100.0;

            
            item.Nutrition = Scale(item.BaseNutrition, factor);
            await _context.SaveChangesAsync();
            return Ok(meal);
        }

        [HttpDelete("{mealId}/items/{itemId}")]
        public async Task<IActionResult> DeleteItem(int mealId, int itemId)
        {
            var meal = await _context.Meals.Include(m => m.Items).FirstOrDefaultAsync(m => m.Id == mealId);
            if(meal == null)
            {
                return NotFound("Meal Not Found");
            };
            var item = meal.Items.FirstOrDefault(i => i.Id == itemId);
            if(item == null)
            {
                return NotFound("Item Not Found");
            }
            meal.Items.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(meal);
        }
        [HttpDelete("{mealId}")]
        public async Task<IActionResult> DeleteMeal (int mealId)
        {
            var meal = await _context.Meals.Include(m => m.Items).FirstOrDefaultAsync(m => m.Id == mealId);
            if(meal == null)
            {
                return NotFound("Meal Not Found");
            }
            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();
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

        // HELPERS


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