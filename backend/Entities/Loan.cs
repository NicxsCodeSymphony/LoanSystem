using System;
using System.Collections.Generic;

namespace backend.Entities;

public partial class Loan
{
    public int Id { get; set; }

    public int? Borrower { get; set; }

    public int? Amount { get; set; }

    public int? Term { get; set; }

    public double? Interest { get; set; }

    public int? Deduction { get; set; }

    public string? Payment { get; set; }

    public double? AmountPerTerm { get; set; }

    public string? Status { get; set; }

    public double? Total { get; set; }

    public DateTime? DueDate { get; set; }

    public DateTime? NextPayment { get; set; }

    public double? TotalLeft { get; set; }
}
