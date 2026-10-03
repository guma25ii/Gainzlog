using GainzlogBackend.Services;
using GainzlogBackend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using GainzlogBackend.Interfaces;
using GainzlogBackend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gainzlog.db"));

// Services
builder.Services.AddHttpClient();
builder.Services.AddScoped<FoodService>();
builder.Services.AddScoped<IProgramService, ProgramService>();
builder.Services.AddScoped<IProgramRepository, ProgramRepository>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<ISessionRepository, SessionRepository>();
builder.Services.AddScoped<ISetService, SetService>();
builder.Services.AddScoped<ISetRepository, SetRepository>();

// Controllers + JSON settings
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware
app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// Controllers
app.MapControllers();

app.Run();