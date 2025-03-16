using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionInventariosAPI.Data;
using GestionInventariosAPI.Models;

namespace GestionInventariosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransaccionesController : ControllerBase
    {
        private readonly GestionInventariosContext _context;

        public TransaccionesController(GestionInventariosContext context)
        {
            _context = context;
        }

        // GET: api/Transacciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaccion>>> GetTransacciones()
        {
            return await _context.Transacciones.ToListAsync();
        }

        // GET: api/Transacciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaccion>> GetTransaccion(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);

            if (transaccion == null)
            {
                return NotFound();
            }

            return transaccion;
        }

        // PUT: api/Transacciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaccion(int id, Transaccion transaccion)
        {
            if (id != transaccion.TransaccionID)
            {
                return BadRequest(new { mensaje = "El ID de la transacción no coincide" });
            }

            _context.Entry(transaccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransaccionExists(id))
                {
                    return NotFound(new { mensaje = "La transacción no existe" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Transacciones
        [HttpPost]
        public async Task<ActionResult<Transaccion>> PostTransaccion(Transaccion transaccion)
        {
            // Buscar el producto en la base de datos
            var producto = await _context.Productos.FindAsync(transaccion.ProductoID);

            if (producto == null)
            {
                return NotFound(new { mensaje = "Producto no encontrado" });
            }

            // Validar que hay suficiente stock
            if (producto.Stock < transaccion.Cantidad)
            {
                return BadRequest(new { mensaje = "Stock insuficiente para realizar la transacción" });
            }

            // Restar la cantidad vendida del stock
            producto.Stock -= transaccion.Cantidad;

            // Guardar la transacción y actualizar el stock del producto
            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaccion", new { id = transaccion.TransaccionID }, transaccion);
        }

        // DELETE: api/Transacciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaccion(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null)
            {
                return NotFound(new { mensaje = "Transacción no encontrada" });
            }

            _context.Transacciones.Remove(transaccion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransaccionExists(int id)
        {
            return _context.Transacciones.Any(e => e.TransaccionID == id);
        }
    }
}
