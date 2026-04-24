namespace CampusCoinBackend.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public required string SenderWallet { get; set; }
        public required string ReceiverWallet { get; set; }
        public decimal Amount { get; set; }
        public required string TransactionHash { get; set; }
        public required string TransactionType { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}