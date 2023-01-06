using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GestaoLivrosApi.Migrations
{
    /// <inheritdoc />
    public partial class updateData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Author", "Image", "Isbn", "Name", "Price", "isDeleted" },
                values: new object[,]
                {
                    { 4, "Antoine de Saint-Exupéry", "https://almedinanet.b-cdn.net/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/9/7/9789723718928_1587465282.jpg", 9789723718928L, "O Principezinho", 5.5, false },
                    { 5, "John Grisham", "https://img.wook.pt/images/a-lista-do-juiz-john-grisham/MXwyNjczODMxOXwyMzAyMTA2MHwxNjY1MTQwMzgyMDAwfHdlYnA=/550x", 9789722543606L, "A Lista do Juizes", 18.989999999999998, false },
                    { 6, "Tracy Deonn", "https://img.wook.pt/images/lendarios-tracy-deonn/MXwyNzYxOTY2MHwyMzk5Mjg2M3wxNjY0NzkwODA4MDAwfHdlYnA=/550x", 9789898860019L, "Lendários", 22.0, false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
