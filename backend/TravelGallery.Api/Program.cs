var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Angular", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Angular");

app.UseHttpsRedirection();

var trips = new[]
{
    new TripDto(
        Id: 1,
        Title: "Uganda 2026",
        Country: "Uganda",
        Description: "Gorilla trekking, national parks and travel photography.",
        StartDate: new DateOnly(2026, 7, 8),
        EndDate: new DateOnly(2026, 7, 18),
        Locations:
        [
            new LocationDto(
                Id: 1,
                Name: "Bwindi Impenetrable National Park",
                Country: "Uganda",
                Latitude: -1.0521,
                Longitude: 29.6201,
                PhotoCount: 0)
        ]),

    new TripDto(
        Id: 2,
        Title: "Kenya 2026",
        Country: "Kenya",
        Description: "Safari, wildlife and landscape photography.",
        StartDate: new DateOnly(2026, 7, 18),
        EndDate: new DateOnly(2026, 7, 26),
        Locations:
        [
            new LocationDto(
                Id: 2,
                Name: "Masai Mara",
                Country: "Kenya",
                Latitude: -1.4061,
                Longitude: 35.0081,
                PhotoCount: 0)
        ])
};

app.MapGet("/api/trips", () => trips);

app.MapGet("/api/trips/{id:int}", (int id) =>
{
    var trip = trips.FirstOrDefault(x => x.Id == id);

    return trip is null
        ? Results.NotFound()
        : Results.Ok(trip);
});

app.Run();

record TripDto(
    int Id,
    string Title,
    string Country,
    string Description,
    DateOnly StartDate,
    DateOnly EndDate,
    LocationDto[] Locations);

record LocationDto(
    int Id,
    string Name,
    string Country,
    double Latitude,
    double Longitude,
    int PhotoCount);