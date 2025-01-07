using Microsoft.AspNetCore.Mvc;
using WasteManagement.Server.DTO;
using WasteManagement.Server.Interfaces;

namespace WasteManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthentication _authentication;
        public AuthenticationController(IAuthentication authentication)
        {
            _authentication = authentication;
        }
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginDTO loginDetails)
        {
            var userData = await _authentication.LoginUser(loginDetails.Email.ToLower(), loginDetails.Password);
            if (userData != null)
            {
                return Ok(new { isSuccess = true, message = "Login Successful", data = userData });
            }
            return BadRequest(new { isSuccess = false, message = "Login Failed, Please try again !!!" });
        }
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePasswordDetails)
        {
            bool isChanged = await _authentication.ChangePassword(changePasswordDetails.Email.ToLower()
                , changePasswordDetails.OldPassword
                , changePasswordDetails.NewPassword);
            if (isChanged)
            {
                return Ok(new { isSuccess = true, message = "Password Changed Successfully" });
            }
            return BadRequest(new { isSuccess = false, message = "Password not changed, check your old password, Please try again !!!" });
        }
        [HttpPut("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ResetPasswordDTO resetPassword)
        {
            bool isForgot = await _authentication.ForgotPassword(resetPassword.Email.ToLower(), resetPassword.Password);
            if (isForgot)
            {
                return Ok(new { isSuccess = true, message = "Password Reset Successfully" });
            }
            return BadRequest(new { isSuccess = false, message = "Password not reset, Please try again !!!" });
        }
    }
}
