using System;
using System.ComponentModel.DataAnnotations;

namespace GestaoLivrosApi.Models
{
	public class Book
	{
		public int Id { get; set; }

		[Required]
		public int Isbn { get; set; }

		[Required]
		public string Name { get; set; } = null!;

        [Required]
        public string Author { get; set; } = null!;

        [Required]
		public double Price { get; set; }
    }
}

