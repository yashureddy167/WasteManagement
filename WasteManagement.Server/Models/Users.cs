using System.ComponentModel.DataAnnotations;

namespace WasteManagement.Server.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required DateTime DateOfBirth { get; set; }
        public required string Gender { get; set; }
        public required string MobileNumber { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public int Coins { get; set; }
    }
}
