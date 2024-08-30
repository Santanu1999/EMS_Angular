import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/v1/';  // Update with your Django backend URL

  constructor(private router:Router,private http: HttpClient, public jwtHelper: JwtHelperService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}token/`, { username, password }).pipe(
      map(token => {
        localStorage.setItem('access_token', token.access);
        return token;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/new/register/', { username, password });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
