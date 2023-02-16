import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadesComponent } from './components/actividades/actividades.component';



const routes: Routes = [

    { path: '', redirectTo: 'actividades', pathMatch: 'full'},
    { path: 'actividades', component: ActividadesComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }