using System;
using FluentValidation;

namespace GestaoLivrosApi.Models.Authors
{
	public class EditAuthorDTO
	{
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public string Country { get; set; } = null!;

        public string? Image { get; set; }

        public class EditAuthorDTOValidator : AbstractValidator<EditAuthorDTO>
        {
            public EditAuthorDTOValidator()
            {
                RuleFor(a => a.Name).NotNull().WithMessage("Insira o Nome do autor");
                RuleFor(a => a.Country).NotNull().WithMessage("Insira o País do autor");
            }
        }
    }
}

