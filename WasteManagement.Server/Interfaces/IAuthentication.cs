using WasteManagement.Server.DTO;

namespace WasteManagement.Server.Interfaces
{
    public interface IAuthentication
    {
        public Task<UserDataDTO?> LoginUser(string email, string password);
        public Task<bool> ChangePassword(string email, string oldPassword, string newPassword);
        public Task<bool> ForgotPassword(string email, string password);
    }
}
