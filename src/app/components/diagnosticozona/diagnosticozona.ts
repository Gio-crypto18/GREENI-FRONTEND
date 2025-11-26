import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlantIdentifierComponent } from "../apidiagnostico/apidiagnostico";
import { MatIcon } from '@angular/material/icon';
import { Diagnosticolistar } from '../diagnostico/diagnosticolistar/diagnosticolistar';

@Component({
  selector: 'app-diagnostico',
  imports: [CommonModule, PlantIdentifierComponent, RouterLink],
  templateUrl: './diagnosticozona.html',
  styleUrl: './diagnosticozona.css',
})
export class Diagnosticozona {
constructor(public route:ActivatedRoute) {}


}
