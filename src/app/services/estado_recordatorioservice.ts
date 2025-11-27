import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { EstadoRecordatorio } from '../models/EstadoRecordatorio';



const base_url = enviroment.base

@Injectable({
  providedIn: 'root',
})

export class EstadoRecordatorioservice {

  private url=`${base_url}/estado_recordatorio`;
  private listaCambio = new Subject<EstadoRecordatorio[]>();
  constructor(private http: HttpClient) {}
  
  list(){
    return this.http.get<EstadoRecordatorio[]>(this.url);
  }

  insert(d: EstadoRecordatorio) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: EstadoRecordatorio[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
   listId(id: number){
    return this.http.get<EstadoRecordatorio>(`${this.url}/${id}`);
  }
  update(r: EstadoRecordatorio) {
    return this.http.put(this.url, r, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
