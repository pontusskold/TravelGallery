# TravelGallery Copilot Instructions

## Project context

TravelGallery is a public travel photo gallery with an admin area for managing trips, locations, photos, map data, and settings.

Core domain model:

```text
Trip
  -> Location
      -> Photo
```

Locations are the primary map markers/clusters. Photos belong to locations. A location can represent a place such as a national park, city, viewpoint, or hotel.

## Tech stack

- Angular frontend
- .NET Web API backend
- Leaflet interactive map
- PostgreSQL database later
- Azure hosting later
- GitHub repository

## Coding principles

Follow these principles unless the user explicitly asks otherwise:

- Prefer simple, readable solutions over clever abstractions.
- Keep changes small and PR-friendly.
- Avoid unrelated refactoring.
- Do not modify files outside the requested scope unless required.
- Ask for clarification before making large architectural changes.
- Use existing project patterns before introducing new ones.
- Favor clear names and straightforward code.
- Avoid premature optimization.
- Add tests when they provide value.
- Do not add comments to obvious code.
- Explain side effects and tradeoffs when suggesting changes.

## Angular guidelines

- Use modern Angular standalone patterns.
- Prefer feature-based folders under `src/app/features`.
- Use `core` for app-wide services and configuration.
- Use `shared` for reusable UI and utilities.
- Prefer signals for local component state, especially in zoneless scenarios.
- Keep components focused on presentation and simple interaction.
- Keep HTTP logic in services.
- Avoid introducing state management libraries unless the need is clear.
- Keep styling simple and scoped to the component unless shared styles are needed.

Suggested Angular structure:

```text
src/app
  core
  features
    trips
    locations
    photos
    admin
  shared
```

## .NET guidelines

- Use minimal APIs while the backend is small.
- Prefer feature-based organization as the API grows.
- Keep endpoints simple and explicit.
- Avoid introducing repositories, database abstractions, or extra layers before they are needed.
- Use DTOs for API contracts.
- Keep domain concepts clear: Trip, Location, Photo, PhotoMetadata.
- Introduce Entity Framework and PostgreSQL only when persistence is needed.

Suggested backend structure as the app grows:

```text
TravelGallery.Api
  Features
    Trips
    Locations
    Photos
    Authentication
  Infrastructure
  Common
```

## Current development approach

Build in vertical slices:

1. Create a small backend endpoint.
2. Call it from Angular through a service.
3. Display the result in a simple page.
4. Review the design.
5. Commit.

Avoid building large pieces in advance. Start with hardcoded data when learning or validating the flow, then introduce persistence later when the need is clear.

## Important product decisions

- The app is public for visitors.
- Only Pontus and Michelle should have admin access.
- Admin login should be email-based.
- Map markers should represent locations/clusters, not every individual photo.
- Photo uploads should later try to read GPS data from EXIF metadata.
- If GPS metadata is missing, admins should be able to manually assign photos to a location.
