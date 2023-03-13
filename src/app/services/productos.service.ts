import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }


  private cargarProductos(){

    return new Promise((resolve, reject) => {

      this.http.get<Producto[]>('https://miportafolio-c692c-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          //console.log(resp);
          this.cargando = false;
          this.productos = resp;
          resolve('');

        });


    });

  }

  getProducto( id: string ){
    return this.http.get<ProductoDescripcion>(`https://miportafolio-c692c-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){

    if (this.productos.length === 0){
      //Cargar productos
      this.cargarProductos().then(() => {
        //Ejecutar despues de tener los productos
        //Aplicar Filtro
        this.filtrarProductos(termino);
      });

    } else {
      //Aplicar el filtro
      this.filtrarProductos(termino);
    }


    // //Filter lo que hace es recorrer todo el arreglo y crear un nuevo arreglo con los datos filtrados.
    // this.productosFiltrado = this.productos.filter(producto => {
    //   return true;
    // });
    // console.log(this.productosFiltrado);

  }

  private filtrarProductos(termino: string) {

    //console.log(this.productos);
    this.productosFiltrado = []; //Purgamos el arreglo cada vez que se llamada la busqueda

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      //Como JS es case sensitive, lo que debemos hacer es pasar el titulo a minusculas y luego lo usamos para comprarar.
      const tituloLower = prod.titulo.toLocaleLowerCase();

      //Recorremos los productos y si el "termino" coincide en alguna parte con la categoria de alguno de los productos o de su titulo, lo agrega en el arrego productosFiltrado.
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ){ 

        this.productosFiltrado.push(prod);

      }
    });

  }

}
