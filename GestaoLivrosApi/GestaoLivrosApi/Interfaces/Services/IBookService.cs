using System;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Books;

namespace GestaoLivrosApi.Services
{
	public interface IBookService
	{
        //Get livros
        //PagedList<Book> GetBooks(BookParameters bookParameters, string? orderValue);
        Task<PaginatedList<ListBook>> GetBooks(SearchDTO search);

        //PagedList<Book> GetBooksBy(BookParameters bookParameters, string searchValue);

        //Get livros por o Isbn
        Task<IEnumerable<Book>> GetBooksByIsbn(string isbn);

        Task<Book> GetBookById(int id);

        Task InsertBook(Book book);

        Task UpdateBook(Book book);

        Task DeleteBook(Book book);
    }
}

