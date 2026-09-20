
using GainzlogBackend.Models;

namespace GainzlogBackend.Dto;

public class SessionDto
{
    public int Id {get; set;}
    public int? ProgramId {get; set;}
    public string Name {get; set;} = string.Empty;
    public bool IsComplete {get; set;}

}
