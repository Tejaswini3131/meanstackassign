import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Users } from "../model/users.model";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient,public router: Router) { }

  API_URL: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  public getUsersList(){
    return this.httpClient.get(`${this.API_URL}/listUsers`);
  }

  editData(user: Users, id){
    return this.httpClient.put(`${this.API_URL}/editUsers/${id}`, user).pipe(
      catchError(this.handleError)
    )
  }

  viewUsersProfile(id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/viewUseres/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(error => {
        return this.router.navigate(['auth/login'])
      })
     
    )
  }



}

