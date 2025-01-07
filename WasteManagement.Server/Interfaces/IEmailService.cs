namespace WasteManagement.Server.Interfaces
{
    public interface IEmailService
    {
        public Task<bool> SendOtpToResetPasswordByEmail(string email, string otp);
        public Task<bool> SendVoucherToUserByEmail(string email, string companyName, int voucherCost);
    }
}
