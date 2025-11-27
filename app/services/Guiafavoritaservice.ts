import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GuiaFavorita } from '../models/GuiaFavorita';



const base_url = enviroment.base

@Injectable({
  providedIn: 'root',
})

export class Guiafavoritaservice {

  private url=`${base_url}/guiasfavoritas`;
  private listaCambio = new Subject<GuiaFavorita[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<GuiaFavorita[]>(this.url);
  }

  insert(d: GuiaFavorita) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: GuiaFavorita[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number){
    return this.http.get<GuiaFavorita>(`${this.url}/${id}`);
  }
  
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
