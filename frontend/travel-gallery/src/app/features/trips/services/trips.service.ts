import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private readonly http = inject(HttpClient);

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>('http://localhost:5146/api/trips');
  }
}