

namespace GestaoLivrosApi.Models.Books
{
	public class ListBook
	{
        public int Id { get; set; }

        public long Isbn { get; set; }

        public string Name { get; set; } = null!;

        public string Author { get; set; } = null!;

        public double Price { get; set; }

        public bool isDeleted { get; set; } = false;

        public ListBook(Book book)
		{
            Id = book.Id;
            Isbn = book.Isbn;
            Name = book.Name;
            Author = book.Author;
            Price = book.Price;
            isDeleted = book.isDeleted;
		}
	}
}

