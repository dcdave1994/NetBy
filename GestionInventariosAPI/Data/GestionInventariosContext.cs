using Microsoft.EntityFrameworkCore;
using GestionInventariosAPI.Models;

namespace GestionInventariosAPI.Data
{
    public class GestionInventariosContext : DbContext
    {
        public GestionInventariosContext(DbContextOptions<GestionInventariosContext> options) : base(options) { }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Transaccion> Transacciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transaccion>().Ignore(t => t.PrecioTotal);
	  

            modelBuilder.Entity<Transaccion>()
                .HasOne(t => t.Producto)
                .WithMany()
                .HasForeignKey(t => t.ProductoID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
