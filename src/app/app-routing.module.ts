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
    redirectTo: 'home',
    pathMatch: 'full'
  }
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
