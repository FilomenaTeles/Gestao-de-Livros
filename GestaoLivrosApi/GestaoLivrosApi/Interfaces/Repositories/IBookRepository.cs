using System;
using GestaoLivrosApi.Helpers;
using System.Reflection.Metadata;
using GestaoLivrosApi.Models;

namespace GestaoLivrosApi.Interfaces.Repositories
{
	public interface IBookRepositorie
	{
        Task<PaginatedList<Book>> GetAllAsync(List<Parameter>? SearchBy, List<Parameter>? OrderBy, int currentPage = 1, int pageSize = 5);


    }
}

