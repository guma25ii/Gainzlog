using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.RateLimiting;

namespace GainzlogBackend.Models;

public class WorkoutProgram
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public List<Session> Sessions { get; set; } = new();
    
}

public class Session
{
    public int Id { get; set; }
    public int? ProgramId { get; set; } 
    public string Name { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
    [JsonIgnore]
    public WorkoutProgram WorkoutProgram {get; set;} = null!;
    public List<WorkoutExercise> Exercise { get; set; } = new();
}

public class WorkoutExercise
{
    public int Id { get; set; }
    public int? WorkoutId { get; set; } 
    public string Name { get; set; } = string.Empty;
    public string ExerciseId { get; set; } = string.Empty;
    public int Sets { get; set;}
    public int Reps { get; set; }
    public double Weight { get; set; }
    public int? Time { get; set; }
    public List<Set> LoggedSets { get; set; } = new();

    [JsonIgnore]
    public Session Session { get; set; } = null!;
}

public class Set
{
    public int Id { get; set; }
    public int Reps { get; set; }
    public double Weight { get; set; }
    public int WorkoutExerciseId { get; set; }
    [JsonIgnore]
    public WorkoutExercise WorkoutExercise { get; set; } = null!;

}


