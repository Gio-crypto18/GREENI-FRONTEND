import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TipoInteraccion } from '../../../models/TipoInteraccion';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TipoInteraccionservice } from '../../../services/tipointeraccionservice';

@Component({
  selector: 'app-tipointeraccionrinsertar',
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatSelectModule,MatRadioModule,MatDatepickerModule,MatButtonModule,RouterModule],
  templateUrl: './tipointeraccionrinsertar.html',
  styleUrl: './tipointeraccionrinsertar.css',
  providers: [provideNativeDateAdapter()],
})
export class Tipointeraccionrinsertar {
  form: FormGroup = new FormGroup({});
  tip: TipoInteraccion = new TipoInteraccion();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private tS: TipoInteraccionservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

      this.form = this.formBuilder.group({
  codigo: [''],
  nombre: ['', [Validators.required, Validators.maxLength(5)]],
});
  }
  aceptar(): void {
    if (this.form.valid) {
      this.tip.tipoInteraccion_Id = this.form.value.codigo;
      this.tip.nombre = this.form.value.nombre;
      
      if (this.edicion) {
        this.tS.update(this.tip).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tip).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['/app/tipointeraccion/listar']);
    }
  }
  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.tipoInteraccion_Id),
          nombre: new FormControl(data.nombre),
    
        });
      });
    }
  }
}
