using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GainzlogBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Session_WorkoutPrograms_ProgramId",
                table: "Session");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_Session_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.AddForeignKey(
                name: "FK_Session_WorkoutPrograms_ProgramId",
                table: "Session",
                column: "ProgramId",
                principalTable: "WorkoutPrograms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_Session_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId",
                principalTable: "Session",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Session_WorkoutPrograms_ProgramId",
                table: "Session");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_Session_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.AddForeignKey(
                name: "FK_Session_WorkoutPrograms_ProgramId",
                table: "Session",
                column: "ProgramId",
                principalTable: "WorkoutPrograms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_Session_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId",
                principalTable: "Session",
                principalColumn: "Id");
        }
    }
}
