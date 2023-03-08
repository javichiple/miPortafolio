import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean  = false;

  constructor( private http: HttpClient) { 

     console.log('Servicio de infor pagina listo');

     //Leer el archivo JSON
     this.http.get ('assets/data/data-pagina.json')
        .subscribe ((resp: InfoPagina) => { //de la peticion http vamos a recibir una respuesta.
          console.log(resp);

          this.cargada = true;
          this.info = resp;

        })

   }
}
