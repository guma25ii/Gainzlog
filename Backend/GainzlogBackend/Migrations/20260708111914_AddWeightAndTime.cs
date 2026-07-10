using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GainzlogBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddWeightAndTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Set",
                table: "WorkoutExercises",
                newName: "Sets");

            migrationBuilder.AddColumn<int>(
                name: "Time",
                table: "WorkoutExercises",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "WorkoutExercises",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "WorkoutExercises");

            migrationBuilder.RenameColumn(
                name: "Sets",
                table: "WorkoutExercises",
                newName: "Set");
        }
    }
}
