import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesComponent } from './actividades.component';
import { of } from 'rxjs';
import { ActividadesService } from 'src/app/modulos/actividades/services/actividades.service';
import { AdminActividadesComponent } from '../admin-actividades/admin-actividades.component';
import Swal from 'sweetalert2';

describe('ActividadesComponent', () => {
  let component: ActividadesComponent;
  let fixture: ComponentFixture<ActividadesComponent>;
  let actividadesService: ActividadesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar al método getActividades', () => {
    spyOn(component, 'getActividades');
    component.ngOnInit();
    expect(component.getActividades).toHaveBeenCalled();
  });

  it('should call getActividades() and return an array of activities', () => {
    const resp = [{fechaEstimada: new Date()}];

    spyOn(actividadesService, 'getActividades').and.returnValue(of(resp));

    actividadesService.getActividades().subscribe((res) => {
      expect(res).toEqual([{fechaEstimada: new Date(), diasRetraso: 0}]);
    });
  });

  it('should open a dialog window with the given parameters', () => {
    const type = 'type';
    const title = 'title';
    const actividad = 'actividad';

    const dialogNewRol = spyOn(component.dialog, 'open').and.callThrough();

    component.newActividad(type, title, actividad);

    expect(dialogNewRol).toHaveBeenCalledWith(AdminActividadesComponent, {
      width: '30%',
      disableClose: true,
      data: { type, title, actividad },
      panelClass: 'custom-dialog-container'
    });

  });

  it('should call getActividades() after closing the dialog window', () => {
    const getActividadesSpy = spyOn(component, 'getActividades').and.callThrough();

    component.newActividad('type', 'title', 'actividad');

    expect(getActividadesSpy).toHaveBeenCalled();

  });

  it('debe eliminar una actividad', () => {
    const id = 1;

    spyOn(actividadesService, 'deleteActividades').and.returnValue(of({}));

    component.eliminarActividad(id);

    expect(actividadesService.deleteActividades).toHaveBeenCalledWith(id);
    expect(component.getActividades).toHaveBeenCalled();
  });

  it('deberia eliminar una actividad', () => {
    const id = 1;
    const spy = spyOn(actividadesService, 'deleteActividades').and.returnValue(of({}));
    const spy2 = spyOn(component, 'getActividades');

    component.eliminarActividad(id);

    expect(spy).toHaveBeenCalledWith(id);
    expect(spy2).toHaveBeenCalled();
  });



});
