using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GainzlogBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkoutLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkoutLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SessionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoggedSets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WorkoutLogId = table.Column<int>(type: "INTEGER", nullable: false),
                    ExerciseName = table.Column<string>(type: "TEXT", nullable: false),
                    Reps = table.Column<int>(type: "INTEGER", nullable: true),
                    Sets = table.Column<int>(type: "INTEGER", nullable: true),
                    Weight = table.Column<double>(type: "REAL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoggedSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoggedSets_WorkoutLogs_WorkoutLogId",
                        column: x => x.WorkoutLogId,
                        principalTable: "WorkoutLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LoggedSets_WorkoutLogId",
                table: "LoggedSets",
                column: "WorkoutLogId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoggedSets");

            migrationBuilder.DropTable(
                name: "WorkoutLogs");
        }
    }
}
