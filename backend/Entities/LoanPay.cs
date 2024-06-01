using System;
using System.Collections.Generic;

namespace backend.Entities;

public partial class LoanPay
{
    public int Id { get; set; }

    public int? LoanId { get; set; }

    public DateTime? Schedule { get; set; }

    public double? Payment { get; set; }

    public DateTime? LoanTime { get; set; }

    public string? Status { get; set; }
}
