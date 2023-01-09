using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GestaoLivrosApi.Migrations
{
    /// <inheritdoc />
    public partial class insertDataBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "AuthorId", "Image", "Isbn", "Name", "Price", "isDeleted" },
                values: new object[,]
                {
                    { 1, 1, "https://img.wook.pt/images/a-mulher-do-dragao-vermelho-jose-rodrigues-dos-santos/MXwyNzQyMjE4NXwyMzc4Njg5MHwxNjYzNTc3MzY4MDAwfHdlYnA=/550x", 9789897776168L, "A Mulher do Dragão Vermelho", 22.5, false },
                    { 2, 2, "https://img.wook.pt/images/as-filhas-da-vila-dos-tecidos-anne-jacobs/MXwyNzc0OTYyNnwyNDEyMzk5MHwxNjY1Mzg3MzI5MDAwfHdlYnA=/550x", 9789897776342L, "As Filhas da Vila dos Tecidos", 19.899999999999999, false },
                    { 3, 3, "https://img.wook.pt/images/um-sonho-so-nosso-nicholas-sparks/MXwyNzM0ODM4M3wyMzcwMDU2NXwxNjYxNDQyMjQwMDAwfHdlYnA=/550x", 9789892355214L, "Um Sonho Só Nosso", 18.899999999999999, false },
                    { 4, 4, "https://almedinanet.b-cdn.net/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/9/7/9789723718928_1587465282.jpg", 9789723718928L, "O Principezinho", 5.5, false },
                    { 5, 5, "https://img.wook.pt/images/a-lista-do-juiz-john-grisham/MXwyNjczODMxOXwyMzAyMTA2MHwxNjY1MTQwMzgyMDAwfHdlYnA=/550x", 9789722543606L, "A Lista do Juizes", 18.989999999999998, false },
                    { 6, 6, "https://img.wook.pt/images/lendarios-tracy-deonn/MXwyNzYxOTY2MHwyMzk5Mjg2M3wxNjY0NzkwODA4MDAwfHdlYnA=/550x", 9789898860019L, "Lendários", 22.0, false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
