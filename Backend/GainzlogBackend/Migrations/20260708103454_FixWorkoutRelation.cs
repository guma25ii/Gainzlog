using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GainzlogBackend.Migrations
{
    /// <inheritdoc />
    public partial class FixWorkoutRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramWorkouts_WorkoutPrograms_WorkoutProgramId",
                table: "ProgramWorkouts");

            migrationBuilder.DropIndex(
                name: "IX_ProgramWorkouts_WorkoutProgramId",
                table: "ProgramWorkouts");

            migrationBuilder.DropColumn(
                name: "WorkoutProgramId",
                table: "ProgramWorkouts");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramWorkouts_ProgramId",
                table: "ProgramWorkouts",
                column: "ProgramId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramWorkouts_WorkoutPrograms_ProgramId",
                table: "ProgramWorkouts",
                column: "ProgramId",
                principalTable: "WorkoutPrograms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramWorkouts_WorkoutPrograms_ProgramId",
                table: "ProgramWorkouts");

            migrationBuilder.DropIndex(
                name: "IX_ProgramWorkouts_ProgramId",
                table: "ProgramWorkouts");

            migrationBuilder.AddColumn<int>(
                name: "WorkoutProgramId",
                table: "ProgramWorkouts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProgramWorkouts_WorkoutProgramId",
                table: "ProgramWorkouts",
                column: "WorkoutProgramId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramWorkouts_WorkoutPrograms_WorkoutProgramId",
                table: "ProgramWorkouts",
                column: "WorkoutProgramId",
                principalTable: "WorkoutPrograms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
