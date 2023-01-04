using System;
using FluentValidation;

namespace GestaoLivrosApi.Models.Books
{
	public class EditBookDTO
	{
		public class EditBookDTOValidator : AbstractValidator<EditBookDTO>
        {

		}
	}
}

