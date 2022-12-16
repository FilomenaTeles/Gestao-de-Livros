using System;
using GestaoLivrosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoLivrosApi.Data
{
	public class AppDbContext : DbContext
	{
		public DbSet<Book> Books { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=localhost;Database=LivrosApi;Integrated Security=false;User ID=SA;Password=Db22Sa_%;TrustServerCertificate=true");
        }

        //Incluir dados na tabela alunos se tabela estiver vazia:

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().Property<bool>("isDeleted");
            modelBuilder.Entity<Book>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Isbn = 9789897776168,
                    Name = "A Mulher do Dragão Vermelho",
                    Author = "José Rodrigues dos Santos",
                    Price = 22.50

                },
                 new Book
                 {
                     Id = 2,
                     Isbn = 9789897776342,
                     Name = "As Filhas da Vila dos Tecidos",
                     Author = "Anne Jacobs",
                     Price = 19.90

                 },
                  new Book
                  {
                      Id = 3,
                      Isbn = 9789892355214,
                      Name = "Um Sonho Só Nosso",
                      Author = "Nicholas Sparks",
                      Price = 18.90

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

