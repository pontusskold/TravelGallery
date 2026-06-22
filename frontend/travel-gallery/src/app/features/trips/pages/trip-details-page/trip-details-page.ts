import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-trip-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-details-page.html',
  styleUrl: './trip-details-page.scss',
})
export class TripDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly tripsService = inject(TripsService);

  readonly trip = signal<Trip | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    this.tripsService.getTrip(id).subscribe(trip => {
      this.trip.set(trip);
    });
  }
}
