import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { AdminActividadesComponent } from './components/admin-actividades/admin-actividades.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    ActividadesComponent, 
    AdminActividadesComponent]
})
export class ActividadesModule { }
