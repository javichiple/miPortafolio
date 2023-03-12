import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }


  private cargarProductos(){
    this.http.get<Producto[]>('https://miportafolio-c692c-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
        console.log(resp);
        this.cargando = false;
        this.productos = resp;
      });
  }

}
