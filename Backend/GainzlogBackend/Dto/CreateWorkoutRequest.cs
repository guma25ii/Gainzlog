using System;

namespace GainzlogBackend.Dto;


public class CreateWorkoutRequest
{
    public string Name { get; set; } = string.Empty;
    public int? ProgramId { get; set; }
}