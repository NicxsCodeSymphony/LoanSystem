using System;
using System.Collections.Generic;

namespace backend.Entities;

public partial class Excess
{
    public int ExcessId { get; set; }

    public string? ScheduleId { get; set; }

    public double? Total { get; set; }
}
