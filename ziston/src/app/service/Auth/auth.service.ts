import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:3000/login';
  private verifyTokenUrl = 'http://localhost:3000/login/verify-token'; // Replace with your server's endpoint for token verification
  private registerUrl = 'http://localhost:3000/login/Register';
  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      // Send a request to the server to verify the token
      return this.http.post<boolean>(this.verifyTokenUrl, { token });
    }
    return of(false); // Return false if the token doesn't exist
  }
  register(user: any): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }
}
