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
                    Country = "EUA"
                },
                 new Author
                 {
                     Id = 2,
                     Name = "José Rodrigues dos Santos",
                     Country = "Portugal"
                 },
                 new Author
                 {
                     Id = 3,
                     Name = "Anne Jacobs",
                     Country = "Alemanha"
                 },
                 new Author
                 {
                     Id = 4,
                     Name = "Dolly Alderton",
                     Country = "Reino Unido"
                 },
                 new Author
                 {
                     Id = 5,
                     Name = "Colleen Hoover",
                     Country = "EUA"
                 },
                 new Author
                 {
                     Id = 6,
                     Name = "Tracy Deonn",
                     Country = "EUA"
                 },
                 new Author
                 {
                     Id = 7,
                     Name = "Antoine de Saint-Exupéry",
                     Country = "França"
                 },
                 new Author
                 {
                     Id = 8,
                     Name = "Taylor Jenkins Reid",
                     Country = "EUA"
                 },
                 new Author
                 {
                     Id = 9,
                     Name = "Holly Black",
                     Country = "EUA"
                 },
                 new Author
                 {
                     Id = 10,
                     Name = "Nicholas Sparks",
                     Country = "EUA"
                 }
                );

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Isbn = 9789897776168,
                    Name = "A Mulher do Dragão Vermelho",
                    AuthorId = 1,
                    Price = 22.50,
                    Image = "https://img.wook.pt/images/a-mulher-do-dragao-vermelho-jose-rodrigues-dos-santos/MXwyNzQyMjE4NXwyMzc4Njg5MHwxNjYzNTc3MzY4MDAwfHdlYnA=/550x"

                },
                 new Book
                 {
                     Id = 2,
                     Isbn = 9789897776342,
                     Name = "As Filhas da Vila dos Tecidos",
                     AuthorId = 2,
                     Price = 19.90,
                     Image = "https://img.wook.pt/images/as-filhas-da-vila-dos-tecidos-anne-jacobs/MXwyNzc0OTYyNnwyNDEyMzk5MHwxNjY1Mzg3MzI5MDAwfHdlYnA=/550x"

                 },
                  new Book
                  {
                      Id = 3,
                      Isbn = 9789892355214,
                      Name = "Um Sonho Só Nosso",
                      AuthorId = 3,
                      Price = 18.90,
                      Image = "https://img.wook.pt/images/um-sonho-so-nosso-nicholas-sparks/MXwyNzM0ODM4M3wyMzcwMDU2NXwxNjYxNDQyMjQwMDAwfHdlYnA=/550x"

                  },
                   new Book
                   {
                       Id = 4,
                       Isbn = 9789723718928,
                       Name = "O Principezinho",
                       AuthorId = 4,
                       Price = 5.50,
                       Image = "https://almedinanet.b-cdn.net/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/9/7/9789723718928_1587465282.jpg"

                   },
                   new Book
                   {
                       Id = 5,
                       Isbn = 9789722543606,
                       Name = "A Lista do Juizes",
                       AuthorId = 5,
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

