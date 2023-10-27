import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ReportesComponent } from './reportes/reportes.component';
import { SeguimientoComponent } from './reportes/seguimiento/seguimiento.component';





const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'reportes',
    component: ReportesComponent
  }, 
  {
    path: 'reportes/seguimiento',
    component: SeguimientoComponent
  },
  {
    path: '',
    redirectTo: 'reporte',
    pathMatch: 'full'

  }
  


  },
  {
    path: 'reporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.RegistroPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class AppRoutingModule { }
