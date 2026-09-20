
using GainzlogBackend.Models;

namespace GainzlogBackend.Dto;


public class ProgramDetailResponse
{
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public List<SessionDto> Sessions {get; set;} = new();

}

