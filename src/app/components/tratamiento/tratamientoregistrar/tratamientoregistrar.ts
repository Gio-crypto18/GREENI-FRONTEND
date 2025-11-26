import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tratamiento } from '../../../models/Tratamiento';
import { Tratamientoservice } from '../../../services/tratamientoservice';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Diagnosticoservice } from '../../../services/diagnosticoservice';
import { Diagnostico } from '../../../models/Diagnostico';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-tratamientoregistrar',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDatepicker,
    RouterLink
  ],
  templateUrl: './tratamientoregistrar.html',
  styleUrl: './tratamientoregistrar.css',
})
export class Tratamientoregistrar implements OnInit {

  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;
  sof: Tratamiento = new Tratamiento();
  listaDiagnostico: Diagnostico[] = [];

  constructor(
    private tS: Tratamientoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dS: Diagnosticoservice
  ) {}

  ngOnInit(): void {

    this.dS.list().subscribe((data) => {
      this.listaDiagnostico = data;
    });


    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      duracion: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      diagnostico: ['', Validators.required]  
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {

      this.sof.idTratamiento = this.form.value.codigo;
      this.sof.nombre = this.form.value.nombre;
      this.sof.duracion = this.form.value.duracion;
      this.sof.fechainicio = this.form.value.fechainicio;
      this.sof.fechafin = this.form.value.fechafin;
      this.sof.diagnostico.idDiagnostico = this.form.value.diagnostico;

      if (this.edicion) {
        this.tS.update(this.sof).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.sof).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }

      this.router.navigate(['/app/tratamiento/listar']);
    }
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTratamiento),
          nombre: new FormControl(data.nombre),
          duracion: new FormControl(data.duracion),
          fechainicio: new FormControl(data.fechainicio),
          fechafin: new FormControl(data.fechafin),
          diagnostico: new FormControl(data.diagnostico.idDiagnostico) 
        });
      });
    }
  }
}
