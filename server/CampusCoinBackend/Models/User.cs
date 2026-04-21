namespace CampusCoinBackend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string StudentId { get; set; }
        public string Department { get; set; }
        public string WalletAddress { get; set; }
        public string Role { get; set; } = "Student";
    }
}