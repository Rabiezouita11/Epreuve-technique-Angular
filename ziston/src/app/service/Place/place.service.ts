import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from 'src/app/models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private baseUrl = 'http://localhost:3000/place';

  constructor(private http: HttpClient) {}

  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.baseUrl);
  }

  getLatestListings(): Observable<Place[]> {
    const url = `${this.baseUrl}/latest`;
    return this.http.get<Place[]>(url);
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(this.baseUrl, place);
  }

  updatePlace(id: string, place: Place): Observable<Place> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Place>(url, place);
  }

  deletePlace(id: string |undefined): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
