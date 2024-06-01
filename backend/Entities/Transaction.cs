using System;
using System.Collections.Generic;

namespace backend.Entities;

public partial class Transaction
{
    public int TransactionId { get; set; }

    public int? ScheduleId { get; set; }

    public double? Amount { get; set; }

    public DateTime? TransactionDate { get; set; }
}
