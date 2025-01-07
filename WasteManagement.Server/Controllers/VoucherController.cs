using Microsoft.AspNetCore.Mvc;
using WasteManagement.Server.DTO;
using WasteManagement.Server.Interfaces;

namespace WasteManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly IVoucher _voucher;
        public VoucherController(IVoucher voucher)
        {
            _voucher = voucher;
        }
        [HttpPost("AddVoucher")]
        public async Task<IActionResult> AddVoucher([FromBody] VoucherDTO voucher)
        {
            var result = await _voucher.AddVoucher(voucher);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest(new { isSuccess = false, message = "Voucher not added, Try again!!!" });
        }
        [HttpPut("UpdateVoucher")]
        public async Task<IActionResult> UpdateVoucher([FromBody] VoucherDTO voucher)
        {
            var result = await _voucher.UpdateVoucher(voucher);
            if (result)
            {
                return Ok(new { isSuccess = true, message = $"{voucher.CompanyName} Voucher Updated Successfully" });
            }
            return BadRequest(new { isSuccess = false, message = $"{voucher.CompanyName} Voucher not updated, Try again!!!" });
        }
        [HttpDelete("DeleteVoucher")]
        public async Task<IActionResult> DeleteVoucher(int companyId)
        {
            var result = await _voucher.DeleteVoucher(companyId);
            if (result)
            {
                return Ok(new { isSuccess = true, message = "Voucher Deleted Successfully" });
            }
            return BadRequest(new { isSuccess = false, message = "Voucher not deleted, Try again!!!" });
        }
        [HttpGet("GetAllVouchers")]
        public async Task<IActionResult> GetAllVouchers()
        {
            var result = await _voucher.GetAllVouchers();
            if (result != null)
            {
                return Ok(new { isSuccess = true, message = "Vouchers Fetched Successfully", data = result });
            }
            return BadRequest(new { isSuccess = false, message = "Vouchers not fetched, Try again!!!" });
        }
        [HttpPut("SendVoucherToUserByEmail-DeductCoins")]
        public async Task<IActionResult> DeductCoinsAndSendVoucherToUserByEmail(VoucherDeductionDTO voucherDeductionDTO)
        {
            var result = await _voucher.DeductVoucherAmountAndSendVoucherCode(voucherDeductionDTO);
            if (result)
            {
                return Ok(new { isSuccess = true, message = "Voucher Sent Successfully" });
            }
            return BadRequest(new { isSuccess = false, message = "Voucher not sent, Try again!!!" });
        }
    }
}
