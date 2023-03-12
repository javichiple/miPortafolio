import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean  = false;

  equipo: any[] = [];

  constructor( private http: HttpClient) { 

     //console.log('Servicio de infor pagina listo');

     this.cargarInfo();
     this.cargarEquipo();
     

   }

   cargarInfo(){
    //Leer el archivo JSON
    this.http.get ('assets/data/data-pagina.json')
    .subscribe ((resp: InfoPagina) => { //de la peticion http vamos a recibir una respuesta.
      //console.log(resp);

      this.cargada = true;
      this.info = resp;

    })
   }

   cargarEquipo(){

    this.http.get('https://miportafolio-c692c-default-rtdb.firebaseio.com/equipo.json')
      .subscribe((equipo:any) => {

        this.equipo = equipo;
        //console.log (equipo);
      })
   }
}
