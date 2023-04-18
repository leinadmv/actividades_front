import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/model';

const BACK_URL = environment.BACK_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  /**
   * Esta función se encarga de autenticar al usuario en el sistema.
   * @param user usuario a autenticar
   * @returns token de autorizacion
   */
  autenticarse(user: Credentials): Observable<any> {
    localStorage.clear();
    return this.http.post<any>(`${BACK_URL}login`, user, {
      observe: 'response'
    })
      .pipe(
        map((response: HttpResponse<any>) =>{
          const body = response.body;
          const headers = response.headers;

          const bearerToken = headers.get('Authorization');
          const token = bearerToken.replace('Bearer ', '');

          localStorage.setItem('token', token);

          return body;
        })
      );
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
