using System;

namespace GainzlogBackend.Models;

public class Nutrient
{

    public string Name { get; set; } = string.Empty;
    public string EuroFIRCode { get; set; } = string.Empty;
    public double Value { get; set; }
    public string Unit { get; set; } = string.Empty;
}
