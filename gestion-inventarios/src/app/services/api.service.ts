import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) {}

  //  PRODUCTOS  
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/productos`);
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productos`, producto);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/productos/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/productos/${id}`);
  }

  //  TRANSACCIONES  
  getTransacciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transacciones`);
  }

  createTransaccion(transaccion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transacciones`, transaccion);
  }

  updateTransaccion(transaccion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/transacciones/${transaccion.id}`, transaccion);
  }

  deleteTransaccion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/transacciones/${id}`);
  }
}
