import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule ],
  providers: [ApiService], //  Agregar el servicio como proveedor
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventario';
  productos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarProductos(); //  Cargar productos al iniciar
  }

  cargarProductos() { //  
    this.apiService.getProductos().subscribe(
      (data) => {
        console.log('Productos obtenidos:', data);
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
}

