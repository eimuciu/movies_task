using Microsoft.EntityFrameworkCore;
using movies_task.Entities;

namespace movies_task.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Movies> Movies { get; set; }
    }
}