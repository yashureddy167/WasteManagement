namespace WasteManagement.Server.DTO
{
    public class UserDTO
    {
        public required string Name { get; set; }
        public required DateTime DateOfBirth { get; set; }
        public required string Gender { get; set; }
        public required string MobileNumber { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public int Coins { get; set; }
    }
}
