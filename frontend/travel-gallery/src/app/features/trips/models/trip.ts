export interface Trip {
  id: number;
  title: string;
  country: string;
  description: string;
  startDate: string;
  endDate: string;
  locations: Location[];
}

export interface Location {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  photoCount: number;
}
