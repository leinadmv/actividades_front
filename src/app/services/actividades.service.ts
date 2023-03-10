import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actividad } from '../models/actividad.model';

const BACK_URL = environment.BACK_URL;

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  /**
   * Servicio que se encarga de listar las actividades
   * @returns lista de actividades
   */
  getActividades(): Observable<Actividad[]> {
    return this.http.get<any>(`${BACK_URL}actividades`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Servicio que se encarga de guardar una actividad
   * @param actividad actividad a guardar
   * @returns actividad guardada
   */
  postActividades(actividad: Actividad): Observable<any> {
    return this.http.post<any>(`${BACK_URL}actividades`, actividad)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Servicio que se encarga de eliminar una actividad por su id
   * @param id id de la actividad
   * @returns estaod de exito o error
   */
  deleteActividades(id:number): Observable<any> {
    return this.http.delete<any>(`${BACK_URL}actividades/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }
}
