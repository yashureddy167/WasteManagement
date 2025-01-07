using Microsoft.EntityFrameworkCore;
using WasteManagement.Server.Data;
using WasteManagement.Server.DTO;
using WasteManagement.Server.Interfaces;
using WasteManagement.Server.Models;

namespace WasteManagement.Server.Implementation
{
    public class VoucherImple : IVoucher
    {
        private readonly WasteManagementDBContext _db;
        private readonly IEmailService _emailService;
        public VoucherImple(WasteManagementDBContext db
            , IEmailService emailService)
        {
            _db = db;
            _emailService = emailService;
        }

        public async Task<Vouchers?> AddVoucher(VoucherDTO voucher)
        {
            if (voucher == null)
            {
                return null  ;
            }
            var newVoucher = new Vouchers()
            {
                CompanyName = voucher.CompanyName,
                Image = voucher.Image,
                VoucherCost = voucher.VoucherCost,
                Description = voucher.Description
            };
            _db.Vouchers.Add(newVoucher);
            await _db.SaveChangesAsync();
            var voucherDetails = await _db.Vouchers.FirstOrDefaultAsync(x => x.CompanyName == voucher.CompanyName);
            return voucherDetails;
        }
        public async Task<bool> UpdateVoucher(VoucherDTO voucher)
        {
            var existingVoucher = await _db.Vouchers.FirstOrDefaultAsync(x => x.CompanyId == voucher.Id);
            if (existingVoucher == null)
            {
                return false;
            }
            existingVoucher.CompanyName = voucher.CompanyName;
            existingVoucher.Image = voucher.Image;
            existingVoucher.VoucherCost = voucher.VoucherCost;
            existingVoucher.Description = voucher.Description;
            _db.Vouchers.Update(existingVoucher);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteVoucher(int companyId)
        {
            var existingVoucher = await _db.Vouchers.FirstOrDefaultAsync(x => x.CompanyId == companyId);
            if (existingVoucher == null)
            {
                return false;
            }
            _db.Vouchers.Remove(existingVoucher);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<List<VoucherDTO?>> GetAllVouchers()
        {
            var vouchers = await _db.Vouchers.ToListAsync();
            if (vouchers == null)
            {
                return new List<VoucherDTO?>();
            }
            var voucherList = vouchers.Select(x => new VoucherDTO()
            {
                Id = x.CompanyId,
                CompanyName = x.CompanyName,
                Image = x.Image,
                VoucherCost = x.VoucherCost,
                Description = x.Description
            }).ToList();
            return voucherList;
        }
        public async Task<bool> DeductVoucherAmountAndSendVoucherCode(VoucherDeductionDTO voucherDetails)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Email == voucherDetails.Email);
            var voucher = await _db.Vouchers.FirstOrDefaultAsync(x => x.CompanyId == voucherDetails.VoucherId);

            if (voucher == null || user == null || voucher.VoucherCost < voucherDetails.Coins)
            {
                return false;
            }
            user.Coins -= voucherDetails.Coins;
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
            _emailService.SendVoucherToUserByEmail(user.Email,voucher.CompanyName,voucher.VoucherCost);
            return true;
        }
    }
}
