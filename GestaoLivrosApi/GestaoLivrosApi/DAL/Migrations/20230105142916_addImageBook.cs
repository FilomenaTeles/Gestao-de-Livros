using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoLivrosApi.Migrations
{
    /// <inheritdoc />
    public partial class addImageBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "https://img.wook.pt/images/a-mulher-do-dragao-vermelho-jose-rodrigues-dos-santos/MXwyNzQyMjE4NXwyMzc4Njg5MHwxNjYzNTc3MzY4MDAwfHdlYnA=/550x");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://img.wook.pt/images/as-filhas-da-vila-dos-tecidos-anne-jacobs/MXwyNzc0OTYyNnwyNDEyMzk5MHwxNjY1Mzg3MzI5MDAwfHdlYnA=/550x");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://img.wook.pt/images/um-sonho-so-nosso-nicholas-sparks/MXwyNzM0ODM4M3wyMzcwMDU2NXwxNjYxNDQyMjQwMDAwfHdlYnA=/550x");

            migrationBuilder.CreateIndex(
                name: "IX_Books_Isbn",
                table: "Books",
                column: "Isbn",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Books_Isbn",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Books");
        }
    }
}
