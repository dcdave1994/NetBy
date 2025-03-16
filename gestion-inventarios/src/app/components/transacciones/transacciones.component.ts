import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  transacciones: any[] = [];
  productos: any[] = [];
  mostrarFormulario = false;
  transaccionSeleccionada: any = {
    id: null,
    fecha: new Date().toISOString().split('T')[0], // Fecha actual
    tipo: 'compra', // Opción por defecto
    productoId: null,
    cantidad: 0,
    precioUnitario: 0,
    precioTotal: 0,
    detalle: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarTransacciones();
    this.cargarProductos();
  }

  cargarTransacciones() {
    this.apiService.getTransacciones().subscribe(
      (data) => {
        this.transacciones = data;
      },
      (error) => {
        console.error('Error al obtener transacciones:', error);
      }
    );
  }

  cargarProductos() {
    this.apiService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  abrirFormulario(transaccion?: any) {
    this.mostrarFormulario = true;
    this.transaccionSeleccionada = transaccion
      ? { ...transaccion }
      : {
          id: null,
          fecha: new Date().toISOString().split('T')[0],
          tipo: 'compra',
          productoId: null,
          cantidad: 0,
          precioUnitario: 0,
          precioTotal: 0,
          detalle: ''
        };
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  guardarTransaccion() {
    this.transaccionSeleccionada.precioTotal =
      this.transaccionSeleccionada.cantidad * this.transaccionSeleccionada.precioUnitario;

    if (this.transaccionSeleccionada.id) {
      this.apiService.updateTransaccion(this.transaccionSeleccionada).subscribe(() => {
        this.cargarTransacciones();
        this.cerrarFormulario();
      });
    } else {
      this.apiService.createTransaccion(this.transaccionSeleccionada).subscribe(() => {
        this.cargarTransacciones();
        this.cerrarFormulario();
      });
    }
  }

  eliminarTransaccion(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta transacción?')) {
      this.apiService.deleteTransaccion(id).subscribe(() => {
        this.cargarTransacciones();
      });
    }
  }
}
