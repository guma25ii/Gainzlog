using System;
using GainzlogBackend.Dto;
using GainzlogBackend.Models;

namespace GainzlogBackend.Interfaces;

public interface ISetService
{
    Task<SetResponse> CreateSetAsync(CreateSetRequest createSetRequest);
}
