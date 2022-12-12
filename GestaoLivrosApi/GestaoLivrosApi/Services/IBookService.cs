using System;
using GestaoLivrosApi.Models;
namespace GestaoLivrosApi.Services
{
	public interface IBookService
	{
		//Get livros
		Task<IEnumerable<Book>> GetBooks();

		//Get livros por o Isbn
        Task<IEnumerable<Book>> GetBooksByIsbn(int isbn);
    }
}

