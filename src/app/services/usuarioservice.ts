import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';

const base_url = enviroment.base

@Injectable({
  providedIn: 'root',
})

export class Usuarioservice {

  private url=`${base_url}/usuarios`;
  
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<Usuario[]>(this.url);
  }

  insert(d: Usuario) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number){
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(r: Usuario) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
