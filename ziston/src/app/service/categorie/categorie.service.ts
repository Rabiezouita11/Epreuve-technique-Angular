import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:3000/categories'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }
  createCategory(categoryData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login

    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, categoryData, { headers });
  }
  
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  deleteCategory(categoryId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
  
    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${this.apiUrl}/${categoryId}`;
  
    return this.http.delete<any>(url, { headers });
  }
}
