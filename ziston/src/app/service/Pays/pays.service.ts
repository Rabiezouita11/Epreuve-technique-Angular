import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pays } from 'src/app/models/pays';


@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private baseUrl = 'http://localhost:3000/pays';

  constructor(private http: HttpClient) {}

  getAllPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.baseUrl);
  }

  getPaysById(id: string): Observable<Pays> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Pays>(url);
  }

  createPays(pays: Pays): Observable<Pays> {
    return this.http.post<Pays>(this.baseUrl, pays);
  }

  updatePays(id: string, pays: Pays): Observable<Pays> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Pays>(url, pays);
  }

  deletePays(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
