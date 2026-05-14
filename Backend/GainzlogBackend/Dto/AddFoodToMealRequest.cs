using System;

namespace GainzlogBackend.Dto;

public class AddFoodToMealRequest
{
public int FoodId {get; set;}
public string Name {get; set;}
public double Grams {get; set;}
}
