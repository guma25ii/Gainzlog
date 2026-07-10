using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GainzlogBackend.Migrations
{
    /// <inheritdoc />
    public partial class RenameToSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_ProgramWorkouts_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.DropTable(
                name: "ProgramWorkouts");

            migrationBuilder.CreateTable(
                name: "Session",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProgramId = table.Column<int>(type: "INTEGER", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Session", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Session_WorkoutPrograms_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "WorkoutPrograms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Session_ProgramId",
                table: "Session",
                column: "ProgramId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_Session_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId",
                principalTable: "Session",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_Session_WorkoutId",
                table: "WorkoutExercises");

            migrationBuilder.DropTable(
                name: "Session");

            migrationBuilder.CreateTable(
                name: "ProgramWorkouts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProgramId = table.Column<int>(type: "INTEGER", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramWorkouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgramWorkouts_WorkoutPrograms_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "WorkoutPrograms",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProgramWorkouts_ProgramId",
                table: "ProgramWorkouts",
                column: "ProgramId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_ProgramWorkouts_WorkoutId",
                table: "WorkoutExercises",
                column: "WorkoutId",
                principalTable: "ProgramWorkouts",
                principalColumn: "Id");
        }
    }
}
