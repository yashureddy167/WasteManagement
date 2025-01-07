using Microsoft.EntityFrameworkCore;
using WasteManagement.Server.Data;
using WasteManagement.Server.DTO;
using WasteManagement.Server.Interfaces;

namespace WasteManagement.Server.Implementation
{
    public class AuthenticationImple : IAuthentication
    {
        private readonly WasteManagementDBContext _db;

        public AuthenticationImple(WasteManagementDBContext db)
        {
            _db = db;
        }

        public async Task<bool> ChangePassword(string email, string oldPassword, string newPassword)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == oldPassword);
            if (user == null)
            {
                return false;
            }
            user.Password = newPassword;
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<bool> ForgotPassword(string email, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            { 
                return false;
            }
            user.Password = password;
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<UserDataDTO?> LoginUser(string email, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            if (user == null)
            {
                return null;
            }
            return new UserDataDTO
            {
                Name = user.Name,
                DateOfBirth = user.DateOfBirth,
                Email = user.Email,
                Gender = user.Gender,
                MobileNumber = user.MobileNumber,
                coins = user.Coins,
            };
        }
    }
}
