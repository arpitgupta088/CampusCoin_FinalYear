using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CampusCoinBackend.Data;
using CampusCoinBackend.Models;

namespace CampusCoinBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("add")]
        public IActionResult AddTransaction(Transaction model)
        {
            _context.Transactions.Add(model);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Transaction Saved Successfully"
            });
        }

        [Authorize]
        [HttpGet("all")]
        public IActionResult GetTransactions()
        {
            var transactions = _context.Transactions
                .OrderByDescending(x => x.CreatedAt)
                .ToList();

            return Ok(transactions);
        }
    }
}