using System;
using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;
using GainzlogBackend.Repositories;

namespace GainzlogBackend;

public class ProgramService : IProgramService
{
    private readonly ProgramRepository _repository;

    public ProgramService(ProgramRepository repository)
    {
        _repository = repository;
    }
    public async Task<List<WorkoutProgram>> GetAllAsync()
    {
        List<ProgramResponse> workoutProgram = await _repository.GetAllAsync(); 
        return workoutProgram.Select(wp => new WorkoutProgram
        {
            Id = wp.Id,
            Name = wp.Name
        }).ToList();
    }

    Task<List<ProgramResponse>> IProgramService.GetAllAsync()
    {
                List<ProgramResponse> workoutProgram = await _repository.GetAllAsync(); 
        return workoutProgram.Select(wp => new WorkoutProgram
        {
            Id = wp.Id,
            Name = wp.Name
        }).ToList();
    }
}
