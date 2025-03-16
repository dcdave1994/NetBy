import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
//import { BusquedaComponent } from './components/busqueda/busqueda.component';

export const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  //{ path: 'busqueda', component: BusquedaComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }
];
