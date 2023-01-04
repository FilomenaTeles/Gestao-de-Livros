using System;
using GestaoLivrosApi.Helpers;
using System.Reflection.Metadata;
using GestaoLivrosApi.Models;

namespace GestaoLivrosApi.Interfaces.Repositories
{
	public interface IBookRepository
	{
        Task<PaginatedList<Book>> GetAllAsync(string? SearchBy, string? orderBy, int currentPage = 1, int pageSize = 5);
        Task<bool> ExistIsbn(long isbn);
        Task<Book> Create(Book book);

    }
}

