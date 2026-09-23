namespace GainzlogBackend.Dto;

public class SessionDetailResponse
{
    public int Id {get; set;}
    public int? ProgramId {get; set;}
    public string Name {get; set;} = string.Empty;
    public bool IsComplete {get; set;}
    public List<WorkoutExerciseDto> Exercises {get; set;} = new();
}

public class WorkoutExerciseDto
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public string ExerciseId {get; set;} = string.Empty;
    public int Sets {get; set;}
    public int Reps {get; set;}
    public double Weight {get; set;}
    public int? Time {get; set;}
    public List<SetDto> LoggedSets {get; set;} = new();
}

public class SetDto
{
    public int Id {get; set;}
    public int Reps {get; set;}
    public double Weight {get; set;}
}
