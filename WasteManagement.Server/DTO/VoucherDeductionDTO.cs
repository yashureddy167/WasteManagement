namespace WasteManagement.Server.DTO
{
    public class VoucherDeductionDTO
    {
        public int VoucherId { get; set; }
        public required string Email { get; set; }
        public int Coins { get; set; }
    }
}
