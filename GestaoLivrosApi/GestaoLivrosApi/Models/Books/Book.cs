using System;
using System.ComponentModel.DataAnnotations;
using GestaoLivrosApi.Models.Authors;
using Microsoft.EntityFrameworkCore;

namespace GestaoLivrosApi.Models
{
    [Index(nameof(Isbn), IsUnique = true)]
    public class Book
	{
        public int Id { get; set; }

        [Required]
        public long Isbn { get; set; }

		[Required]
		public string Name { get; set; } = null!;

       
        public int AuthorId { get; set; }
        public Author Author { get; set; }

        [Required]
        public double Price { get; set; }

		public bool isDeleted { get; set; } = false;

        
        public string? Image { get; set; }

    }
}

