using System;

namespace GainzlogBackend.Models;

public class Nutrient
{

    public string Name { get; set; }
    public string EuroFIRCode { get; set; }
    public double Value { get; set; }
    public string Unit { get; set; }
}
