import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TipoInteraccion } from '../models/TipoInteraccion';



const base_url = enviroment.base

@Injectable({
  providedIn: 'root',
})

export class TipoInteraccionservice {

  private url=`${base_url}/tipointeraccion`;
  private listaCambio = new Subject<TipoInteraccion[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<TipoInteraccion[]>(this.url);
  }

  insert(d: TipoInteraccion) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: TipoInteraccion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number){
    return this.http.get<TipoInteraccion>(`${this.url}/${id}`);
  }
  update(r: TipoInteraccion) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
