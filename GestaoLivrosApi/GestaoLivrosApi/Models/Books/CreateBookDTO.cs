using FluentValidation;

namespace GestaoLivrosApi.Models.Books
{
    public class CreateBookDTO
	{
       

        public long Isbn { get; set; }

        public string Name { get; set; } = null!;

        public string Author { get; set; } = null!;

        public double Price { get; set; }

        

        public Book ToEntity()
        {
            var book = new Book
            {
                Isbn = this.Isbn,
                Name = this.Name,
                Author = this.Author,
                Price = this.Price
            };

            return book;
        }

        public class CreateBookDTOValidator : AbstractValidator<CreateBookDTO>
        {
			public CreateBookDTOValidator()
			{
                RuleFor(b => b.Isbn).NotNull().WithMessage("Insira o ISBN do livro").GreaterThan(0).WithMessage("Insira um ISBN superior a 0");
                RuleFor(b => b.Price).NotNull().WithMessage("Insira o Preço do livro").GreaterThanOrEqualTo(0).WithMessage("Insira um valor superior a 0");
                RuleFor(b => b.Name).NotNull().WithMessage("Insira o Nome do livro");
                RuleFor(b => b.Author).NotNull().WithMessage("Insira o Autor do livro");


            }
        }
	}
}

