using System;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;

namespace GestaoLivrosApi.Interfaces.Services
{
	public interface IAuthorService
	{
        Task<PaginatedList<ListAuthor>> GetAll(SearchDTO search);

        Task<MessagingHelper> Create(CreateAuthorDTO createAuthor);
    }
}

