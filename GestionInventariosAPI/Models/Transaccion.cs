using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestionInventariosAPI.Models
{
    public class Transaccion
    {
        [Key]
        public int TransaccionID { get; set; }

        public DateTime Fecha { get; set; } = DateTime.Now;

        [Required]
        [StringLength(10)]
        public string Tipo { get; set; } // Compra o Venta

        [Required]
        public int ProductoID { get; set; }

        [ForeignKey("ProductoID")]
        public Producto Producto { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor a 0.")]
        public int Cantidad { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "El precio debe ser mayor o igual a 0.")]
        public decimal PrecioUnitario { get; set; }

        [NotMapped]
        public decimal PrecioTotal => Cantidad * PrecioUnitario;

        public string Detalle { get; set; }
    }
}
