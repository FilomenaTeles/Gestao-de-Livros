using System;
using System.ComponentModel.DataAnnotations;

namespace GestaoLivrosApi.Models.Authors
{
	public class Author
	{
		
         public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Country { get; set; } = null!;

        public ICollection<Book> Books { get; set; } 


        public bool isDeleted { get; set; } = false;

        public string? Image { get; set; }

    }
}

