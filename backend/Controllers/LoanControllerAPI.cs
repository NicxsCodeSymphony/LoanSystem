using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Entities;
using backend.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoanControllerAPI : ControllerBase
    {
        private readonly EdisanContext _context;

        public LoanControllerAPI(EdisanContext context)
        {
            _context = context;
        }

        [HttpGet("LoanAPI")]
        public IActionResult LoanAPI()
        {
            var result = _context.Loans.ToList();
            return Ok(result);
        }

        [HttpGet("CreateLoanAPI")]
        public IActionResult CreteLoanAPI()
        {
            return Ok(new List<Loan>());
        }

        [HttpPost("CreateLoanAPI")]
        public IActionResult CreateLoanAPI(Loan loan)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Add(loan);
                    _context.SaveChanges();

                    List<LoanPay> schedule = new List<LoanPay>();
                    for (int i = 0; i < loan.Term; i++)
                    {
                        LoanPay temp = new LoanPay
                        {
                            LoanId = loan.Id,
                            Payment = loan.AmountPerTerm,
                            Status = loan.Status,
                            LoanTime = DateTime.Now
                        };

                        if (loan.Payment == "Daily")
                        {
                            temp.Schedule = ((DateTime)loan.NextPayment).AddDays(i);
                        }
                        else if (loan.Payment == "Weekly")
                        {
                            temp.Schedule = ((DateTime)loan.NextPayment).AddDays(i * 7);
                        }
                        else if (loan.Payment == "Bi-Weekly")
                        {
                            temp.Schedule = ((DateTime)loan.NextPayment).AddDays(i * 14);
                        }
                        else if (loan.Payment == "Monthly")
                        {
                            temp.Schedule = ((DateTime)loan.NextPayment).AddMonths(i);
                        }
                        else
                        {
                            temp.Schedule = ((DateTime)loan.NextPayment).AddYears(i);
                        }

                        schedule.Add(temp);
                    }
                    _context.LoanPays.AddRange(schedule);
                    _context.SaveChanges();

                    return Ok(loan);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetPayLoan/{id}")]
        public IActionResult GetPayLoan(int id)
        {
            var loan = _context.LoanPays.Where(loan => loan.LoanId == id).ToList();
            if (loan == null)
            {
                return NotFound("Loan not found");
            }
            return Ok(loan);
        }

        [HttpGet("GetLoanInfo/{id}")]
        public IActionResult GetLoanInfo(int id)
        {
            var loanInfo = _context.LoanPays.Find(id);
            if (loanInfo == null)
            {
                return NotFound("User type not found.");
            }

            return Ok(loanInfo);
        }

[HttpGet("GetAllTransactions")]
public IActionResult GetAllTransactions()
{
    var transactions = _context.Transactions.ToList();

    if (transactions == null || transactions.Count == 0)
    {
        return NotFound("No transactions found.");
    }

    return Ok(transactions);
}



 [HttpPut("PayTheLoan/{id}")]
public IActionResult PayTheLoan(int id, [FromBody] LoanPay loan)
{
    if (loan == null)
    {
        return BadRequest("Loan payment object is null");
    }

    var existingLoanPay = _context.LoanPays.Find(id);
    if (existingLoanPay == null)
    {
        return NotFound("Loan payment record not found.");
    }

    var loanEntity = _context.Loans.Find(existingLoanPay.LoanId);
    if (loanEntity == null)
    {
        return NotFound("Loan entity not found.");
    }

    try
    {
        // Create the initial transaction
        var transaction = new Transaction
        {
            ScheduleId = existingLoanPay.Id,
            Amount = loan.Payment,
            TransactionDate = DateTime.Now
        };

        _context.Transactions.Add(transaction);
        _context.SaveChanges();

        // Calculate total paid for the current LoanPay
        var totalPaid = _context.Transactions
            .Where(t => t.ScheduleId == existingLoanPay.Id)
            .Sum(t => t.Amount);

        // Check if the current LoanPay is fully paid
        if (totalPaid >= existingLoanPay.Payment)
        {
            existingLoanPay.Status = "Paid";
            _context.SaveChanges();

            // Handle excess payment
            double? excessPayment = totalPaid - existingLoanPay.Payment.Value;
            while (excessPayment > 0)
            {
                // Find the next unpaid LoanPay entry
                var nextLoanPay = _context.LoanPays
                    .Where(lp => lp.LoanId == loanEntity.Id && lp.Status != "Paid")
                    .OrderBy(lp => lp.Schedule)
                    .FirstOrDefault();

                if (nextLoanPay == null)
                {
                    break; // No more unpaid LoanPay entries
                }

                double nextPayment = nextLoanPay.Payment ?? 0;

                // Determine the amount to pay towards the next LoanPay entry
                if (excessPayment >= nextPayment)
                {
                    var excessTransaction = new Transaction
                    {
                        ScheduleId = nextLoanPay.Id,
                        Amount = nextPayment,
                        TransactionDate = DateTime.Now
                    };

                    _context.Transactions.Add(excessTransaction);
                    nextLoanPay.Status = "Paid";
                    excessPayment -= nextPayment; // Deduct the full nextPayment from the excessPayment
                }
                else
                {
                    var excessTransaction = new Transaction
                    {
                        ScheduleId = nextLoanPay.Id,
                        Amount = excessPayment.Value,
                        TransactionDate = DateTime.Now
                    };

                    _context.Transactions.Add(excessTransaction);
                    // Do not subtract excess payment from nextLoanPay.Payment
                    excessPayment = 0; // All excess payment applied
                }

                _context.SaveChanges();
            }
        }

        // Update the total left amount and status of the loan entity
        loanEntity.TotalLeft -= loan.Payment;
        if (loanEntity.TotalLeft <= 0)
        {
            loanEntity.TotalLeft = 0;
            loanEntity.Status = "Fully Paid";
        }
        else
        {
            loanEntity.Status = "Not Fully Paid";
        }
        _context.SaveChanges();

        return Ok();
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"An error occurred while updating the entities: {ex.Message}");
    }
}


        [HttpGet("GetLoanbyId/{id}")]
        public IActionResult GetLoanbyId(int id)
        {
            var client = _context.Loans.Where(loan => loan.Borrower == id).ToList();
            if (client == null)
            {
                return NotFound("Client not found");
            }
            return Ok(client);
        }

        [HttpGet("GetLoanbyIds/{id}")]
        public IActionResult GetLoanbyIds(int id)
        {
            var client = _context.Loans.Find(id);
            if (client == null)
            {
                return NotFound("Client not found");
            }
            return Ok(client);
        }

            [HttpGet("GetTransactionToPrint/{id}")]
        public IActionResult GetTransactionsToPrint(int id)
{
    var transactions = _context.Transactions.Where(t => t.ScheduleId == id).ToList();
    if (transactions == null)
    {
        return NotFound("Transactions not found for the specified scheduleId");
    }
    
    return Ok(transactions);
}
    
    }
    
}


