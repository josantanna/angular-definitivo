import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicle`);
  }

  getVehicleData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicleData`);
  }
}