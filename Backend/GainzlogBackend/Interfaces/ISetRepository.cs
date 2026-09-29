using System;
using GainzlogBackend.Models;

namespace GainzlogBackend.Interfaces;

public interface ISetRepository
{
    Task<Set> CreateSetAsync(Set set);

}
