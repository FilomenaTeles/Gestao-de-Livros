using System;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Books;

namespace GestaoLivrosApi.Interfaces.Services
{
	public interface IBookService
	{
        //Get livros
        Task<PaginatedList<ListBook>> GetBooks(SearchDTO search);

        Task<Book> GetBookById(int id);

        Task<MessagingHelper<BookDTO>> GetById(int id);

        Task<MessagingHelper> Create(CreateBookDTO createBook);

        Task<MessagingHelper<BookDTO>> Update(EditBookDTO editBook);

        Task DeleteBook(Book book);
    }
}

