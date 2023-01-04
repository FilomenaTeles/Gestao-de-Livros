using System;
using FluentValidation;

namespace GestaoLivrosApi.Models.Books
{
	public class EditBookDTO
	{
        public int Id { get; set; }

        public long Isbn { get; set; }

        public string Name { get; set; } = null!;

        public string Author { get; set; } = null!;

        public double Price { get; set; }


        public class EditBookDTOValidator : AbstractValidator<EditBookDTO>
        {
            public EditBookDTOValidator()
            {
                RuleFor(b => b.Isbn).NotNull().WithMessage("Insira o ISBN do livro").GreaterThan(0).WithMessage("Insira um valor superior a 0");
                RuleFor(b => b.Price).NotNull().WithMessage("Insira o Preço do livro").GreaterThanOrEqualTo(0).WithMessage("Insira um valor superior a 0");
                RuleFor(b => b.Name).NotNull().WithMessage("Insira o Nome do livro");
                RuleFor(b => b.Author).NotNull().WithMessage("Insira o Autor do livro");


            }
        }
	}
}

