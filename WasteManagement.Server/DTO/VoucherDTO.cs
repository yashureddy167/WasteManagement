namespace WasteManagement.Server.DTO
{
    public class VoucherDTO
    {
        public int Id { get; set; }
        public required string CompanyName { get; set; }
        public required string Image { get; set; }
        public int VoucherCost { get; set; }
        public required string Description { get; set; }
    }
}
