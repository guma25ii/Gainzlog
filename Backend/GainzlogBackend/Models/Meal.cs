using System.Linq;

namespace GainzlogBackend.Models;

public class Meal
{
    public int Id { get; set; }
    public MealType Type {get; set;}

    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;

    public List<MealItem> Items { get; set; } = new();

    public double TotalProtein =>
        Items.Sum(i => i.Nutrition?.Protein ?? 0);

    public double TotalFat =>
        Items.Sum(i => i.Nutrition?.Fat ?? 0);

    public double TotalCarbs =>
        Items.Sum(i => i.Nutrition?.Carbs ?? 0);

    public double TotalCalories =>
        Items.Sum(i => i.Nutrition?.Calories ?? 0);
}

public class MealItem
{
    public int Id { get; set; }

    public int FoodId { get; set; }

    public string Name { get; set; }

    public double Grams { get; set; }

    // relation
    public int MealId { get; set; }

    public Meal Meal { get; set; }

    // per 100g
    public Nutrition BaseNutrition { get; set; }

    // scaled
    public Nutrition Nutrition { get; set; }
}

public class Nutrition
{
    public double Protein { get; set; }

    public double Fat { get; set; }

    public double Carbs { get; set; }

    public double Calories { get; set; }
}