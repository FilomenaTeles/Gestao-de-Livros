using System;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;
using Microsoft.EntityFrameworkCore;

namespace GestaoLivrosApi.Data
{
	public class AppDbContext : DbContext
	{
		public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=localhost;Database=LivrosApi;Integrated Security=false;User ID=SA;Password=Db22Sa_%;TrustServerCertificate=true");
        }

        //Incluir dados na tabela alunos se tabela estiver vazia:

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().Property<bool>("isDeleted");
            modelBuilder.Entity<Book>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            modelBuilder.Entity<Author>().Property<bool>("isDeleted");
            modelBuilder.Entity<Author>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            modelBuilder.Entity<Book>()
          .HasOne(b => b.Author)
          .WithMany(a => a.Books)
          .HasForeignKey(b => b.AuthorId);

            modelBuilder.Entity<Author>()
            .HasMany(a => a.Books);

            modelBuilder.Entity<Author>().HasData(
                new Author
                {
                    Id= 1,
                    Name = "John Grisham",
                    Country = "EUA",
                    Image = "https://images.wook.pt/getresourcesservlet/GetResource?Sfm+v10t8OzUnIiam5LiwEo0hAmBYW4YBPscgCFrN6o="
                },
                 new Author
                 {
                     Id = 2,
                     Name = "José Rodrigues dos Santos",
                     Country = "Portugal",
                     Image = "https://images.wook.pt/getresourcesservlet/GetResource?ffOwOOeajYEkMMAJu4eRVE+b1GsFCZd7vCu07LSZze4="
                 },
                 new Author
                 {
                     Id = 3,
                     Name = "Anne Jacobs",
                     Country = "Alemanha",
                     Image = "https://images.wook.pt/getresourcesservlet/GetResource?dMwB1EC9gK3QmYJxSzq1GslBjIWP8EwCWv82I5JH6Lg="
                 },
                 new Author
                 {
                     Id = 4,
                     Name = "Dolly Alderton",
                     Country = "Reino Unido",
                     Image = "https://s2.glbimg.com/KMWZv9gzUfGw3xUruf2lRIys0Nw=/0x0:2359x3108/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_ba3db981e6d14e54bb84be31c923b00c/internal_photos/bs/2022/S/O/83FSniQd6ODv2Pj0H3Lg/dolly-alderton-c-alexandra-cameron.jpg"
                 },
                 new Author
                 {
                     Id = 5,
                     Name = "Colleen Hoover",
                     Country = "EUA",
                     Image = "https://images.wook.pt/getresourcesservlet/GetResource?T0mxwoPX8/4+kKBb/GgmzXsvI8fHjBDhGQUR+LmCP4c="
                 },
                 new Author
                 {
                     Id = 6,
                     Name = "Tracy Deonn",
                     Country = "EUA",
                     Image = "https://d28hgpri8am2if.cloudfront.net/author_images/5806082/tracy-deonn-142982529.jpg"
                 },
                 new Author
                 {
                     Id = 7,
                     Name = "Antoine de Saint-Exupéry",
                     Country = "França",
                     Image = "https://images.wook.pt/getresourcesservlet/GetResource?mo7QMU8M1/9mmROOAhHATQuUA8f8pMVv8eiir9F8GXc="
                 },
                 new Author
                 {
                     Id = 8,
                     Name = "Taylor Jenkins Reid",
                     Country = "EUA",
                     Image = "https://images.wook.pt/getresourcesservlet/GetResource?MvyciI4blwAnOYsiaw1/EYyLTlI26KopmjdP/AyYS5s="
                 },
                 new Author
                 {
                     Id = 9,
                     Name = "Holly Black",
                     Country = "EUA",
                     Image = "https://images.wook.pt/getresourcesservlet/GetResource?25hy/3TG6A7z4fbZlSI7qz/0WSko+85dOXugaUyx5QY="
                 },
                 new Author
                 {
                     Id = 10,
                     Name = "Nicholas Sparks",
                     Country = "EUA",
                     Image = "https://images.wook.pt/getresourcesservlet/GetResource?hhwHlwLEt4Trc15G3MdfT5IdgAztEU3kKGyaWWAH9dA="
                 }
                );

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Isbn = 9789897776168,
                    Name = "A Mulher do Dragão Vermelho",
                    AuthorId = 2,
                    Price = 22.50,
                    Image = "https://img.wook.pt/images/a-mulher-do-dragao-vermelho-jose-rodrigues-dos-santos/MXwyNzQyMjE4NXwyMzc4Njg5MHwxNjYzNTc3MzY4MDAwfHdlYnA=/550x"

                },
                 new Book
                 {
                     Id = 2,
                     Isbn = 9789897776342,
                     Name = "As Filhas da Vila dos Tecidos",
                     AuthorId = 3,
                     Price = 19.90,
                     Image = "https://img.wook.pt/images/as-filhas-da-vila-dos-tecidos-anne-jacobs/MXwyNzc0OTYyNnwyNDEyMzk5MHwxNjY1Mzg3MzI5MDAwfHdlYnA=/550x"

                 },
                  new Book
                  {
                      Id = 3,
                      Isbn = 9789892355214,
                      Name = "Um Sonho Só Nosso",
                      AuthorId = 10,
                      Price = 18.90,
                      Image = "https://img.wook.pt/images/um-sonho-so-nosso-nicholas-sparks/MXwyNzM0ODM4M3wyMzcwMDU2NXwxNjYxNDQyMjQwMDAwfHdlYnA=/550x"

                  },
                   new Book
                   {
                       Id = 4,
                       Isbn = 9789723718928,
                       Name = "O Principezinho",
                       AuthorId = 7,
                       Price = 5.50,
                       Image = "https://almedinanet.b-cdn.net/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/9/7/9789723718928_1587465282.jpg"

                   },
                   new Book
                   {
                       Id = 5,
                       Isbn = 9789722543606,
                       Name = "A Lista do Juizes",
                       AuthorId = 1,
                       Price = 18.99,
                       Image = "https://img.wook.pt/images/a-lista-do-juiz-john-grisham/MXwyNjczODMxOXwyMzAyMTA2MHwxNjY1MTQwMzgyMDAwfHdlYnA=/550x"

                   },
                   new Book
                   {
                       Id = 6,
                       Isbn = 9789898860019,
                       Name = "Lendários",
                       AuthorId = 6,
                       Price = 22,
                       Image = "https://img.wook.pt/images/lendarios-tracy-deonn/MXwyNzYxOTY2MHwyMzk5Mjg2M3wxNjY0NzkwODA4MDAwfHdlYnA=/550x"

                   },
                   new Book
                   {
                       Id = 7,
                       Isbn = 9789899039414,
                       Name = "Estás aí?",
                       AuthorId = 4,
                       Price = 17.50,
                       Image = "https://img.wook.pt/images/estas-ai-dolly-alderton/MXwyNDY4MjQ5MnwyMDgyNzcwOXwxNjE1ODI5NDA5MDAwfHdlYnA=/550x"

                   },
                   new Book
                   {
                       Id = 8,
                       Isbn = 9789895645206,
                       Name = "Layla",
                       AuthorId = 5,
                       Price = 19.95,
                       Image = "https://img.wook.pt/images/layla-colleen-hoover/MXwyNDk3Mzc1M3wyMTE1OTAxNnwxNjUwMjcwMjczMDAwfHdlYnA=/550x"

                   },
                   new Book
                   {
                       Id = 9,
                       Isbn = 9789895644513,
                       Name = "Os Sete Maridos de Evelyn Hugo",
                       AuthorId = 8,
                       Price = 20.95,
                       Image = "https://img.wook.pt/images/os-sete-maridos-de-evelyn-hugo-taylor-jenkins-reid/MXwyNDY5NTU5OXwyMDg0NTI3NnwxNjY0MTc3MzM5MDAwfHdlYnA=/550x"

                   },
                   new Book
                   {
                       Id = 10,
                       Isbn = 9789722354158,
                       Name = "Gata Branca",
                       AuthorId = 9,
                       Price = 16.90,
                       Image = "https://img.wook.pt/images/gata-branca-holly-black/MXwxNjA0NTg3OXwxMTU5MDkxNHwxNDE1NjE3MDI0MDAwfHdlYnA=/550x"

                   }

                ); ;
        }

        public override int SaveChanges()
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["isDeleted"] = false;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["isDeleted"] = true;
                        break;
                }
            }
        }

    }
}

