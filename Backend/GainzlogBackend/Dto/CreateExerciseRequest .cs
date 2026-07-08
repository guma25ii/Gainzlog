using System;
using GainzlogBackend.Models;

namespace GainzlogBackend.Dto;

public class CreateExerciseRequest
{
    public string Name { get; set; } = string.Empty;
    public int WorkoutId { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
    public double Weight { get; set; }
    public int? Time { get; set; }
}