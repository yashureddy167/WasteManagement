﻿namespace WasteManagement.Server.DTO
{
    public class ChangePasswordDTO
    {
        public required string Email { get; set; }
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
