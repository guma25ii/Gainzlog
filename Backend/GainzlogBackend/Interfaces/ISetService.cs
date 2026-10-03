using System;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;

namespace GainzlogBackend.Interfaces;

public interface ISetService
{
    Task<SetResponse> CreateSetAsync(CreateSetRequest createSetRequest);
    Task<SetResponse?> DeleteSetAsync(int setId);
    Task<SetResponse?> UpdateSetAsync(int setId, UpdateSetRequest updateSetRequest);
}
