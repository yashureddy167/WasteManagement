using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WasteManagement.Server.Interfaces;

namespace WasteManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }
        [HttpGet("send-otp-via-email-to-reset-password")]
        public async Task<IActionResult> SendOtpToResetPasswordByEmail(string email, string otp)
        {
            bool isSent = await _emailService.SendOtpToResetPasswordByEmail(email, otp);
            // Send OTP to email
            if (isSent)
            {
                return Ok(new { isSuccess = true, message = "OTP sent successfully" });
            }
            else
            {
                return BadRequest(new { isSuccess = false, message = "OTP not sent, Try again!!!" });
            }
        }
    }
}
