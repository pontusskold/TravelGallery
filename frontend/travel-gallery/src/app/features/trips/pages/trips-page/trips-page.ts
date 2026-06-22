import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './trips-page.html',
  styleUrl: './trips-page.scss',
})
export class TripsPage implements OnInit {
  private readonly tripsService = inject(TripsService);

  readonly trips = signal<Trip[]>([]);

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe(trips => {
      this.trips.set(trips);
    });
  }
}