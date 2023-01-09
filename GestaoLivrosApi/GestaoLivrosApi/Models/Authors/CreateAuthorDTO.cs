using System;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;

namespace GestaoLivrosApi.Models.Authors
{
    public class CreateAuthorDTO
    {
        public string Name { get; set; } = null!;

        public string Country { get; set; } = null!;

        //public ICollection<Book> Books { get; set; }

        public string? Image { get; set; }

        public Author ToEntity()
        {
            var author = new Author
            {
                Name = this.Name,
                Country = this.Country,
                Image = this.Image
            };
            return author;
        }

        public class CreateAuthorDTOValidator : AbstractValidator<CreateAuthorDTO>
        {
            public CreateAuthorDTOValidator()
            {
                RuleFor(a => a.Name).NotNull().WithMessage("Insira o Nome do autor");
                RuleFor(a => a.Country).NotNull().WithMessage("Insira o País do autor");
            }
        }

    }
}

