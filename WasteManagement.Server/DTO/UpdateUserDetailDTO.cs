namespace WasteManagement.Server.DTO
{
    public class UpdateUserDetailDTO
    {
        public string? Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public required string Email { get; set; }
        public string? MobileNumber { get; set; }
    }
}
