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
    public DbSet<Session> Session { get; set; }
    public DbSet<WorkoutProgram> WorkoutPrograms { get; set; }
    public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
    public DbSet<LoggedSet> LoggedSets { get; set; }
    public DbSet<WorkoutLog> WorkoutLogs { get; set; }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MealItem>()
            .OwnsOne(m => m.Nutrition);

        modelBuilder.Entity<MealItem>()
            .OwnsOne(m => m.BaseNutrition);
            
        modelBuilder.Entity<Session>()
            .HasOne(p => p.WorkoutProgram)
            .WithMany(w => w.Sessions)
            .HasForeignKey(p => p.ProgramId)
            .IsRequired(false);

        modelBuilder.Entity<WorkoutExercise>()
            .HasOne(e => e.Session)
            .WithMany(w => w.Exercise)
            .HasForeignKey(e => e.WorkoutId)
            .IsRequired(false);
    }
 
}
