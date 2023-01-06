using System;
namespace GestaoLivrosApi.Models.Books
{
	public class BookDTO
	{
        public int Id { get; set; }

        public long Isbn { get; set; }

        public string Name { get; set; } = null!;

        public string Author { get; set; } = null!;

        public double Price { get; set; }
        public string? Image { get; set; }

        public BookDTO (Book book)
		{
            this.Id = book.Id;
            this.Isbn = book.Isbn;
            this.Name = book.Name;
            this.Author = book.Author;
            this.Price = book.Price;
            this.Image = book.Image;

		}
	}
}

