using System.ComponentModel.DataAnnotations;

namespace WasteManagement.Server.Models
{
    public class Vouchers
    {
        [Key]
        public int CompanyId { get; set; }
        public required string CompanyName { get; set; }
        public required string Image { get; set; }
        public int VoucherCost { get; set; }
        public required string Description { get; set; }
    }
}
