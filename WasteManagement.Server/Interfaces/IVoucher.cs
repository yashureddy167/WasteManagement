using WasteManagement.Server.DTO;
using WasteManagement.Server.Models;

namespace WasteManagement.Server.Interfaces
{
    public interface IVoucher
    {
        public Task<Vouchers?> AddVoucher(VoucherDTO voucher);
        public Task<bool> UpdateVoucher(VoucherDTO voucher);
        public Task<bool> DeleteVoucher(int companyId);
        public Task<List<VoucherDTO?>> GetAllVouchers();
        public Task<bool> DeductVoucherAmountAndSendVoucherCode(VoucherDeductionDTO voucherDetails);
    }
}
