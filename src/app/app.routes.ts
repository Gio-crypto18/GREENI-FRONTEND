import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';
import { Index } from './components/index/index';

/* Páginas principales del layout */
import { HomeComponent } from './components/home/home';
import { Planta } from './components/plantas/plantas';
import { Diagnostico } from './components/diagnostico/diagnostico';
import { CalendarComponent } from './components/calendar/calendar';
import { ComunidadComponent } from './components/comunidad/comunidad';
import { PerfilComponent } from './components/perfil/perfil';
import { Plantazona } from './components/plantazona/plantazona';
import { Diagnosticozona } from './components/diagnosticozona/diagnosticozona';
import { Guiazona } from './components/guiazona/guiazona';

/* Administración (CRUD) */
import { Plantaslistar } from './components/plantas/plantaslistar/plantaslistar';
import { Plantainsertar } from './components/plantas/plantainsertar/plantainsertar';

import { Diagnosticolistar } from './components/diagnostico/diagnosticolistar/diagnosticolistar';
import { Diagnosticorinsertar } from './components/diagnostico/diagnosticorinsertar/diagnosticorinsertar';

import { Usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { Usuarioregistrar } from './components/usuario/usuarioregistrar/usuarioregistrar';
import { Usuario } from './components/usuario/usuario';

import { Medicion } from './components/medicion/medicion';
import { Medicionlistar } from './components/medicion/medicionlistar/medicionlistar';
import { Medicionregistrar } from './components/medicion/medicionregistrar/medicionregistrar';

import { Guiainsertar } from './components/guia/guiainsertar/guiainsertar';
import { Guialistar } from './components/guia/guialistar/guialistar';

import { PlantIdentifierComponent } from './components/apidiagnostico/apidiagnostico';
import { Rol } from './components/rol/rol';
import { Rollistar } from './components/rol/rollistar/rollistar';
import { rolinsertar } from './components/rol/rolinsertar/rolinsertar';
import { Guiafav } from './components/guiafav/guiafav';
import { Guifavlistar } from './components/guiafav/guifavlistar/guifavlistar';
import { Guifavregistrar } from './components/guiafav/guifavregistrar/guifavregistrar';
import { GuidesComponent } from './components/guia/guia';
import { TipoInteraccion } from './components/tipo-interaccion/tipo-interaccion';
import { Tipointeraccionlistar } from './components/tipo-interaccion/tipointeraccionlistar/tipointeraccionlistar';
import { Tipointeraccionrinsertar } from './components/tipo-interaccion/tipointeraccionrinsertar/tipointeraccionrinsertar';
import { Recordatorio } from './components/recordatorio/recordatorio';
import { Recordatoriolistar } from './components/recordatorio/recordatoriolistar/recordatoriolistar';
import { Recordatorioregistrar } from './components/recordatorio/recordatorioregistrar/recordatorioregistrar';
import { Interaccion } from './components/interaccion/interaccion';
import { Interaccionlistar } from './components/interaccion/interaccionlistar/interaccionlistar';
import { Interaccionregistrar } from './components/interaccion/interaccionregistrar/interaccionregistrar';
import { EstadoRecordatorio } from './components/estado-recordatorio/estado-recordatorio';
import { Estadorecordatoriolistar } from './components/estado-recordatorio/estadorecordatoriolistar/estadorecordatoriolistar';
import { Estadorecordatorioinsertar } from './components/estado-recordatorio/estadorecordatorioinsertar/estadorecordatorioinsertar';
import { Especie } from './components/especie/especie';
import { Especielistar } from './components/especie/especielistar/especielistar';
import { Especieregistrar } from './components/especie/especieregistrar/especieregistrar';
import { Tratamiento } from './components/tratamiento/tratamiento';
import { Tratamientolistar } from './components/tratamiento/tratamientolistar/tratamientolistar';
import { Tratamientoregistrar } from './components/tratamiento/tratamientoregistrar/tratamientoregistrar';
import { Reportecantidaddiagnostico } from './components/reportecantidaddiagnostico/reportecantidaddiagnostico';
import { Reportevencimiento } from './components/reportevencimiento/reportevencimiento';

export const routes: Routes = [
  /* === LANDING === */
  { path: '', component: Index },

  /* === REDIRECCIONES PARA QUE NO SE SALTEN EL LAYOUT === */
  { path: 'home', redirectTo: 'app/home', pathMatch: 'full' },
  { path: 'mis-plantas', redirectTo: 'app/mis-plantas', pathMatch: 'full' },
  { path: 'diagnostico', redirectTo: 'app/diagnostico', pathMatch: 'full' },
  { path: 'calendario', redirectTo: 'app/calendario', pathMatch: 'full' },
  { path: 'guias', redirectTo: 'app/guias', pathMatch: 'full' },
  { path: 'comunidad', redirectTo: 'app/comunidad', pathMatch: 'full' },
  { path: 'perfil', redirectTo: 'app/perfil', pathMatch: 'full' },

  /* === ZONA PRINCIPAL CON LAYOUT (TODO LO IMPORTANTE VA AQUÍ) === */
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      /* Pantallas principales */
      { path: 'home', component: HomeComponent },
      { path: 'mis-plantas', component: Plantazona },
      { path: 'diagnostico', component: Diagnosticozona },
      { path: 'calendario', component: CalendarComponent },
      { path: 'guias', component: Guiazona },
      { path: 'comunidad', component: ComunidadComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'cantidadseveridad', component:Reportecantidaddiagnostico },
      { path: 'vencitrata', component:Reportevencimiento },

      /* CRUD de plantas dentro del layout */
      {
        path: 'planta',
        component: Planta,
        children: [
          { path: 'listar', component: Plantaslistar },
          { path: 'agregar', component: Plantainsertar },
          { path: 'editar/:id', component: Plantainsertar },
        ],
      },
        { path: 'rol', component: Rol,
        children: [
          { path: 'listar', component: Rollistar },  
          { path: 'agregar', component: rolinsertar },
          { path: 'editar/:id', component: rolinsertar }
        ]
      },
{ path: 'diagnostico', component: Diagnostico,
        children: [
          { path: 'listar', component: Diagnosticolistar },
          { path: 'agregar', component: Diagnosticorinsertar },
          { path: 'editar/:id', component: Diagnosticorinsertar }
        ]
  },
  { path: 'tratamiento', component: Tratamiento ,
        children: [
          { path: 'listar', component: Tratamientolistar },
          { path: 'agregar', component:  Tratamientoregistrar},
          { path: 'editar/:id', component: Tratamientoregistrar }
        ]
  },
      {
        path: 'diagnostico-admin',
        component: Diagnostico,
        children: [
          { path: 'listar', component: Diagnosticolistar },
          { path: 'agregar', component: Diagnosticorinsertar },
          { path: 'editar/:id', component: Diagnosticorinsertar },
        ],
      },

{ path: 'especie', component: Especie,
 children: [
  { path: 'listar', component: Especielistar },
 { path: 'agregar', component: Especieregistrar },
{ path: 'editar/:id', component: Especieregistrar }
  ]
},
      { path: 'tipointeraccion', component: TipoInteraccion,
        children: [
          { path: 'listar', component: Tipointeraccionlistar },
          { path: 'agregar', component: Tipointeraccionrinsertar },
          { path: 'editar/:id', component: Tipointeraccionrinsertar }
        ]
      },
{ path: 'recordatorio', component: Recordatorio,
        children: [
          { path: 'listar', component: Recordatoriolistar },
          { path: 'agregar', component: Recordatorioregistrar },
          { path: 'editar/:id', component: Recordatorioregistrar }
        ]
  },
  { path: 'interaccion', component: Interaccion,
        children: [
          { path: 'listar', component: Interaccionlistar },
          { path: 'agregar', component: Interaccionregistrar },
          { path: 'editar/:id', component: Interaccionregistrar }
        ]
  },
{ path: 'estadorecordatorio', component: EstadoRecordatorio,
        children: [
          { path: 'listar', component: Estadorecordatoriolistar },
          { path: 'agregar', component: Estadorecordatorioinsertar },
          { path: 'editar/:id', component: Estadorecordatorioinsertar }
        ]
      },

      /* CRUD de usuario */
      {
        path: 'usuario',
        component: Usuario,
        children: [
          { path: 'listar', component: Usuariolistar },
          { path: 'agregar', component: Usuarioregistrar },
          { path: 'editar/:id', component: Usuarioregistrar },
        ],
      },

      /* CRUD de medición */
      {
        path: 'medicion',
        component: Medicion,
        children: [
          { path: 'listar', component: Medicionlistar },
          { path: 'agregar', component: Medicionregistrar },
          { path: 'editar/:id', component: Medicionregistrar },
        ],
      },


      { 
  path: 'GUIAS', 
  component: GuidesComponent,
  children: [
    { path: 'listar', component: Guialistar },  
    { path: 'agregar', component: Guiainsertar },  
    { path: 'editar/:id', component: Guiainsertar }
  ]
},
      /* CRUD de guías */
      {
        path: 'guia',
        component: Guiazona,
      },
        { path: 'guiafav', component: Guiafav ,
        children: [
          { path: 'listar', component: Guifavlistar },
          { path: 'agregar', component: Guifavregistrar },
          { path: 'editar/:id', component: Guifavregistrar }
        ]
        
  },

      { path: 'apidiagnostico', component: PlantIdentifierComponent },


      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
  path: 'app/message',
  loadComponent: () =>
    import('./components/message/message').then(m => m.MensajeriaComponent),
},

{
  path: 'app/public',
  loadComponent: () =>
    import('./components/public/public').then(m => m.PublicarComponent),
},


  /* === CUALQUIER OTRA RUTA === */
  { path: '**', redirectTo: '' },
];
