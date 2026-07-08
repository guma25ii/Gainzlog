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
    public DbSet<ProgramWorkouts> ProgramWorkouts { get; set; }
    public DbSet<WorkoutProgram> WorkoutPrograms { get; set; }
    public DbSet<WorkoutExercise> WorkoutExercises { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MealItem>()
            .OwnsOne(m => m.Nutrition);

        modelBuilder.Entity<MealItem>()
            .OwnsOne(m => m.BaseNutrition);
            
        modelBuilder.Entity<ProgramWorkouts>()
            .HasOne(p => p.WorkoutProgram)
            .WithMany(w => w.Items)
            .HasForeignKey(p => p.ProgramId)
            .IsRequired(false);
            
        modelBuilder.Entity<WorkoutExercise>()
            .HasOne(e => e.ProgramWorkouts)
            .WithMany(w => w.Exercise)
            .HasForeignKey(e => e.WorkoutId)
            .IsRequired(false);
    }
 
}
