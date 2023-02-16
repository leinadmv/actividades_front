import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado.model';

const BACK_URL = environment.BACK_URL;

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<any>(`${BACK_URL}empleados`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
