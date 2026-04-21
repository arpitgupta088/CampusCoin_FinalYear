namespace CampusCoinBackend.Models
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public string SenderWallet { get; set; }
        public string ReceiverWallet { get; set; }
        public decimal Amount { get; set; }
        public string TransactionHash { get; set; }
        public string TransactionType { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}