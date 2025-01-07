using Microsoft.AspNetCore.Mvc;
using WasteManagement.Server.DTO;
using WasteManagement.Server.Interfaces;

namespace WasteManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsers _users;
        public UserController(IUsers users)
        {
            _users = users;
        }
        [HttpPost("add")]
        public async Task<IActionResult> AddUser(UserDTO user)
        {
            bool isAdded = await _users.AddUser(user);
            if (isAdded)
            {
                return Ok(new { isSuccess = true, message = "User added to db" });
            }
            return Ok(new { isSuccess = false, message = "The email already registered, use another email" });
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser(UpdateUserDetailDTO userDetails)
        {
            bool isUpdated = await _users.UpdateUser(userDetails);
            if (isUpdated)
            {
                return Ok(new { isSuccess = true, message = "User details updated" });
            }
            return Ok(new { isSuccess = false, message = "User details not updated, Please try again !!!" });
        }
        [HttpGet("get")]
        public async Task<IActionResult> GetUser(string email)
        {
            var user = await _users.GetUser(email);
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound(new { isSuccess = false, message = "User not found, Try again with registered email !!!" });
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            bool isDeleted = await _users.DeleteUser(id);
            if (isDeleted)
            {
                return Ok(new { isSuccess = true, message = "User Deleted" });
            }
            return Ok(new { isSuccess = false, message = "User not deleted, Please try again !!!" });
        }
        [HttpGet("verify-user-email")]
        public async Task<IActionResult> VerifyUserByEmail(string email)
        {
            bool isVerified = await _users.verifyUserByEmail(email);
            if (isVerified)
            {
                return Ok(new { isSuccess = true});
            }
            return Ok(new { isSuccess = false, message = "Email does not exists. Please enter registered email" });
        }
        [HttpPut("deposit-coins")]
        public async Task<IActionResult> DepositCoins(DepositCoinsDTO depositCoins)
        {
            bool isDeposited = await _users.DepositCoins(depositCoins.Email.ToLower(), depositCoins.Coins);
            if (isDeposited)
            {
                return Ok(new { isSuccess = true, message = "Congratulations Coins deposited !!!" });
            }
            return Ok(new { isSuccess = false, message = "Coins not deposited, Please try again !!!" });
        }
    }
}
