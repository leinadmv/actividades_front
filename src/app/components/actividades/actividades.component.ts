import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { compileNgModule } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad } from 'src/app/models/actividad.model';
import { ActividadesService } from 'src/app/services/actividades.service';
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

  getActividades(): void{

    this.actividadesService.getActividades().subscribe((resp: Actividad[]) => {

      resp.forEach(element => {
        let diferencia = new Date().getTime() - new Date(element.fechaEstimada).getTime();
        element.diasRetraso = Math.floor(diferencia/(1000 * 60 * 60 * 24));
      });
      this.dataSource.data = resp;

    });

  }

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

  eleminarActividad(id:number): void{

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
