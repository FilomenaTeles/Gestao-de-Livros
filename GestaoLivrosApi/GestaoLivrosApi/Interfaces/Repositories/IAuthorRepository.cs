using System;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;

namespace GestaoLivrosApi.Interfaces.Repositories
{
	public interface IAuthorRepository
	{
        Task<PaginatedList<Author>> GetAllAsync(string? SearchBy, string? orderBy, int currentPage = 1, int pageSize = 6);

    }
}

