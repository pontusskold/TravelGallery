import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';

import { Trip } from '../../../trips/models/trip';
import { TripsService } from '../../../trips/services/trips.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
})
export class MapPage implements AfterViewInit, OnDestroy {
  private readonly tripsService = inject(TripsService);

  private map: L.Map | null = null;
  private readonly markers = L.layerGroup();

  readonly trips = signal<Trip[]>([]);

  ngAfterViewInit(): void {
    this.createMap();
    this.loadTrips();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private createMap(): void {
    this.map = L.map('travel-map').setView([0.6, 32.5], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.markers.addTo(this.map);
  }

  private loadTrips(): void {
    this.tripsService.getTrips().subscribe(trips => {
      this.trips.set(trips);
      this.addLocationMarkers(trips);
    });
  }

  private addLocationMarkers(trips: Trip[]): void {
    if (!this.map) {
      return;
    }

    this.markers.clearLayers();

    const markerBounds: L.LatLngExpression[] = [];

    for (const trip of trips) {
      for (const location of trip.locations) {
        const coordinates: L.LatLngExpression = [location.latitude, location.longitude];

        markerBounds.push(coordinates);

        L.marker(coordinates)
          .bindPopup(`
            <strong>${location.name}</strong><br />
            ${trip.title}<br />
            Photos: ${location.photoCount}<br />
            <a href="/trips/${trip.id}">Open trip</a>
          `)
          .addTo(this.markers);
      }
    }

    if (markerBounds.length > 0) {
      this.map.fitBounds(markerBounds, {
        padding: [40, 40],
        maxZoom: 7,
      });
    }
  }
}
