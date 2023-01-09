using System;
namespace GestaoLivrosApi.Models.Authors
{
	public class AuthorDTO
	{
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Country { get; set; } = null!;

        public ICollection<Book> Books { get; set; }

        public bool isDeleted { get; set; } = false;

        public string? Image { get; set; }

        public AuthorDTO(Author author)
		{
            this.Id = author.Id;
            this.Name = author.Name;
            this.Country = author.Country;
            this.Books = author.Books;
            this.isDeleted = author.isDeleted;
            this.Image = author.Image;
		}
	}
}

