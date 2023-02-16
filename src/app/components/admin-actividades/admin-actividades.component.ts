import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from 'src/app/models/empleado.model';
import { Actividad } from 'src/app/models/actividad.model';
import { ActividadesService } from 'src/app/services/actividades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-actividades',
  templateUrl: './admin-actividades.component.html',
  styleUrls: ['./admin-actividades.component.css']
})
export class AdminActividadesComponent implements OnInit {

  actividadesForm: FormGroup;
  empleados: Empleado[] = [];

  @ViewChild('picker') picker: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private empleadoService: EmpleadosService, private actividadService: ActividadesService) {}
  
  ngOnInit(): void {
    this.formControl();

    if (this.data.type === 'editar'){
      this.setEdit();
    }

    this.empleadoService.getEmpleados().subscribe((resp: Array<Empleado>) => {
      this.empleados = resp;
    });
  }

  get error(): any {return this.actividadesForm.controls; }

  formControl(): void{

    this.actividadesForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fechaEstimada: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      empleado: new FormControl('', [Validators.required]),
     
    });

  }

  saveActividad(actividadesForm: FormGroup):void{

    let actividad: Actividad = {
      empleado:
        {id:0}
    }

    actividad.nombre = actividadesForm.value.nombre;
    actividad.descripcion = actividadesForm.value.descripcion;
    actividad.fechaEstimada = actividadesForm.value.fechaEstimada;
    actividad.estado = actividadesForm.value.estado;
    actividad.empleado!.id = actividadesForm.value.empleado;

    if (this.data.type === 'editar'){
      actividad.id = this.data.actividad.id;
    }

    this.actividadService.postActividades(actividad).subscribe(resp =>{
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Actividad Guardada!'
        })
    });

  }

  setEdit():void{

    this.actividadesForm.controls['nombre'].setValue(this.data.actividad.nombre);
    this.actividadesForm.controls['descripcion'].setValue(this.data.actividad.descripcion);
    this.actividadesForm.controls['fechaEstimada'].setValue(this.data.actividad.fechaEstimada);
    this.actividadesForm.controls['estado'].setValue(this.data.actividad.estado ? 'true':'false');
    this.actividadesForm.controls['empleado'].setValue(this.data.actividad.empleado.id);

  }

  

}
