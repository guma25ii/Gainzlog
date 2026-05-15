using GainzlogBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GainzlogBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Meal> Meals { get; set; }

    public DbSet<MealItem> MealItems { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MealItem>()
            .OwnsOne(m => m.Nutrition);

        modelBuilder.Entity<MealItem>()
            .OwnsOne(m => m.BaseNutrition);
    }
}
