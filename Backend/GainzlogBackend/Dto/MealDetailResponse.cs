using System;
using GainzlogBackend.Models;

namespace GainzlogBackend.Dto;

public class MealDetailResponse
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public DateTime CreatedAt {get; set;}
    public List<MealItemDto> Items {get; set;} = new();
    public double TotalProtein =>
        Items.Sum(i => i.Nutrition?.Protein ?? 0);

    public double TotalFat =>
        Items.Sum(i => i.Nutrition?.Fat ?? 0);

    public double TotalCarbs =>
        Items.Sum(i => i.Nutrition?.Carbs ?? 0);

    public double TotalCalories =>
        Items.Sum(i => i.Nutrition?.Calories ?? 0);

}
public class MealItemDto
{
    public int Id {get; set;}
    public int FoodId {get; set;}
    public string Name {get; set;} = string.Empty;
    public double Grams {get; set;}
    public Nutrition Nutrition {get; set;} = new();
}
    