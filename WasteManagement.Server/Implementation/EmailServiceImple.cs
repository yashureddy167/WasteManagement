using System.Net.Mail;
using System.Net;
using WasteManagement.Server.Interfaces;

namespace WasteManagement.Server.Implementation
{
    public class EmailServiceImple : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailServiceImple(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<bool> SendOtpToResetPasswordByEmail(string email, string twoFactorCode)
        {
            try
            {
                var smtpClient = new SmtpClient(_configuration["Smtp:Host"])
                {
                    Port = int.Parse(_configuration["Smtp:Port"]),
                    Credentials = new NetworkCredential(_configuration["Smtp:Username"], _configuration["Smtp:Password"]),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["Smtp:From"]),
                    Subject = "Password reset code",
                    Body = $"Your code to reset password is: {twoFactorCode}",
                    IsBodyHtml = false,
                };

                mailMessage.To.Add(email);
                await smtpClient.SendMailAsync(mailMessage);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<bool> SendVoucherToUserByEmail(string email, string companyName, int voucherCost)
        {
            try
            {
                var smtpClient = new SmtpClient(_configuration["Smtp:Host"])
                {
                    Port = int.Parse(_configuration["Smtp:Port"]),
                    Credentials = new NetworkCredential(_configuration["Smtp:Username"], _configuration["Smtp:Password"]),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["Smtp:From"]),
                    Subject = $"{companyName} Voucher",
                    Body = $"You have received a voucher of {voucherCost} rupees. Your voucher code is xyzy-1234-@123-o964.",
                    IsBodyHtml = false,
                };

                mailMessage.To.Add(email);
                await smtpClient.SendMailAsync(mailMessage);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
