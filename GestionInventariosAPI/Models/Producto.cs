using System.ComponentModel.DataAnnotations;

namespace GestionInventariosAPI.Models
{
    public class Producto
    {
        [Key]
        public int ProductoID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Categoria { get; set; }
        public string Imagen { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
    }
}