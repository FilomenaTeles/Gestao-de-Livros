

namespace GestaoLivrosApi.Models.Books
{
	public class ListBook
	{
        public int Id { get; set; }

        public long Isbn { get; set; }

        public string Name { get; set; } = null!;

        public int AuthorId { get; set; }
        public string AuthorName { get; set; }

        public double Price { get; set; }

        public bool isDeleted { get; set; } = false;

        public string? Image { get; set; }

        public ListBook(Book book)
		{
            Id = book.Id;
            Isbn = book.Isbn;
            Name = book.Name;
            AuthorId = book.AuthorId;
            AuthorName = book.Author.Name;
            Price = book.Price;
            isDeleted = book.isDeleted;
            Image = book.Image;
		}
	}
}

