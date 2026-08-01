namespace GainzlogBackend.Dto;

public class CreateSetRequest
{
    public int WorkoutExerciseId { get; set; }
    public int Reps { get; set; }
    public double Weight { get; set; }
}