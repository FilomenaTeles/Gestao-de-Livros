using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GestaoLivrosApi.Migrations
{
    /// <inheritdoc />
    public partial class updateInicialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?Sfm+v10t8OzUnIiam5LiwEo0hAmBYW4YBPscgCFrN6o=");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?ffOwOOeajYEkMMAJu4eRVE+b1GsFCZd7vCu07LSZze4=");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?dMwB1EC9gK3QmYJxSzq1GslBjIWP8EwCWv82I5JH6Lg=");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: "https://s2.glbimg.com/KMWZv9gzUfGw3xUruf2lRIys0Nw=/0x0:2359x3108/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_ba3db981e6d14e54bb84be31c923b00c/internal_photos/bs/2022/S/O/83FSniQd6ODv2Pj0H3Lg/dolly-alderton-c-alexandra-cameron.jpg");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?T0mxwoPX8/4+kKBb/GgmzXsvI8fHjBDhGQUR+LmCP4c=");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: "https://d28hgpri8am2if.cloudfront.net/author_images/5806082/tracy-deonn-142982529.jpg");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?mo7QMU8M1/9mmROOAhHATQuUA8f8pMVv8eiir9F8GXc=");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 8,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?MvyciI4blwAnOYsiaw1/EYyLTlI26KopmjdP/AyYS5s=");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 9,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?25hy/3TG6A7z4fbZlSI7qz/0WSko+85dOXugaUyx5QY=");

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 10,
                column: "Image",
                value: "https://images.wook.pt/getresourcesservlet/GetResource?hhwHlwLEt4Trc15G3MdfT5IdgAztEU3kKGyaWWAH9dA=");

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1,
                column: "AuthorId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2,
                column: "AuthorId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3,
                column: "AuthorId",
                value: 10);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4,
                column: "AuthorId",
                value: 7);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5,
                column: "AuthorId",
                value: 1);

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "AuthorId", "Image", "Isbn", "Name", "Price", "isDeleted" },
                values: new object[,]
                {
                    { 7, 4, "https://img.wook.pt/images/estas-ai-dolly-alderton/MXwyNDY4MjQ5MnwyMDgyNzcwOXwxNjE1ODI5NDA5MDAwfHdlYnA=/550x", 9789899039414L, "Estás aí?", 17.5, false },
                    { 8, 5, "https://img.wook.pt/images/layla-colleen-hoover/MXwyNDk3Mzc1M3wyMTE1OTAxNnwxNjUwMjcwMjczMDAwfHdlYnA=/550x", 9789895645206L, "Layla", 19.949999999999999, false },
                    { 9, 8, "https://img.wook.pt/images/os-sete-maridos-de-evelyn-hugo-taylor-jenkins-reid/MXwyNDY5NTU5OXwyMDg0NTI3NnwxNjY0MTc3MzM5MDAwfHdlYnA=/550x", 9789895644513L, "Os Sete Maridos de Evelyn Hugo", 20.949999999999999, false },
                    { 10, 9, "https://img.wook.pt/images/gata-branca-holly-black/MXwxNjA0NTg3OXwxMTU5MDkxNHwxNDE1NjE3MDI0MDAwfHdlYnA=/550x", 9789722354158L, "Gata Branca", 16.899999999999999, false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 8,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 9,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 10,
                column: "Image",
                value: null);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1,
                column: "AuthorId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2,
                column: "AuthorId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3,
                column: "AuthorId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4,
                column: "AuthorId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 5,
                column: "AuthorId",
                value: 5);
        }
    }
}
