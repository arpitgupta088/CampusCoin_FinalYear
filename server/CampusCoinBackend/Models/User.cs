namespace CampusCoinBackend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string StudentId { get; set; }
        public required string Department { get; set; }
        public string? WalletAddress { get; set; }
        public string Role { get; set; } = "Student";
    }
}