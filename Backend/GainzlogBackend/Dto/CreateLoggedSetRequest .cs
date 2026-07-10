
namespace GainzlogBackend.Dto;
public class CreateLoggedSetRequest
{
    public int WorkoutLoggedId { get; set; }
    public string ExerciseName { get; set; } = string.Empty;
    public int? Reps { get; set; }
    public int? Sets { get; set; }
    public double? Weight { get; set; }
    
}