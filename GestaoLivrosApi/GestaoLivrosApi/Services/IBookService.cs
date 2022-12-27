using System;
using GestaoLivrosApi.Models;
using X.PagedList;

namespace GestaoLivrosApi.Services
{
	public interface IBookService
	{
        //Get livros
        //PagedList<Book> GetBooks(BookParameters bookParameters, string? orderValue);
        Task<PagedList<Book>> GetBooks(BookParameters bookParameters);

        //PagedList<Book> GetBooksBy(BookParameters bookParameters, string searchValue);

        //Get livros por o Isbn
        Task<IEnumerable<Book>> GetBooksByIsbn(string isbn);

        Task<Book> GetBookById(int id);

        Task InsertBook(Book book);

        Task UpdateBook(Book book);

        Task DeleteBook(Book book);
    }
}

