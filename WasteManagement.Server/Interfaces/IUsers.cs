using WasteManagement.Server.DTO;
using WasteManagement.Server.Models;

namespace WasteManagement.Server.Interfaces
{
    public interface IUsers
    {
        public Task<bool> AddUser(UserDTO user);
        public Task<bool> UpdateUser(UpdateUserDetailDTO user);
        public Task<Users?> GetUser(string email);
        public Task<bool> DeleteUser(int id);
        public Task<bool> verifyUserByEmail(string email);
        public Task<bool> DepositCoins(string email, int amount);
    }
}
