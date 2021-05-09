import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from "../model/users.model";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router) { }

  register(user: Users): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/register`, user).pipe(
        catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
      
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
    }
    return throwError(msg);
  }

  login(user: Users) {
    return this.httpClient.post<any>(`${this.API_URL}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res: any) => {
          this.currentUser = res;
          localStorage.setItem('Id', res.users.id)
          if(res.users.roles === "admin"){
            this.router.navigate(['admin/dashboard']);
          }
          else if(res.users.roles === "users"){
            this.router.navigate(['user/dashboard']);
          }
        })
      },
      (err) => {
        if(err.status){
          alert("Invalid Credentials")
          this.router.navigate(['auth/login']);
        }
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      localStorage.removeItem('Id')
      localStorage.removeItem('userId')
      this.router.navigate(['auth/login']);
    }
  }

  getUserProfile(id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/userProfile`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(error => {
        return this.router.navigate(['auth/login'])
      })
     
    )
  }

  

}
