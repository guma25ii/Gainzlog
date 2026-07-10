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
    public Session Session { get; set; } = null!;
}

public class WorkoutLog
{
    public int Id { get; set; }
    public int SessionId { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public List<LoggedSet> LoggedSets { get; set; } = new();
}

public class LoggedSet
{
    public int Id { get; set; }
    public int WorkoutLogId { get; set; }
    public string ExerciseName { get; set; } = string.Empty;
    public int? Reps { get; set; }
    public int? Sets { get; set; }
    public double? Weight { get; set; }
    [JsonIgnore]
    public WorkoutLog WorkoutLogs { get; set; } = null!;
}