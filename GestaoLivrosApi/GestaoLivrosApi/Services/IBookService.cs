using System;
using GestaoLivrosApi.Models;
namespace GestaoLivrosApi.Services
{
	public interface IBookService
	{
		//Get livros
		Task<IEnumerable<Book>> GetBooks();
	}
}

