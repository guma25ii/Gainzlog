using System;
using GainzlogBackend.Dto;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Models;

namespace GainzlogBackend.Services;

public class SetService : ISetService
{

    private readonly ISetRepository _repository;

    public SetService(ISetRepository repository)
    {
        _repository = repository;
    }

    public  async Task<SetResponse> CreateSetAsync(CreateSetRequest createSetRequest)
    {
        var set = new Set
        {
            Reps = createSetRequest.Reps,
            Weight = createSetRequest.Weight,
            WorkoutExerciseId = createSetRequest.WorkoutExerciseId
        };

        var savedSet = await _repository.CreateSetAsync(set);

        var response = new SetResponse
        {
            Id = savedSet.Id,
            Reps = savedSet.Reps,
            Weight = savedSet.Weight,
            WorkoutExerciseId = savedSet.WorkoutExerciseId
        };
        return response;
    }
}
