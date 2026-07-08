using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GainzlogBackend.Migrations
{
    /// <inheritdoc />
    public partial class FixExerciseRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_ProgramWorkouts_ProgramWorkoutsId",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutExercises_ProgramWorkoutsId",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "ProgramWorkoutsId",
                table: "WorkoutExercises");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercises_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_ProgramWorkouts_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId",
                principalTable: "ProgramWorkouts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_ProgramWorkouts_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutExercises_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.AddColumn<int>(
                name: "ProgramWorkoutsId",
                table: "WorkoutExercises",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercises_ProgramWorkoutsId",
                table: "WorkoutExercises",
                column: "ProgramWorkoutsId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_ProgramWorkouts_ProgramWorkoutsId",
                table: "WorkoutExercises",
                column: "ProgramWorkoutsId",
                principalTable: "ProgramWorkouts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
