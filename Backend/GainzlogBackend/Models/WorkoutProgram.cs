using System.Linq;
using System.Text.Json.Serialization;

namespace GainzlogBackend.Models;

public class WorkoutProgram
{
    public int Id {get; set;}
    public string Name {get; set;}
    public List<ProgramWorkouts> Items { get; set; } = new();
    
}

public class ProgramWorkouts
{
    public int Id { get; set; }
    public int? ProgramId { get; set; } 
    public string Name { get; set; }
    [JsonIgnore]
    public WorkoutProgram WorkoutProgram {get; set;} = null!;
    public List<WorkoutExercise> Exercise { get; set; } = new();
}

public class WorkoutExercise
{
    public int Id { get; set; }
    public int? WorkoutId { get; set; } 
    public string Name { get; set; } = string.Empty;
    public int Sets { get; set;}
    public int Reps { get; set; }
    public double Weight { get; set; }
    public int? Time { get; set; }

    [JsonIgnore]
    public ProgramWorkouts ProgramWorkouts { get; set; } = null!;
}