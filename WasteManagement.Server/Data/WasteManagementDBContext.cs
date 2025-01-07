using Microsoft.EntityFrameworkCore;
using WasteManagement.Server.Models;

namespace WasteManagement.Server.Data
{
    public class WasteManagementDBContext : DbContext
    {
        public WasteManagementDBContext(DbContextOptions<WasteManagementDBContext> options) : base(options){}
        public DbSet<Users> Users { get; set; }
        public DbSet<Vouchers> Vouchers { get; set; }
    }
}
