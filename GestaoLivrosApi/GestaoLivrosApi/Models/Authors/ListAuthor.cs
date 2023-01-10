using System;
using System.ComponentModel.DataAnnotations;

namespace GestaoLivrosApi.Models.Authors
{
	public class ListAuthor
	{
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Country { get; set; } = null!;

        //public ICollection<Book> Books { get; set; }

        public bool isDeleted { get; set; } = false;

        public string? Image { get; set; }

        public ListAuthor(Author author)
		{
            Id = author.Id;
            Name = author.Name;
            Country = author.Country;
            //Books = author.Books;
            isDeleted = author.isDeleted;
            Image = author.Image;
		}
	}
}

