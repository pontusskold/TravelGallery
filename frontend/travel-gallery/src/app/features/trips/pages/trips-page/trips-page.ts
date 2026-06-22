import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
