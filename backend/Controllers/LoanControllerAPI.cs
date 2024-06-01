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
        // Calculate excess payment
        double? excessPayment = loan.Payment - existingLoanPay.Payment.Value;

        // Update the LoanPay entity
        existingLoanPay.Schedule = loan.Schedule;
        existingLoanPay.LoanTime = DateTime.Now;

        if (existingLoanPay.Payment <= 0)
        {
            existingLoanPay.Payment = 0;
            existingLoanPay.Status = "Paid";
        }
        else
        {
            existingLoanPay.Status = "Initial Payment";
        }
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

        var transaction = new Transaction
        {
            ScheduleId = existingLoanPay.Id,
            Amount = loan.Payment,
            TransactionDate = DateTime.Now
        };

        _context.Transactions.Add(transaction);
        _context.SaveChanges();
        var totalPaid = _context.Transactions
            .Where(t => t.ScheduleId == existingLoanPay.Id)
            .Sum(t => t.Amount);
        if (totalPaid == existingLoanPay.Payment)
        {
            existingLoanPay.Status = "Paid";
            _context.SaveChanges();
        }

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
    }
}
