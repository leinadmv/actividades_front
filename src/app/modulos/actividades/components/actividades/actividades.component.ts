import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from 'src/app/modulos/actividades/models/actividad.model';
import { ActividadesService } from 'src/app/modulos/actividades/services/actividades.service';
import Swal from 'sweetalert2';
import { AdminActividadesComponent } from '../admin-actividades/admin-actividades.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  displayedColumns: string[] = ['accion', 'nombre', 'descripcion', 'empleado', 'fechaEstimada', 'diasRetraso', 'estado'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private actividadesService: ActividadesService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getActividades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Metodo que se encarga de obtener las actividades, calcular los dias de retraso de las actividades
   * con respecto a la fecha actual y guardar la lista en el datasource para pintarla
   */
  getActividades(): void{

    this.actividadesService.getActividades().subscribe((resp: Actividad[]) => {

      resp.forEach(element => {
        let diferencia = new Date().getTime() - new Date(element.fechaEstimada).getTime();
        element.diasRetraso = Math.floor(diferencia/(1000 * 60 * 60 * 24));
      });
      this.dataSource.data = resp;

    });

  }

  /**
   * Metodo que se encarga de abrir el modal del formulario de crear o de editar una actividad
   * @param type 2 tipos de modal, crear o editar
   * @param title titulo que aparecera en el modal
   * @param actividad si el tipo es editar se le envia la actividad a editar este campo es opcional
   */
  newActividad(type, title, actividad?): void{
    const dialogNewRol = this.dialog.open(AdminActividadesComponent, {
      width: '30%',
      disableClose: true,
      data: {
        type: type,
        title: title,
        actividad
      },
      panelClass: 'custom-dialog-container',
    });

    dialogNewRol.afterClosed().subscribe(() => {
      this.getActividades();
    });

  }

  /**
   * Metodo que se encarga de la eliminacion de una actividad
   * @param id id de la actividad a eliminar
   */
  eliminarActividad(id:number): void{

    this.actividadesService.deleteActividades(id).subscribe((resp: any) => {
      this.getActividades();
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Actividad Eliminada!'
      })
    });
  }

}

