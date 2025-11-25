
import { TipoInteraccion  } from "./TipoInteraccion"
import { Usuario } from "./Usuario"

export class Interaccion{
    Interaccion_id:number = 0
    descripcion:string =""
    tipoInteraccion:TipoInteraccion = new TipoInteraccion();
    Fecha_pub:Date =new Date()
    usuario:Usuario =new Usuario();
}