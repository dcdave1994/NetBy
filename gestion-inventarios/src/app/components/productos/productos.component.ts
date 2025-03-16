import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  mostrarFormulario = false;
  productoSeleccionado: any = { id: null, nombre: '', descripcion: '', categoria: '', imagen: '', precio: 0, stock: 0 };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // 🔹 Cargar productos desde la API
  cargarProductos() {
    this.apiService.getProductos().subscribe((data: any) => {
      this.productos = data;
    });
  }

  // 🔹 Abrir el formulario de edición o creación
  abrirFormulario(producto: any = null) {
    this.productoSeleccionado = producto ? { ...producto } : { id: null, nombre: '', descripcion: '', categoria: '', imagen: '', precio: 0, stock: 0 };
    this.mostrarFormulario = true;
  }

  // 🔹 Cerrar formulario
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  // 🔹 Guardar el producto (Crear o Editar)
  guardarProducto() {
    if (this.productoSeleccionado.id) {
      this.apiService.updateProducto(this.productoSeleccionado.id, this.productoSeleccionado)
        .subscribe(() => this.cargarProductos());
    } else {
      this.apiService.createProducto(this.productoSeleccionado)
        .subscribe(() => this.cargarProductos());
    }
    this.cerrarFormulario();
  }

  // 🔹 Eliminar producto
  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.apiService.deleteProducto(id)
        .subscribe(() => this.cargarProductos());
    }
  }
}