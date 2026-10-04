

namespace GainzlogBackend.Dto;

public class ExerciseDetailResponse
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public int? WorkoutId {get; set;}
    public string ExerciseId {get; set;} = string.Empty;
    public int Sets {get; set;}
    public int Reps {get; set;}
    public double Weight {get; set;}
    public int? Time {get; set;}
    public List<SetDto> LoggedSets {get; set;} = new();
}
