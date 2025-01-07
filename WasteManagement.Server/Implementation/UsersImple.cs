using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WasteManagement.Server.Data;
using WasteManagement.Server.DTO;
using WasteManagement.Server.Interfaces;
using WasteManagement.Server.Models;

namespace WasteManagement.Server.Implementation
{
    public class UsersImple : IUsers
    {
        private readonly WasteManagementDBContext _db;
        public UsersImple(WasteManagementDBContext db)
        {
            _db = db;
        }

        public async Task<bool> AddUser(UserDTO user)
        {
            bool isExistingUser = await _db.Users.AnyAsync(u => u.Email == user.Email);
            if (isExistingUser)
            {
                return false;
            }
            var newUser = new Users()
            {
                Name = user.Name,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                MobileNumber = user.MobileNumber,
                Email = user.Email.ToLower(),
                Password = user.Password,
                Coins = 0
            };
            await _db.Users.AddAsync(newUser);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateUser(UpdateUserDetailDTO userDetails)
        {
            var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == userDetails.Email);
            if (existingUser == null)
            {
                return false;
            }
            if (!string.IsNullOrEmpty(userDetails.Name))
            {
                existingUser.Name = userDetails.Name;
            }
            if (userDetails.DateOfBirth != default)
            {
                existingUser.DateOfBirth = userDetails.DateOfBirth;
            }
            if (!string.IsNullOrEmpty(userDetails.Gender))
            {
                existingUser.Gender = userDetails.Gender;
            }
            if (!string.IsNullOrEmpty(userDetails.MobileNumber))
            {
                existingUser.MobileNumber = userDetails.MobileNumber;
            }
            _db.Users.Update(existingUser);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteUser(int id)
        {
            var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (existingUser == null)
            {
                return false;
            }
            _db.Users.Remove(existingUser);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<Users?> GetUser(string email)
        {
            var userDetails = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (userDetails == null)
                return null;
            return userDetails;
        }
        public async Task<bool> verifyUserByEmail(string email)
        {
            var userDetails = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (userDetails == null)
                return false;
            return true;
        }
        public async Task<bool> DepositCoins(string email,int amount)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return false;
            }
            user.Coins += amount;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
